import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
  try {
    //api.ipify.org?format=json

    const ipInfoApiKey = process.env.IP_INFO_API_KEY;

    // Get the user's IP address
    const {
      data: { ip },
    } = await axios.get("https://api.ipify.org/?format=json");

    // Get the geolocation
    const { data } = await axios.get(
      `https://ipinfo.io/${ip}/json?token=${ipInfoApiKey}`
    );

    // Return the JSON response
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { message: "Failed to fetch user location", error: error.message },
      { status: error.response?.status || 500 }
    );
  }
}
