import { createClient } from '@supabase/supabase-js';

const supabase = createClient('https://pzpnphgnexfaxxaorqsq.supabase.co', 'sb_publishable_Vqapvc2C91UpllwvFevK9w_OJPdTi3V');

async function main() {
  const { data, error } = await supabase.from('site_settings').select('*');
  console.log('--- SUPABASE SITE_SETTINGS ---');
  console.log(data);
}

main();
