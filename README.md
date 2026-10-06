# Plateforme Web de Campagne BDE - "Campus Uni & Connecté"

Portail web participatif pour la campagne électorale du BDE et le futur mandat étudiant.

---

## 👥 Guide de Collaboration en Binôme (Antigravity & Git)

### 1. Configuration du Dépôt GitHub / GitLab
1. **Création du repo :** L'un de vous crée un dépôt privé sur GitHub (ex: `bde-campagne-web`) et invite l'autre en collaborateur.
2. **Liaison locale :**
   ```bash
   git remote add origin https://github.com/VOTRE_USER/bde-campagne-web.git
   git branch -M main
   git push -u origin main
   ```
3. **Clonage par le binôme :** Le second développeur clone le dépôt sur sa machine et l'ouvre dans son Antigravity IDE.
4. **Alignement des agents :** Grâce au fichier `AGENTS.md` présent à la racine, vos deux agents Antigravity partagent automatiquement les mêmes consignes, règles et styles.

### 2. Répartition Recommandée des Tâches (4 Sprints / 9 Jours)

| Développeur A (Lead UI & Pages Publiques) | Développeur B (Lead Backend, Auth & Intéractivité) |
| :--- | :--- |
| **Branche :** `feature/ui-vitrine` | **Branche :** `feature/auth-database` |
| • Page d'Accueil (Hero, Compte à rebours, Manifeste) | • Schéma de base Supabase (Users, Idées, Votes, SOS) |
| • Espace Vision & Trombinoscope équipe | • Auth & vérification par email universitaire |
| • Programme interactif & Jauges d'avancement | • Moteur de la boîte à idées & système d'Upvotes (1 vote/user) |
| • Agenda & intégration Google/Apple Calendar | • Formulaire chiffré "SOS Étudiant" & Tutorat |
| • Catalogue partenaires & Bons plans | • Espace modération Admin & API routes |

---

## 🎨 Spécifications & Charte Graphique

- **Couleurs :**
  - Primaire : Bleu Royal `#1E3A8A`
  - Secondaire : Ambre / Orange `#F59E0B`
  - Accent : Bleu Ciel `#3B82F6`
  - Fond : `#FFFFFF` / `#F8FAFC`
  - Texte : `#334155`
- **Police :** `Inter`
- **Cahier des charges source :** [Cahier_des_Charges_BDE.pdf](Cahier_des_Charges_BDE.pdf)
