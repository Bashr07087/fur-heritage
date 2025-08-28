-- Fix RLS policies to allow user profile creation during signup

-- Add policy to allow INSERT operations for new user profiles
-- This allows the trigger function to create profiles during signup
CREATE POLICY "Allow profile creation during signup" ON user_profiles
  FOR INSERT WITH CHECK (true);

-- Add policy to allow admins to create user profiles manually
CREATE POLICY "Admins can create user profiles" ON user_profiles
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE id = auth.uid() 
      AND role IN ('admin', 'super_admin')
    )
  );
