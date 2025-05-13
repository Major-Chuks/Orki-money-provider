/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import axios from "axios";

// Define the type of the API response (optional, for better typing)
interface FiatCurrency {
  currency: string;
  name: string;
  symbol: string;
  [key: string]: any; // Include additional fields
}

export async function GET() {
  try {
    const apiKey = process.env.TRANSAK_API_KEY || ""; // Secure API key in environment variables
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: apiKey ? `Bearer ${apiKey}` : undefined,
      },
    };

    // Fetch data from Transak API
    const { data } = await axios.get<FiatCurrency[]>(
      "https://api-stg.transak.com/api/v2/currencies/fiat-currencies",
      options
    );

    // Return the JSON response
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { message: "Failed to fetch fiat currencies", error: error.message },
      { status: error.response?.status || 500 }
    );
  }
}
