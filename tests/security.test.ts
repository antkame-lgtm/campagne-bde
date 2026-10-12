import test, { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  hashSubmissionEmail,
  createIdeaSubmissionToken,
  verifyIdeaSubmissionToken,
  extractAndVerifyIdeaSubmissionToken,
} from "../src/lib/security.ts";

describe("Security & proposal submission suite", () => {
  it("hashes addresses consistently without exposing their text", () => {
    const hash = hashSubmissionEmail("lea.martin@ecole.fr");
    assert.equal(hash.length, 64);
    assert.match(hash, /^[0-9a-f]{64}$/);
    assert.equal(hash, hashSubmissionEmail(" LEA.MARTIN@ECOLE.FR "));
    assert.notEqual(hash, hashSubmissionEmail("another@ecole.fr"));
    assert.equal(hash.includes("lea"), false);
    assert.equal(hash.includes("@"), false);
  });

  it("uses the supplied salt when hashing an address", () => {
    const address = "etudiant@ecole.fr";
    assert.notEqual(hashSubmissionEmail(address, "saltA"), hashSubmissionEmail(address, "saltB"));
  });

  it("creates and verifies a short-lived proposal submission token", () => {
    const emailHash = hashSubmissionEmail("lea@ecole.fr");
    const token = createIdeaSubmissionToken(emailHash);

    assert.equal(token.split(".").length, 3);
    assert.equal(verifyIdeaSubmissionToken(emailHash, token), true);
    assert.equal(extractAndVerifyIdeaSubmissionToken(token), emailHash);
  });

  it("rejects altered tokens and tokens for another address", () => {
    const emailHash = hashSubmissionEmail("lea@ecole.fr");
    const token = createIdeaSubmissionToken(emailHash);
    const tampered = `${token.slice(0, -4)}ffff`;

    assert.equal(verifyIdeaSubmissionToken(emailHash, tampered), false);
    assert.equal(verifyIdeaSubmissionToken(hashSubmissionEmail("noah@ecole.fr"), token), false);
    assert.equal(extractAndVerifyIdeaSubmissionToken(tampered), null);
    assert.equal(extractAndVerifyIdeaSubmissionToken("invalid.token"), null);
  });

  it("rejects malformed hashing input", () => {
    assert.throws(() => hashSubmissionEmail(""), /Invalid email/);
    // @ts-expect-error test invalid type
    assert.throws(() => hashSubmissionEmail(null), /Invalid email/);
    // @ts-expect-error test invalid type
    assert.throws(() => hashSubmissionEmail(undefined), /Invalid email/);
  });
});
