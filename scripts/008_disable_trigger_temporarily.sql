-- Temporarily disable the automatic user profile creation trigger
-- to isolate the signup issue

-- Drop the trigger
DROP TRIGGER IF EXISTS create_user_profile_trigger ON auth.users;

-- Drop the function (we'll recreate it later if needed)
DROP FUNCTION IF EXISTS create_user_profile();

-- Add a simple INSERT policy for manual profile creation
CREATE POLICY "Allow manual profile creation during signup" ON user_profiles
  FOR INSERT 
  WITH CHECK (true);
