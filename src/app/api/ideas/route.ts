import { NextResponse } from "next/server";
import { getAllIdeas, createIdea } from "../../../lib/db";
import { dispatchIdeaNotifications } from "../../../lib/notifications";

export async function GET() {
  // Les suggestions sont désormais strictement confidentielles et ne sont plus exposées publiquement
  return NextResponse.json({
    success: true,
    data: [],
  });
}

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
    const result = await createIdea(body);

    if (!result.success || !result.idea) {
      return NextResponse.json(
        { success: false, error: result.error || "Échec de validation de la proposition." },
        { status: result.errorCode === "unavailable" ? 503 : 400 }
      );
    }

    // Envoi des alertes privées Telegram et Google Sheets en arrière-plan
    void dispatchIdeaNotifications({
      title: result.idea.title,
      description: result.idea.description,
      category: result.idea.category,
      author: result.idea.author,
      email: typeof body.email === "string" ? body.email : undefined,
      isAnonymous: Boolean(body.isAnonymous),
    });

    return NextResponse.json(
      {
        success: true,
        message: "Proposition enregistrée avec succès !",
        data: result.idea,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("POST /api/ideas error:", err);
    return NextResponse.json(
      { success: false, error: "Service d'enregistrement momentanément indisponible." },
      { status: 503 }
    );
  }
}
