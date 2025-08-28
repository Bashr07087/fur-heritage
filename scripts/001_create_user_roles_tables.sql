-- Create user roles enum
CREATE TYPE user_role AS ENUM ('user', 'staff', 'admin', 'super_admin');

-- Create user profiles table to extend Supabase auth.users
CREATE TABLE user_profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  role user_role DEFAULT 'user' NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create permissions table
CREATE TABLE permissions (
  id SERIAL PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create role permissions junction table
CREATE TABLE role_permissions (
  id SERIAL PRIMARY KEY,
  role user_role NOT NULL,
  permission_id INTEGER REFERENCES permissions(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(role, permission_id)
);

-- Insert default permissions
INSERT INTO permissions (name, description) VALUES
  ('view_content', 'View public content'),
  ('create_content', 'Create new content'),
  ('edit_content', 'Edit existing content'),
  ('delete_content', 'Delete content'),
  ('manage_users', 'Manage user accounts'),
  ('manage_roles', 'Manage user roles'),
  ('view_analytics', 'View site analytics'),
  ('manage_site', 'Full site management');

-- Assign permissions to roles
-- User permissions
INSERT INTO role_permissions (role, permission_id) 
SELECT 'user', id FROM permissions WHERE name IN ('view_content');

-- Staff permissions
INSERT INTO role_permissions (role, permission_id) 
SELECT 'staff', id FROM permissions WHERE name IN ('view_content', 'create_content', 'edit_content');

-- Admin permissions
INSERT INTO role_permissions (role, permission_id) 
SELECT 'admin', id FROM permissions WHERE name IN ('view_content', 'create_content', 'edit_content', 'delete_content', 'manage_users', 'view_analytics');

-- Super Admin permissions (all permissions)
INSERT INTO role_permissions (role, permission_id) 
SELECT 'super_admin', id FROM permissions;

-- Create function to automatically create user profile on signup
CREATE OR REPLACE FUNCTION create_user_profile()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO user_profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'full_name', ''));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to automatically create user profile
CREATE TRIGGER create_user_profile_trigger
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION create_user_profile();

-- Enable Row Level Security
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE role_permissions ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Users can view their own profile
CREATE POLICY "Users can view own profile" ON user_profiles
  FOR SELECT USING (auth.uid() = id);

-- Users can update their own profile (except role)
CREATE POLICY "Users can update own profile" ON user_profiles
  FOR UPDATE USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id AND role = (SELECT role FROM user_profiles WHERE id = auth.uid()));

-- Admins and super admins can view all profiles
CREATE POLICY "Admins can view all profiles" ON user_profiles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE id = auth.uid() 
      AND role IN ('admin', 'super_admin')
    )
  );

-- Super admins can update any profile
CREATE POLICY "Super admins can update any profile" ON user_profiles
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE id = auth.uid() 
      AND role = 'super_admin'
    )
  );

-- Everyone can view permissions (for UI purposes)
CREATE POLICY "Everyone can view permissions" ON permissions
  FOR SELECT USING (true);

-- Everyone can view role permissions (for UI purposes)
CREATE POLICY "Everyone can view role permissions" ON role_permissions
  FOR SELECT USING (true);
