process.env.NODE_ENV = "test";
process.env.STORAGE_ENGINE = "json";

import test, { describe, it, before, after } from "node:test";
import assert from "node:assert/strict";
import fs from "fs/promises";
import os from "os";
import path from "path";
import { getAllIdeas, createIdea, addSupportMember, resetDbForTesting } from "../src/lib/db.ts";

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const testDbFile = path.join(os.tmpdir(), `campagne-bde-isolated-test-${Date.now()}-${Math.random().toString(36).slice(2, 6)}.json`);

describe("Database & persistence layer suite", () => {
  let savedEnv: NodeJS.ProcessEnv;

  before(async () => {
    savedEnv = { ...process.env };
    process.env.NODE_ENV = "test";
    process.env.STORAGE_ENGINE = "json";
    delete process.env.SUPABASE_SERVICE_ROLE_KEY;
    delete process.env.NEXT_PUBLIC_SUPABASE_URL;
    delete process.env.SUPABASE_URL;
    process.env.DB_FILE = testDbFile;
    resetDbForTesting();
    try {
      await fs.unlink(testDbFile);
    } catch {
      // The isolated file may not exist yet.
    }
  });

  after(async () => {
    resetDbForTesting();
    try {
      await fs.unlink(testDbFile);
    } catch {
      // The isolated file may already have been removed.
    }
    process.env = savedEnv;
  });

  it("initializes with an empty proposal list before any submission", async () => {
    const ideas = await getAllIdeas();
    assert.deepEqual(ideas, []);
  });

  it("rejects non-institutional addresses for a proposal", async () => {
    const result = await createIdea({
      title: "Salle de détente campus",
      description: "Aménagement d'une salle avec canapés et prises USB",
      category: "Infrastructures",
      author: "Alex",
      email: "alex@gmail.com",
    });
    assert.equal(result.success, false);
    assert.match(result.error!, /école|institutionnelle|établissement/i);
  });

  it("stores a valid proposal and marks it as a real submission", async () => {
    const result = await createIdea({
      title: "Mise en place de paniers bio",
      description: "Distribution de fruits et légumes chaque mardi à prix coûtant",
      category: "Vie Pratique",
      author: "Camille",
      email: "camille@univ.tgmaster.com",
    });

    assert.equal(result.success, true);
    assert.ok(result.idea);
    assert.match(result.idea.id, UUID_REGEX);
    assert.equal(result.idea.isSample, false);
    assert.equal(result.idea.status, "Pris en compte");

    const allIdeas = await getAllIdeas();
    assert.ok(allIdeas.some((idea) => idea.id === result.idea!.id));
  });

  it("records committee contacts and rejects invalid entries", async () => {
    const result = await addSupportMember("Sarah Delorme", "sarah@univ.tgmaster.com");
    assert.equal(result.success, true);

    const invalid = await addSupportMember("A", "contact");
    assert.equal(invalid.success, false);
  });
});
