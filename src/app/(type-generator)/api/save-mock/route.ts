/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-restricted-syntax */
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import jsonToTS from "json-to-ts";
import path from "path";

export async function POST(req: NextRequest) {
  const { apiKey, fnName, data } = await req.json();

  if (!apiKey || !fnName || !data) {
    return NextResponse.json({ error: "Missing data" }, { status: 400 });
  }

  try {
    const baseDir = path.resolve(process.cwd(), "src/types/apis");
    const dir = path.join(baseDir, apiKey);

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const typePath = path.join(dir, `${fnName}.ts`);
    const mockPath = path.join(dir, `${fnName}.mock.json`);

    let skipInterfaceUpdate = false;
    let mockData: any = data?.data?.data ?? data;

    // 🔍 Check for sync-type-disable flag and override mock data source
    if (fs.existsSync(typePath)) {
      const existingContent = fs.readFileSync(typePath, "utf-8");
      skipInterfaceUpdate = existingContent.includes("/* sync-type-disable */");

      if (skipInterfaceUpdate) {
        mockData = generateMockFromInterface(existingContent);
      }
    }

    // 🧪 Always write mock file
    if (false) {
      fs.writeFileSync(mockPath, JSON.stringify(mockData, null, 2), "utf-8");
    }

    if (skipInterfaceUpdate) {
      return NextResponse.json({
        success: true,
        message: `Skipped updating ${fnName}.ts (/* sync-type-disable */ found), but updated mock based on it.`,
      });
    }

    // ✨ Generate TypeScript interfaces from fresh response
    function generateTypedInterfaces(data: any, baseName: string): string {
      const typeDefs = jsonToTS(data);
      const typeMap: Record<string, string> = {};

      const renamed = typeDefs.map((typeStr, i) => {
        const match = /^interface (\w+)/.exec(typeStr);
        if (!match) return typeStr;

        const originalName = match[1];
        const newName = i === 0 ? baseName : `${baseName}_Sub${i}`;
        typeMap[originalName] = newName;

        return typeStr.replace(
          `interface ${originalName}`,
          `${i === 0 ? "export " : ""}interface ${newName}`
        );
      });

      return renamed
        .join("\n\n")
        .replace(/\b\w+\b/g, (word) => typeMap[word] || word);
    }

    const typeName = `${fnName}`;
    const types = generateTypedInterfaces(mockData, typeName);
    fs.writeFileSync(typePath, types, "utf-8");

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Error saving mock/type:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// 🔧 Minimal parser to turn a TypeScript interface into mock data
function generateMockFromInterface(content: string): any {
  const mock: Record<string, any> = {};

  const interfaceMatch = content.match(/interface\s+\w+\s*{([^}]*)}/s);
  if (!interfaceMatch) return mock;

  const body = interfaceMatch[1];
  const lines = body
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  for (const line of lines) {
    const match = /^(\w+)\??:\s*([\w\[\]]+)/.exec(line);
    if (!match) continue;

    const [, name, type] = match;

    let value: any = null;
    if (type === "string") value = `mock_${name}`;
    else if (type === "number") value = 0;
    else if (type === "boolean") value = true;
    else if (type.endsWith("[]")) value = [];
    else value = null;

    mock[name] = value;
  }

  return mock;
}
