/* eslint-disable @typescript-eslint/no-require-imports */
// scripts/generate-api-detailed-manifest.ts

/* eslint-disable @typescript-eslint/no-explicit-any */
(() => {
  const fs = require("fs");
  const path = require("path");
  const { Project, SyntaxKind } = require("ts-morph");

  const apiDir = path.resolve(__dirname, "../src/services/apis");
  const manifestPath = path.resolve(__dirname, "../src/services/apiConfig/apiManifest.ts");

  const project = new Project({
    tsConfigFilePath: path.resolve(__dirname, "../tsconfig.json"),
  });

  const files = fs.readdirSync(apiDir).filter((f: string) => f.endsWith(".ts") && f !== "index.ts");

  console.log(`Found ${files.length} API files to process:`);
  files.forEach((f: string) => console.log(`- ${f}`));

  const apiManifest: Record<string, any> = {};

  // Helper function to extract parameter details
  const getParameterDetails = (param: any) => {
    const paramDetails = {
      name: param.getName(),
      isOptional: param.isOptional(),
    };

    // Try to get the type node for more detailed type information
    const typeNode = param.getTypeNode();
    if (typeNode) {
      // Check if it's an object type (like { limit?: number; page?: number; })
      if (typeNode.getKind() === SyntaxKind.TypeLiteral) {
        const properties = typeNode.getProperties().map((prop: any) => ({
          name: prop.getName(),
          isOptional: prop.hasQuestionToken(),
          type: prop.getType().getText(),
        }));
        return {
          ...paramDetails,
          isObject: true,
          properties,
        };
      }
      // Check if it's an interface or type reference
      else if (typeNode.getKind() === SyntaxKind.TypeReference) {
        return {
          ...paramDetails,
          type: typeNode.getText(),
        };
      }
    }

    return paramDetails;
  };

  for (const file of files) {
    const moduleName = file.replace(".ts", "");
    const filePath = path.join(apiDir, file);

    console.log(`\nProcessing ${moduleName}...`);

    try {
      const sourceFile = project.addSourceFileAtPath(filePath);
      const exports = sourceFile.getExportedDeclarations();
      const moduleExports: Record<string, any> = {};
      let exportCount = 0;

      for (const [exportName, declarations] of exports) {
        for (const declaration of declarations) {
          // Handle both direct function exports and object exports (like authApi)
          if (declaration.getKind() === SyntaxKind.VariableDeclaration) {
            const initializer = declaration.getInitializer();

            // Case 1: Exported object containing methods (like authApi)
            if (initializer && initializer.getKind() === SyntaxKind.ObjectLiteralExpression) {
              const properties = initializer.getProperties();

              for (const property of properties) {
                if (property.getKind() === SyntaxKind.PropertyAssignment) {
                  const methodName = property.getName();
                  const methodInitializer = property.getInitializer();

                  if (
                    methodInitializer &&
                    (methodInitializer.getKind() === SyntaxKind.ArrowFunction ||
                      methodInitializer.getKind() === SyntaxKind.FunctionExpression)
                  ) {
                    const params = methodInitializer.getParameters().map(getParameterDetails);
                    moduleExports[methodName] = { args: params };
                    exportCount++;
                    console.log(`  - Found method: ${methodName} with ${params.length} params`);
                  }
                }
              }
            }
            // Case 2: Direct function exports
            else if (
              initializer &&
              (initializer.getKind() === SyntaxKind.ArrowFunction ||
                initializer.getKind() === SyntaxKind.FunctionExpression)
            ) {
              const params = initializer.getParameters().map(getParameterDetails);
              moduleExports[exportName] = { args: params };
              exportCount++;
              console.log(`  - Found direct export: ${exportName} with ${params.length} params`);
            }
          }
          // Case 3: Direct function declarations
          else if (declaration.getKind() === SyntaxKind.FunctionDeclaration) {
            const params = declaration.getParameters().map(getParameterDetails);
            moduleExports[exportName] = { args: params };
            exportCount++;
            console.log(
              `  - Found function declaration: ${exportName} with ${params.length} params`
            );
          }
        }
      }

      if (exportCount > 0) {
        apiManifest[moduleName] = moduleExports;
        console.log(`✅ Processed ${exportCount} exports in ${moduleName}`);
      } else {
        console.log(`⚠️  No exported functions found in ${moduleName}`);
      }
    } catch (error) {
      console.error(`❌ Error processing ${filePath}:`, error);
    }
  }

  const output = `
// This file is auto-generated. Do not edit manually.

export interface ApiParameter {
  name: string;
  isOptional: boolean;
  type?: string;
  isObject?: boolean;
  properties?: Array<{
    name: string;
    isOptional: boolean;
    type: string;
  }>;
}

export interface ApiMethod {
  args: ApiParameter[];
}

export interface ApiManifest {
  [module: string]: {
    [method: string]: ApiMethod;
  };
}

export const apiManifest: ApiManifest = ${JSON.stringify(apiManifest, null, 2)};
`;

  fs.writeFileSync(manifestPath, output.trim() + "\n");
  console.log("\n✅ apiManifest.ts generated!");
  console.log(`Found ${Object.keys(apiManifest).length} modules with exports`);
})();
