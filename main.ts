// One Sentence for a Traveler from 1800 — make.fun entry.
//
// Writes a single original sentence (171 characters) explaining the modern
// internet to someone arriving from the year 1800, to /output/entry.txt.
//
// The sentence builds only from things a person of 1800 already knows — a
// library, a post office, a market stall, a road, a letter — and says nothing
// with a word coined after their time. Deterministic, stdlib only, no
// network, no model calls, no randomness.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const SENTENCE =
  "Picture every library, post office, and market stall in the world " +
  "joined by one invisible road, so a letter you write reaches any " +
  "stranger's door before its ink has dried.";

const OUTPUT_PATH = process.env.ENTRY_OUTPUT ?? "/output/entry.txt";

function main(): void {
  // Gate, as the competition's sealed scorer checks it: 1-200 UTF-8
  // characters, not only white space, and a single sentence.
  const chars = [...SENTENCE].length;
  if (chars < 1 || chars > 200) {
    throw new Error(`Sentence is ${chars} characters; the gate allows 1-200.`);
  }
  if (SENTENCE.trim().length === 0) {
    throw new Error("Sentence is only white space.");
  }
  if ((SENTENCE.match(/\./g) ?? []).length !== 1 || !SENTENCE.endsWith(".")) {
    throw new Error("Entry must be exactly one sentence.");
  }
  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  writeFileSync(OUTPUT_PATH, SENTENCE, "utf8");
  console.log(`Wrote ${chars} characters to ${OUTPUT_PATH}`);
}

main();
