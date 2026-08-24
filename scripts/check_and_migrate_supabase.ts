import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pzpnphgnexfaxxaorqsq.supabase.co';
const supabaseAnonKey = 'sb_publishable_Vqapvc2C91UpllwvFevK9w_OJPdTi3V';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkSupabase() {
  console.log('Testing Supabase Cloud Connection...');
  try {
    const { data, error } = await supabase.from('video_items').select('*').limit(5);
    if (error) {
      console.log('video_items table status:', error.message);
      if (error.code === 'PGRST205' || error.message.includes('relation "public.video_items" does not exist') || error.message.includes('404')) {
        console.log('NOTE: The table public.video_items needs to be created in the Supabase SQL Editor if not present.');
      }
    } else {
      console.log('✓ Successfully connected to Supabase video_items table! Found rows:', data?.length);
    }
  } catch (err) {
    console.error('Supabase check error:', err);
  }
}

checkSupabase();
