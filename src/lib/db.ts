import fs from "fs/promises";
import path from "path";
import crypto from "crypto";
import { INITIAL_IDEAS, type StudentIdea } from "../data/mockData.ts";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { extractAndVerifyIdeaSubmissionToken, hashSubmissionEmail } from "./security.ts";
import { validateIdeaSubmission, type IdeaCategory } from "./validation.ts";

export function getDbSupabaseClient(): SupabaseClient | null {
  if (process.env.STORAGE_ENGINE === "json") {
    return null;
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceKey) return null;

  return createClient(supabaseUrl, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export function getStorageEngine(): "supabase" | "json" {
  if (process.env.STORAGE_ENGINE === "supabase") {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
    if (!supabaseUrl || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error("STORAGE_ENGINE=supabase exige NEXT_PUBLIC_SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY.");
    }
    return "supabase";
  }

  if (process.env.STORAGE_ENGINE === "json") {
    return "json";
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  return supabaseUrl && process.env.SUPABASE_SERVICE_ROLE_KEY ? "supabase" : "json";
}

export interface SupportMemberRecord {
  id: string;
  fullName: string;
  contact: string;
  createdAt: string;
}

export interface DatabaseSchema {
  ideas: StudentIdea[];
  support_members: SupportMemberRecord[];
}

export function getDbPath(): string {
  if (process.env.DB_FILE) {
    return process.env.DB_FILE;
  }
  if (process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME) {
    return path.join("/tmp", "db.json");
  }
  return path.join(process.cwd(), "data", "db.json");
}

let memoryDb: DatabaseSchema | null = null;
let persistQueue: Promise<void> = Promise.resolve();
const usedSubmissionTokens = new Map<string, number>();
const sampleIdeaIds = new Set(INITIAL_IDEAS.map((sample) => sample.id));
const storedIdeaFields = new Set([
  "id", "title", "description", "category", "author", "status", "createdAt", "isSample",
]);

export function resetDbForTesting(): void {
  memoryDb = null;
  persistQueue = Promise.resolve();
  usedSubmissionTokens.clear();
}

async function claimIdeaSubmissionToken(token: string): Promise<"claimed" | "used" | "unavailable"> {
  const tokenHash = crypto.createHash("sha256").update(token).digest("hex");
  const now = Date.now();

  if (getStorageEngine() === "supabase") {
    const supabase = getDbSupabaseClient();
    if (!supabase) return "unavailable";
    const { data, error } = await supabase.rpc("claim_idea_submission_token", { p_token_hash: tokenHash });
    if (error) {
      console.error("Erreur de validation unique du jeton de proposition:", error.message);
      return "unavailable";
    }
    return data === true ? "claimed" : "used";
  }

  for (const [hash, claimedAt] of usedSubmissionTokens) {
    if (now - claimedAt > 24 * 60 * 60 * 1000) usedSubmissionTokens.delete(hash);
  }
  if (usedSubmissionTokens.has(tokenHash)) return "used";
  usedSubmissionTokens.set(tokenHash, now);
  return "claimed";
}

function isDatabaseSchema(value: unknown): value is DatabaseSchema {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<DatabaseSchema>;
  return Array.isArray(candidate.ideas) && Array.isArray(candidate.support_members);
}

function normalizeStoredIdea(idea: StudentIdea): StudentIdea {
  const isSample = idea.isSample === true || sampleIdeaIds.has(String(idea.id));
  return {
    id: String(idea.id),
    title: String(idea.title),
    description: String(idea.description),
    category: String(idea.category) as IdeaCategory,
    author: isSample ? "Exemple de campagne" : String(idea.author || "Étudiant"),
    status: String(idea.status || "Pris en compte") as StudentIdea["status"],
    createdAt: isSample ? "Exemple" : String(idea.createdAt || "Date inconnue"),
    isSample,
  };
}

async function ensureDbInitialized(): Promise<DatabaseSchema> {
  if (memoryDb) return memoryDb;

  const dbPath = getDbPath();
  await fs.mkdir(path.dirname(dbPath), { recursive: true });

  try {
    const content = await fs.readFile(dbPath, "utf-8");
    const parsed: unknown = JSON.parse(content);
    if (!isDatabaseSchema(parsed)) throw new Error("Le fichier de données ne correspond pas au format attendu.");
    const legacyIdeas = parsed.ideas as Array<StudentIdea & Record<string, unknown>>;
    const needsCleanup = legacyIdeas.some((idea) =>
      (sampleIdeaIds.has(String(idea.id)) && idea.isSample !== true) ||
      Object.keys(idea).some((field) => !storedIdeaFields.has(field))
    );
    memoryDb = {
      ideas: parsed.ideas.map(normalizeStoredIdea),
      support_members: parsed.support_members,
    };
    if (needsCleanup) await persistDb();
    return memoryDb;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
  }

  memoryDb = {
    ideas: INITIAL_IDEAS.map((idea) => ({ ...idea })),
    support_members: [],
  };
  try {
    await persistDb();
  } catch (error) {
    if (!process.env.VERCEL) {
      console.warn("Erreur écriture initiale disque:", error);
    }
  }
  return memoryDb;
}

async function persistDb(): Promise<void> {
  if (!memoryDb) return;
  const snapshot = JSON.stringify(memoryDb, null, 2);
  const dbPath = getDbPath();

  const write = persistQueue.then(async () => {
    await fs.mkdir(path.dirname(dbPath), { recursive: true });
    const tmpPath = `${dbPath}.tmp.${Date.now()}.${Math.random().toString(36).slice(2, 8)}`;
    await fs.writeFile(tmpPath, snapshot, "utf-8");
    await fs.rename(tmpPath, dbPath);
  });
  persistQueue = write.catch(() => undefined);
  await write;
}

function mapIdea(row: Record<string, unknown>): StudentIdea {
  return {
    id: String(row.id),
    title: String(row.title),
    description: String(row.description),
    category: String(row.category) as IdeaCategory,
    author: row.is_anonymous ? "Anonyme" : String(row.author_name || "Étudiant"),
    status: String(row.status || "Pris en compte") as StudentIdea["status"],
    createdAt: row.is_sample
      ? "Exemple"
      : new Date(String(row.created_at)).toLocaleDateString("fr-FR"),
    isSample: Boolean(row.is_sample),
  };
}

export async function getAllIdeas(): Promise<StudentIdea[]> {
  if (getStorageEngine() === "supabase") {
    const supabase = getDbSupabaseClient();
    if (!supabase) throw new Error("Client Supabase indisponible.");

    const fetchIdeas = () => supabase
      .from("public_ideas")
      .select("id, title, description, category, author_name, is_anonymous, is_sample, status, created_at")
      .order("created_at", { ascending: false });

    let { data, error } = await fetchIdeas();
    if (error) throw new Error(`Erreur consultation Supabase: ${error.message}`);

    if (!data?.length) {
      const seeds = INITIAL_IDEAS.map((idea) => ({
        id: idea.id,
        title: idea.title,
        description: idea.description,
        category: idea.category,
        author_name: idea.author,
        is_anonymous: false,
        is_sample: true,
        status: idea.status,
        is_approved: true,
      }));
      const { error: seedError } = await supabase.from("ideas").upsert(seeds, { onConflict: "id", ignoreDuplicates: true });
      if (seedError) throw new Error(`Erreur initialisation des exemples: ${seedError.message}`);
      const refreshed = await fetchIdeas();
      if (refreshed.error) throw new Error(`Erreur consultation Supabase: ${refreshed.error.message}`);
      data = refreshed.data;
    }

    return (data || []).map((row) => mapIdea(row as Record<string, unknown>));
  }

  const db = await ensureDbInitialized();
  return db.ideas.map(normalizeStoredIdea);
}

export async function createIdea(input: {
  title?: unknown;
  description?: unknown;
  category?: unknown;
  author?: unknown;
  email?: unknown;
  isAnonymous?: unknown;
  verificationToken?: unknown;
}): Promise<{ success: boolean; idea?: StudentIdea; error?: string; errorCode?: "invalid" | "unavailable" }> {
  const validation = validateIdeaSubmission(input);
  if (!validation.valid || !validation.sanitized) {
    return { success: false, error: validation.error || "Proposition invalide.", errorCode: "invalid" };
  }

  const { title, description, category, author, email } = validation.sanitized;
  const isAnonymous = input.isAnonymous === true;
  const idea: StudentIdea = {
    id: crypto.randomUUID(),
    title,
    description,
    category,
    author: isAnonymous ? "Anonyme" : author,
    status: "Pris en compte",
    createdAt: "À l'instant",
    isSample: false,
  };

  if (getStorageEngine() === "supabase") {
    const supabase = getDbSupabaseClient();
    if (!supabase) return { success: false, error: "Service de stockage indisponible.", errorCode: "unavailable" };
    const { error } = await supabase.from("ideas").insert({
      id: idea.id,
      title: idea.title,
      description: idea.description,
      category: idea.category,
      author_name: idea.author,
      is_anonymous: isAnonymous,
      is_sample: false,
      status: idea.status,
      is_approved: true,
    });
    if (error) {
      console.error("Échec d'enregistrement de la proposition dans Supabase:", error.message);
      return { success: false, error: "Impossible d'enregistrer la proposition pour le moment.", errorCode: "unavailable" };
    }
    return { success: true, idea };
  }

  const db = await ensureDbInitialized();
  db.ideas.unshift(idea);
  try {
    await persistDb();
    return { success: true, idea };
  } catch (error) {
    if (process.env.VERCEL) {
      console.warn("Avertissement: persistance locale non disponible sur Vercel serverless, continué en mémoire:", error);
      return { success: true, idea };
    }
    db.ideas.shift();
    console.error("Échec persistance de la proposition:", error);
    return { success: false, error: "Erreur d'écriture sur le disque de stockage persistant.", errorCode: "unavailable" };
  }
}

export async function addSupportMember(
  name: string,
  contact: string
): Promise<{ success: boolean; error?: string; errorCode?: "invalid" | "unavailable" }> {
  if (!name || name.trim().length < 2) {
    return { success: false, error: "Le nom doit comporter au moins 2 caractères.", errorCode: "invalid" };
  }
  if (!contact || contact.trim().length < 5) {
    return { success: false, error: "Coordonnées de contact requises.", errorCode: "invalid" };
  }

  const member: SupportMemberRecord = {
    id: crypto.randomUUID(),
    fullName: name.trim(),
    contact: contact.trim(),
    createdAt: new Date().toISOString(),
  };

  if (getStorageEngine() === "supabase") {
    const supabase = getDbSupabaseClient();
    if (!supabase) return { success: false, error: "Service de stockage indisponible.", errorCode: "unavailable" };
    const { error } = await supabase.from("support_members").insert({
      id: member.id,
      full_name: member.fullName,
      contact: member.contact,
    });
    if (error) {
      console.error("Échec d'enregistrement du soutien dans Supabase:", error.message);
      return { success: false, error: "Impossible d'enregistrer votre soutien pour le moment.", errorCode: "unavailable" };
    }
    return { success: true };
  }

  const db = await ensureDbInitialized();
  db.support_members.push(member);
  try {
    await persistDb();
    return { success: true };
  } catch (error) {
    if (process.env.VERCEL) {
      console.warn("Avertissement: persistance locale non disponible sur Vercel serverless, continué en mémoire:", error);
      return { success: true };
    }
    db.support_members.pop();
    console.error("Échec persistance du soutien:", error);
    return { success: false, error: "Erreur d'écriture sur le disque de stockage persistant.", errorCode: "unavailable" };
  }
}
