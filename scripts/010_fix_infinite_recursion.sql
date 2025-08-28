-- Fix infinite recursion in user_profiles RLS policies
-- Drop all existing policies that cause recursion
DROP POLICY IF EXISTS "Users can view own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON user_profiles;
DROP POLICY IF EXISTS "Allow profile creation during signup" ON user_profiles;
DROP POLICY IF EXISTS "Admins can manage all profiles" ON user_profiles;
DROP POLICY IF EXISTS "Service role can insert profiles" ON user_profiles;

-- Create simple, non-recursive policies
-- Allow users to view their own profile using auth.uid() directly
CREATE POLICY "users_select_own_profile" ON user_profiles
    FOR SELECT USING (auth.uid() = user_id);

-- Allow users to update their own profile using auth.uid() directly  
CREATE POLICY "users_update_own_profile" ON user_profiles
    FOR UPDATE USING (auth.uid() = user_id);

-- Allow INSERT for authenticated users (for profile creation)
CREATE POLICY "authenticated_users_insert_profile" ON user_profiles
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Allow service role full access (for admin operations)
CREATE POLICY "service_role_full_access" ON user_profiles
    FOR ALL USING (auth.role() = 'service_role');

-- Ensure RLS is enabled
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
