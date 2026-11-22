const fs = require('fs');
const path = require('path');

async function build() {
  const outPath = path.join(__dirname, '../src/app/compiled-tailwind.css');

  let postcss, tailwind;
  try {
    postcss = require('postcss');
    tailwind = require('@tailwindcss/postcss');
  } catch (err) {
    console.log('PostCSS or @tailwindcss/postcss not found in environment.');
    if (fs.existsSync(outPath)) {
      console.log('Existing compiled-tailwind.css found. Proceeding with build.');
      process.exit(0);
    }
    console.error('No compiled-tailwind.css found and cannot compile:', err);
    process.exit(1);
  }

  const cssPath = path.join(__dirname, '../src/app/globals.css');
  const inputCss = fs.readFileSync(cssPath, 'utf8');
  console.log('Processing input CSS from', cssPath);
  const result = await postcss([tailwind()]).process(inputCss, {
    from: cssPath,
  });
  fs.writeFileSync(outPath, result.css);
  console.log('SUCCESS! Wrote', result.css.length, 'bytes to', outPath);
}

build().catch(err => {
  console.error('Build CSS failed:', err);
  process.exit(1);
});
