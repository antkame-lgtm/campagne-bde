import test, { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { requestOtpForEmail, verifyOtpCode, resetOtpStoreForTesting, getLatestOtpCodeForTesting } from "../src/lib/otp.ts";
import { verifyIdeaSubmissionToken } from "../src/lib/security.ts";

describe("OTP Mailbox Proof of Possession Suite", () => {
  let originalEnv: NodeJS.ProcessEnv;

  beforeEach(() => {
    originalEnv = { ...process.env };
    process.env.NODE_ENV = "test";
    process.env.STORAGE_ENGINE = "json";
    delete process.env.SUPABASE_SERVICE_ROLE_KEY;
    delete process.env.NEXT_PUBLIC_SUPABASE_URL;
    delete process.env.SUPABASE_URL;
    resetOtpStoreForTesting();
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it("should reject non-institutional emails for OTP generation", async () => {
    const res = await requestOtpForEmail("personnel@gmail.com");
    assert.equal(res.success, false);
    assert.match(res.error!, /école|institutionnelle|établissement/i);
  });

  it("should generate a 6-digit OTP code for a valid institutional email", async () => {
    const res = await requestOtpForEmail("etudiant@univ.tgmaster.com");
    assert.equal(res.success, true);
    const code = getLatestOtpCodeForTesting("etudiant@univ.tgmaster.com");
    assert.ok(code);
    assert.match(code!, /^\d{6}$/);
    assert.ok(res.emailHash);
    assert.equal(res.emailHash!.length, 64);
  });

  it("should verify a valid OTP and return a proposal submission token", async () => {
    const req = await requestOtpForEmail("etudiant@univ.tgmaster.com");
    assert.equal(req.success, true);
    const code = getLatestOtpCodeForTesting("etudiant@univ.tgmaster.com");
    assert.ok(code);

    const verify = await verifyOtpCode("etudiant@univ.tgmaster.com", code!);
    assert.equal(verify.success, true);
    assert.ok(verify.verificationToken);
    assert.equal(verify.emailHash, req.emailHash);

    // Verify token cryptographic signature
    assert.equal(verifyIdeaSubmissionToken(req.emailHash!, verify.verificationToken!), true);
  });

  it("should reject incorrect OTP code", async () => {
    await requestOtpForEmail("etudiant@univ.tgmaster.com");
    const verify = await verifyOtpCode("etudiant@univ.tgmaster.com", "000000");
    assert.equal(verify.success, false);
    assert.match(verify.error!, /incorrect|invalide/i);
  });

  it("should reject single-use OTP after successful verification (anti-replay)", async () => {
    const req = await requestOtpForEmail("etudiant@univ.tgmaster.com");
    assert.equal(req.success, true);
    const code = getLatestOtpCodeForTesting("etudiant@univ.tgmaster.com");
    assert.ok(code);
    const firstVerify = await verifyOtpCode("etudiant@univ.tgmaster.com", code!);
    assert.equal(firstVerify.success, true);

    const replayVerify = await verifyOtpCode("etudiant@univ.tgmaster.com", code!);
    assert.equal(replayVerify.success, false);
  });
});
