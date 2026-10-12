-- Schéma Supabase de l'application BDE : propositions, soutien et OTP.
-- Pour une base déjà utilisée, exécuter aussi la migration
-- migrations/20261011_remove_voting.sql afin d'archiver l'ancien système.

CREATE TABLE IF NOT EXISTS public.ideas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL CHECK (char_length(title) BETWEEN 5 AND 120),
    description TEXT NOT NULL CHECK (char_length(description) BETWEEN 15 AND 1500),
    category TEXT NOT NULL CHECK (category IN (
        'Idée de projet', 'Activité souhaitée', 'Difficulté rencontrée', 'Suggestion BDE',
        'Infrastructures', 'Pédagogie', 'Cafétéria', 'Événements', 'Vie Pratique'
    )),
    author_name TEXT NOT NULL DEFAULT 'Étudiant',
    is_anonymous BOOLEAN NOT NULL DEFAULT FALSE,
    is_sample BOOLEAN NOT NULL DEFAULT FALSE,
    status TEXT NOT NULL DEFAULT 'Pris en compte'
        CHECK (status IN ('Pris en compte', 'En étude', 'Intégré au programme', 'Rejeté')),
    is_approved BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.ideas ADD COLUMN IF NOT EXISTS is_sample BOOLEAN NOT NULL DEFAULT FALSE;
ALTER TABLE public.ideas ADD COLUMN IF NOT EXISTS is_approved BOOLEAN NOT NULL DEFAULT TRUE;
ALTER TABLE public.ideas ADD COLUMN IF NOT EXISTS is_anonymous BOOLEAN NOT NULL DEFAULT FALSE;
ALTER TABLE public.ideas ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'Pris en compte';
ALTER TABLE public.ideas ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ NOT NULL DEFAULT NOW();
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.columns
         WHERE table_schema = 'public' AND table_name = 'ideas' AND column_name = 'student_email_hash'
    ) THEN
        ALTER TABLE public.ideas ALTER COLUMN student_email_hash DROP NOT NULL;
    END IF;
END;
$$;

CREATE INDEX IF NOT EXISTS idx_ideas_category ON public.ideas(category);
CREATE INDEX IF NOT EXISTS idx_ideas_created_at ON public.ideas(created_at DESC);

CREATE TABLE IF NOT EXISTS public.support_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL CHECK (char_length(full_name) >= 2),
    contact TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.sos_tickets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    subject TEXT NOT NULL,
    contact TEXT NOT NULL,
    message TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'Nouveau'
        CHECK (status IN ('Nouveau', 'En cours de traitement', 'Résolu')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.otp_verifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email_hash TEXT NOT NULL,
    code_hash TEXT NOT NULL,
    attempts INTEGER NOT NULL DEFAULT 0,
    max_attempts INTEGER NOT NULL DEFAULT 5,
    expires_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_otp_email_hash ON public.otp_verifications(email_hash);
CREATE INDEX IF NOT EXISTS idx_otp_created_at ON public.otp_verifications(created_at DESC);

CREATE TABLE IF NOT EXISTS public.otp_request_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email_hash TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_otp_request_events_email_created
    ON public.otp_request_events(email_hash, created_at DESC);

CREATE TABLE IF NOT EXISTS public.idea_submission_token_uses (
    token_hash TEXT PRIMARY KEY CHECK (char_length(token_hash) = 64),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE OR REPLACE FUNCTION public.claim_idea_submission_token(p_token_hash TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = ''
AS $$
DECLARE
    v_inserted INTEGER;
BEGIN
    IF p_token_hash IS NULL OR char_length(p_token_hash) <> 64 THEN
        RETURN FALSE;
    END IF;

    DELETE FROM public.idea_submission_token_uses
    WHERE created_at < pg_catalog.now() - INTERVAL '1 day';

    INSERT INTO public.idea_submission_token_uses (token_hash)
    VALUES (p_token_hash)
    ON CONFLICT (token_hash) DO NOTHING;

    GET DIAGNOSTICS v_inserted = ROW_COUNT;
    RETURN v_inserted = 1;
END;
$$;

REVOKE ALL ON FUNCTION public.claim_idea_submission_token(TEXT) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.claim_idea_submission_token(TEXT) TO service_role;

-- Atomically allow up to three verification-code requests per address per 10 minutes.
CREATE OR REPLACE FUNCTION public.claim_otp_request(p_email_hash TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = ''
AS $$
DECLARE
    v_request_count INTEGER;
BEGIN
    IF p_email_hash IS NULL OR char_length(p_email_hash) <> 64 THEN
        RETURN FALSE;
    END IF;

    PERFORM pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended(p_email_hash, 0));
    DELETE FROM public.otp_request_events
    WHERE created_at < pg_catalog.now() - INTERVAL '1 day';

    SELECT pg_catalog.count(*)
      INTO v_request_count
      FROM public.otp_request_events
     WHERE email_hash = p_email_hash
       AND created_at >= pg_catalog.now() - INTERVAL '10 minutes';

    IF v_request_count >= 3 THEN
        RETURN FALSE;
    END IF;

    INSERT INTO public.otp_request_events (email_hash) VALUES (p_email_hash);
    RETURN TRUE;
END;
$$;

REVOKE ALL ON FUNCTION public.claim_otp_request(TEXT) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.claim_otp_request(TEXT) TO service_role;

-- Recreate the public projection to ensure only approved, non-sensitive fields escape.
DROP VIEW IF EXISTS public.public_ideas;
CREATE VIEW public.public_ideas AS
SELECT
    id,
    title,
    description,
    category,
    CASE WHEN is_anonymous THEN 'Anonyme' ELSE author_name END AS author_name,
    is_anonymous,
    is_sample,
    status,
    created_at
FROM public.ideas
WHERE is_approved = TRUE;

ALTER TABLE public.ideas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.support_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sos_tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.otp_verifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.otp_request_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.idea_submission_token_uses ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON public.ideas FROM anon, authenticated;
REVOKE ALL ON public.support_members FROM anon, authenticated;
REVOKE ALL ON public.sos_tickets FROM anon, authenticated;
REVOKE ALL ON public.otp_verifications FROM anon, authenticated;
REVOKE ALL ON public.otp_request_events FROM anon, authenticated;
REVOKE ALL ON public.idea_submission_token_uses FROM anon, authenticated;
GRANT ALL ON public.ideas TO service_role;
GRANT ALL ON public.support_members TO service_role;
GRANT ALL ON public.sos_tickets TO service_role;
GRANT ALL ON public.otp_verifications TO service_role;
GRANT ALL ON public.otp_request_events TO service_role;
GRANT ALL ON public.idea_submission_token_uses TO service_role;
REVOKE ALL ON public.public_ideas FROM PUBLIC;
GRANT SELECT ON public.public_ideas TO anon, authenticated;

DROP POLICY IF EXISTS "Backend administre les idées" ON public.ideas;
CREATE POLICY "Backend administre les idées"
    ON public.ideas FOR ALL TO service_role USING (TRUE) WITH CHECK (TRUE);
DROP POLICY IF EXISTS "Backend enregistre le soutien" ON public.support_members;
CREATE POLICY "Backend enregistre le soutien"
    ON public.support_members FOR ALL TO service_role USING (TRUE) WITH CHECK (TRUE);
DROP POLICY IF EXISTS "Backend gère les tickets SOS" ON public.sos_tickets;
CREATE POLICY "Backend gère les tickets SOS"
    ON public.sos_tickets FOR ALL TO service_role USING (TRUE) WITH CHECK (TRUE);
DROP POLICY IF EXISTS "Backend gère les codes OTP" ON public.otp_verifications;
CREATE POLICY "Backend gère les codes OTP"
    ON public.otp_verifications FOR ALL TO service_role USING (TRUE) WITH CHECK (TRUE);
DROP POLICY IF EXISTS "Backend limite les demandes OTP" ON public.otp_request_events;
CREATE POLICY "Backend limite les demandes OTP"
    ON public.otp_request_events FOR ALL TO service_role USING (TRUE) WITH CHECK (TRUE);
DROP POLICY IF EXISTS "Backend consomme les jetons de proposition" ON public.idea_submission_token_uses;
CREATE POLICY "Backend consomme les jetons de proposition"
    ON public.idea_submission_token_uses FOR ALL TO service_role USING (TRUE) WITH CHECK (TRUE);

-- These rows are examples, not student submissions or confirmed campaign actions.
INSERT INTO public.ideas (
    id, title, description, category, author_name, is_anonymous,
    is_sample, is_approved, status
)
VALUES
    ('11111111-1111-4111-8111-111111111111', 'Création d''une banque d''annales et fiches de révision en ligne', 'Centraliser les sujets d''examens des 3 dernières années avec corrigés collaboratifs et fiches mémo par matière.', 'Pédagogie', 'Exemple de campagne', FALSE, TRUE, TRUE, 'Pris en compte'),
    ('22222222-2222-4222-8222-222222222222', 'Permanence tutorat et entraide méthodologique le jeudi soir', 'Permettre aux étudiants de Master de tutorer les premières années sur les matières clés en échange de crédits ou valorisation associative.', 'Idée de projet', 'Exemple de campagne', FALSE, TRUE, TRUE, 'Pris en compte'),
    ('33333333-3333-4333-8333-333333333333', 'Grand tournoi e-sport caritatif inter-écoles', 'Un week-end de compétitions sur écran géant au foyer, ouvert aux spectateurs avec buvette solidaire.', 'Activité souhaitée', 'Exemple de campagne', FALSE, TRUE, TRUE, 'Pris en compte'),
    ('44444444-4444-4444-8444-444444444444', 'Publication trimestrielle du budget et des partenariats BDE', 'Transparence complète sur les entrées et sorties d''argent du bureau des étudiants pour restaurer la confiance de tous.', 'Suggestion BDE', 'Exemple de campagne', FALSE, TRUE, TRUE, 'Pris en compte')
ON CONFLICT (id) DO UPDATE SET
    author_name = EXCLUDED.author_name,
    is_anonymous = FALSE,
    is_sample = TRUE;
