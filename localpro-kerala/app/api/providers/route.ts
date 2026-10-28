import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL;

const MOCK_PROVIDERS = [
  {
    id: "P001",
    name: "Rahul Electricals",
    category: "Electrical",
    service: "Electrical Repairs",
    location: "Kochi, Kerala",
    phone: "+91 9876543210",
    rating: 4.8,
    experience: "10 years",
    status: "active"
  },
  {
    id: "P002",
    name: "CleanPro Services",
    category: "Cleaning",
    service: "Home Cleaning",
    location: "Thiruvananthapuram, Kerala",
    phone: "+91 9876543211",
    rating: 4.9,
    experience: "8 years",
    status: "active"
  },
  {
    id: "P003",
    name: "AquaFix Plumbers",
    category: "Plumbing",
    service: "Plumbing & Repairs",
    location: "Kozhikode, Kerala",
    phone: "+91 9876543212",
    rating: 4.7,
    experience: "12 years",
    status: "active"
  }
];

export async function GET(request: NextRequest) {
  try {
    if (!API_URL) {
      return NextResponse.json({ success: true, data: MOCK_PROVIDERS, count: MOCK_PROVIDERS.length });
    }

    const { searchParams } = new URL(request.url);
    const url = new URL(API_URL);
    
    if (searchParams.has("action")) {
      const action = searchParams.get("action")!;
      // Your script might expect different action names
      url.searchParams.append("action", action);
    } else {
      url.searchParams.append("action", "providers");
    }
    
    searchParams.forEach((value, key) => {
      if (key !== "action") {
        url.searchParams.append(key, value);
      }
    });

    const res = await fetch(url.toString(), { cache: "no-store" });
    const data = await res.json();
    
    // Normalize different response shapes
    if (data.success && Array.isArray(data.providers)) {
      return NextResponse.json({ success: true, data: data.providers });
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
