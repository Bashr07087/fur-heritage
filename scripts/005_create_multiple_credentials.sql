-- Create multiple predefined user accounts for each role
-- Note: These accounts will need to be created through Supabase Auth first

-- Function to create multiple predefined user profiles
CREATE OR REPLACE FUNCTION setup_multiple_credentials()
RETURNS void AS $$
BEGIN
  -- Admin accounts (3 accounts)
  INSERT INTO user_profiles (id, email, full_name, role) VALUES
    (gen_random_uuid(), 'admin1@furlanguage.com', 'Primary Administrator', 'admin'),
    (gen_random_uuid(), 'admin2@furlanguage.com', 'Secondary Administrator', 'admin'),
    (gen_random_uuid(), 'admin3@furlanguage.com', 'Backup Administrator', 'admin')
  ON CONFLICT (email) DO UPDATE SET
    role = 'admin',
    full_name = EXCLUDED.full_name;

  -- Staff accounts (3 accounts)
  INSERT INTO user_profiles (id, email, full_name, role) VALUES
    (gen_random_uuid(), 'staff1@furlanguage.com', 'Senior Staff Member', 'staff'),
    (gen_random_uuid(), 'staff2@furlanguage.com', 'Content Manager', 'staff'),
    (gen_random_uuid(), 'staff3@furlanguage.com', 'Language Instructor', 'staff')
  ON CONFLICT (email) DO UPDATE SET
    role = 'staff',
    full_name = EXCLUDED.full_name;

  -- Student accounts (3 accounts)
  INSERT INTO user_profiles (id, email, full_name, role) VALUES
    (gen_random_uuid(), 'student1@furlanguage.com', 'Student Learner 1', 'user'),
    (gen_random_uuid(), 'student2@furlanguage.com', 'Student Learner 2', 'user'),
    (gen_random_uuid(), 'student3@furlanguage.com', 'Student Learner 3', 'user')
  ON CONFLICT (email) DO UPDATE SET
    role = 'user',
    full_name = EXCLUDED.full_name;

  RAISE NOTICE 'Multiple credentials setup completed. Users must sign up with these emails to activate accounts.';
END;
$$ LANGUAGE plpgsql;

-- Execute the function
SELECT setup_multiple_credentials();

-- Create a view to easily see all predefined accounts
CREATE OR REPLACE VIEW predefined_accounts_view AS
SELECT 
  email,
  full_name,
  role,
  created_at,
  CASE 
    WHEN role = 'admin' THEN 'Admin123!'
    WHEN role = 'staff' THEN 'Staff123!'
    WHEN role = 'user' THEN 'Student123!'
  END as suggested_password
FROM user_profiles 
WHERE email LIKE '%@furlanguage.com'
ORDER BY role DESC, email;
