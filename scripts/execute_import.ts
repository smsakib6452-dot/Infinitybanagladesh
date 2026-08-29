import fs from 'fs';
import { processJsonSync } from './apply_imported_json';

const raw = fs.readFileSync('scripts/incoming_user_data.json', 'utf8');
const data = JSON.parse(raw);

processJsonSync(data)
  .then(() => console.log('Successfully applied all changes!'))
  .catch(console.error);
