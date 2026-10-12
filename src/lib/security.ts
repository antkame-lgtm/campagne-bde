import crypto from "crypto";

// Entropie cryptographique éphémère par runtime en développement/test pour interdire tout secret codé en dur
const runtimeDevSalt = crypto.randomBytes(32).toString("hex");
const runtimeDevSecret = crypto.randomBytes(32).toString("hex");

/**
 * Récupère le sel cryptographique utilisé pour vérifier les adresses de dépôt.
 * En production : exige une variable d'environnement forte d'au moins 32 caractères.
 * En dev/test : utilise process.env.EMAIL_HASH_SALT si défini, sinon une entropie éphémère forte par processus.
 */
export function getEmailHashSalt(): string {
  const salt = process.env.EMAIL_HASH_SALT;
  if (process.env.NODE_ENV === "production") {
    if (!salt || salt.length < 32) {
      throw new Error(
        "SÉCURITÉ CRITIQUE : La variable d'environnement EMAIL_HASH_SALT doit être définie en production avec au moins 32 caractères."
      );
    }
    return salt;
  }
  return salt || runtimeDevSalt;
}

/**
 * Récupère le secret de signature HMAC des jetons de dépôt de proposition.
 * En production : exige une variable d'environnement forte d'au moins 32 caractères.
 * En dev/test : utilise process.env.IDEA_SUBMISSION_TOKEN_SECRET si défini, sinon une entropie éphémère forte par processus.
 */
export function getSubmissionTokenSecret(): string {
  const secret = process.env.IDEA_SUBMISSION_TOKEN_SECRET;
  if (process.env.NODE_ENV === "production") {
    if (!secret || secret.length < 32) {
      throw new Error(
        "SÉCURITÉ CRITIQUE : La variable d'environnement IDEA_SUBMISSION_TOKEN_SECRET doit être définie en production avec au moins 32 caractères."
      );
    }
    return secret;
  }
  return secret || runtimeDevSecret;
}

/**
 * Hashes an email into a pseudonymous SHA-256 hexadecimal string using a cryptographic salt.
 * Normalizes input (trims and converts to lowercase) before hashing.
 * This is a pseudonymization measure; it does not by itself establish legal compliance.
 */
export function hashSubmissionEmail(email: string, salt: string = getEmailHashSalt()): string {
  if (!email || typeof email !== "string") {
    throw new Error("Invalid email provided for hashing");
  }
  const normalized = email.trim().toLowerCase();
  return crypto.createHash("sha256").update(normalized + salt).digest("hex");
}

/**
 * Generates a 6-digit verification code using CSPRNG.
 */
export function generateOtpCode(): string {
  return crypto.randomInt(100000, 1000000).toString();
}

/**
 * Hashes an OTP code with the HMAC secret before storage.
 */
export function hashOtpCode(code: string, secret: string = getSubmissionTokenSecret()): string {
  if (!code || typeof code !== "string") {
    throw new Error("Invalid OTP code provided for hashing");
  }
  return crypto.createHmac("sha256", secret).update(code.trim()).digest("hex");
}

/**
 * Creates a short-lived signed token proving an email was verified for an idea submission.
 * Token format: `${emailHash}.${timestamp}.${signature}`
 */
export function createIdeaSubmissionToken(emailHash: string, secret: string = getSubmissionTokenSecret()): string {
  if (!emailHash || typeof emailHash !== "string" || emailHash.length !== 64) {
    throw new Error("Invalid emailHash for token generation");
  }
  const timestamp = Date.now().toString();
  const payload = `${emailHash}.${timestamp}`;
  const signature = crypto.createHmac("sha256", secret).update(payload).digest("hex");
  return `${payload}.${signature}`;
}

/**
 * Verifies a short-lived submission token and extracts the authenticated 64-char emailHash.
 * Returns the emailHash if signature matches and token is not expired, or null otherwise.
 */
export function extractAndVerifyIdeaSubmissionToken(
  token: string,
  secret: string = getSubmissionTokenSecret(),
  maxAgeMs: number = 10 * 60 * 1000
): string | null {
  if (!token || typeof token !== "string") return null;
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  const [tokenHash, timestampStr, signature] = parts;
  if (!tokenHash || tokenHash.length !== 64) return null;

  const timestamp = parseInt(timestampStr, 10);
  if (isNaN(timestamp)) return null;
  if (Date.now() - timestamp > maxAgeMs) return null;

  try {
    const expectedSignature = crypto.createHmac("sha256", secret).update(`${tokenHash}.${timestampStr}`).digest("hex");
    const sigBuffer = Buffer.from(signature, "hex");
    const expectedBuffer = Buffer.from(expectedSignature, "hex");
    if (sigBuffer.length !== expectedBuffer.length) return null;
    if (crypto.timingSafeEqual(sigBuffer, expectedBuffer)) {
      return tokenHash;
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Verifies a submission token and returns true if it matches the verified email hash.
 */
export function verifyIdeaSubmissionToken(
  emailHash: string,
  token: string,
  secret: string = getSubmissionTokenSecret(),
  maxAgeMs: number = 10 * 60 * 1000
): boolean {
  if (!emailHash || !token) return false;
  const extractedHash = extractAndVerifyIdeaSubmissionToken(token, secret, maxAgeMs);
  return extractedHash === emailHash;
}

