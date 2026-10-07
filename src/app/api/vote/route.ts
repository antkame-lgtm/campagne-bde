import { NextResponse } from "next/server";
import { validateVoteSubmission } from "../../../lib/validation";
import { hashStudentEmail, createVoteKey } from "../../../lib/security";

// Registre mémoire anti-fraude : Set de "ideaId:emailHash"
const votesRegistry = new Set<string>();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = validateVoteSubmission(body);

    if (!validation.valid || !validation.ideaId || !validation.email) {
      return NextResponse.json(
        { success: false, error: validation.error },
        { status: 400 }
      );
    }

    const { ideaId, email } = validation;
    const emailHash = hashStudentEmail(email);
    const voteKey = createVoteKey(ideaId, emailHash);

    if (votesRegistry.has(voteKey)) {
      // Toggle : Retrait du vote
      votesRegistry.delete(voteKey);
      return NextResponse.json({
        success: true,
        action: "unvoted",
        message: "Vote retiré.",
      });
    } else {
      // Toggle : Enregistrement du vote certifié
      votesRegistry.add(voteKey);
      return NextResponse.json({
        success: true,
        action: "voted",
        message: "Vote comptabilisé avec succès !",
      });
    }
  } catch {
    return NextResponse.json(
      { success: false, error: "Requête invalide." },
      { status: 400 }
    );
  }
}
