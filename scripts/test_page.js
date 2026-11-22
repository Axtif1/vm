const http = require('http');

async function test() {
  const res = await fetch('http://localhost:3000');
  const html = await res.text();
  console.log('Status:', res.status);
  const cssMatches = [...html.matchAll(/href="([^"]+\.css[^"]*)"/g)].map(m => m[1]);
  console.log('CSS links found:', cssMatches);
  
  for (const cssUrl of cssMatches) {
    const fullUrl = cssUrl.startsWith('http') ? cssUrl : `http://localhost:3000${cssUrl}`;
    const cssRes = await fetch(fullUrl);
    const cssText = await cssRes.text();
    console.log(`\nURL: ${fullUrl}`);
    console.log(`Status: ${cssRes.status}, Length: ${cssText.length} bytes`);
    console.log('Preview (first 200 chars):', cssText.substring(0, 200));
    console.log('Contains flex?:', cssText.includes('flex'));
    console.log('Contains text-neutral-900?:', cssText.includes('text-neutral-900'));
    console.log('Contains font-montserrat?:', cssText.includes('font-montserrat') || cssText.includes('Montserrat'));
  }
}

test().catch(console.error);
