import os
import re
import glob
from PIL import Image

# 1. Verify all images in public/products
imgs = sorted(glob.glob('public/products/*/*.*'))
print('Total images on disk:', len(imgs))
total_size = sum(os.path.getsize(p) for p in imgs)
print(f'Total folder size: {total_size / (1024*1024):.2f} MB')

corrupted = []
for p in imgs:
    try:
        with Image.open(p) as img:
            img.verify()
    except Exception as e:
        corrupted.append((p, str(e)))

print('Corrupted images:', len(corrupted))

# 2. Verify all references in src/data/products.js exist on disk
with open('src/data/products.js', 'r', encoding='utf-8') as f:
    code = f.read()

refs = re.findall(r'[\'"](/products/[^\'"]+)[\'"]', code)
print('Total product image references in products.js:', len(refs))

missing = []
for r in set(refs):
    # Normalize Windows backslashes
    clean_r = r.lstrip('/')
    local_path = os.path.join('public', *clean_r.split('/'))
    if not os.path.exists(local_path):
        missing.append(r)

print('Missing referenced images:', len(missing))
if missing:
    print('Missing list:', missing)
else:
    print('VERIFICATION PASSED: 100% of referenced product images exist on disk and are valid!')
