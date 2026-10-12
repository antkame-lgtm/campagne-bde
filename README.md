# Campagne BDE

Site de campagne avec programme, FAQ, comité de soutien et boîte à idées. La boîte à idées vérifie l'adresse institutionnelle par code avant d'enregistrer une proposition.

## Lancer en local

1. Installer Node.js, puis les dépendances avec `npm ci`.
2. Copier `.env.example` vers `.env.local` et renseigner les variables nécessaires.
3. Lancer `npm run dev`, puis ouvrir `http://localhost:3000`.

Le stockage JSON convient au développement local. Pour tester l'envoi d'un code, configurez une clé Resend et une adresse expéditeur issue d'un domaine vérifié chez Resend.

## Variables d'environnement

| Variable | Utilité |
| --- | --- |
| `STORAGE_ENGINE` | `json` en local ou `supabase` en production. La production refuse une valeur absente. |
| `SUPABASE_URL` | URL du projet Supabase (serveur). |
| `SUPABASE_SERVICE_ROLE_KEY` | Clé serveur secrète Supabase ; ne jamais la préfixer par `NEXT_PUBLIC_`. |
| `ALLOWED_EMAIL_DOMAINS` | Domaines institutionnels autorisés, séparés par des virgules. Obligatoire en production ; sans valeur, aucun domaine n'est accepté. |
| `EMAIL_HASH_SALT` | Sel aléatoire d'au moins 32 caractères utilisé pour les empreintes d'adresse. |
| `IDEA_SUBMISSION_TOKEN_SECRET` | Secret aléatoire d'au moins 32 caractères pour signer les autorisations de dépôt. |
| `RESEND_API_KEY` | Clé serveur Resend utilisée pour envoyer les codes OTP. |
| `RESEND_FROM_EMAIL` | Expéditeur autorisé par Resend, par exemple `Équipe BDE <noreply@votre-domaine.fr>`. |
| `NEXT_PUBLIC_WHATSAPP_LINK` | Lien réel du groupe ou du contact WhatsApp de campagne. |
| `DB_FILE` | Chemin facultatif du fichier JSON local. |

Les valeurs secrètes doivent être générées aléatoirement et configurées dans le gestionnaire de secrets de l'hébergeur. `.env.example` ne contient que des exemples.

## Supabase

Pour une nouvelle base, exécutez `supabase/schema.sql` dans l'éditeur SQL de Supabase. Les tables privées sont accessibles au serveur avec la clé `service_role`; les visiteurs ne peuvent lire que la vue publique des propositions approuvées. Les demandes OTP sont limitées à trois par adresse sur dix minutes.

Pour une base ayant déjà l'ancien système, exécutez `supabase/schema.sql`, puis `supabase/migrations/20261011_remove_voting.sql` avant de déployer la nouvelle version. La migration déplace l'ancienne table des votes vers le schéma privé et conserve les totaux et échéances dans `private.idea_voting_history`, puis retire les colonnes liées au vote. Elle ne supprime pas l'historique.

## Commandes

- `npm run dev` : serveur local
- `npm run lint` : analyse ESLint
- `npm test` : tests existants
