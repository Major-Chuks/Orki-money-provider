/* eslint-disable @typescript-eslint/no-require-imports */
const ts = require("typescript");
const vm = require("vm");
const path = require("path");
const fs = require("fs");

// Load the API manifest
const tsFilePath = path.resolve(__dirname, "../src/services/apiConfig/apiManifest.ts");
const tsContent = fs.readFileSync(tsFilePath, "utf8");
const transpiled = ts.transpileModule(tsContent, {
  compilerOptions: { module: ts.ModuleKind.CommonJS },
}).outputText;

const sandbox = { exports: {} };
vm.createContext(sandbox);
vm.runInContext(transpiled, sandbox);
const apiManifest = sandbox.exports.apiManifest;

// Set up directories
const apiDir = path.join(__dirname, "../src/services/apis");
const queriesDir = path.join(__dirname, "../src/services/queryApis");

console.log("📁 API Directory:", apiDir);
console.log("📁 Queries Directory:", queriesDir);

// Clear the queryApis directory before generating new files
if (fs.existsSync(queriesDir)) {
  console.log("🧹 Cleaning up existing queryApis directory...");
  fs.readdirSync(queriesDir).forEach((file) => {
    fs.unlinkSync(path.join(queriesDir, file));
  });
} else {
  fs.mkdirSync(queriesDir, { recursive: true });
  console.log("📂 Created queries directory:", queriesDir);
}

if (!fs.existsSync(apiDir)) {
  console.error("❌ API directory not found:", apiDir);
  process.exit(1);
}

// Helper to get exported function names from API files
function getExportedFunctionNames(filePath) {
  const fileContent = fs.readFileSync(filePath, "utf8");
  const sourceFile = ts.createSourceFile(filePath, fileContent, ts.ScriptTarget.Latest, true);
  const functionNames = new Set();

  function visit(node) {
    if (
      ts.isPropertyAssignment(node) &&
      ts.isIdentifier(node.name) &&
      ts.isFunctionLike(node.initializer)
    ) {
      functionNames.add(node.name.text);
    }
    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  return [...functionNames];
}

// Generate hook content for a method
function toHookContent(methodName, args, moduleName) {
  const isQuery = methodName.startsWith("get_");
  const hookName = `use${methodName
    .split("_")
    .slice(1) // Remove the method prefix
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("")}${isQuery ? "Query" : "Mutation"}`;

  if (isQuery) {
    if (args.length > 0) {
      const paramsType = toTypeString(args[0]);
      return `export const ${hookName} = (params: ${paramsType}) =>
  useApiQuery(["${methodName}"], () =>
    ${moduleName}Api.${methodName}(params)
  );`;
    } else {
      return `export const ${hookName} = () =>
  useApiQuery(["${methodName}"], ${moduleName}Api.${methodName});`;
    }
  } else {
    return `export const ${hookName} = () =>
  useApiMutation(${moduleName}Api.${methodName});`;
  }
}

// Convert parameter info to type string
function toTypeString(param) {
  if (param.type) return param.type;
  if (param.isObject && param.properties) {
    const props = param.properties
      .map((prop) => {
        const propType =
          prop.type === "number | undefined"
            ? "number"
            : prop.type === "string | undefined"
              ? "string"
              : prop.type || "any";
        return `${prop.name}${prop.isOptional ? "?" : ""}: ${propType}`;
      })
      .join("; ");
    return `{ ${props} }`;
  }
  return "any";
}

// Generate query files for each API module
function generateQueryFiles() {
  const allApiFiles = fs
    .readdirSync(apiDir)
    .filter((file) => file.endsWith(".ts") && file !== "index.ts");

  // First create the index.ts file
  const indexContent = `import { useMutation, useQuery } from "@tanstack/react-query";

// Generic mutation hook
export const useApiMutation = <TData, TVariables>(
  mutationFn: (data: TVariables) => Promise<TData | undefined>
) =>
  useMutation<TData | undefined, unknown, TVariables>({
    mutationFn,
  });

// Generic query hook
export const useApiQuery = <TData>(
  queryKey: string[],
  queryFn: () => Promise<TData | undefined>
) =>
  useQuery<TData | undefined>({
    queryKey,
    queryFn,
  });

// Export all generated query hooks
${allApiFiles
  .map((file) => {
    const moduleName = path.basename(file, ".ts");
    return `export * from "./use${moduleName.charAt(0).toUpperCase() + moduleName.slice(1)}Queries";`;
  })
  .join("\n")}
`;

  fs.writeFileSync(path.join(queriesDir, "index.ts"), indexContent);
  console.log("✅ Generated index.ts");

  // Then generate individual query files
  allApiFiles.forEach((file) => {
    const moduleName = path.basename(file, ".ts");
    const fullPath = path.join(apiDir, file);
    const functionNames = getExportedFunctionNames(fullPath);

    const queryFilePath = path.join(
      queriesDir,
      `use${moduleName.charAt(0).toUpperCase() + moduleName.slice(1)}Queries.ts`
    );
    const hooks = [];
    const usedHooks = {
      query: false,
      mutation: false,
    };

    // Generate hooks content first
    const hookContents = [];
    functionNames.forEach((methodName) => {
      const methodManifest = apiManifest?.[moduleName]?.[methodName];
      if (!methodManifest) return;

      const isQuery = methodName.startsWith("get_");
      if (isQuery) {
        usedHooks.query = true;
      } else {
        usedHooks.mutation = true;
      }

      hookContents.push(toHookContent(methodName, methodManifest.args, moduleName));
    });

    // Add imports based on what's actually used
    hooks.push(`import { ${moduleName}Api } from "../apis/${moduleName}";`);

    const imports = [];
    if (usedHooks.query) imports.push("useApiQuery");
    if (usedHooks.mutation) imports.push("useApiMutation");

    if (imports.length > 0) {
      hooks.push(`import { ${imports.join(", ")} } from ".";`);
    }
    hooks.push("");

    // Add the hook contents
    hooks.push(...hookContents);

    const fileContent = `// Generated file - DO NOT EDIT
// This file contains React Query hooks for ${moduleName} API

${hooks.join("\n\n")}
`;

    fs.writeFileSync(queryFilePath, fileContent, "utf8");
    console.log(
      `✅ Generated: use${moduleName.charAt(0).toUpperCase() + moduleName.slice(1)}Queries.ts`
    );
  });
}

generateQueryFiles();
