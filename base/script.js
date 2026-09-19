document.addEventListener('DOMContentLoaded', () => {
    // 1. Мобилно бургер меню (Toggle)
    const burgerBtn = document.getElementById('burgerBtn');
    const navMenu = document.getElementById('navMenu');

    if (burgerBtn && navMenu) {
        burgerBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            
            // Смяна на иконата при отваряне/затваряне
            const icon = burgerBtn.querySelector('i');
            if (icon) {
                if (navMenu.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-xmark');
                } else {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            }
        });
    }

    // 2. Плавна навигация (Smooth Scroll)
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            
            if (targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });

                    // Затваряне на мобилното меню при клик върху линк
                    if (navMenu && navMenu.classList.contains('active')) {
                        navMenu.classList.remove('active');
                        const icon = burgerBtn ? burgerBtn.querySelector('i') : null;
                        if (icon) {
                            icon.className = 'fa-solid fa-bars';
                        }
                    }
                }
            }
        });
    });
});
