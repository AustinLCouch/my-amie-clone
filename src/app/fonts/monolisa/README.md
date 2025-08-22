# MonoLisa font drop-in

Place your licensed MonoLisa variable webfonts here.

Required files (WOFF2 preferred):
- Upright variable: MonoLisaVar[wght].woff2 (or the exact upright variable filename you have)
- Italic variable: MonoLisaVar-Italic[wght].woff2 (or the exact italic variable filename you have)

If your files use different names, that’s fine—tell me the exact filenames and I’ll wire them in.

Notes:
- Ensure you have a web embedding license for production use. See https://www.monolisa.dev/license
- If you prefer not to commit font binaries to the repo, we can add a .gitignore in this directory to exclude *.woff2/*.woff/*.otf.
- Once the files are placed, I will update src/app/layout.tsx to load the fonts using next/font/local and switch both the sans and mono CSS variables to MonoLisa.

