// Run once:  npm install && npm run setup
// Copies the JS libraries into <app>/assets/libs and compiles Tailwind into <app>/assets/css/tailwind.css
// <app> is "www" when www/index.html exists (Capacitor layout), otherwise the project root.
import { copyFileSync, mkdirSync, existsSync } from 'node:fs';
import { execSync } from 'node:child_process';

const APP = existsSync('www/index.html') ? 'www' : '.';
if (!existsSync(APP + '/index.html')) {
  console.error('Cannot find index.html (looked in www/ and the project root).');
  process.exit(1);
}
console.log('App folder: ' + APP);

const libs = [
  ['node_modules/pdfjs-dist/build/pdf.min.js', 'assets/libs/pdf.min.js'],
  ['node_modules/pdfjs-dist/build/pdf.worker.min.js', 'assets/libs/pdf.worker.min.js'],
  ['node_modules/jszip/dist/jszip.min.js', 'assets/libs/jszip.min.js'],
  ['node_modules/mammoth/mammoth.browser.min.js', 'assets/libs/mammoth.browser.min.js'],
];

mkdirSync(APP + '/assets/libs', { recursive: true });
mkdirSync(APP + '/assets/css', { recursive: true });

for (const [from, to] of libs) {
  if (!existsSync(from)) {
    console.error('Missing ' + from + ' - run "npm install" first.');
    process.exit(1);
  }
  copyFileSync(from, APP + '/' + to);
  console.log('copied  ' + APP + '/' + to);
}

execSync(
  `npx tailwindcss --content ${APP}/index.html -i src/input.css -o ${APP}/assets/css/tailwind.css --minify`,
  { stdio: 'inherit' }
);
console.log('built   ' + APP + '/assets/css/tailwind.css');
console.log('Done. Serve ' + APP + '/ over http (or wrap it with Capacitor).');
