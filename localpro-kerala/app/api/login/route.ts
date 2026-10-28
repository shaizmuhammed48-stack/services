import { NextRequest, NextResponse } from "next/server";
import { userDetailsSchema } from "@/lib/validation/userDetails";

/**
 * User-details submission endpoint for the Login popup.
 *
 * There is currently NO user store in this project: no auth system exists
 * and the deployed Google Apps Script integration only exposes
 * providers/companies/bookings reads plus booking creation. Posting an
 * unrecognized action to that script could append garbage rows to the real
 * Bookings sheet, so we deliberately do NOT forward details to it blindly.
 *
 * To connect a real backend:
 * 1. Add a user-details action (e.g. a "Logins" tab) to the Apps Script, or
 *    point to another store, then
 * 2. Replace the NOT_CONFIGURED response below with the actual write and
 *    return success:true only once the store confirms it.
 */
const USER_STORE_CONFIGURED = false;

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, code: "INVALID_JSON", message: "Invalid request body." },
      { status: 400 }
    );
  }

  const parsed = userDetailsSchema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return NextResponse.json(
      {
        success: false,
        code: "VALIDATION",
        message: "Please check the highlighted fields.",
        fieldErrors,
      },
      { status: 400 }
    );
  }

  const { fullName, email } = parsed.data;

  if (!USER_STORE_CONFIGURED) {
    // Honest response: the details validated, but nothing was saved and the
    // user is NOT signed in. Never report success without a real backend.
    return NextResponse.json(
      {
        success: false,
        code: "NOT_CONFIGURED",
        message:
          "Your details look good, but this form isn't connected to a backend yet — nothing was saved and you're not signed in. Please try again later.",
      },
      { status: 501 }
    );
  }

  // Real submission flow (active once USER_STORE_CONFIGURED is enabled):
  // await storeUserDetails({ fullName, email, timestamp: new Date().toISOString() });
  return NextResponse.json({
    success: true,
    message: `Thanks, ${fullName}! Your details (${email}) were saved.`,
  });
}
