-- Retire l'ancien parcours de vote sans supprimer son historique.
-- Exécuter après supabase/schema.sql sur une base déjà déployée.
BEGIN;

DROP VIEW IF EXISTS public.public_ideas;
CREATE SCHEMA IF NOT EXISTS private;
REVOKE ALL ON SCHEMA private FROM PUBLIC, anon, authenticated;
GRANT USAGE ON SCHEMA private TO service_role;

CREATE TABLE IF NOT EXISTS private.idea_voting_history (
    idea_id UUID PRIMARY KEY,
    votes_count INTEGER,
    reached_threshold_at TIMESTAMPTZ,
    review_deadline TIMESTAMPTZ,
    agenda_item_number TEXT,
    archived_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Keep the last known totals and review metadata before removing obsolete columns.
DO $$
BEGIN
    IF to_regclass('public.ideas') IS NOT NULL
       AND EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'ideas' AND column_name = 'votes_count') THEN
        EXECUTE $copy$
            INSERT INTO private.idea_voting_history (
                idea_id, votes_count, reached_threshold_at, review_deadline, agenda_item_number
            )
            SELECT id, votes_count, reached_threshold_at, review_deadline, agenda_item_number
              FROM public.ideas
            ON CONFLICT (idea_id) DO NOTHING
        $copy$;
    END IF;
END;
$$;

-- Remove the old trigger before moving its table. The table and all its rows are retained privately.
DO $$
BEGIN
    IF to_regclass('public.votes') IS NOT NULL THEN
        EXECUTE 'DROP TRIGGER IF EXISTS trg_update_votes_count ON public.votes';
        EXECUTE 'ALTER TABLE public.votes SET SCHEMA private';
        IF to_regclass('private.votes_archive') IS NULL THEN
            EXECUTE 'ALTER TABLE private.votes RENAME TO votes_archive';
        ELSE
            EXECUTE format(
                'ALTER TABLE private.votes RENAME TO %I',
                'votes_legacy_' || to_char(clock_timestamp(), 'YYYYMMDDHH24MISS')
            );
        END IF;
    END IF;
END;
$$;

DO $$
BEGIN
    IF to_regclass('private.votes_archive') IS NOT NULL THEN
        EXECUTE 'DROP TRIGGER IF EXISTS trg_update_votes_count ON private.votes_archive';
    END IF;
END;
$$;
DROP FUNCTION IF EXISTS public.update_idea_votes_count();
DROP FUNCTION IF EXISTS public.create_idea_with_initial_vote(UUID, TEXT, TEXT, TEXT, TEXT, BOOLEAN, TEXT);

REVOKE ALL ON private.idea_voting_history FROM PUBLIC, anon, authenticated;
GRANT SELECT ON private.idea_voting_history TO service_role;
DO $$
BEGIN
    IF to_regclass('private.votes_archive') IS NOT NULL THEN
        EXECUTE 'REVOKE ALL ON TABLE private.votes_archive FROM PUBLIC, anon, authenticated';
        EXECUTE 'GRANT SELECT ON TABLE private.votes_archive TO service_role';
    END IF;
END;
$$;
ALTER TABLE IF EXISTS private.votes_archive ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS private.idea_voting_history ENABLE ROW LEVEL SECURITY;
DO $$
BEGIN
    IF to_regclass('private.votes_archive') IS NOT NULL THEN
        EXECUTE 'DROP POLICY IF EXISTS "Archive des votes consultable par le backend" ON private.votes_archive';
        EXECUTE 'CREATE POLICY "Archive des votes consultable par le backend" ON private.votes_archive FOR SELECT TO service_role USING (TRUE)';
    END IF;
END;
$$;
DROP POLICY IF EXISTS "Historique des seuils consultable par le backend" ON private.idea_voting_history;
CREATE POLICY "Historique des seuils consultable par le backend"
    ON private.idea_voting_history FOR SELECT TO service_role USING (TRUE);

DROP INDEX IF EXISTS public.idx_ideas_votes;
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
ALTER TABLE public.ideas ADD COLUMN IF NOT EXISTS is_sample BOOLEAN NOT NULL DEFAULT FALSE;
ALTER TABLE public.ideas DROP COLUMN IF EXISTS votes_count;
ALTER TABLE public.ideas DROP COLUMN IF EXISTS reached_threshold_at;
ALTER TABLE public.ideas DROP COLUMN IF EXISTS review_deadline;
ALTER TABLE public.ideas DROP COLUMN IF EXISTS agenda_item_number;

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

REVOKE ALL ON public.public_ideas FROM PUBLIC;
GRANT SELECT ON public.public_ideas TO anon, authenticated;

COMMIT;
