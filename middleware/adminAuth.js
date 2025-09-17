import { supabase } from '../config/supabaseClient.js';

// Middleware to check if the user is an admin (Supabase Auth JWT)
export async function adminAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'Missing Authorization header' });
  }
  const token = authHeader.split(' ')[1];
  try {
    // Validate JWT and get user
    const { data: { user }, error } = await supabase.auth.getUser(token);
    if (error || !user) {
      return res.status(401).json({ error: 'Invalid token' });
    }
    // Check if user email is in 'admins' table
    const { data: adminData, error: adminError } = await supabase
      .from('admins')
      .select('email')
      .eq('email', user.email)
      .single();
    if (adminError || !adminData) {
      return res.status(403).json({ error: 'Not an admin' });
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
}
