-- Admin Dashboard Schema
-- Create mp_updates table for MP accomplishments/timeline
CREATE TABLE IF NOT EXISTS public.mp_updates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('Project Start', 'Completion', 'Achievement', 'Event')),
    description TEXT,
    date DATE NOT NULL,
    image_url TEXT,
    status TEXT NOT NULL DEFAULT 'Planned' CHECK (status IN ('Ongoing', 'Completed', 'Planned')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_mp_updates_updated_at ON public.mp_updates;
CREATE TRIGGER update_mp_updates_updated_at
    BEFORE UPDATE ON public.mp_updates
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Extend politician table with new JSONB fields
ALTER TABLE public.politician
ADD COLUMN IF NOT EXISTS quick_facts JSONB,
ADD COLUMN IF NOT EXISTS stats JSONB,
ADD COLUMN IF NOT EXISTS contact_details JSONB,
ADD COLUMN IF NOT EXISTS birth_date TEXT;

-- Row Level Security Policies
ALTER TABLE public.mp_updates ENABLE ROW LEVEL SECURITY;

-- Public can read
DROP POLICY IF EXISTS "Public can view mp_updates" ON public.mp_updates;
CREATE POLICY "Public can view mp_updates"
    ON public.mp_updates FOR SELECT
    TO public
    USING (true);

-- Only authenticated users can insert/update/delete (admin check can be added later)
DROP POLICY IF EXISTS "Authenticated users can insert mp_updates" ON public.mp_updates;
CREATE POLICY "Authenticated users can insert mp_updates"
    ON public.mp_updates FOR INSERT
    TO authenticated
    WITH CHECK (true);

DROP POLICY IF EXISTS "Authenticated users can update mp_updates" ON public.mp_updates;
CREATE POLICY "Authenticated users can update mp_updates"
    ON public.mp_updates FOR UPDATE
    TO authenticated
    USING (true);

DROP POLICY IF EXISTS "Authenticated users can delete mp_updates" ON public.mp_updates;
CREATE POLICY "Authenticated users can delete mp_updates"
    ON public.mp_updates FOR DELETE
    TO authenticated
    USING (true);

-- Comments for documentation
COMMENT ON TABLE public.mp_updates IS 'MP accomplishments, projects, and timeline updates';
COMMENT ON COLUMN public.politician.quick_facts IS 'JSONB containing constituency, party, awards, education, etc.';
COMMENT ON COLUMN public.politician.stats IS 'JSONB array of statistics (years in parliament, bills sponsored, etc.)';
COMMENT ON COLUMN public.politician.contact_details IS 'JSONB containing extended contact info (office address, P.O. Box, etc.)';
