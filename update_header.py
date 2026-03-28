import os
import re

new_header = """    <!-- Header / Navbar -->
    <header class="navbar">
        <div class="logo-container">
            <a href="index.html" style="text-decoration: none;">
                <h1><i class="fa-solid fa-house-user"></i> <span style="color: black;">Anfitrião</span> Airbnb</h1>
            </a>
        </div>
        <nav>
            <ul class="nav-links">
                <li><a href="index.html">Início</a></li>
                <li><a href="dicas.html">Dicas para Anfitriões</a></li>
                <li><a href="precificacao.html">Precificação Inteligente</a></li>
                <li><a href="gestao.html">Gestão e Automação</a></li>
                <li><a href="sobre.html">Sobre</a></li>
            </ul>
        </nav>
        <div class="nav-actions">
            <a href="index.html#newsletter" class="btn-primary">Baixar Guia Grátis</a>
        </div>
    </header>"""

directory = r'c:\Users\Osmar Junior\Desktop\anfitriaoairbnb'

for filename in os.listdir(directory):
    if filename.endswith(".html"):
        filepath = os.path.join(directory, filename)
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Regex to find the entire header block including the optional comment above it
        # Patterns like <header class="navbar"> ... </header>
        new_content = re.sub(r'(<!-- Header / Navbar -->)?\s*<header class="navbar".*?>.*?</header>', new_header, content, flags=re.DOTALL)
        
        if new_content != content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Updated: {filename}")
        else:
            # Try matching for different header classes or structures if needed
            # For example, some files might just have <header class="navbar"> without the comment
            pass
