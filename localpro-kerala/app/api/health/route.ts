import { NextResponse } from "next/server";

export async function GET() {
  const apiUrl = process.env.NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL;
  
  return NextResponse.json({
    status: "ok",
    app: "LocalPro Kerala",
    timestamp: new Date().toISOString(),
    configured: !!apiUrl,
    message: apiUrl 
      ? "API URL configured. Test connectivity to Google Apps Script."
      : "API URL not configured. Set NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL in environment variables."
  });
}
