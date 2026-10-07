import { NextResponse } from "next/server";
import { INITIAL_IDEAS, StudentIdea } from "../../../data/mockData";
import crypto from "crypto";

// Stockage mémoire en fallback si Supabase n'est pas encore configuré
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
    const { title, description, category, author, isAnonymous, email } = body;

    // Validation stricte
    if (!title || title.trim().length < 5) {
      return NextResponse.json(
        { success: false, error: "Le titre doit comporter au moins 5 caractères." },
        { status: 400 }
      );
    }

    if (!description || description.trim().length < 10) {
      return NextResponse.json(
        { success: false, error: "La description doit comporter au moins 10 caractères." },
        { status: 400 }
      );
    }

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { success: false, error: "Un email universitaire valide est requis pour certifier la soumission." },
        { status: 400 }
      );
    }

    // Anonymisation cryptographique SHA-256 de l'email
    const emailHash = crypto.createHash("sha256").update(email.trim().toLowerCase()).digest("hex");

    const newIdea: StudentIdea = {
      id: `idea-${Date.now()}`,
      title: title.trim(),
      description: description.trim(),
      category: category || "Vie Pratique",
      author: isAnonymous ? "Anonyme" : (author?.trim() || "Étudiant"),
      votes: 1,
      status: "Pris en compte",
      createdAt: "À l'instant",
      hasVoted: true,
    };

    serverIdeas = [newIdea, ...serverIdeas];

    return NextResponse.json({
      success: true,
      message: "Idée enregistrée avec succès !",
      data: newIdea,
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: "Erreur lors du traitement de la requête." },
      { status: 500 }
    );
  }
}
