import test, { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  isValidEmailFormat,
  isInstitutionalEmail,
  sanitizeText,
  validateIdeaSubmission,
  validateVoteSubmission,
  ALLOWED_CATEGORIES,
} from "../src/lib/validation.ts";

describe("Validation Suite", () => {
  describe("isValidEmailFormat", () => {
    it("should accept valid standard email formats", () => {
      assert.equal(isValidEmailFormat("student@ecole.fr"), true);
      assert.equal(isValidEmailFormat("first.last@univ-paris.fr"), true);
      assert.equal(isValidEmailFormat("user123@sub.domain.org"), true);
    });

    it("should reject invalid email strings", () => {
      assert.equal(isValidEmailFormat(""), false);
      assert.equal(isValidEmailFormat("notanemail"), false);
      assert.equal(isValidEmailFormat("@domain.com"), false);
      assert.equal(isValidEmailFormat("user@"), false);
      assert.equal(isValidEmailFormat("user@domain"), false);
    });
  });

  describe("isInstitutionalEmail", () => {
    it("should recognize institutional educational domains", () => {
      assert.equal(isInstitutionalEmail("alex@ecole.fr"), true);
      assert.equal(isInstitutionalEmail("alex@ingenieur.ecole.fr"), true);
      assert.equal(isInstitutionalEmail("alex@univ-lyon1.fr"), true);
      assert.equal(isInstitutionalEmail("alex@universite-paris.fr"), true);
      assert.equal(isInstitutionalEmail("alex@mit.edu"), true);
      assert.equal(isInstitutionalEmail("alex@oxford.ac.uk"), true);
      assert.equal(isInstitutionalEmail("alex@student.polytechnique.fr"), true);
    });

    it("should reject generic personal or disposable email domains", () => {
      assert.equal(isInstitutionalEmail("troll@gmail.com"), false);
      assert.equal(isInstitutionalEmail("spammer@tempmail.org"), false);
      assert.equal(isInstitutionalEmail("fake@yahoo.fr"), false);
    });

    it("should honor explicit custom allowed domains list", () => {
      const allowed = ["mon-ecole.eu", "ens.fr"];
      assert.equal(isInstitutionalEmail("lea@mon-ecole.eu", allowed), true);
      assert.equal(isInstitutionalEmail("lea@ens.fr", allowed), true);
      assert.equal(isInstitutionalEmail("lea@other.com", allowed), false);
    });
  });

  describe("sanitizeText", () => {
    it("should strip HTML tags and dangerous characters", () => {
      const dirty = "<script>alert('hack')</script>Proposition de navette";
      const cleaned = sanitizeText(dirty);
      assert.equal(cleaned.includes("<"), false);
      assert.equal(cleaned.includes(">"), false);
      assert.equal(cleaned, "scriptalert('hack')/scriptProposition de navette");
    });

    it("should trim surrounding whitespace", () => {
      assert.equal(sanitizeText("   Salle de repos   "), "Salle de repos");
    });
  });

  describe("validateIdeaSubmission", () => {
    it("should reject submission with title shorter than 5 chars", () => {
      const result = validateIdeaSubmission({
        title: "Café",
        description: "Mettre du bon café bio en salle commune",
        category: "Vie de campus",
        email: "etudiant@ecole.fr",
      });
      assert.equal(result.valid, false);
      assert.match(result.error!, /titre/i);
    });

    it("should reject submission with description shorter than 15 chars", () => {
      const result = validateIdeaSubmission({
        title: "Nouvelle imprimante",
        description: "Trop court",
        category: "Vie de campus",
        email: "etudiant@ecole.fr",
      });
      assert.equal(result.valid, false);
      assert.match(result.error!, /description/i);
    });

    it("should reject unlisted categories", () => {
      const result = validateIdeaSubmission({
        title: "Tournoi e-sport campus",
        description: "Organiser un grand tournoi de rentrée sur console",
        category: "Catégorie Inexistante",
        email: "etudiant@ecole.fr",
      });
      assert.equal(result.valid, false);
      assert.match(result.error!, /catégorie/i);
    });

    it("should accept valid submissions and sanitize fields", () => {
      const result = validateIdeaSubmission({
        title: "  Mise en place de paniers bio le jeudi  ",
        description: "Partenariat avec des producteurs locaux pour distribuer des paniers de fruits et légumes à tarif préférentiel.",
        category: "Vie Pratique",
        author: "Sarah",
        email: "SARAH@ECOLE.FR",
        isAnonymous: false,
      });

      assert.equal(result.valid, true);
      assert.equal(result.sanitized?.title, "Mise en place de paniers bio le jeudi");
      assert.equal(result.sanitized?.email, "sarah@ecole.fr");
      assert.equal(result.sanitized?.author, "Sarah");
    });

    it("should assign author 'Anonyme' when isAnonymous is checked", () => {
      const result = validateIdeaSubmission({
        title: "Boîte à livres solidaire",
        description: "Installer une bibliothèque collaborative libre service dans le hall principal.",
        category: "Infrastructures",
        author: "Lucas",
        email: "lucas@ecole.fr",
        isAnonymous: true,
      });

      assert.equal(result.valid, true);
      assert.equal(result.sanitized?.author, "Anonyme");
    });
  });

  describe("validateVoteSubmission", () => {
    it("should reject missing ideaId", () => {
      const res = validateVoteSubmission({ ideaId: "", email: "test@ecole.fr" });
      assert.equal(res.valid, false);
      assert.match(res.error!, /identifiant/i);
    });

    it("should reject malformed email", () => {
      const res = validateVoteSubmission({ ideaId: "idea-123", email: "bademail" });
      assert.equal(res.valid, false);
      assert.match(res.error!, /email/i);
    });

    it("should accept valid vote submission", () => {
      const res = validateVoteSubmission({ ideaId: "idea-123", email: "student@ecole.fr" });
      assert.equal(res.valid, true);
      assert.equal(res.ideaId, "idea-123");
      assert.equal(res.email, "student@ecole.fr");
    });
  });
});
