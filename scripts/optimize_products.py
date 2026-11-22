import os
import glob
import time
from PIL import Image

def optimize_all():
    start_time = time.time()
    src_dir = 'public/products'
    all_images = sorted(glob.glob(os.path.join(src_dir, '*/*.*')))
    
    total_images = len(all_images)
    print(f"Starting optimization of {total_images} product images...")
    
    initial_total_size = sum(os.path.getsize(p) for p in all_images)
    
    successful = []
    failed = []
    
    for idx, path in enumerate(all_images, 1):
        try:
            orig_sz = os.path.getsize(path)
            with Image.open(path) as img:
                # Ensure RGB mode (no alpha in JPEG)
                if img.mode != 'RGB':
                    img = img.convert('RGB')
                
                w, h = img.size
                scale = min(1600.0 / max(w, h), 1.0)
                new_dim = (int(round(w * scale)), int(round(h * scale)))
                
                # High-fidelity Lanczos resampling
                resized = img.resize(new_dim, Image.Resampling.LANCZOS)
                
                # Overwrite in-place (original safely backed up)
                resized.save(
                    path,
                    'JPEG',
                    quality=88,
                    optimize=True,
                    subsampling=0,
                    progressive=True
                )
            
            new_sz = os.path.getsize(path)
            saved_pct = (1.0 - new_sz / orig_sz) * 100.0
            successful.append({
                'path': path,
                'orig_kb': orig_sz / 1024.0,
                'new_kb': new_sz / 1024.0,
                'saved_pct': saved_pct
            })
            if idx % 10 == 0 or idx == total_images:
                print(f"  [{idx}/{total_images}] Processed {os.path.basename(os.path.dirname(path))}/{os.path.basename(path)}: {orig_sz/1024:.1f} KB -> {new_sz/1024:.1f} KB (-{saved_pct:.1f}%)")
        except Exception as e:
            print(f"  [ERROR] Failed to optimize {path}: {e}")
            failed.append({'path': path, 'error': str(e)})
            
    final_total_size = sum(os.path.getsize(p) for p in all_images)
    elapsed = time.time() - start_time
    
    print("\n================ OPTIMIZATION SUMMARY ================")
    print(f"Total Images:            {total_images}")
    print(f"Successfully Optimized:  {len(successful)}")
    print(f"Failed:                  {len(failed)}")
    print(f"Original Folder Size:    {initial_total_size / (1024*1024):.2f} MB")
    print(f"Optimized Folder Size:   {final_total_size / (1024*1024):.2f} MB")
    print(f"Total Space Saved:       {(initial_total_size - final_total_size) / (1024*1024):.2f} MB ({(1.0 - final_total_size / initial_total_size)*100:.1f}%)")
    print(f"Time Elapsed:            {elapsed:.2f} seconds")
    print("======================================================")

if __name__ == '__main__':
    optimize_all()
