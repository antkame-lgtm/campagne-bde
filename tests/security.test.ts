import test, { describe, it } from "node:test";
import assert from "node:assert/strict";
import { hashStudentEmail, createVoteKey } from "../src/lib/security.ts";

describe("Security & Anti-Fraud Suite", () => {
  it("hashStudentEmail should return a 64-character SHA-256 hex string", () => {
    const hash = hashStudentEmail("lea.martin@ecole.fr");
    assert.equal(typeof hash, "string");
    assert.equal(hash.length, 64);
    assert.match(hash, /^[0-9a-f]{64}$/);
  });

  it("hashStudentEmail must be strictly deterministic and case-insensitive", () => {
    const hash1 = hashStudentEmail("etudiant@ecole.fr");
    const hash2 = hashStudentEmail("ETUDIANT@ECOLE.FR");
    const hash3 = hashStudentEmail("  etudiant@ecole.fr  ");

    assert.equal(hash1, hash2, "Capitalization must not change the hash");
    assert.equal(hash1, hash3, "Whitespace padding must be trimmed");
  });

  it("hashStudentEmail must produce distinct hashes for different students", () => {
    const hashA = hashStudentEmail("alice@ecole.fr");
    const hashB = hashStudentEmail("bob@ecole.fr");

    assert.notEqual(hashA, hashB, "Different emails must generate distinct voter signatures");
  });

  it("hashStudentEmail must not leak plain email characters", () => {
    const email = "secret.student@ecole.fr";
    const hash = hashStudentEmail(email);

    assert.equal(hash.includes("secret"), false);
    assert.equal(hash.includes("student"), false);
    assert.equal(hash.includes("@"), false);
  });

  it("hashStudentEmail must throw an error on empty or invalid input", () => {
    assert.throws(() => hashStudentEmail(""), /Invalid email/);
    // @ts-expect-error test invalid type
    assert.throws(() => hashStudentEmail(null), /Invalid email/);
    // @ts-expect-error test invalid type
    assert.throws(() => hashStudentEmail(undefined), /Invalid email/);
  });

  it("createVoteKey should create an unambiguous composite key", () => {
    const key = createVoteKey("idea-101", "abc123hash");
    assert.equal(key, "idea-101:abc123hash");
  });

  it("createVoteKey should throw on missing components", () => {
    assert.throws(() => createVoteKey("", "abc123hash"));
    assert.throws(() => createVoteKey("idea-101", ""));
  });
});
