// scripts.js

document.addEventListener('DOMContentLoaded', () => {

    // 1. Navbar Sticky Effects (Aumentar e diminuir tamanho com scroll)
    const navbar = document.querySelector('.navbar');
    
    // Adicionar um CSS de transição no header via script para não alterar o style base 
    navbar.style.transition = 'all 0.3s ease';

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = 'var(--shadow-lg, 0 8px 15px rgba(0,0,0,0.1))';
            navbar.style.padding = '10px 5%'; // Diminui o padding da navbar
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        } else {
            navbar.style.boxShadow = 'var(--shadow-sm, 0 2px 4px rgba(0,0,0,0.05))';
            navbar.style.padding = '1rem 5%'; // Estilo original
            navbar.style.backgroundColor = 'var(--bg-white, #FFFFFF)';
        }
    });

    // 2. Smooth Scroll para links internos (#âncoras)
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    smoothScrollLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            // Ignorar links falsos (# apenas)
            if (targetId === '#') return;

            // Se for link limpo com ID
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const cleanTarget = targetId.substring(1);
                const targetElement = document.getElementById(cleanTarget);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 85, // Ajusta altura exata da navbar
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // 3. Efeitos visuais modernos nas imagens de Blog para UX Premium
    const blogCards = document.querySelectorAll('.blog-card, .tool-card, .course-card');
    blogCards.forEach(card => {
        card.style.transition = 'transform 0.4s ease, box-shadow 0.4s ease'; // Garante movimento suave

        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px)';
            card.style.boxShadow = '0 15px 30px rgba(0,0,0,0.1)';
            
            const titleElement = card.querySelector('.blog-title a, h3');
            if (titleElement) {
                titleElement.style.color = 'var(--artsy-red)';
                titleElement.style.transition = 'color 0.3s ease';
            }
        });

        card.addEventListener('mouseleave', () => {
             card.style.transform = 'translateY(0)';
             card.style.boxShadow = 'var(--shadow-sm, 0 2px 10px rgba(0,0,0,0.05))';

             const titleElement = card.querySelector('.blog-title a, h3');
             if (titleElement) {
                 titleElement.style.color = 'var(--dark-navy, #001a33)';
             }
        });
    });


    // 4. Efeito de Entrada em Elementos (Fade In On Scroll)
    // Seleciona seções importantes, grids, e cards que precisaremos animar
    const faders = document.querySelectorAll('.section-title, .section-subtitle, .feature-card, .blog-card, .mission-card');

    // Estado inicial: todos os faders invisíveis e descidos
    faders.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    });

    const appearOptions = {
        threshold: 0.15, // Animação começa a 15% visível
        rootMargin: "0px 0px -50px 0px" 
    };

    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) { return; } 
            else {
                // Ao bater no scoll, volta para transparência 1 e Y 0
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                // Para não animar novamente ao subir
                appearOnScroll.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => appearOnScroll.observe(fader));


    // 5. Interação Simples do Botão de Formulário (Netlify Loading State)
    const forms = document.querySelectorAll('form[data-netlify="true"]');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            const submitBtn = form.querySelector('button[type="submit"]');
            if (submitBtn) {
                // Altera o estado visual enquanto o Netlify processa o formulário B2B
                submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Enviando...';
                submitBtn.style.opacity = '0.8';
                submitBtn.style.cursor = 'not-allowed';
            }
        });
    });

});
