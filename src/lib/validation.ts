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
 * Domaines institutionnels autorisés pour déposer une proposition :
 * Par défaut : ecole.fr et ses sous-domaines officiels (student.ecole.fr, ingenieur.ecole.fr, etc.)
 * Configurable via la variable d'environnement ALLOWED_EMAIL_DOMAINS (séparés par des virgules).
 */
export const DEFAULT_ESTABLISHMENT_DOMAINS = [
  "univ.tgmaster.com",
] as const;

export function getAllowedCampusDomains(): string[] {
  if (process.env.ALLOWED_EMAIL_DOMAINS) {
    return process.env.ALLOWED_EMAIL_DOMAINS.split(",")
      .map((d) => d.trim().toLowerCase())
      .filter(Boolean);
  }
  return [...DEFAULT_ESTABLISHMENT_DOMAINS];
}

export function isInstitutionalEmail(email: string, allowedCustomDomains?: string[]): boolean {
  if (!isValidEmailFormat(email)) return false;
  const domain = email.trim().toLowerCase().split("@")[1];
  if (!domain) return false;

  const allowedList =
    allowedCustomDomains !== undefined
      ? allowedCustomDomains.map((d) => d.trim().toLowerCase())
      : getAllowedCampusDomains();

  return allowedList.some(
    (allowed) => domain === allowed || domain.endsWith("." + allowed)
  );
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
  "Idée de projet",
  "Activité souhaitée",
  "Difficulté rencontrée",
  "Suggestion BDE",
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

type IdeaSubmissionInput = {
  title?: unknown;
  description?: unknown;
  category?: unknown;
  author?: unknown;
  email?: unknown;
  isAnonymous?: unknown;
};

/**
 * Redacts any email addresses from public text fields to preserve confidentiality
 */
export function maskEmailsInText(text: string): string {
  if (!text || typeof text !== "string") return "";
  return text.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, "[email masqué]");
}

function validateIdea(input: IdeaSubmissionInput, requireInstitutionalEmail: boolean): IdeaValidationResult {
  const title = typeof input.title === "string" ? maskEmailsInText(sanitizeText(input.title)) : "";
  const description = typeof input.description === "string" ? maskEmailsInText(sanitizeText(input.description)) : "";
  const categoryRaw = typeof input.category === "string" ? sanitizeText(input.category) : "";
  const email = typeof input.email === "string" ? input.email.trim().toLowerCase() : "";
  const isAnon = input.isAnonymous === true;
  const author = isAnon
    ? "Anonyme"
    : typeof input.author === "string" && input.author.trim()
    ? maskEmailsInText(sanitizeText(input.author))
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

  if (requireInstitutionalEmail && !isInstitutionalEmail(email)) {
    return {
      valid: false,
      error: "Adresse email de l'établissement requise. Vérifiez la configuration des domaines autorisés.",
    };
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

export function validateIdeaSubmission(input: IdeaSubmissionInput): IdeaValidationResult {
  return validateIdea(input, true);
}

/** Client-side draft validation. Eligibility is checked by the server, which owns the domain config. */
export function validateIdeaDraft(input: IdeaSubmissionInput): IdeaValidationResult {
  return validateIdea(input, false);
}
