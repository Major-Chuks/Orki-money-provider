"use client";

import React, { useState } from "react";
import { apiManifest } from "@/services/apiConfig/apiManifest";
import { apiModules } from "@/services/apiConfig/apiModules";

/* eslint-disable @typescript-eslint/no-explicit-any */

type ApiModules = typeof apiModules;
type ApiKey = keyof ApiModules;

interface EndpointArg {
  name: string;
  isOptional: boolean;
  isObject?: boolean;
  properties?: {
    name: string;
    isOptional: boolean;
  }[];
}

interface EndpointInfo {
  apiKey: ApiKey;
  fnName: string;
  args: EndpointArg[];
}

type ParamsState = {
  [key: string]: {
    [key: string]: any;
  };
};

const TestEndpointsPage = () => {
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<string | null>(null);
  const [params, setParams] = useState<ParamsState>({});

  const getEndpoints = (): EndpointInfo[] => {
    const endpoints: EndpointInfo[] = [];

    for (const apiKey in apiModules) {
      const mod = apiModules[apiKey as ApiKey];
      const detailedMod = (apiManifest as Record<string, any>)[apiKey] || {};

      const fnNames = Object.keys(mod) as string[];
      for (const fnName of fnNames) {
        if (
          typeof mod[fnName as keyof typeof mod] === "function" &&
          fnName.startsWith("get_")
        ) {
          endpoints.push({
            apiKey: apiKey as ApiKey,
            fnName: fnName,
            args: detailedMod[fnName]?.args || [],
          });
        }
      }
    }

    return endpoints;
  };

  const tryParse = (value: string) => {
    try {
      return JSON.parse(value);
    } catch {
      return value;
    }
  };

  const handleParamChange = (
    apiKey: string,
    fnName: string,
    paramName: string,
    value: string
  ) => {
    setParams((prev) => ({
      ...prev,
      [`${apiKey}.${fnName}`]: {
        ...prev[`${apiKey}.${fnName}`],
        [paramName]: tryParse(value),
      },
    }));
  };

  const handleClick = async (
    apiKey: ApiKey,
    fnName: string,
    endpointArgs: EndpointArg[]
  ) => {
    setResult(null);
    setError(null);
    setLoading(`${apiKey}.${fnName}`);

    try {
      const currentParams = params[`${apiKey}.${fnName}`] || {};
      const _module = apiModules[apiKey];
      const fn = _module[fnName as keyof typeof _module] as (
        ...args: any[]
      ) => Promise<any>;

      let args: any[] = [];

      if (
        endpointArgs.length === 1 &&
        endpointArgs[0].isObject &&
        Array.isArray(endpointArgs[0].properties)
      ) {
        const payload: Record<string, any> = {};
        const props = endpointArgs[0].properties;

        for (const prop of props) {
          const value = currentParams[prop.name];
          if (value !== undefined && value !== "") {
            payload[prop.name] = value;
          } else if (!prop.isOptional) {
            throw new Error(`Missing required field: ${prop.name}`);
          }
        }

        args = [payload];
      } else {
        args = endpointArgs.map((arg) => {
          const value = currentParams[arg.name];
          if (value === undefined || value === "") {
            if (!arg.isOptional)
              throw new Error(`Missing required param: ${arg.name}`);
          }
          return value;
        });
      }

      const res = await fn(...args);
      const payload = res?.data?.data ?? res?.data ?? res;
      console.log({ payload, res });

      await fetch("/api/save-mock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ apiKey, fnName, data: payload }),
      });

      setResult(res);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Unknown error");
    } finally {
      setLoading(null);
    }
  };

  const endpoints = getEndpoints();

  return (
    <div style={{ padding: "2rem", width: "100%" }}>
      <h1>🧪 Test API Endpoints</h1>

      {endpoints.length === 0 && <p>No endpoints found. Check your imports.</p>}

      <main style={{ display: "flex", gap: "24px", marginTop: "24px" }}>
        <section style={{ flex: 1 }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "1rem",
            }}
          >
            {endpoints.map(({ apiKey, fnName, args }) => {
              const isLoading = loading === `${apiKey}.${fnName}`;
              const currentParams = params[`${apiKey}.${fnName}`] || {};
              const requiredFields = args.flatMap((arg) => {
                if (arg.isObject && Array.isArray((arg as any).properties)) {
                  return (arg as any).properties
                    .filter((p: any) => !p.isOptional)
                    .map((p: any) => p.name);
                } else if (!arg.isOptional) {
                  return [arg.name];
                } else {
                  return [];
                }
              });

              const allRequiredFilled = requiredFields.every((field) => {
                const value = currentParams[field];
                return value !== undefined && value !== "";
              });

              return (
                <div
                  key={`${apiKey}.${fnName}`}
                  style={{
                    border: "1px solid #eee",
                    padding: "1rem",
                    borderRadius: "4px",
                  }}
                >
                  <div style={{ marginBottom: "0.5rem", fontWeight: "bold" }}>
                    {apiKey}.{fnName}
                  </div>

                  {args.length > 0 && (
                    <div style={{ marginBottom: "0.5rem" }}>
                      {args.map((arg) => {
                        if (
                          arg.isObject &&
                          Array.isArray((arg as any).properties)
                        ) {
                          return (arg as any).properties.map((prop: any) => (
                            <div
                              key={prop.name}
                              style={{ marginBottom: "0.5rem" }}
                            >
                              <label
                                style={{
                                  display: "block",
                                  marginBottom: "0.25rem",
                                }}
                              >
                                {prop.name} {prop.isOptional && "(optional)"}
                              </label>
                              <input
                                type="text"
                                value={currentParams[prop.name] ?? ""}
                                onChange={(e) =>
                                  handleParamChange(
                                    apiKey,
                                    fnName,
                                    prop.name,
                                    e.target.value
                                  )
                                }
                                style={{ padding: "0.5rem", width: "100%" }}
                                placeholder={
                                  prop.isOptional ? "Optional" : "Required"
                                }
                              />
                            </div>
                          ));
                        }

                        return (
                          <div
                            key={arg.name}
                            style={{ marginBottom: "0.5rem" }}
                          >
                            <label
                              style={{
                                display: "block",
                                marginBottom: "0.25rem",
                              }}
                            >
                              {arg.name} {arg.isOptional && "(optional)"}
                            </label>
                            <input
                              type="text"
                              value={currentParams[arg.name] ?? ""}
                              onChange={(e) =>
                                handleParamChange(
                                  apiKey,
                                  fnName,
                                  arg.name,
                                  e.target.value
                                )
                              }
                              style={{ padding: "0.5rem", width: "100%" }}
                              placeholder={
                                arg.isOptional ? "Optional" : "Required"
                              }
                            />
                          </div>
                        );
                      })}
                    </div>
                  )}

                  <button
                    onClick={() => handleClick(apiKey, fnName, args)}
                    disabled={isLoading || !allRequiredFilled}
                    style={{
                      backgroundColor: isLoading
                        ? "#ccc"
                        : !allRequiredFilled && !allRequiredFilled
                        ? "#ffcccc"
                        : "#0070f3",
                      color: "white",
                      padding: "0.5rem 1rem",
                      border: "none",
                      borderRadius: "4px",
                      cursor:
                        isLoading || (!allRequiredFilled && !allRequiredFilled)
                          ? "not-allowed"
                          : "pointer",
                      width: "100%",
                    }}
                  >
                    {isLoading ? "Loading..." : "Test Endpoint"}
                  </button>
                </div>
              );
            })}
          </div>
        </section>

        <section style={{ width: "400px", position: "sticky", top: "1rem" }}>
          {error && (
            <div style={{ color: "red", marginBottom: "1rem" }}>
              <strong>Error:</strong> {error}
            </div>
          )}

          {result && (
            <pre
              style={{
                background: "#f0f0f0",
                padding: "1rem",
                overflowY: "auto",
                maxHeight: "calc(100vh - 4rem)",
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
              }}
            >
              {JSON.stringify(result, null, 2)}
            </pre>
          )}
        </section>
      </main>
    </div>
  );
};

export default TestEndpointsPage;
