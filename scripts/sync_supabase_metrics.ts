import { createClient } from '@supabase/supabase-js';
import { INITIAL_IMPACT_METRICS } from '../src/data/initialData';

const supabaseUrl = 'https://pzpnphgnexfaxxaorqsq.supabase.co';
const supabaseAnonKey = 'sb_publishable_Vqapvc2C91UpllwvFevK9w_OJPdTi3V';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function main() {
  console.log('--- UPSERTING NEW IMPACT METRICS TO SUPABASE ---');
  for (const m of INITIAL_IMPACT_METRICS) {
    const { error } = await supabase.from('impact_metrics').upsert({
      id: m.id,
      label: m.label,
      value: m.value,
      description: m.description,
      icon_name: m.iconName,
      order: m.order,
      updated_at: new Date().toISOString()
    });
    if (error) console.error(`Error on ${m.id}:`, error.message);
    else console.log(`✓ Upserted ${m.id}: ${m.value} (${m.label.en})`);
  }
  console.log('--- SUPABASE METRICS SYNC COMPLETED ---');
}

main().catch(console.error);
