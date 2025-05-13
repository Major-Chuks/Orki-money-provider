/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url as string); // Parse the full URL

    // Extract all query parameters dynamically
    const queryParams: Record<string, string | null> = {};
    searchParams.forEach((value, key) => {
      queryParams[key] = value;
    });
    const queryString = new URLSearchParams(queryParams as any).toString();

    // Call the Transak API
    const { data } = await axios.get(
      `https://api-stg.transak.com/api/v1/pricing/public/quotes?${queryString}`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    // Return the Transak API response to the frontend
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      {
        message: "Failed to fetch quotes",
        error: error.message,
      },
      { status: error.response?.status || 500 }
    );
  }
}
