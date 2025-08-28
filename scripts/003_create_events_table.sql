-- Create events table for admin management
CREATE TABLE IF NOT EXISTS events (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    event_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    location TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN (
        'Cultural Events', 
        'Language Classes', 
        'Community Meetings', 
        'Health Programs', 
        'Youth Activities', 
        'Religious Observances'
    )),
    organizer TEXT NOT NULL,
    max_attendees INTEGER DEFAULT 50,
    is_recurring BOOLEAN DEFAULT FALSE,
    recurring_pattern TEXT, -- 'weekly', 'monthly', etc.
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'cancelled', 'completed')),
    created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_events_date ON events(event_date);
CREATE INDEX IF NOT EXISTS idx_events_category ON events(category);
CREATE INDEX IF NOT EXISTS idx_events_status ON events(status);
CREATE INDEX IF NOT EXISTS idx_events_created_by ON events(created_by);

-- Enable RLS
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Everyone can view active events" ON events
    FOR SELECT USING (status = 'active');

CREATE POLICY "Staff and admins can manage events" ON events
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM user_profiles 
            WHERE user_id = auth.uid() 
            AND role IN ('staff', 'admin', 'super_admin')
        )
    );

-- Create trigger for updated_at
CREATE TRIGGER update_events_updated_at 
    BEFORE UPDATE ON events 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
