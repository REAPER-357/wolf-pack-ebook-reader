# Wolf Pack E-Reading App

A private, offline e-reader for PDF, EPUB, MOBI, DOCX, DOC and TXT files. It runs as a PWA (installable web app) or as an Android APK built with Capacitor.

Your books stay where they are. The app reads them from your device, never uploads them, and never makes its own copy.

## Contents

- [Features](#features)
- [Supported formats](#supported-formats)
- [Privacy](#privacy)
- [Data and risk of data loss](#data-and-risk-of-data-loss)
- [PWA or APK?](#pwa-or-apk)
- [Using the app](#using-the-app)
- [Known limits](#known-limits)
- [Build and install](#build-and-install)
- [Project layout](#project-layout)
- [About the author](#about-the-author)

## Features

- Library from a folder you choose (subfolders included) or from individual files
- Three library views: 2-wide covers, 4-wide covers, and a one-line list
- Search by title and filter by format
- Continue Reading tab, with your most recently opened books first
- Reading position saved per book (PDF: page; other formats: chapter or part, plus scroll position)
- Covers: first page for PDF, embedded cover for EPUB and MOBI when the book has one
- PDF reader: fit-to-width pages, zoom from 50% to 400%
- Reflowable reader for the other formats: adjustable text size, serif or sans font
- Themes: Pure Black, Dark and Light, plus five accent colors
- Keyboard: left and right arrows turn pages, Esc closes the book
- Works fully offline once installed

## Supported formats

| Format | Extensions | Notes |
|---|---|---|
| PDF | .pdf | Full page rendering |
| EPUB | .epub | Chapters, images and cover |
| MOBI | .mobi, .prc, .azw | Standard (PalmDOC-compressed) files only |
| Word | .docx | Text, headings, lists, tables, images |
| Word (legacy) | .doc | Text-only preview. Save as .docx for formatting |
| Plain text | .txt | UTF-8, UTF-16 and Windows-1252 detected |

Not supported: DRM-protected books, .azw3 / KF8, and MOBI files that use HUFF/CDIC compression. The app shows a message when it meets one of these.

## Privacy

- No accounts, no sign-in, no personal details requested
- No analytics, no tracking, no ads
- After setup the app makes no network requests. All libraries (PDF.js, JSZip, mammoth, Tailwind CSS) and all icons are bundled locally
- Books are processed in your browser or app only
- Remote images inside books are blocked, and scripts inside books are removed. Ordinary web links inside a book open in a new tab when you tap them

## Data and risk of data loss

**Your books are never stored by the app.** It only keeps a small amount of reading data, so deleting the app's data cannot delete or damage a book.

What the app stores on your device (in browser storage, or in the app's own storage for the APK):

- The list of books it has seen: title, file name or path, format, page or chapter count
- Small cover thumbnails
- Your reading position in each book
- Settings: theme, accent color, font, text size, library view

What this means in practice:

- **If that storage is cleared**, you lose your reading positions, saved covers and settings. Your books are untouched. Choose your folder again and the library rebuilds itself, with covers regenerated and every book starting from the beginning
- **There is no export or backup** of reading positions
- **Books must be re-selected after the app is closed.** Browsers and Android do not let the app keep permanent access to your files. After a restart the library list and positions are shown, but you tap Open Folder once to reconnect your books

Storage is cleared when you:

- clear "cookies and other site data" for the site in your browser (clearing browsing history alone usually does not do this)
- uninstall the app, or clear its storage in Android settings
- use a private or incognito window, where nothing is kept after you close it

Browsers can also remove site storage on their own when the device is very low on space. Installed apps are far less likely to be affected than a normal browser tab.

## PWA or APK?

Because the app stores no books, either one is safe to use. The worst case is losing your reading positions and settings.

- **Android APK:** a good choice on Android. It keeps its own storage, so clearing your browser does not affect it
- **Installed PWA:** also fine. Install it from the browser menu (Install app or Add to Home screen) rather than using it in a normal tab
- **Browser tab only:** works, but is the easiest way to lose data by accident when clearing site data

Features that need access to your folders (the folder picker) depend on your browser or Android version. If the folder picker does not work for you, use the Add files button, which works everywhere.

## Using the app

1. Tap **Select eBook Folder** to scan a folder and its subfolders, or the file button to add individual books
2. Browse or search the library and tap a book to open it
3. Use Prev, Next and the slider to move. PDFs zoom with the magnifier buttons. Other formats change text size with the same buttons
4. Close the book with the back arrow. Your place is saved automatically
5. Find unfinished books under **Continue Reading**
6. Change theme, accent color and reading font under Settings (gear icon)

Choosing a folder replaces the library with that folder's contents. Adding files adds to the existing library.

## Known limits

- Legacy .doc files show text only
- Large PDFs and EPUBs can take a moment to open on slower phones
- A book that cannot be opened (DRM, unsupported compression, damaged file) shows an error message and is skipped
- Reading positions cannot be moved between devices

## Build and install

You need Node.js. The app is plain HTML, CSS and JavaScript, with Tailwind CSS compiled ahead of time.

```
npm install
npm run setup
```

`npm run setup` copies the libraries into `www/assets/libs/` and builds `www/assets/css/tailwind.css`. You only need to run it again if you change classes in `www/index.html`.

**Run as a web app or PWA:** serve the `www/` folder over HTTPS or `localhost`. Service workers do not run on plain HTTP at a network address, so installing as a PWA needs HTTPS or `localhost`. Opening `index.html` straight from the disk will not work, because the PDF worker is blocked.

**Build the Android APK:**

```
npx cap sync
npx cap open android
```

Then build the APK in Android Studio. Run `npx cap sync` again whenever you change anything in `www/`.

If you change files in `www/`, raise the version number in the `CACHE` line at the top of `www/sw.js` so installed PWAs pick up the update.

## Project layout

```
www/
  index.html          the whole app
  manifest.json       PWA manifest
  sw.js               service worker (offline cache)
  icon.svg, icon-192.png, icon-512.png
  assets/
    libs/             PDF.js, JSZip, mammoth (copied by npm run setup)
    css/tailwind.css  compiled Tailwind (built by npm run setup)
android/              Capacitor Android project
build.mjs             setup script
capacitor.config.json
```

Icons are drawn inline in `index.html`, so there are no icon files to manage.

Built with PDF.js, JSZip, mammoth and Tailwind CSS. See the LICENSE file for this project's license.

## About the author

Made by REAPER-357. FOSS supporter.

I build apps because I find existing ones either missing a feature I want or too invasive, asking for personal details they do not need. Every app I make is built to respect your privacy.
