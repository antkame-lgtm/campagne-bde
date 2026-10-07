/**
 * Standard RFC-compliant email regular expression
 */
const VALID_EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

/**
 * Validates basic email formatting
 */
export function isValidEmailFormat(email: string): boolean {
  if (!email || typeof email !== "string") return false;
  return VALID_EMAIL_REGEX.test(email.trim());
}

/**
 * Institutional patterns recognized:
 * - .edu
 * - .ac.* (e.g. ac.uk)
 * - ecole.* / *.ecole.*
 * - univ-*.*
 * - universite.*
 * - student.* / etud.*
 */
const DEFAULT_INSTITUTIONAL_PATTERNS = [
  /\.edu$/i,
  /\.ac\.[a-z]{2,}$/i,
  /(^|\.)ecole(-[a-z0-9-]+)?\.[a-z]+$/i,
  /(^|\.)univ(-[a-z0-9-]+)?\.[a-z]+$/i,
  /(^|\.)universite(-[a-z0-9-]+)?\.[a-z]+$/i,
  /(^|\.)polytechnique(-[a-z0-9-]+)?\.[a-z]+$/i,
  /(^|\.)campus(-[a-z0-9-]+)?\.[a-z]+$/i,
  /(^|\.)student\.[a-z.]+/i,
  /(^|\.)etud\.[a-z.]+/i,
];

export function isInstitutionalEmail(email: string, allowedCustomDomains?: string[]): boolean {
  if (!isValidEmailFormat(email)) return false;
  const domain = email.trim().toLowerCase().split("@")[1];
  if (!domain) return false;

  if (allowedCustomDomains && allowedCustomDomains.length > 0) {
    return allowedCustomDomains.some(
      (allowed) => domain === allowed.toLowerCase() || domain.endsWith("." + allowed.toLowerCase())
    );
  }

  return DEFAULT_INSTITUTIONAL_PATTERNS.some((pattern) => pattern.test(domain));
}

/**
 * Strips script tags, HTML angle brackets, and extraneous control characters
 */
export function sanitizeText(text: string): string {
  if (!text || typeof text !== "string") return "";
  return text
    .replace(/[<>]/g, "")
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "")
    .trim();
}

export const ALLOWED_CATEGORIES = [
  "Infrastructures",
  "Pédagogie",
  "Cafétéria",
  "Événements",
  "Vie Pratique",
] as const;

export type IdeaCategory = (typeof ALLOWED_CATEGORIES)[number];

export interface IdeaValidationResult {
  valid: boolean;
  error?: string;
  sanitized?: {
    title: string;
    description: string;
    category: IdeaCategory;
    author: string;
    email: string;
  };
}

export function validateIdeaSubmission(input: {
  title?: unknown;
  description?: unknown;
  category?: unknown;
  author?: unknown;
  email?: unknown;
  isAnonymous?: unknown;
}): IdeaValidationResult {
  const title = typeof input.title === "string" ? sanitizeText(input.title) : "";
  const description = typeof input.description === "string" ? sanitizeText(input.description) : "";
  const categoryRaw = typeof input.category === "string" ? sanitizeText(input.category) : "";
  const email = typeof input.email === "string" ? input.email.trim().toLowerCase() : "";
  const isAnon = Boolean(input.isAnonymous);
  const author = isAnon
    ? "Anonyme"
    : typeof input.author === "string" && input.author.trim()
    ? sanitizeText(input.author)
    : "Étudiant";

  if (!title || title.length < 5) {
    return { valid: false, error: "Le titre doit comporter au moins 5 caractères." };
  }
  if (title.length > 120) {
    return { valid: false, error: "Le titre ne doit pas dépasser 120 caractères." };
  }

  if (!description || description.length < 15) {
    return { valid: false, error: "La description doit comporter au moins 15 caractères détaillant la proposition." };
  }
  if (description.length > 1500) {
    return { valid: false, error: "La description ne doit pas dépasser 1500 caractères." };
  }

  if (!isValidEmailFormat(email)) {
    return { valid: false, error: "Format d'adresse email invalide." };
  }

  // Must match one of allowed categories
  const matchedCategory = ALLOWED_CATEGORIES.find((c) => c.toLowerCase() === categoryRaw.toLowerCase());
  if (!matchedCategory) {
    return {
      valid: false,
      error: `Catégorie non reconnue. Catégories acceptées : ${ALLOWED_CATEGORIES.join(", ")}.`,
    };
  }

  return {
    valid: true,
    sanitized: {
      title,
      description,
      category: matchedCategory,
      author,
      email,
    },
  };
}

export function validateVoteSubmission(input: {
  ideaId?: unknown;
  email?: unknown;
}): { valid: boolean; error?: string; ideaId?: string; email?: string } {
  const ideaId = typeof input.ideaId === "string" ? input.ideaId.trim() : "";
  const email = typeof input.email === "string" ? input.email.trim().toLowerCase() : "";

  if (!ideaId) {
    return { valid: false, error: "Identifiant de proposition manquant." };
  }

  if (!isValidEmailFormat(email)) {
    return { valid: false, error: "Format d'adresse email invalide pour certifier le vote." };
  }

  return { valid: true, ideaId, email };
}
