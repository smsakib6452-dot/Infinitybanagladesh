import { createClient } from '@supabase/supabase-js';
import {
  INITIAL_COMMITTEES,
  INITIAL_COMMITTEE_MEMBERS,
  INITIAL_PERSONS,
  INITIAL_POSITIONS
} from '../src/data/initialData';

const supabaseUrl = 'https://pzpnphgnexfaxxaorqsq.supabase.co';
const supabaseAnonKey = 'sb_publishable_Vqapvc2C91UpllwvFevK9w_OJPdTi3V';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function syncToSupabase() {
  console.log('--- SYNCING CLEAN COMMITTEES & MEMBERS TO SUPABASE ---');

  // 1. Delete obsolete dummy sub-standing committees from Supabase
  const obsoleteCommitteeIds = ['comm-stand-youth', 'comm-stand-relief', 'comm-stand-child'];
  console.log('Cleaning up obsolete committees and member links from Supabase...');
  
  for (const id of obsoleteCommitteeIds) {
    const { error: delMemErr } = await supabase.from('committee_members').delete().eq('committee_id', id);
    if (delMemErr) console.warn(`Note on deleting members for ${id}:`, delMemErr.message);

    const { error: delCommErr } = await supabase.from('committees').delete().eq('id', id);
    if (delCommErr) console.warn(`Note on deleting committee ${id}:`, delCommErr.message);
  }

  // 2. Upsert valid committees
  console.log(`Upserting ${INITIAL_COMMITTEES.length} valid committees...`);
  for (const com of INITIAL_COMMITTEES) {
    const { error } = await supabase.from('committees').upsert({
      id: com.id,
      slug: com.slug,
      name: com.name,
      type: com.type,
      year: com.year,
      description: com.description,
      status: com.status,
      sort_order: com.sortOrder,
      is_featured: com.isFeatured,
      banner_image_url: com.bannerImageUrl || '',
      updated_at: new Date().toISOString()
    });
    if (error) console.error(`Error upserting committee ${com.id}:`, error.message);
    else console.log(`✓ Committee synced: ${com.id}`);
  }

  // 3. Upsert valid committee members
  console.log(`Upserting ${INITIAL_COMMITTEE_MEMBERS.length} committee members...`);
  for (const mem of INITIAL_COMMITTEE_MEMBERS) {
    const { error } = await supabase.from('committee_members').upsert({
      id: mem.id,
      committee_id: mem.committeeId,
      person_id: mem.personId,
      position_id: mem.positionId,
      serial_number: mem.serialNumber,
      sort_order: mem.sortOrder,
      is_featured_leader: mem.isFeaturedLeader,
      start_date: mem.startDate || '',
      end_date: mem.endDate || '',
      status: mem.status
    });
    if (error) console.error(`Error upserting member ${mem.id}:`, error.message);
  }
  console.log('✓ All committee members synced.');

  console.log('--- SUPABASE LIVE SYNC FINISHED SUCCESSFULLY ---');
}

syncToSupabase().catch(err => {
  console.error('Supabase sync error:', err);
  process.exit(1);
});
