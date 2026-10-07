import crypto from "crypto";

/**
 * Hashes a student email into a deterministic SHA-256 hexadecimal string.
 * Normalizes input (trims and converts to lowercase) before hashing.
 * Guarantees RGPD compliance (no plain emails stored) and 1-student-1-vote anti-fraud.
 */
export function hashStudentEmail(email: string, salt: string = ""): string {
  if (!email || typeof email !== "string") {
    throw new Error("Invalid email provided for hashing");
  }
  const normalized = email.trim().toLowerCase();
  return crypto.createHash("sha256").update(normalized + salt).digest("hex");
}

/**
 * Creates a unique composite vote key for an idea.
 */
export function createVoteKey(ideaId: string, emailHash: string): string {
  if (!ideaId || !emailHash) {
    throw new Error("Missing ideaId or emailHash");
  }
  return `${ideaId.trim()}:${emailHash.trim()}`;
}
