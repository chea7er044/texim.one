document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // 1. МОБИЛНО БУРГЕР МЕНЮ (TOGGLE)
    // ==========================================
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

    // ==========================================
    // 2. ПЛАВНА НАВИГАЦИЯ (SMOOTH SCROLL)
    // ==========================================
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

    // ==========================================
    // 3. СИНХРОНИЗАЦИЯ НА ЦВЕТОВЕТЕ И МИНИАТЮРИТЕ
    // ==========================================
    const mainImg = document.getElementById('main-product-img');
    const colorNameLabel = document.getElementById('selected-color-name');
    
    const swatches = document.querySelectorAll('.swatch');
    const thumbnails = document.querySelectorAll('.thumb-item');

    function updateSelectedColor(colorCode) {
        // Намираме съответния цвят и миниатюра
        const activeSwatch = document.querySelector(`.swatch[data-color="${colorCode}"]`);
        const activeThumb = document.querySelector(`.thumb-item[data-color="${colorCode}"]`);

        if (!activeSwatch || !activeThumb) return;

        // Премахваме активните класове от всички
        swatches.forEach(s => s.classList.remove('active'));
        thumbnails.forEach(t => t.classList.remove('active'));

        // Добавяме активен клас на избраните елементи
        activeSwatch.classList.add('active');
        activeThumb.classList.add('active');

        // Сменяме основното изображение и текста с името на цвята
        const newImgSrc = activeSwatch.getAttribute('data-img');
        const newColorName = activeSwatch.getAttribute('data-color-name');

        if (mainImg && newImgSrc) {
            mainImg.src = newImgSrc;
        }
        if (colorNameLabel && newColorName) {
            colorNameLabel.textContent = newColorName;
        }
    }

    // Клик върху квадратче с цвят
    swatches.forEach(swatch => {
        swatch.addEventListener('click', () => {
            const color = swatch.getAttribute('data-color');
            updateSelectedColor(color);
        });
    });

    // Клик върху миниатюра с модел
    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', () => {
            const color = thumb.getAttribute('data-color');
            updateSelectedColor(color);
        });
    });
});
