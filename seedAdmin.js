import { supabase } from './config/supabaseClient.js';
import dotenv from 'dotenv';
dotenv.config();

async function seedAdmin() {
  const email = 'testee@example.com';
  const password = 'AdminPassword123!';
  const name = 'Admin';
  

  // 1. Create user in Supabase Auth
  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });
  if (error) {
    console.error('Error creating admin user:', error.message);
    return;
  }

  // 2. Insert admin email and name in admins table
  const { error: dbError } = await supabase
    .from('admins')
    .insert([{ email, name }]);
  if (dbError) {
    console.error('Error inserting admin into admins table:', dbError.message);
    return;
  }

  console.log('Admin user seeded:', email);
}

seedAdmin();
