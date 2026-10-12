process.env.NODE_ENV = "test";

import test, { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import {
  sendTelegramNotification,
  sendGoogleSheetsNotification,
  dispatchIdeaNotifications,
  type IdeaNotificationPayload,
} from "../src/lib/notifications.ts";

describe("Notifications Service Suite (Telegram & Google Sheets)", () => {
  const samplePayload: IdeaNotificationPayload = {
    title: "Aménagement salle d'étude",
    description: "Ajouter des multiprises et lampes de travail au 2e étage",
    category: "Infrastructures",
    author: "Aminata",
    email: "aminata@univ.tgmaster.com",
    isAnonymous: false,
  };

  const originalEnv = { ...process.env };
  const originalFetch = global.fetch;

  afterEach(() => {
    process.env = { ...originalEnv };
    global.fetch = originalFetch;
  });

  it("should return false gracefully when Telegram credentials are not set", async () => {
    delete process.env.TELEGRAM_BOT_TOKEN;
    delete process.env.TELEGRAM_CHAT_ID;

    const result = await sendTelegramNotification(samplePayload);
    assert.strictEqual(result, false);
  });

  it("should return false gracefully when Google Sheets webhook is not set", async () => {
    delete process.env.GOOGLE_SHEET_WEBHOOK_URL;

    const result = await sendGoogleSheetsNotification(samplePayload);
    assert.strictEqual(result, false);
  });

  it("should send Telegram message when credentials are provided", async () => {
    process.env.TELEGRAM_BOT_TOKEN = "test-token";
    process.env.TELEGRAM_CHAT_ID = "123456789";

    let interceptedUrl = "";
    let interceptedBody: any = null;

    global.fetch = (async (url: string | URL | Request, init?: RequestInit) => {
      interceptedUrl = String(url);
      interceptedBody = JSON.parse(String(init?.body));
      return new Response(JSON.stringify({ ok: true }), { status: 200 });
    }) as typeof fetch;

    const result = await sendTelegramNotification(samplePayload);
    assert.strictEqual(result, true);
    assert.strictEqual(interceptedUrl, "https://api.telegram.org/bottest-token/sendMessage");
    assert.strictEqual(interceptedBody.chat_id, "123456789");
    assert.ok(interceptedBody.text.includes("Aménagement salle d'étude"));
    assert.ok(interceptedBody.text.includes("aminata@univ.tgmaster.com"));
  });

  it("should send Google Sheets payload when webhook is provided", async () => {
    process.env.GOOGLE_SHEET_WEBHOOK_URL = "https://script.google.com/macros/s/mock/exec";

    let interceptedUrl = "";
    let interceptedBody: any = null;

    global.fetch = (async (url: string | URL | Request, init?: RequestInit) => {
      interceptedUrl = String(url);
      interceptedBody = JSON.parse(String(init?.body));
      return new Response(JSON.stringify({ status: "success" }), { status: 200 });
    }) as typeof fetch;

    const result = await sendGoogleSheetsNotification(samplePayload);
    assert.strictEqual(result, true);
    assert.strictEqual(interceptedUrl, "https://script.google.com/macros/s/mock/exec");
    assert.strictEqual(interceptedBody.title, "Aménagement salle d'étude");
    assert.strictEqual(interceptedBody.category, "Infrastructures");
    assert.strictEqual(interceptedBody.author, "Aminata");
  });

  it("should dispatch both notifications without throwing errors", async () => {
    delete process.env.TELEGRAM_BOT_TOKEN;
    delete process.env.GOOGLE_SHEET_WEBHOOK_URL;

    // Should complete cleanly without rejecting
    await assert.doesNotReject(async () => {
      await dispatchIdeaNotifications(samplePayload);
    });
  });
});
