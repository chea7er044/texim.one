document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. МОБИЛНО БУРГЕР МЕНЮ (TOGGLE)
    // ==========================================
    const burgerBtn = document.getElementById('burgerBtn');
    const navMenu = document.getElementById('navMenu');

    if (burgerBtn && navMenu) {
        burgerBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            navMenu.classList.toggle('active');
            
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

        // Затваряне на менюто при клик извън него
        document.addEventListener('click', (e) => {
            if (navMenu.classList.contains('active') && !navMenu.contains(e.target) && !burgerBtn.contains(e.target)) {
                navMenu.classList.remove('active');
                const icon = burgerBtn.querySelector('i');
                if (icon) {
                    icon.className = 'fa-solid fa-bars';
                }
            }
        });
    }

    // ==========================================
    // 2. ПЛАВНА НАВИГАЦИЯ (SMOOTH SCROLL)
    // ==========================================
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            
            if (targetId && targetId !== '#') {
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

    // ==========================================
    // 3. СИНХРОНИЗАЦИЯ НА ЦВЕТОВЕТЕ И МИНИАТЮРИТЕ
    // ==========================================
    const mainImg = document.getElementById('main-product-img');
    const colorNameLabel = document.getElementById('selected-color-name');
    
    const swatches = document.querySelectorAll('.swatch');
    const thumbnails = document.querySelectorAll('.thumb-item');

    function updateSelectedColor(colorCode) {
        if (!colorCode) return;

        const activeSwatch = document.querySelector(`.swatch[data-color="${colorCode}"]`);
        const activeThumb = document.querySelector(`.thumb-item[data-color="${colorCode}"]`);

        // Премахваме активния клас от всички налични елементи
        swatches.forEach(s => s.classList.remove('active'));
        thumbnails.forEach(t => t.classList.remove('active'));

        // Маркираме избрания цвят и миниатюра (ако съществуват)
        if (activeSwatch) activeSwatch.classList.add('active');
        if (activeThumb) {
            activeThumb.classList.add('active');
            activeThumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }

        const newImgSrc = activeSwatch ? activeSwatch.getAttribute('data-img') : null;
        const newColorName = activeSwatch ? activeSwatch.getAttribute('data-color-name') : null;

        // Смяна на текста с името на цвета
        if (colorNameLabel && newColorName) {
            colorNameLabel.textContent = newColorName;
        }

        // Смяна на основното изображение с кратък плавен преход
        if (mainImg && newImgSrc && mainImg.src !== newImgSrc) {
            mainImg.style.opacity = '0.3';
            setTimeout(() => {
                mainImg.src = newImgSrc;
                mainImg.style.opacity = '1';
            }, 120);
        }
    }

    // Клик събитие за квадратите с цвят
    swatches.forEach(swatch => {
        swatch.addEventListener('click', () => {
            const color = swatch.getAttribute('data-color');
            updateSelectedColor(color);
        });
    });

    // Клик събитие за миниатюрите
    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', () => {
            const color = thumb.getAttribute('data-color');
            updateSelectedColor(color);
        });
    });

    // CSS стилизация за плавен преход на изображението
    if (mainImg) {
        mainImg.style.transition = 'opacity 0.15s ease-in-out';
    }
});
