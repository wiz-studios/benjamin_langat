-- ============================================
-- ISSUES TABLE
-- ============================================
CREATE TABLE issues (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('Roads', 'Water', 'Education', 'Health', 'Security', 'Other')),
  status TEXT NOT NULL DEFAULT 'Received' CHECK (status IN ('Received', 'Under Review', 'Forwarded', 'Resolved')),
  priority TEXT NOT NULL DEFAULT 'Normal' CHECK (priority IN ('Normal', 'High', 'Critical')),
  ward TEXT NOT NULL,
  location_lat FLOAT8,
  location_lng FLOAT8,
  image_url TEXT,
  reporter_name TEXT,
  reporter_phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS Policies for issues
ALTER TABLE issues ENABLE ROW LEVEL SECURITY;

-- Allow anyone (public) to insert issues
CREATE POLICY "Public can report issues" ON issues
  FOR INSERT WITH CHECK (true);

-- Allow anyone to view issues (for transparency)
CREATE POLICY "Public can view issues" ON issues
  FOR SELECT USING (true);

-- Allow authenticated users (Admins) to update issues (status, priority)
CREATE POLICY "Admins can update issues" ON issues
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Trigger to update updated_at
CREATE TRIGGER update_issues_updated_at BEFORE UPDATE ON issues
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- STORAGE BUCKET (issue-attachments)
-- ============================================
-- Attempt to create the bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('issue-attachments', 'issue-attachments', true)
ON CONFLICT (id) DO NOTHING;

-- Storage Policies
-- Allow public to upload images to this bucket
CREATE POLICY "Public can upload issue images" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'issue-attachments');

-- Allow public to view issue images
CREATE POLICY "Public can view issue images" ON storage.objects
  FOR SELECT USING (bucket_id = 'issue-attachments');
