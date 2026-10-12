import { NextResponse } from "next/server";
import { addSupportMember } from "../../../lib/db";
import { isValidEmailFormat } from "../../../lib/validation";
import { dispatchSupportNotifications } from "../../../lib/notifications";

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    const parsed: unknown = await request.json();
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return NextResponse.json({ success: false, error: "Requête invalide." }, { status: 400 });
    }
    body = parsed as Record<string, unknown>;
  } catch {
    return NextResponse.json({ success: false, error: "Requête invalide." }, { status: 400 });
  }

  try {
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";

    if (!name || name.length < 2) {
      return NextResponse.json(
        { success: false, error: "Le nom doit comporter au moins 2 caractères." },
        { status: 400 }
      );
    }

    if (!isValidEmailFormat(email)) {
      return NextResponse.json(
        { success: false, error: "Adresse email invalide." },
        { status: 400 }
      );
    }

    const result = await addSupportMember(name, email);
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error || "Erreur d'enregistrement." },
        { status: result.errorCode === "unavailable" ? 503 : 400 }
      );
    }

    // Envoi des alertes Telegram et Google Sheets en arrière-plan sans bloquer
    void dispatchSupportNotifications({ name, email });

    return NextResponse.json({
      success: true,
      message: "Bienvenue dans le comité de soutien officiel !",
    });
  } catch (err) {
    console.error("POST /api/support error:", err);
    return NextResponse.json(
      { success: false, error: "Service d'enregistrement momentanément indisponible." },
      { status: 503 }
    );
  }
}
