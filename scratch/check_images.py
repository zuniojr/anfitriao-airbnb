import os

with open('src/pages/index.astro', 'r', encoding='utf-8') as f:
    content = f.read()

import re
images = re.findall(r'src="(/[^"]+)"', content)

missing = []
for img in images:
    path = os.path.join('public', img.lstrip('/'))
    if not os.path.exists(path):
        missing.append(img)

print(f"Missing images: {missing}")
