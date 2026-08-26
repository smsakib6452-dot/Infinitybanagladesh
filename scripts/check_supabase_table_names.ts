import { createClient } from '@supabase/supabase-js';

const supabase = createClient('https://pzpnphgnexfaxxaorqsq.supabase.co', 'sb_publishable_Vqapvc2C91UpllwvFevK9w_OJPdTi3V');

async function main() {
  const tables = ['metrics', 'impact_metrics', 'site_metrics', 'site_settings'];
  for (const t of tables) {
    const { data, error } = await supabase.from(t).select('*').limit(1);
    console.log(`Table ${t}:`, error ? error.message : `FOUND (${data?.length} rows)`);
  }
}

main();
