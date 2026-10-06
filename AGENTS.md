# Directives Agent - Plateforme "Campus Uni & Connecté" (BDE)

Directives communes pour les instances Antigravity des deux développeurs travaillant sur le projet.

## 1. Contexte & Objectif
Plateforme web participative de campagne électorale et de mandat pour la présidence du BDE.
Mobile-first (85%+ des visites), responsive, rapide (< 1.5s sur 4G), accessible et sécurisée (RGPD).

## 2. Stack Technique Retenue
- **Framework Frontend :** Next.js 14+ (App Router) + TypeScript + Tailwind CSS
- **Composants & Icônes :** Lucide-react + Radix UI / shadcn/ui
- **Backend & Données :** Supabase (PostgreSQL, Auth, Realtime) ou Firebase
- **Déploiement :** Vercel

## 3. Charte Graphique & Design Tokens
Respect strict de la palette définie au cahier des charges :
- **Primaire (Institutionnel) :** Bleu Royal / Navy `#1E3A8A`
- **Secondaire (Dynamisme) :** Orange Chaud / Ambre `#F59E0B`
- **Accent :** Bleu Ciel `#3B82F6`
- **Surfaces :** Blanc `#FFFFFF` / Gris Perle `#F8FAFC`
- **Texte :** Ardoise Sombre `#334155`
- **Typographie :** Famille `Inter` (sans-serif)

## 4. Règles de Développement Multi-Développeurs
- **Modifications chirurgicales :** Travailler par branches isolées (`feature/<module>`).
- **Typage strict :** TypeScript sans `any`.
- **Validation des données :** Schémas Zod pour chaque formulaire (idées, SOS, comité de soutien).
- **Sécurité :** Chiffrement des formulaires SOS Étudiant, restriction du vote à 1 vote par étudiant vérifié.
