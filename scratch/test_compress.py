import os
import math
from PIL import Image
import numpy as np

os.makedirs('scratch/test_optimized', exist_ok=True)

test_images = [
    'public/products/sku-01/image_1.jpg', # Dark Noir Cotton
    'public/products/sku-02/image_1.jpg', # Espresso Waffle Knit (textured)
    'public/products/sku-03/image_1.jpg', # Burgundy Clasp Hoodie (hardware & color)
]

def calculate_psnr(img1, img2):
    if img1.size != img2.size:
        img2 = img2.resize(img1.size, Image.Resampling.LANCZOS)
    arr1 = np.array(img1, dtype=np.float32)
    arr2 = np.array(img2, dtype=np.float32)
    mse = np.mean((arr1 - arr2) ** 2)
    if mse == 0:
        return float('inf')
    return 20 * math.log10(255.0 / math.sqrt(mse))

results = []

for path in test_images:
    orig_size = os.path.getsize(path)
    sku_name = os.path.basename(os.path.dirname(path))
    filename = f"{sku_name}_{os.path.basename(path)}"
    out_path = os.path.join('scratch/test_optimized', filename)
    
    with Image.open(path) as img:
        orig_dim = img.size
        # Maintain aspect ratio, max dimension 1600
        w, h = img.size
        scale = min(1600.0 / max(w, h), 1.0)
        new_dim = (int(round(w * scale)), int(round(h * scale)))
        
        # High quality Lanczos resize
        resized = img.resize(new_dim, Image.Resampling.LANCZOS)
        
        # Save at quality 88 with subsampling=0 (4:4:4 preserves exact color detail on fabrics/reds)
        resized.save(out_path, 'JPEG', quality=88, optimize=True, subsampling=0, progressive=True)
        
        new_size = os.path.getsize(out_path)
        
        with Image.open(out_path) as opt_img:
            psnr = calculate_psnr(img, opt_img)
            results.append({
                'sku': sku_name,
                'file': path,
                'out_file': out_path,
                'orig_dim': orig_dim,
                'new_dim': new_dim,
                'orig_size_kb': orig_size / 1024.0,
                'new_size_kb': new_size / 1024.0,
                'reduction': (1.0 - new_size / orig_size) * 100.0,
                'psnr': psnr
            })

print("\n--- OPTIMIZATION TEST RESULTS (Quality 88, 1600px Max, Subsampling 4:4:4) ---")
for r in results:
    print(f"[{r['sku']}] {os.path.basename(r['file'])}")
    print(f"  Dimensions: {r['orig_dim'][0]}x{r['orig_dim'][1]} -> {r['new_dim'][0]}x{r['new_dim'][1]}")
    print(f"  File Size:  {r['orig_size_kb']:.1f} KB -> {r['new_size_kb']:.1f} KB (Saved {r['reduction']:.1f}%)")
    print(f"  PSNR Score: {r['psnr']:.2f} dB (Industry standard > 40 dB is excellent fidelity)")
    print(f"  Saved to:   {r['out_file']}\n")
