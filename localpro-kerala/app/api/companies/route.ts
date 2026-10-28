import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL;

const MOCK_COMPANIES = [
  { id: "C001", name: "Kerala Home Solutions Pvt Ltd", category: "Home Services", location: "Kochi, Kerala", phone: "+91 4841234567", status: "active" },
  { id: "C002", name: "SmartFix Enterprises", category: "Maintenance", location: "Thiruvananthapuram, Kerala", phone: "+91 4711234567", status: "active" }
];

export async function GET(request: NextRequest) {
  try {
    if (!API_URL) {
      return NextResponse.json({ success: true, data: MOCK_COMPANIES, count: MOCK_COMPANIES.length });
    }

    const { searchParams } = new URL(request.url);
    const url = new URL(API_URL);
    
    if (searchParams.has("action")) {
      url.searchParams.append("action", searchParams.get("action")!);
    } else {
      url.searchParams.append("action", "companies");
    }

    searchParams.forEach((value, key) => {
      if (key !== "action") {
        url.searchParams.append(key, value);
      }
    });

    const res = await fetch(url.toString(), { cache: "no-store" });
    const data = await res.json();
    
    // Normalize different response shapes
    if (data.success && Array.isArray(data.companies)) {
      return NextResponse.json({ success: true, data: data.companies });
    }
    if (Array.isArray(data)) {
      return NextResponse.json({ success: true, data: data });
    }
    
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { error: true, message: error.message, data: [] },
      { status: 500 }
    );
  }
}
