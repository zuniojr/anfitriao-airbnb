import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

function fixRuntime(dir) {
  let entries;
  try { entries = readdirSync(dir, { withFileTypes: true }); } catch { return; }
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      fixRuntime(fullPath);
    } else if (entry.name === ".vc-config.json") {
      const content = readFileSync(fullPath, "utf-8");
      const fixed = content.replace(/nodejs18\.x/g, "nodejs22.x");
      if (fixed !== content) {
        writeFileSync(fullPath, fixed);
        console.log("Fixed runtime:", fullPath);
      }
    }
  }
}

fixRuntime(".vercel/output");
console.log("Runtime fix complete.");

