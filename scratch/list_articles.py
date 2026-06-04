import re
import sys

# Set encoding for output to UTF-8
sys.stdout.reconfigure(encoding='utf-8')

with open('src/pages/index.astro', 'r', encoding='utf-8') as f:
    content = f.read()

# Find all articles
articles = re.findall(r'<article class="blog-card">(.*?)</article>', content, re.DOTALL)

for i, art in enumerate(articles):
    title_match = re.search(r'<h3[^>]*>(.*?)</h3>', art, re.DOTALL)
    img_match = re.search(r'<img src="([^"]+)"', art)
    
    title = title_match.group(1).strip() if title_match else "No Title"
    img = img_match.group(1).strip() if img_match else "No Image"
    
    # Clean up HTML from title if any
    title = re.sub('<[^<]+?>', '', title)
    
    print(f"Article {i+1}:")
    print(f"  Title: {title}")
    print(f"  Image: {img}")
