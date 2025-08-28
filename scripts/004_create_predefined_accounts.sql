-- Create predefined user accounts with specific roles
-- Note: These accounts will need to be created through Supabase Auth first

-- Function to create predefined user profiles
CREATE OR REPLACE FUNCTION setup_predefined_accounts()
RETURNS void AS $$
BEGIN
  -- Insert predefined user profiles
  -- These will be linked when users sign up with these emails
  
  -- Admin account
  INSERT INTO user_profiles (id, email, full_name, role) 
  VALUES (
    gen_random_uuid(),
    'admin123@gmail.com',
    'System Administrator',
    'admin'
  ) ON CONFLICT (email) DO UPDATE SET
    role = 'admin',
    full_name = 'System Administrator';

  -- Staff account  
  INSERT INTO user_profiles (id, email, full_name, role)
  VALUES (
    gen_random_uuid(),
    'staff123@gmail.com', 
    'Staff Member',
    'staff'
  ) ON CONFLICT (email) DO UPDATE SET
    role = 'staff',
    full_name = 'Staff Member';

  -- Student account
  INSERT INTO user_profiles (id, email, full_name, role)
  VALUES (
    gen_random_uuid(),
    'students123@gmail.com',
    'Student User', 
    'user'
  ) ON CONFLICT (email) DO UPDATE SET
    role = 'user',
    full_name = 'Student User';

  RAISE NOTICE 'Predefined accounts setup completed. Users must sign up with these emails to activate accounts.';
END;
$$ LANGUAGE plpgsql;

-- Execute the function
SELECT setup_predefined_accounts();

-- Create a function to promote users by email (for easier role management)
CREATE OR REPLACE FUNCTION promote_user_by_email(user_email TEXT, new_role user_role)
RETURNS void AS $$
BEGIN
  UPDATE user_profiles 
  SET role = new_role, updated_at = NOW()
  WHERE email = user_email;
  
  IF NOT FOUND THEN
    RAISE EXCEPTION 'User with email % not found', user_email;
  END IF;
  
  RAISE NOTICE 'User % promoted to % role', user_email, new_role;
END;
$$ LANGUAGE plpgsql;
