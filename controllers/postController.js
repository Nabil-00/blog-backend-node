import { supabase } from '../config/supabaseClient.js';

// Create a new post (admin only)
export async function createPost(req, res) {
  const { title, content, image_url, is_product } = req.body;
  const author_id = req.user.id;
  try {
    const { data, error } = await supabase
      .from('posts')
      .insert([{ title, content, image_url, is_product, author_id }])
      .select()
      .single();
    if (error) return res.status(400).json({ error: error.message });
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
}

// Get all posts
export async function getPosts(req, res) {
  try {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
}

// Get a single post by id
export async function getPost(req, res) {
  const { id } = req.params;
  try {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('id', id)
      .single();
    if (error) return res.status(404).json({ error: 'Post not found' });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
}

// Update a post (admin only)
export async function updatePost(req, res) {
  const { id } = req.params;
  const { title, content, image_url, is_product } = req.body;
  try {
    const { data, error } = await supabase
      .from('posts')
      .update({ title, content, image_url, is_product, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
}

// Delete a post (admin only)
export async function deletePost(req, res) {
  const { id } = req.params;
  try {
    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', id);
    if (error) return res.status(400).json({ error: error.message });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
}
