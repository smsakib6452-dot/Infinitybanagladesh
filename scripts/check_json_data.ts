import fs from 'fs';

const path = 'C:/Users/User/.gemini/antigravity-ide/brain/ee0640da-db6f-4942-839a-d55deac2f113/.user_uploaded/media_1787713367775.json';
const content = fs.readFileSync(path, 'utf8');
const data = JSON.parse(content);
console.log('--- METRICS IN UPLOADED JSON ---');
console.log(JSON.stringify(data.metrics, null, 2));
