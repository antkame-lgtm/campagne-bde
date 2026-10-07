import { NextResponse } from "next/server";
import { INITIAL_IDEAS, StudentIdea } from "../../../data/mockData";
import { validateIdeaSubmission } from "../../../lib/validation";
import { hashStudentEmail } from "../../../lib/security";

// Registre serveur en mémoire (fallback immédiat sans dépendre de Supabase distant)
let serverIdeas: StudentIdea[] = [...INITIAL_IDEAS];

export async function GET() {
  return NextResponse.json({
    success: true,
    data: serverIdeas,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = validateIdeaSubmission(body);

    if (!validation.valid || !validation.sanitized) {
      return NextResponse.json(
        { success: false, error: validation.error },
        { status: 400 }
      );
    }

    const { title, description, category, author, email } = validation.sanitized;
    const emailHash = hashStudentEmail(email);

    const newIdea: StudentIdea = {
      id: `idea-${Date.now()}-${emailHash.slice(0, 6)}`,
      title,
      description,
      category,
      author,
      votes: 1,
      status: "Pris en compte",
      createdAt: "À l'instant",
      hasVoted: true,
    };

    serverIdeas = [newIdea, ...serverIdeas];

    return NextResponse.json(
      {
        success: true,
        message: "Proposition enregistrée avec succès !",
        data: newIdea,
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { success: false, error: "Format de requête invalide." },
      { status: 400 }
    );
  }
}
