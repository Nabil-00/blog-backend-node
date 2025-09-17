import { supabase } from '../config/supabaseClient.js';

// Admin login (email, password)
export async function login(req, res) {
  const { email, password } = req.body;
  try {
    // Check if email is in admins table first
    const { data: adminData, error: adminError } = await supabase
      .from('admins')
      .select('email')
      .eq('email', email)
      .single();
    if (adminError || !adminData) {
      return res.status(403).json({ error: 'Not an admin' });
    }
    // Proceed with Supabase Auth login
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return res.status(401).json({ error: error.message });
    res.json({ token: data.session.access_token, user: data.user });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
}
