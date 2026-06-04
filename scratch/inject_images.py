import os
import glob
import re

mapping = {
    'artigo-cnpj-airbnb-vale-a-pena.astro': '/guia-imposto-de-renda-anfitriao-airbnb.avif',
    'artigo-como-responder-avaliacao-negativa-airbnb.astro': '/gestao-de-crise-e-seguranca-airbnb.avif',
    'artigo-decoracao-tematica-airbnb-2026.astro': '/decoracao-minimalista-airbnb-superhost.avif',
    'artigo-fotos-profissionais-airbnb-celular.astro': '/metricas-desempenho-anfitriao-airbnb.avif',
    'artigo-gestao-financeira-airbnb-planilha.astro': '/guia-imposto-de-renda-anfitriao-airbnb.avif',
    'artigo-inteligencia-artificial-ferramentas-airbnb.astro': '/automacao-whatsapp-gerenciamento-airbnb.avif',
    'artigo-perfil-anfitriao-airbnb-como-criar.astro': '/como-ser-superhost-airbnb-5-estrelas.avif',
    'artigo-quanto-ganha-anfitriao-airbnb-sc.astro': '/apartamento-luxo-balneario-camboriu-airbnb.avif',
    'artigo-reforma-tributaria-airbnb-2026.astro': '/guia-imposto-de-renda-anfitriao-airbnb.avif',
    'artigo-stj-condominios-proibicao-airbnb-2026.astro': '/gestao-de-crise-e-seguranca-airbnb.avif',
    'artigo-workation-airbnb-santa-catarina.astro': '/apartamento-praia-brava-itajai-aluguel.avif',
}

files = glob.glob('src/pages/*.astro')

for file in files:
    filename = os.path.basename(file)
    if filename in mapping:
        with open(file, 'r', encoding='utf-8') as f:
            content = f.read()
            
        img_src = mapping[filename]
        img_tag = f'<img src="{img_src}" alt="Imagem do artigo" class="article-hero-image" style="width: 100%; border-radius: 8px; margin-bottom: 2rem;" />'
        
        if img_tag in content:
            continue
            
        # find the <article class="article-content"> and insert the image right after it
        new_content = re.sub(
            r'(<article class="article-content">\s*)',
            r'\g<1>' + img_tag + r'\n            ',
            content
        )
        
        with open(file, 'w', encoding='utf-8') as f:
            f.write(new_content)
        
        print(f"Updated {filename}")
