import { createClient } from '@supabase/supabase-js';

const supabase = createClient('https://pzpnphgnexfaxxaorqsq.supabase.co', 'sb_publishable_Vqapvc2C91UpllwvFevK9w_OJPdTi3V');

async function main() {
  const { data: comData, error: err1 } = await supabase.from('committees').select('*');
  console.log('--- ALL COMMITTEES IN SUPABASE ---');
  console.log('Total:', comData?.length);
  comData?.forEach(c => {
    console.log(`ID: "${c.id}" | Type: "${c.type}" | Name: "${JSON.stringify(c.name)}"`);
  });

  const { data: memData, error: err2 } = await supabase.from('committee_members').select('*');
  console.log('\n--- COMMITTEE MEMBERS COUNT IN SUPABASE ---');
  console.log('Total members:', memData?.length);
  const byComm: Record<string, number> = {};
  memData?.forEach(m => {
    byComm[m.committee_id] = (byComm[m.committee_id] || 0) + 1;
  });
  console.log('By committee:', byComm);
}

main().catch(console.error);
