/**
 * Standalone Cloudinary Video Uploader
 * 
 * Uses standard Node.js built-ins (crypto, fs, fetch, FormData, Blob).
 * No third-party packages required.
 * 
 * Usage:
 *   node scripts/upload_to_cloudinary.js
 * 
 * Requires credentials in .env.local or environment variables:
 *   CLOUDINARY_CLOUD_NAME=your_cloud_name
 *   CLOUDINARY_API_KEY=your_api_key
 *   CLOUDINARY_API_SECRET=your_api_secret
 * 
 * OR:
 *   CLOUDINARY_URL=cloudinary://API_KEY:API_SECRET@CLOUD_NAME
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Load .env.local if present
const envLocalPath = path.join(__dirname, '../.env.local');
if (fs.existsSync(envLocalPath)) {
  const envContent = fs.readFileSync(envLocalPath, 'utf8');
  for (const line of envContent.split('\n')) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
      const idx = trimmed.indexOf('=');
      const key = trimmed.slice(0, idx).trim();
      const val = trimmed.slice(idx + 1).trim().replace(/^["']|["']$/g, '');
      if (!process.env[key]) {
        process.env[key] = val;
      }
    }
  }
}

// Parse credentials
let cloudName = process.env.CLOUDINARY_CLOUD_NAME || process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
let apiKey = process.env.CLOUDINARY_API_KEY;
let apiSecret = process.env.CLOUDINARY_API_SECRET;

if (process.env.CLOUDINARY_URL) {
  try {
    const parsed = new URL(process.env.CLOUDINARY_URL);
    apiKey = parsed.username;
    apiSecret = parsed.password;
    cloudName = parsed.hostname;
  } catch (e) {
    console.error('Failed to parse CLOUDINARY_URL:', e.message);
  }
}

const VIDEOS = [
  'hero_reel.mp4',
  'campaign_winter_1.mp4',
  'campaign_winter_2.mp4',
  'campaign_winter_3.mp4',
  'campaign_winter_4.mp4',
  'campaign_winter_5.mp4',
  'promo_reel_1.mp4',
  'promo_reel_2.mp4'
];

async function uploadFile(filename) {
  const filePath = path.join(__dirname, '../public/videos', filename);
  if (!fs.existsSync(filePath)) {
    console.warn(`[SKIP] File not found: ${filePath}`);
    return null;
  }

  const publicId = `vmind/videos/${path.parse(filename).name}`;
  const timestamp = Math.floor(Date.now() / 1000);
  
  // Signature calculation: sorted alphabetical parameters + apiSecret
  const signString = `folder=vmind/videos&public_id=${path.parse(filename).name}&timestamp=${timestamp}${apiSecret}`;
  const signature = crypto.createHash('sha1').update(signString).digest('hex');

  const fileBuffer = fs.readFileSync(filePath);
  const fileBlob = new Blob([fileBuffer], { type: 'video/mp4' });

  const formData = new FormData();
  formData.append('file', fileBlob, filename);
  formData.append('api_key', apiKey);
  formData.append('timestamp', String(timestamp));
  formData.append('signature', signature);
  formData.append('folder', 'vmind/videos');
  formData.append('public_id', path.parse(filename).name);

  const endpoint = `https://api.cloudinary.com/v1_1/${cloudName}/video/upload`;
  const fileSizeMB = (fileBuffer.length / (1024 * 1024)).toFixed(1);

  console.log(`\n[UPLOADING] ${filename} (${fileSizeMB} MB) to Cloudinary...`);
  const res = await fetch(endpoint, {
    method: 'POST',
    body: formData
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Upload failed for ${filename} (${res.status}): ${errText}`);
  }

  const data = await res.json();
  console.log(`[SUCCESS] ${filename} -> ${data.secure_url}`);
  return {
    filename,
    public_id: data.public_id,
    secure_url: data.secure_url,
    bytes: data.bytes,
    duration: data.duration
  };
}

async function main() {
  console.log('=== V-MIND FASHION CLOUDINARY UPLOADER ===');
  
  if (!cloudName || !apiKey || !apiSecret) {
    console.error('\n[MISSING CREDENTIALS]');
    console.error('Please configure your Cloudinary credentials in .env.local:');
    console.error('  CLOUDINARY_CLOUD_NAME=your_cloud_name');
    console.error('  CLOUDINARY_API_KEY=your_api_key');
    console.error('  CLOUDINARY_API_SECRET=your_api_secret');
    console.error('\nOr pass CLOUDINARY_URL:');
    console.error('  CLOUDINARY_URL=cloudinary://API_KEY:API_SECRET@CLOUD_NAME\n');
    process.exit(1);
  }

  console.log(`Target Cloud Name: ${cloudName}`);
  console.log(`Found ${VIDEOS.length} campaign videos to upload.\n`);

  const results = {};
  for (const v of VIDEOS) {
    try {
      const res = await uploadFile(v);
      if (res) {
        results[v] = res.secure_url;
      }
    } catch (err) {
      console.error(`[ERROR] ${err.message}`);
    }
  }

  // Save generated URLs map
  const outPath = path.join(__dirname, '../src/utils/cloudinary_urls.json');
  fs.writeFileSync(outPath, JSON.stringify(results, null, 2));
  console.log(`\nSaved ${Object.keys(results).length} video URLs to ${outPath}`);
  console.log('ALL DONE!');
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
