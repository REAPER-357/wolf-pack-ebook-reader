LOONIE READER - fully local setup
=================================

1) One-time library bundle (needs internet once, needs Node.js):
     npm install
     npm run setup
   This fills:
     assets/libs/pdf.min.js, pdf.worker.min.js, jszip.min.js, mammoth.browser.min.js
     assets/css/tailwind.css   (compiled from index.html, replaces the Tailwind CDN)
   After that you can delete node_modules/ - the app no longer needs the internet.

   If you add new Tailwind classes to index.html later, run "npm run setup" again.

2) Icons: copy these from lucide-main/icons into assets/icons/ (keep the file names):
     arrow-left  book  book-marked  book-open  book-open-text  chevron-left
     chevron-right  file-plus  folder-open  grid-2x2  layout-grid  library
     list  search  settings  unlink  x  zoom-in  zoom-out
   (.svg files)

3) Serve the folder over http (or run it inside Capacitor). Opening index.html
   straight from disk (file://) blocks the icons and the PDF worker.
