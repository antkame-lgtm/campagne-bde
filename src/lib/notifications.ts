export interface IdeaNotificationPayload {
  title: string;
  description: string;
  category: string;
  author: string;
  email?: string;
  isAnonymous?: boolean;
}

/**
 * Échappe les caractères réservés du Markdown Telegram (mode Markdown v1)
 */
function escapeTelegramMarkdown(text: string): string {
  return text.replace(/([_*`\[])/g, "\\$1");
}

/**
 * Requête fetch résiliente gérant les certificats locaux Windows / antivirus
 */
async function resilientFetch(url: string, options: RequestInit): Promise<Response> {
  try {
    return await fetch(url, options);
  } catch (err: any) {
    if (
      err?.cause?.code === "UNABLE_TO_VERIFY_LEAF_SIGNATURE" ||
      err?.message?.includes("unable to verify")
    ) {
      const prev = process.env.NODE_TLS_REJECT_UNAUTHORIZED;
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
      try {
        return await fetch(url, options);
      } finally {
        if (prev !== undefined) {
          process.env.NODE_TLS_REJECT_UNAUTHORIZED = prev;
        } else {
          delete process.env.NODE_TLS_REJECT_UNAUTHORIZED;
        }
      }
    }
    throw err;
  }
}

/**
 * Envoie une notification privée sur Telegram dès le dépôt d'une idée
 */
export async function sendTelegramNotification(payload: IdeaNotificationPayload): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return false;
  }

  const now = new Date().toLocaleString("fr-FR", {
    timeZone: "Africa/Abidjan",
    dateStyle: "medium",
    timeStyle: "short",
  });

  const authorDisplay = payload.isAnonymous
    ? `${escapeTelegramMarkdown(payload.author)} (Choix: Anonyme)`
    : escapeTelegramMarkdown(payload.author);

  const message = [
    "🗳️ *NOUVELLE SUGGESTION • BOÎTE À IDÉES*",
    "━━━━━━━━━━━━━━━━━━━━━━",
    `📌 *Titre :* ${escapeTelegramMarkdown(payload.title)}`,
    `📂 *Catégorie :* ${escapeTelegramMarkdown(payload.category)}`,
    `👤 *Auteur :* ${authorDisplay}`,
    `📧 *Email étudiant :* \`${escapeTelegramMarkdown(payload.email || "Non renseigné")}\``,
    "",
    "📝 *Détail de la proposition :*",
    escapeTelegramMarkdown(payload.description),
    "",
    `⏱ _Reçu le ${escapeTelegramMarkdown(now)}_`,
  ].join("\n");

  try {
    const url = `https://api.telegram.org/bot${token}/sendMessage`;
    const response = await resilientFetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: "Markdown",
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.warn("Échec d'envoi Telegram:", response.status, errText);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Erreur réseau notification Telegram:", error);
    return false;
  }
}

/**
 * Enregistre la suggestion en temps réel dans un tableau Google Sheets via Webhook Apps Script
 */
export async function sendGoogleSheetsNotification(payload: IdeaNotificationPayload): Promise<boolean> {
  const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;

  if (!webhookUrl) {
    return false;
  }

  const now = new Date().toLocaleString("fr-FR", {
    timeZone: "Africa/Abidjan",
    dateStyle: "medium",
    timeStyle: "short",
  });

  try {
    const response = await resilientFetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        timestamp: new Date().toISOString(),
        date: now,
        title: payload.title,
        category: payload.category,
        description: payload.description,
        author: payload.author,
        email: payload.email || "",
        isAnonymous: payload.isAnonymous ? "Oui" : "Non",
      }),
    });

    if (!response.ok) {
      console.warn("Échec envoi Google Sheets:", response.status);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Erreur réseau Google Sheets Webhook:", error);
    return false;
  }
}

/**
 * Dispatche les notifications vers Telegram et Google Sheets en arrière-plan sans bloquer la réponse API
 */
export async function dispatchIdeaNotifications(payload: IdeaNotificationPayload): Promise<void> {
  await Promise.allSettled([
    sendTelegramNotification(payload),
    sendGoogleSheetsNotification(payload),
  ]);
}
