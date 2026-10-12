import { NextResponse } from "next/server";
import { requestOtpForEmail } from "../../../../lib/otp.ts";

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    const parsed: unknown = await request.json();
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return NextResponse.json({ success: false, error: "Requête invalide." }, { status: 400 });
    }
    body = parsed as Record<string, unknown>;
  } catch {
    return NextResponse.json({ success: false, error: "Format de requête invalide." }, { status: 400 });
  }

  try {
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";

    const result = await requestOtpForEmail(email);
    if (!result.success) {
      const status = result.errorCode === "rate_limited" ? 429 : result.errorCode === "unavailable" ? 503 : 400;
      return NextResponse.json({ success: false, error: result.error }, { status });
    }

    return NextResponse.json({
      success: true,
      message: result.message,
    });
  } catch (err) {
    console.error("POST /api/auth/send-otp error:", err);
    return NextResponse.json(
      { success: false, error: "Service de vérification momentanément indisponible." },
      { status: 503 }
    );
  }
}
