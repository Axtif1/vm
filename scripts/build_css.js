const postcss = require('postcss');
const tailwind = require('@tailwindcss/postcss');
const fs = require('fs');
const path = require('path');

async function build() {
  const cssPath = path.join(__dirname, '../src/app/globals.css');
  const inputCss = fs.readFileSync(cssPath, 'utf8');
  console.log('Processing input CSS from', cssPath);
  const result = await postcss([tailwind()]).process(inputCss, {
    from: cssPath,
  });
  const outPath = path.join(__dirname, '../src/app/compiled-tailwind.css');
  fs.writeFileSync(outPath, result.css);
  console.log('SUCCESS! Wrote', result.css.length, 'bytes to', outPath);
}

build().catch(err => {
  console.error('Build CSS failed:', err);
  process.exit(1);
});
