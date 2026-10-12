import { createIdeaSubmissionToken, generateOtpCode, hashOtpCode, hashSubmissionEmail } from "./security.ts";
import { isInstitutionalEmail } from "./validation.ts";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

interface LocalOtpEntry {
  codeHash: string;
  attempts: number;
  maxAttempts: number;
  expiresAt: number;
  _plainCodeForTesting?: string;
}

function getOtpSupabaseClient(): SupabaseClient | null {
  const engine = process.env.STORAGE_ENGINE;
  if (process.env.NODE_ENV === "production" && engine !== "supabase") {
    throw new Error("Définissez STORAGE_ENGINE=supabase pour le service de vérification en production.");
  }
  if (engine === "json") {
    if (process.env.NODE_ENV === "production") {
      throw new Error("Le stockage JSON est réservé au développement local. Configurez Supabase en production.");
    }
    return null;
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (engine === "supabase" || process.env.NODE_ENV === "production") {
    if (!url || !serviceKey) {
      throw new Error("Le stockage Supabase exige NEXT_PUBLIC_SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY.");
    }
  }
  if (!url || !serviceKey) return null;

  return createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

const otpStore = new Map<string, LocalOtpEntry>();
const rateLimitStore = new Map<string, number[]>();

setInterval(() => {
  const now = Date.now();
  for (const [hash, entry] of otpStore.entries()) {
    if (entry.expiresAt < now) otpStore.delete(hash);
  }
  for (const [hash, timestamps] of rateLimitStore.entries()) {
    const recent = timestamps.filter((timestamp) => now - timestamp < 10 * 60 * 1000);
    if (recent.length === 0) rateLimitStore.delete(hash);
    else rateLimitStore.set(hash, recent);
  }
}, 60000).unref();

async function sendOtpEmail(email: string, code: string): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  if (apiKey && from) {
    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from,
          to: email,
          subject: "Votre code de vérification BDE Salimata 2026",
          html: `<p>Bonjour,</p><p>Votre code de vérification pour déposer une proposition est : <strong>${code}</strong>.</p><p>Ce code est valable 10 minutes et à usage unique.</p>`,
        }),
      });
      if (response.ok) return true;
      console.error("Erreur réponse Resend API:", response.status);
    } catch {
      console.error("Échec de l'envoi du courriel via Resend.");
    }
    return false;
  }

  if (process.env.NODE_ENV !== "production") {
    console.info(`[DEV LOCAL] Code de vérification pour ${email} : ${code}`);
    return true;
  }

  console.error("Configurez RESEND_API_KEY et RESEND_FROM_EMAIL pour envoyer les codes de vérification.");
  return false;
}

async function claimOtpRequest(emailHash: string, now: number, supabase: SupabaseClient | null): Promise<boolean> {
  if (supabase) {
    const { data, error } = await supabase.rpc("claim_otp_request", { p_email_hash: emailHash });
    if (error) {
      console.error("Erreur du contrôle de débit OTP Supabase:", error.message);
      throw new Error("Le contrôle de débit est indisponible. Veuillez réessayer plus tard.");
    }
    if (data !== true) return false;
    return true;
  }

  const timestamps = (rateLimitStore.get(emailHash) || []).filter((timestamp) => now - timestamp < 10 * 60 * 1000);
  if (timestamps.length >= 3) return false;
  timestamps.push(now);
  rateLimitStore.set(emailHash, timestamps);
  return true;
}

export async function requestOtpForEmail(email: string): Promise<{
  success: boolean;
  message?: string;
  emailHash?: string;
  error?: string;
  errorCode?: "invalid_email" | "rate_limited" | "unavailable";
}> {
  if (!email || !isInstitutionalEmail(email)) {
    return { success: false, error: "Une adresse email autorisée de l'établissement est requise.", errorCode: "invalid_email" };
  }

  try {
    const emailHash = hashSubmissionEmail(email);
    const now = Date.now();
    const supabase = getOtpSupabaseClient();
    const maySend = await claimOtpRequest(emailHash, now, supabase);
    if (!maySend) {
      return { success: false, error: "Trop de demandes pour cette adresse. Veuillez patienter 10 minutes.", errorCode: "rate_limited" };
    }

    const code = generateOtpCode();
    const codeHash = hashOtpCode(code);
    const expiresAt = now + 10 * 60 * 1000;

    if (supabase) {
      const { error } = await supabase.from("otp_verifications").insert({
        email_hash: emailHash,
        code_hash: codeHash,
        attempts: 0,
        max_attempts: 5,
        expires_at: new Date(expiresAt).toISOString(),
      });
      if (error) {
        console.error("Erreur insertion OTP Supabase:", error.message);
        return { success: false, error: "Erreur serveur lors de la préparation du code.", errorCode: "unavailable" };
      }
    } else {
      otpStore.set(emailHash, {
        codeHash,
        attempts: 0,
        maxAttempts: 5,
        expiresAt,
        _plainCodeForTesting: process.env.NODE_ENV === "test" ? code : undefined,
      });
    }

    const sent = await sendOtpEmail(email, code);
    if (!sent) {
      if (supabase) {
        await supabase.from("otp_verifications").delete().eq("email_hash", emailHash).eq("code_hash", codeHash);
      } else {
        otpStore.delete(emailHash);
      }
      return {
        success: false,
        error: "Impossible d'envoyer le code. Le service de messagerie est absent ou indisponible.",
        errorCode: "unavailable",
      };
    }

    return { success: true, message: `Un code de vérification a été envoyé à ${email}.`, emailHash };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Erreur inattendue du service de vérification.";
    return { success: false, error: message, errorCode: "unavailable" };
  }
}

export async function verifyOtpCode(email: string, code: string): Promise<{
  success: boolean;
  emailHash?: string;
  verificationToken?: string;
  error?: string;
  errorCode?: "invalid_input" | "invalid_code" | "unavailable";
}> {
  if (!email || !code) return { success: false, error: "Email et code requis.", errorCode: "invalid_input" };

  const emailHash = hashSubmissionEmail(email);
  const submittedCodeHash = hashOtpCode(code.trim());
  const supabase = getOtpSupabaseClient();

  if (supabase) {
    const { data: records, error: fetchError } = await supabase
      .from("otp_verifications")
      .select("id, code_hash, attempts, max_attempts")
      .eq("email_hash", emailHash)
      .gt("expires_at", new Date().toISOString())
      .order("created_at", { ascending: false })
      .limit(1);

    if (fetchError || !records?.length) {
      return {
        success: false,
        error: fetchError ? "Le service de vérification est indisponible." : "Aucun code valide en attente pour cette adresse.",
        errorCode: fetchError ? "unavailable" : "invalid_code",
      };
    }

    const record = records[0];
    if (record.attempts >= record.max_attempts) {
      const { error } = await supabase.from("otp_verifications").delete().eq("id", record.id);
      if (error) return { success: false, error: "Impossible d'invalider le code. Veuillez réessayer.", errorCode: "unavailable" };
      return { success: false, error: "Nombre maximal de tentatives atteint. Demandez un nouveau code.", errorCode: "invalid_code" };
    }

    if (record.code_hash !== submittedCodeHash) {
      const { error } = await supabase
        .from("otp_verifications")
        .update({ attempts: record.attempts + 1 })
        .eq("id", record.id);
      if (error) return { success: false, error: "Impossible d'enregistrer la tentative. Veuillez réessayer.", errorCode: "unavailable" };
      return { success: false, error: "Code de vérification incorrect.", errorCode: "invalid_code" };
    }

    const { error } = await supabase.from("otp_verifications").delete().eq("id", record.id);
    if (error) return { success: false, error: "Impossible de consommer le code. Veuillez réessayer.", errorCode: "unavailable" };
    return { success: true, emailHash, verificationToken: createIdeaSubmissionToken(emailHash) };
  }

  const entry = otpStore.get(emailHash);
  if (!entry) return { success: false, error: "Aucun code en attente pour cette adresse.", errorCode: "invalid_code" };
  if (Date.now() > entry.expiresAt) {
    otpStore.delete(emailHash);
    return { success: false, error: "Le code a expiré. Veuillez en demander un nouveau.", errorCode: "invalid_code" };
  }
  if (entry.attempts >= entry.maxAttempts) {
    otpStore.delete(emailHash);
    return { success: false, error: "Nombre maximal de tentatives atteint. Demandez un nouveau code.", errorCode: "invalid_code" };
  }
  if (entry.codeHash !== submittedCodeHash) {
    entry.attempts += 1;
    if (entry.attempts >= entry.maxAttempts) otpStore.delete(emailHash);
    return { success: false, error: "Code de vérification incorrect.", errorCode: "invalid_code" };
  }

  otpStore.delete(emailHash);
  return { success: true, emailHash, verificationToken: createIdeaSubmissionToken(emailHash) };
}

export function getLatestOtpCodeForTesting(email: string): string | null {
  const emailHash = hashSubmissionEmail(email);
  return otpStore.get(emailHash)?._plainCodeForTesting || null;
}

export function resetOtpStoreForTesting(): void {
  otpStore.clear();
  rateLimitStore.clear();
}
