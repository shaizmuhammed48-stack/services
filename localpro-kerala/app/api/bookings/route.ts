import { NextRequest, NextResponse } from "next/server";
import { bookingSchema } from "@/lib/validation/booking";

const API_URL = process.env.NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL;

const MOCK_BOOKINGS = [
  { id: "BK001", customername: "John Doe", customerphone: "+91 9999999999", providerid: "P001", servicerequest: "Electrical repair", status: "pending", createdat: new Date().toISOString() }
];

export async function GET(request: NextRequest) {
  try {
    if (!API_URL) {
      return NextResponse.json({ success: true, data: MOCK_BOOKINGS, count: MOCK_BOOKINGS.length });
    }

    const { searchParams } = new URL(request.url);
    const url = new URL(API_URL);
    
    if (searchParams.has("action")) {
      url.searchParams.append("action", searchParams.get("action")!);
    } else {
      url.searchParams.append("action", "bookings");
    }

    searchParams.forEach((value, key) => {
      if (key !== "action") {
        url.searchParams.append(key, value);
      }
    });

    const res = await fetch(url.toString(), { cache: "no-store" });
    const data = await res.json();
    
    if (data.success && Array.isArray(data.bookings)) {
      return NextResponse.json({ success: true, data: data.bookings });
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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Try validation if schema exists, but be lenient for different field names
    const validation = bookingSchema.safeParse(body);
    const validatedData = validation.success ? validation.data : body;

    if (!API_URL) {
      return NextResponse.json({ success: true, message: "Booking submitted (demo mode)", bookingId: "BK" + Date.now().toString().slice(-6) });
    }

    const payload = {
      action: "addBooking",
      providerId: validatedData.providerId || validatedData.providerid || validatedData.prId || validatedData.prid || body.providerId,
      message: validatedData.message || validatedData.serviceRequest || validatedData.service_request || validatedData.description || body.message || "",
      "start time": validatedData.startTime || validatedData.start_time || validatedData.preferredTime || body.startTime || body.start_time || "",
      "end time": validatedData.endTime || validatedData.end_time || body.endTime || body.end_time || "",
      status: validatedData.status || body.status || "pending",
      "payment status": validatedData.paymentStatus || validatedData.payment_status || body.paymentStatus || body.payment_status || "unpaid",
    };

    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { error: true, message: error.message },
      { status: 500 }
    );
  }
}
