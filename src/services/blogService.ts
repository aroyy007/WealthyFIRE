import { supabase } from '@/lib/supabase';

export interface BlogPost {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  image_url: string;
  category: string;
  user_id: string;
  created_at: string;
  updated_at: string;
}

export interface CreateBlogPost {
  title: string;
  content: string;
  excerpt: string;
  image_url: string;
  category: string;
}

export const blogService = {
  async getAllPosts() {
    const { data, error } = await supabase
      .from('blogs')
      .select(`
        *,
        users (username)
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  async getPostById(id: number) {
    const { data, error } = await supabase
      .from('blogs')
      .select(`
        *,
        users (username)
      `)
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  async getUserPosts(userId: string) {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  async createPost(post: CreateBlogPost, userId: string) {
    const { data, error } = await supabase
      .from('blogs')
      .insert([
        {
          ...post,
          user_id: userId,
        },
      ])
      .select();

    if (error) throw error;
    return data[0];
  },

  async updatePost(id: number, post: Partial<CreateBlogPost>, userId: string) {
    // First check if the post belongs to the user
    const { data: existingPost } = await supabase
      .from('blogs')
      .select('user_id')
      .eq('id', id)
      .single();

    if (existingPost?.user_id !== userId) {
      throw new Error('Unauthorized: You can only edit your own posts');
    }

    const { data, error } = await supabase
      .from('blogs')
      .update(post)
      .eq('id', id)
      .select();

    if (error) throw error;
    return data[0];
  },

  async deletePost(id: number, userId: string) {
    // First check if the post belongs to the user
    const { data: existingPost } = await supabase
      .from('blogs')
      .select('user_id')
      .eq('id', id)
      .single();

    if (existingPost?.user_id !== userId) {
      throw new Error('Unauthorized: You can only delete your own posts');
    }

    const { error } = await supabase
      .from('blogs')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  },
};