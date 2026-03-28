import os
import re

new_footer = """    <!-- Footer -->
    <footer class="footer">
        <div class="footer-grid">
            <div class="footer-about">
                <a href="index.html" style="text-decoration: none; color: inherit;">
                    <h3><i class="fa-solid fa-house-user"></i> <span style="color: black;">Anfitrião</span> Airbnb</h3>
                </a>
                <p>O maior portal educacional para anfitriões e gestores de aluguel por temporada no Brasil.</p>
            </div>
            <div class="footer-links">
                <h4>Guias Principais</h4>
                <ul>
                    <li><a href="dicas.html">Como começar do zero</a></li>
                    <li><a href="regras.html">Regras da Casa Ideais</a></li>
                </ul>
            </div>
            <div class="footer-links">
                <h4>Monetize seu Imóvel</h4>
                <ul>
                    <li><a href="ferramentas.html">Ferramentas Essenciais</a></li>
                    <li><a href="consultoria.html">Mentoria VIP</a></li>
                </ul>
            </div>
            <div class="footer-links">
                <h4>Institucional</h4>
                <ul>
                    <li><a href="sobre.html">Sobre a Empresa</a></li>
                    <li><a href="contato.html">Contato & Parcerias</a></li>
                </ul>
            </div>
        </div>
        <div class="footer-bottom">
            &copy; 2026 Anfitriões Airbnb. Todos os direitos reservados.
        </div>
    </footer>"""

directory = r'c:\Users\Osmar Junior\Desktop\anfitriaoairbnb'

for filename in os.listdir(directory):
    if filename.endswith(".html"):
        filepath = os.path.join(directory, filename)
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Regex to find the entire footer block including the optional comment above it
        # We look for <footer and the corresponding </footer>
        new_content = re.sub(r'(<!-- Footer -->)?\s*<footer.*?>.*?</footer>', new_footer, content, flags=re.DOTALL)
        
        if new_content != content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Updated: {filename}")
        else:
            print(f"No changes for: {filename}")
