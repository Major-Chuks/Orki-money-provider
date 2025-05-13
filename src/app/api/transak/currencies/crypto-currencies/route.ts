/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import axios from "axios";

// Define the type of the API response (optional, for better typing)
interface CryptoCurrency {
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
    const { data } = await axios.get<CryptoCurrency[]>(
      "https://api-stg.transak.com/api/v2/currencies/crypto-currencies",
      options
    );

    // Return the JSON response
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { message: "Failed to fetch crypto currencies", error: error.message },
      { status: error.response?.status || 500 }
    );
  }
}
