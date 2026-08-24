import { INITIAL_COMMITTEES, INITIAL_PERSONS, INITIAL_POSITIONS, INITIAL_COMMITTEE_MEMBERS } from '../src/data/initialData';
import { getFreshImageUrl } from '../src/lib/cloudinary';
import { Person, Position, Committee, CommitteeMember } from '../src/types';

function runCommitteeSyncTests() {
  console.log('====================================================');
  console.log('TESTING COMMITTEE DYNAMIC DATA & CACHE-BUSTING SYNC');
  console.log('====================================================\n');

  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, msg: string) {
    if (condition) {
      console.log(`  ✓ PASS: ${msg}`);
      passed++;
    } else {
      console.error(`  ✗ FAIL: ${msg}`);
      failed++;
    }
  }

  // Simulation of getMembersWithDetails logic
  const getMembersWithDetailsSim = (
    committeeId: string,
    members: CommitteeMember[],
    persons: Person[],
    positions: Position[],
    committees: Committee[]
  ) => {
    const filtered = committeeId ? members.filter(m => m.committeeId === committeeId) : members;
    return filtered
      .map(m => {
        const person = persons.find(p => p.id === m.personId) || {
          id: m.personId,
          fullName: 'Unknown Member',
          banglaName: 'সদস্য',
          englishName: 'Unknown Member',
          active: true
        };
        const position = positions.find(pos => pos.id === m.positionId) || {
          id: m.positionId,
          name: { en: 'Executive Member', bn: 'কার্যনির্বাহী সদস্য' },
          level: 5,
          sortOrder: 20
        };
        const committee = committees.find(c => c.id === m.committeeId);
        return { ...m, person, position, committee };
      })
      .sort((a, b) => (a.sortOrder || a.serialNumber || 0) - (b.sortOrder || b.serialNumber || 0));
  };

  // 1. Standing Committee Data Resolution
  console.log('1. Standing Committee Member Profiles Resolution:');
  const standingMembers = getMembersWithDetailsSim(
    'comm-stand-central',
    INITIAL_COMMITTEE_MEMBERS,
    INITIAL_PERSONS,
    INITIAL_POSITIONS,
    INITIAL_COMMITTEES
  );

  assert(standingMembers.length === 9, `Central standing committee has exactly 9 members (found: ${standingMembers.length})`);

  // Check Chairman: Sakib Al Karim
  const chairman = standingMembers.find(m => m.position.level === 1 || m.position.name.en.toLowerCase().includes('chairman'));
  assert(Boolean(chairman), 'Chairman identified in standing council');
  assert(chairman?.person.fullName.includes('Sakib Al Karim') || chairman?.person.englishName.includes('Sakib Al Karim') === true, `Chairman is Sakib Al Karim (got: ${chairman?.person.fullName})`);

  // Check Vice Chairmen: Tamimul Hasib Rimad, Shifat Sattar
  const viceChairmen = standingMembers.filter(m => m.position.level === 2 || m.position.name.en.toLowerCase().includes('vice-chairman'));
  assert(viceChairmen.length === 2, `2 Vice-Chairmen identified (found: ${viceChairmen.length})`);
  const vcNames = viceChairmen.map(v => v.person.fullName);
  assert(vcNames.some(n => n.includes('Tamimul Hasib Rimad')), 'Tamimul Hasib Rimad is present in Vice-Chairmen');
  assert(vcNames.some(n => n.includes('Shifat Sattar')), 'Shifat Sattar is present in Vice-Chairmen');

  // 2. Dynamic Update Simulation
  console.log('\n2. Dynamic Supabase/Cloudinary Profile Update & Propagation:');
  const mockCloudinaryUrl = 'https://res.cloudinary.com/evj6fhsf/image/upload/v1740373849/members/sakib_avatar.jpg';
  const updatedPersons = INITIAL_PERSONS.map(p => {
    if (p.id === 'person-sc-1') {
      return { ...p, photoUrl: mockCloudinaryUrl, district: 'Chattogram' };
    }
    return p;
  });

  const updatedStandingMembers = getMembersWithDetailsSim(
    'comm-stand-central',
    INITIAL_COMMITTEE_MEMBERS,
    updatedPersons,
    INITIAL_POSITIONS,
    INITIAL_COMMITTEES
  );

  const updatedChairman = updatedStandingMembers.find(m => m.person.id === 'person-sc-1');
  assert(updatedChairman?.person.photoUrl === mockCloudinaryUrl, 'Updated Cloudinary photoUrl reflected dynamically');
  assert(updatedChairman?.person.district === 'Chattogram', 'Updated district reflected dynamically');

  // 3. Cloudinary Cache-Busting Verification
  console.log('\n3. Cloudinary Image Cache-Busting & Versioning:');
  const urlWithVersion = 'https://res.cloudinary.com/evj6fhsf/image/upload/v1234567890/sakib.jpg';
  const freshUrl1 = getFreshImageUrl(urlWithVersion);
  assert(freshUrl1 === urlWithVersion, 'Explicit version tag is preserved');

  const rawUrl = 'https://res.cloudinary.com/evj6fhsf/image/upload/sakib.jpg';
  const freshUrl2 = getFreshImageUrl(rawUrl);
  assert(/\/upload\/v\d+\/sakib\.jpg/.test(freshUrl2), `Raw Cloudinary URL injected with timestamp version tag: ${freshUrl2}`);

  const rawUrlWithParam = getFreshImageUrl(rawUrl, 9999);
  assert(rawUrlWithParam === 'https://res.cloudinary.com/evj6fhsf/image/upload/v9999/sakib.jpg', 'Specified version parameter injected accurately');

  // 4. Executive Committee 2026 and Past Committees dynamic mapping
  console.log('\n4. Executive & Past Committees Dynamic Resolution:');
  const execMembers = getMembersWithDetailsSim(
    'comm-exec-2026',
    INITIAL_COMMITTEE_MEMBERS,
    INITIAL_PERSONS,
    INITIAL_POSITIONS,
    INITIAL_COMMITTEES
  );
  assert(execMembers.length > 0, `Executive Committee 2026 resolves dynamically (${execMembers.length} members found)`);

  const pastMembers = getMembersWithDetailsSim(
    'comm-exec-2025',
    INITIAL_COMMITTEE_MEMBERS,
    INITIAL_PERSONS,
    INITIAL_POSITIONS,
    INITIAL_COMMITTEES
  );
  assert(pastMembers.length > 0, `Past Committee 2025 resolves dynamically (${pastMembers.length} members found)`);

  console.log('\n====================================================');
  console.log(`TEST RESULTS: ${passed} PASSED, ${failed} FAILED`);
  console.log('====================================================');

  if (failed > 0) {
    process.exit(1);
  }
}

runCommitteeSyncTests();
