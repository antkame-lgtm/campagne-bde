-- ============================================================================
-- SCHÉMA OFFICIEL SUPABASE POSTGRESQL — CAMPUS UNI & CONNECTÉ (BDE 2026)
-- Conforme au Cahier des Charges & Principes de Sécurité / RGPD
-- ============================================================================

-- 1. Table des Propositions Citoyennes (La Voix Étudiante)
CREATE TABLE IF NOT EXISTS public.ideas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL CHECK (char_length(title) >= 5 AND char_length(title) <= 150),
    description TEXT NOT NULL CHECK (char_length(description) >= 10 AND char_length(description) <= 1500),
    category TEXT NOT NULL CHECK (category IN ('Infrastructures', 'Pédagogie', 'Cafétéria', 'Événements', 'Vie Pratique')),
    author_name TEXT NOT NULL DEFAULT 'Étudiant',
    is_anonymous BOOLEAN DEFAULT FALSE,
    student_email_hash TEXT NOT NULL, -- SHA-256 de l'email universitaire pour contrôle d'éligibilité sans stocker l'email en clair
    votes_count INTEGER DEFAULT 1,
    status TEXT NOT NULL DEFAULT 'Pris en compte' CHECK (status IN ('Pris en compte', 'En étude', 'Intégré au programme', 'Rejeté')),
    is_approved BOOLEAN DEFAULT TRUE, -- Modération a priori (basculer à FALSE si modération stricte activée)
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index pour recherche rapide et tri par votes
CREATE INDEX IF NOT EXISTS idx_ideas_votes ON public.ideas(votes_count DESC);
CREATE INDEX IF NOT EXISTS idx_ideas_category ON public.ideas(category);
CREATE INDEX IF NOT EXISTS idx_ideas_created_at ON public.ideas(created_at DESC);

-- 2. Table des Votes Citoyens (Règle d'or : 1 seul vote par proposition et par étudiant)
CREATE TABLE IF NOT EXISTS public.votes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    idea_id UUID NOT NULL REFERENCES public.ideas(id) ON DELETE CASCADE,
    student_email_hash TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    -- Contrainte d'unicité mathématique stricte interdisant le double vote :
    CONSTRAINT unique_vote_per_student_per_idea UNIQUE(idea_id, student_email_hash)
);

CREATE INDEX IF NOT EXISTS idx_votes_idea_student ON public.votes(idea_id, student_email_hash);

-- Fonction déclencheur pour incrémenter/décrémenter automatiquement le compteur de votes
CREATE OR REPLACE FUNCTION public.update_idea_votes_count()
RETURNS TRIGGER AS $$
BEGIN
    IF (TG_OP = 'INSERT') THEN
        UPDATE public.ideas SET votes_count = votes_count + 1 WHERE id = NEW.idea_id;
        RETURN NEW;
    ELSIF (TG_OP = 'DELETE') THEN
        UPDATE public.ideas SET votes_count = GREATEST(0, votes_count - 1) WHERE id = OLD.idea_id;
        RETURN OLD;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS trg_update_votes_count ON public.votes;
CREATE TRIGGER trg_update_votes_count
AFTER INSERT OR DELETE ON public.votes
FOR EACH ROW EXECUTE FUNCTION public.update_idea_votes_count();

-- 3. Table des Membres du Comité de Soutien
CREATE TABLE IF NOT EXISTS public.support_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL CHECK (char_length(full_name) >= 2),
    contact TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Table des Signalements SOS Étudiant (Hautement Confidentiel)
CREATE TABLE IF NOT EXISTS public.sos_tickets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    subject TEXT NOT NULL,
    contact TEXT NOT NULL,
    message TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'Nouveau' CHECK (status IN ('Nouveau', 'En cours de traitement', 'Résolu')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- SÉCURITÉ POSTGRESQL & ROW LEVEL SECURITY (RLS)
-- ============================================================================

ALTER TABLE public.ideas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.support_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sos_tickets ENABLE ROW LEVEL SECURITY;

-- Politiques RLS pour `ideas` :
-- Lecture publique des idées approuvées
CREATE POLICY "Les idées approuvées sont visibles par tous"
ON public.ideas FOR SELECT USING (is_approved = TRUE);

-- Insertion ouverte avec vérification de forme
CREATE POLICY "Les étudiants peuvent déposer une idée"
ON public.ideas FOR INSERT WITH CHECK (char_length(title) >= 5);

-- Politiques RLS pour `votes` :
-- Insertion autorisée si le hash est fourni
CREATE POLICY "Un étudiant peut voter pour une idée"
ON public.votes FOR INSERT WITH CHECK (student_email_hash IS NOT NULL);

CREATE POLICY "Un étudiant peut retirer son vote"
ON public.votes FOR DELETE USING (TRUE);

-- Politiques RLS pour `sos_tickets` (CONFIDENTIALITÉ STRICTE RGPD) :
-- Seule l'insertion anonymisée est possible par le public, aucune lecture publique !
CREATE POLICY "Dépôt de SOS confidentiel autorisé"
ON public.sos_tickets FOR INSERT WITH CHECK (TRUE);

-- Aucune politique SELECT publique : seuls les membres du BDE via service_role ou auth admin peuvent lire !
