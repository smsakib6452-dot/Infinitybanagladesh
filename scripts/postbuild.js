import fs from 'fs';
import path from 'path';

const distPath = path.resolve('dist');
const indexPath = path.join(distPath, 'index.html');
const notFoundPath = path.join(distPath, '404.html');

if (fs.existsSync(indexPath)) {
  fs.copyFileSync(indexPath, notFoundPath);
  console.log('Copied dist/index.html to dist/404.html for GitHub Pages SPA support.');
}

const noJekyllPath = path.join(distPath, '.nojekyll');
fs.writeFileSync(noJekyllPath, '');
console.log('Created dist/.nojekyll to disable Jekyll processing on GitHub Pages.');

// Also copy to docs/ folder so GitHub Pages can serve directly from main branch /docs folder
const docsPath = path.resolve('docs');
if (fs.existsSync(docsPath)) {
  fs.rmSync(docsPath, { recursive: true, force: true });
}
fs.cpSync(distPath, docsPath, { recursive: true });
console.log('Copied dist/ to docs/ for GitHub Pages /docs folder support.');


