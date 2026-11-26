// Entry point for the 26 November 2026 news-image entry.
//
// The finished artwork lives in this repository as entry.png beside this
// file. The program delivers those exact bytes to the grader's output
// location with a plain copy: no drawing, no clock, no network, so the
// result is identical on every run.

import fs from "node:fs";
import path from "node:path";
import url from "node:url";

const repoDir = path.dirname(url.fileURLToPath(import.meta.url));
const source = path.join(repoDir, "entry.png");

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
fs.mkdirSync(outDir, { recursive: true });
const target = path.join(outDir, "entry.png");
fs.copyFileSync(source, target);

// A short copy would hand the judge a broken picture, so verify the byte
// count matches the source exactly and fail loudly if it does not.
const sourceBytes = fs.statSync(source).size;
const targetBytes = fs.statSync(target).size;
if (targetBytes !== sourceBytes) {
  throw new Error(`incomplete copy: ${targetBytes} of ${sourceBytes} bytes`);
}
console.log(`wrote ${target} (${targetBytes} bytes)`);
