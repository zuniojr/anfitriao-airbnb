import re
import os

with open('src/pages/index.astro', 'r', encoding='utf-8') as f:
    content = f.read()

# Find all img tags
imgs = re.findall(r'<img[^>]+src="([^"]*)"', content)

print(f"Total images found: {len(imgs)}")
for i, src in enumerate(imgs):
    print(f"Image {i+1}: {src}")
    if not src:
        print("  WARNING: Empty source!")
    elif not src.startswith('/'):
        print("  WARNING: External or relative source!")
    else:
        path = os.path.join('public', src.lstrip('/'))
        if not os.path.exists(path):
            print("  WARNING: File does not exist!")
