// scripts.js

document.addEventListener('DOMContentLoaded', () => {

    // Adiciona "Sticky" header com box shadow ao rolar
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = 'var(--shadow-md)';
        } else {
            navbar.style.boxShadow = 'var(--shadow-sm)';
        }
    });

    // Smooth Scroll para links internos (Âncoras)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Ajuste do tamanho do header
                    behavior: 'smooth'
                });
            }
        });
    });

    // Simulação de captura da Newsletter
    const form = document.querySelector('.newsletter-form');
    if(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = form.querySelector('input[type="email"]');
            alert(`Sucesso! O checklist será enviado para: ${emailInput.value} (Simulação)`);
            emailInput.value = '';
        });
    }

    // Micro-interações nas imagens de Blog para UX Premium
    const blogCards = document.querySelectorAll('.blog-card');
    blogCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.querySelector('.blog-title a').style.color = 'var(--artsy-red)';
        });
        card.addEventListener('mouseleave', () => {
            card.querySelector('.blog-title a').style.color = 'var(--text-dark)';
        });
    });

});
