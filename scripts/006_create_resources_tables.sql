-- Create resources management tables
CREATE TABLE IF NOT EXISTS resource_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  icon VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS resources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  content TEXT,
  resource_type VARCHAR(50) NOT NULL, -- 'literacy', 'poem', 'story', 'video', 'audio', 'document'
  category_id UUID REFERENCES resource_categories(id),
  file_url TEXT,
  thumbnail_url TEXT,
  language VARCHAR(10) DEFAULT 'fur', -- 'fur', 'en', 'ar'
  difficulty_level VARCHAR(20) DEFAULT 'beginner', -- 'beginner', 'intermediate', 'advanced'
  tags TEXT[], -- Array of tags for better organization
  is_published BOOLEAN DEFAULT false,
  view_count INTEGER DEFAULT 0,
  created_by UUID REFERENCES user_profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default categories
INSERT INTO resource_categories (name, description, icon) VALUES
  ('Basic Literacy', 'Fundamental reading and writing materials', 'book-open'),
  ('Advanced Literacy', 'Complex literacy materials for advanced learners', 'graduation-cap'),
  ('Poetry', 'Traditional and modern Fur poetry', 'feather'),
  ('Folk Tales', 'Traditional stories and narratives', 'scroll'),
  ('Videos', 'Educational and cultural video content', 'video'),
  ('Audio', 'Pronunciation guides and audio lessons', 'headphones'),
  ('Health Education', 'Health and wellness materials', 'heart'),
  ('Cultural Heritage', 'Cultural traditions and practices', 'globe')
ON CONFLICT (name) DO NOTHING;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_resources_type ON resources(resource_type);
CREATE INDEX IF NOT EXISTS idx_resources_category ON resources(category_id);
CREATE INDEX IF NOT EXISTS idx_resources_language ON resources(language);
CREATE INDEX IF NOT EXISTS idx_resources_published ON resources(is_published);
CREATE INDEX IF NOT EXISTS idx_resources_created_by ON resources(created_by);

-- Enable RLS
ALTER TABLE resource_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;

-- RLS Policies for resource_categories
CREATE POLICY "Anyone can view published categories" ON resource_categories
  FOR SELECT USING (true);

CREATE POLICY "Staff can manage categories" ON resource_categories
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE id = auth.uid() 
      AND role IN ('staff', 'admin', 'super_admin')
    )
  );

-- RLS Policies for resources
CREATE POLICY "Anyone can view published resources" ON resources
  FOR SELECT USING (is_published = true);

CREATE POLICY "Users can view their own resources" ON resources
  FOR SELECT USING (created_by = auth.uid());

CREATE POLICY "Staff can manage resources" ON resources
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE id = auth.uid() 
      AND role IN ('staff', 'admin', 'super_admin')
    )
  );

-- Function to update view count
CREATE OR REPLACE FUNCTION increment_resource_views(resource_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE resources 
  SET view_count = view_count + 1, updated_at = NOW()
  WHERE id = resource_id;
END;
$$ LANGUAGE plpgsql;
