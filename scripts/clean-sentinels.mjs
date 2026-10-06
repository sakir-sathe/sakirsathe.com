// Removes the "__none" sentinel pages emitted when a collection has no published entries.
import { rmSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";
for (const dir of ["out/open-source", "out/writing"]) {
  if (!existsSync(dir)) continue;
  for (const f of readdirSync(dir)) if (f.startsWith("__none")) rmSync(join(dir, f), { recursive: true, force: true });
}
