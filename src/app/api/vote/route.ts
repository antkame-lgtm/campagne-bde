import { NextResponse } from "next/server";
import crypto from "crypto";

// Registre mémoire des votes (en attendant les clés Supabase)
const votesRegistry = new Set<string>(); // Set of "ideaId:emailHash"

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { ideaId, email } = body;

    if (!ideaId) {
      return NextResponse.json(
        { success: false, error: "Identifiant de proposition manquant." },
        { status: 400 }
      );
    }

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { success: false, error: "Email universitaire requis pour certifier votre vote." },
        { status: 400 }
      );
    }

    const emailHash = crypto.createHash("sha256").update(email.trim().toLowerCase()).digest("hex");
    const voteKey = `${ideaId}:${emailHash}`;

    if (votesRegistry.has(voteKey)) {
      // Retrait du vote
      votesRegistry.delete(voteKey);
      return NextResponse.json({
        success: true,
        action: "unvoted",
        message: "Vote retiré.",
      });
    } else {
      // Ajout du vote
      votesRegistry.add(voteKey);
      return NextResponse.json({
        success: true,
        action: "voted",
        message: "Vote comptabilisé avec succès !",
      });
    }
  } catch (err) {
    return NextResponse.json(
      { success: false, error: "Erreur serveur lors de la prise en compte du vote." },
      { status: 500 }
    );
  }
}
