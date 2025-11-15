import { createClient } from '@supabase/supabase-js';

// Use environment variables if available, otherwise use placeholders for development
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'placeholder-key';

// Check if we have valid URL and key
const hasValidConfig = supabaseUrl !== 'https://placeholder.supabase.co' && 
                      supabaseAnonKey !== 'placeholder-key';

// Create Supabase client if we have valid configuration
let supabase = null;
try {
  if (hasValidConfig) {
    console.log('Creating Supabase client with valid configuration');
    supabase = createClient(supabaseUrl, supabaseAnonKey);
  } else {
    console.warn('Invalid Supabase configuration, using mock data');
  }
} catch (error) {
  console.error('Error creating Supabase client:', error);
}

export { supabase };
