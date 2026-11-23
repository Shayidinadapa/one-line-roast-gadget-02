// One-Line Roast: The Gadget You Use Every Day
// Writes a single original roast line (<=200 chars, one line) to /output/entry.txt
// and validates it against the bounty gate before writing.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const ROAST =
  "My laptop fan spins up like a jet engine just to open a spreadsheet, then sighs like I asked it to do actual work.";

const MAX_CHARS = 200;

function validate(line: string): void {
  // Count Unicode code points, not UTF-16 units, so emoji count as one char.
  const charCount = [...line].length;
  if (charCount === 0) throw new Error("roast line is empty");
  if (line.trim().length === 0) throw new Error("roast line is only whitespace");
  if (charCount > MAX_CHARS) {
    throw new Error(
      `roast line is ${charCount} chars, over the ${MAX_CHARS} limit`
    );
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("roast line must be a single line");
  }
  if (line !== line.trim()) {
    throw new Error("roast line has leading or trailing whitespace");
  }
}

validate(ROAST);

const outPath = "/output/entry.txt";
mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, ROAST, "utf8");
console.log(`Wrote ${ROAST.length} chars to ${outPath}`);
console.log(ROAST);
