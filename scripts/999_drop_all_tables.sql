-- Script to drop all database tables and related objects created by previous scripts
-- This will completely remove all backend database structures

-- Drop policies first (to avoid dependency issues)
DROP POLICY IF EXISTS "Anyone can view published resources" ON resources;
DROP POLICY IF EXISTS "Users can view their own resources" ON resources;
DROP POLICY IF EXISTS "Staff can manage resources" ON resources;
DROP POLICY IF EXISTS "Anyone can view published categories" ON resource_categories;
DROP POLICY IF EXISTS "Staff can manage categories" ON resource_categories;
DROP POLICY IF EXISTS "Users can view own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON user_profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON user_profiles;
DROP POLICY IF EXISTS "Super admins can update any profile" ON user_profiles;
DROP POLICY IF EXISTS "Everyone can view permissions" ON permissions;
DROP POLICY IF EXISTS "Everyone can view role permissions" ON role_permissions;

-- Drop triggers
DROP TRIGGER IF EXISTS create_user_profile_trigger ON auth.users;

-- Drop functions
DROP FUNCTION IF EXISTS create_user_profile();
DROP FUNCTION IF EXISTS increment_resource_views(UUID);

-- Drop indexes
DROP INDEX IF EXISTS idx_resources_type;
DROP INDEX IF EXISTS idx_resources_category;
DROP INDEX IF EXISTS idx_resources_language;
DROP INDEX IF EXISTS idx_resources_published;
DROP INDEX IF EXISTS idx_resources_created_by;

-- Drop tables (in reverse dependency order)
DROP TABLE IF EXISTS resources CASCADE;
DROP TABLE IF EXISTS resource_categories CASCADE;
DROP TABLE IF EXISTS role_permissions CASCADE;
DROP TABLE IF EXISTS permissions CASCADE;
DROP TABLE IF EXISTS user_profiles CASCADE;

-- Drop custom types
DROP TYPE IF EXISTS user_role CASCADE;

-- Note: This script removes all backend database structures
-- The website will now operate as a purely frontend application
