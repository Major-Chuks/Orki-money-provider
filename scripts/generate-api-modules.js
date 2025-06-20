/* eslint-disable @typescript-eslint/no-require-imports */
// scripts/generate-api-manifest.js

const fs = require("fs");
const path = require("path");

const apiDir = path.resolve(__dirname, "../src/services/apis");
const apiConfigDir = path.resolve(__dirname, "../src/services/apiConfig");
const manifestPath = path.resolve(apiConfigDir, "apiModules.ts");

// Create apiConfig directory if it doesn't exist
if (!fs.existsSync(apiConfigDir)) {
  fs.mkdirSync(apiConfigDir, { recursive: true });
  console.log(`📁 Created directory: ${apiConfigDir}`);
}

const files = fs.readdirSync(apiDir).filter((f) => f.endsWith(".ts") && f !== "index.ts");

const imports = files
  .map((file) => {
    const name = file.replace(".ts", "");
    const varName = `${name}Api`;
    return `import { ${varName} } from '../apis/${name}';`;
  })
  .join("\n");

const exportBlock = files
  .map((file) => {
    const name = file.replace(".ts", "");
    const varName = `${name}Api`;
    return `  '${name}': ${varName},`;
  })
  .join("\n");

const content = `
// This file is auto-generated. Do not edit manually.

${imports}

export const apiModules = {
${exportBlock}
};
`;

fs.writeFileSync(manifestPath, content.trim() + "\n");
console.log("✅ apiModules.ts generated!");
