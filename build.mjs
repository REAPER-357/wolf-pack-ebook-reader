import { copyFileSync, mkdirSync, existsSync } from 'node:fs';

const libs = [
  ['node_modules/pdfjs-dist/legacy/build/pdf.min.mjs', 'assets/libs/pdf.min.js'],
  ['node_modules/pdfjs-dist/legacy/build/pdf.worker.min.mjs', 'assets/libs/pdf.worker.min.js'],
  ['node_modules/jszip/dist/jszip.min.js', 'assets/libs/jszip.min.js'],
  ['node_modules/mammoth/mammoth.browser.min.js', 'assets/libs/mammoth.browser.min.js'],
];

mkdirSync('assets/libs', { recursive: true });
mkdirSync('assets/css', { recursive: true });

for (const [from, to] of libs) {
  if (!existsSync(from)) {
    // Fallback search paths for different pdfjs-dist folder layouts
    const altFrom = from.replace('legacy/build/', 'build/');
    if (existsSync(altFrom)) {
      copyFileSync(altFrom, to);
      console.log('copied  ' + to);
      continue;
    }
    console.error('Missing ' + from + ' - run "npm install" first.');
    process.exit(1);
  }
  copyFileSync(from, to);
  console.log('copied  ' + to);
}

console.log('Done! All offline reader libraries are set up.');
