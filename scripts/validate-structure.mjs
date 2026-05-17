import { existsSync } from "node:fs";

const requiredPaths = [
  "apps/mobile",
  "apps/web",
  "services/api",
  "services/worker",
  "packages/shared-types",
  "infra/docker",
  "docs",
  "AGENTS.md",
  "DESIGN.md",
  "README.md",
  ".env.example",
  "docker-compose.yml",
];

const missing = requiredPaths.filter((path) => !existsSync(path));

if (missing.length > 0) {
  console.error("Missing required Linkrai Sprint 0 paths:");
  for (const path of missing) {
    console.error(`- ${path}`);
  }
  process.exit(1);
}

console.log("Linkrai Sprint 0 repository structure is valid.");
