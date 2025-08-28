-- Script to promote the first user to super admin
-- Replace 'your-email@example.com' with your actual email address

UPDATE user_profiles 
SET role = 'super_admin'
WHERE email = 'your-email@example.com';

-- Verify the change
SELECT id, email, role, created_at 
FROM user_profiles 
WHERE role = 'super_admin';
