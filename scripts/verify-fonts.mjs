// Fail the build if expected MonoLisa font files are missing locally.
// This helps ensure you never accidentally deploy without provisioning fonts in CI.
import { existsSync } from "node:fs";
import { exit } from "node:process";

const required = [
  "src/app/fonts/monolisa/monolisa-webfont-2025.8.21/woff2/0-normal.woff2",
  "src/app/fonts/monolisa/monolisa-webfont-2025.8.21/woff2/1-italic.woff2",
];

const missing = required.filter((p) => !existsSync(p));
if (missing.length) {
  console.error(
    "\n[verify-fonts] Missing required MonoLisa font files:\n" +
      missing.map((m) => ` - ${m}`).join("\n") +
      "\n\nProvision them in CI (e.g., from a private bucket) before building.\n"
  );
  exit(1);
} else {
  console.log("[verify-fonts] MonoLisa font files present.");
}

