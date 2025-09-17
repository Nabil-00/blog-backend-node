import { supabase } from '../config/supabaseClient.js';

// Add a comment (public)
export async function addComment(req, res) {
  const { post_id, nickname, comment } = req.body;
  if (!post_id || !nickname || !comment) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  try {
    const { data, error } = await supabase
      .from('comments')
      .insert([{ post_id, nickname, comment }])
      .select()
      .single();
    if (error) return res.status(400).json({ error: error.message });
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
}

// List comments for a post (public)
export async function listComments(req, res) {
  const { post_id } = req.params;
  try {
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .eq('post_id', post_id)
      .order('created_at', { ascending: true });
    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
}
