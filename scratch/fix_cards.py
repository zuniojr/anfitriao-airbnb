import re
import os
import glob

# Search in specific files
files_to_fix = glob.glob('src/pages/*.astro')

# Pattern to find article block
# We find everything from <article class="blog-card"> to </article>
# But wait, it's safer to use re.sub with a function

def replace_card(match):
    article_content = match.group(0)
    
    # Try to find the href inside the article
    link_match = re.search(r'<h3[^>]*>\s*<a\s+href="([^"]+)">([^<]+)</a>\s*</h3>', article_content)
    if not link_match:
        # Check if already converted
        if not re.search(r'<a.*?<article', article_content, re.DOTALL):
            return article_content # no link found, or already processed
        return article_content
    
    url = link_match.group(1)
    title_text = link_match.group(2)
    
    # Remove the <a> tag inside <h3>
    new_h3 = f'<h3 class="blog-title">{title_text}</h3>'
    # There could be other classes in h3, let's just replace the exact match
    old_h3 = match.group(0)[link_match.start():link_match.end()]
    
    # We replace the h3 block in the article
    new_article_content = article_content[:link_match.start()] + new_h3 + article_content[link_match.end():]
    
    # Wrap with block level <a>
    wrapped = f'<a href="{url}" style="text-decoration: none; color: inherit; display: block;">\n{new_article_content}\n</a>'
    return wrapped

def replace_card2(match):
    # simpler approach using sub
    text = match.group(0)
    href_match = re.search(r'<h3 class="blog-title"><a href="([^"]+)">([^<]+)</a></h3>', text)
    if not href_match:
        return text
    
    href = href_match.group(1)
    title = href_match.group(2)
    
    text = text.replace(href_match.group(0), f'<h3 class="blog-title">{title}</h3>')
    
    return f'<a href="{href}" style="text-decoration: none; color: inherit; display: block;">\n                {text}\n            </a>'


for file_path in files_to_fix:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # The regex to find <article class="blog-card"> ... </article>
    # Note: re.DOTALL is needed
    new_content = re.sub(r'<article class="blog-card">.*?</article>', replace_card2, content, flags=re.DOTALL)
    
    if new_content != content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Fixed {file_path}")

