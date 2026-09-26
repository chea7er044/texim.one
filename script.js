document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. МОБИЛНО БУРГЕР МЕНЮ И ХЕДЪР БАНЕРИ
    // ==========================================
    const burgerBtn = document.getElementById('burgerBtn');
    const navMenu = document.getElementById('navMenu');
    const headerBadges = document.querySelector('.header-badges');

    // Клониране на индикаторите вътре в мобилното меню (ако са скрити в хедъра на мобилни)
    if (navMenu && headerBadges && !document.querySelector('.mobile-badges-wrapper')) {
        const mobileBadgesWrapper = document.createElement('li');
        mobileBadgesWrapper.className = 'mobile-badges-wrapper';
        mobileBadgesWrapper.innerHTML = headerBadges.innerHTML;
        navMenu.appendChild(mobileBadgesWrapper);
    }

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
            
            if (targetId && targetId.length > 1) {
                try {
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
                } catch (err) {
                    // Предотвратява срив при невалидни ID-та
                }
            }
        });
    });

    // ==========================================
    // 3. СИНХРОНИЗАЦИЯ НА ЦВЕТОВЕТЕ И МИНИАТЮРИТЕ
    // ==========================================
    const mainImg = document.getElementById('main-product-img');
    const colorNameLabel = document.getElementById('selected-color-name');
    
    const swatches = document.querySelectorAll('.swatch, .color-box');
    const thumbnails = document.querySelectorAll('.thumb-item, .thumb');

    function changeMainImage(newSrc) {
        if (mainImg && newSrc && mainImg.src !== newSrc) {
            mainImg.style.opacity = '0.3';
            setTimeout(() => {
                mainImg.src = newSrc;
                mainImg.style.opacity = '1';
            }, 120);
        }
    }

    function updateSelectedColor(colorCode) {
        if (!colorCode) return;

        const activeSwatch = document.querySelector(`[data-color="${colorCode}"]`);
        const activeThumb = document.querySelector(`.thumb-item[data-color="${colorCode}"], .thumb[data-color="${colorCode}"]`);

        swatches.forEach(s => s.classList.remove('active'));
        thumbnails.forEach(t => t.classList.remove('active'));

        if (activeSwatch) activeSwatch.classList.add('active');
        if (activeThumb) {
            activeThumb.classList.add('active');
            activeThumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }

        const newImgSrc = activeSwatch ? activeSwatch.getAttribute('data-img') : null;
        const newColorName = activeSwatch ? activeSwatch.getAttribute('data-color-name') : null;

        if (colorNameLabel && newColorName) {
            colorNameLabel.textContent = newColorName;
        }

        if (newImgSrc) {
            changeMainImage(newImgSrc);
        }
    }

    swatches.forEach(swatch => {
        swatch.addEventListener('click', () => {
            const color = swatch.getAttribute('data-color');
            updateSelectedColor(color);
        });
    });

    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', () => {
            const color = thumb.getAttribute('data-color');
            if (color) {
                updateSelectedColor(color);
            } else {
                const imgSrc = thumb.getAttribute('data-img') || thumb.getAttribute('src');
                thumbnails.forEach(t => t.classList.remove('active'));
                thumb.classList.add('active');
                changeMainImage(imgSrc);
            }
        });
    });

    if (mainImg) {
        mainImg.style.transition = 'opacity 0.15s ease-in-out';
    }

    // ==========================================
    // 4. ДИНАМИЧЕН ПРОДУКТОВ МОДАЛЕН ПРОЗОРЕЦ (QUICK VIEW)
    // ==========================================
    const productCards = document.querySelectorAll('.product-card');
    const modal = document.getElementById('productModal');

    if (modal && productCards.length > 0) {
        const modalImg = document.getElementById('modalImg') || modal.querySelector('.modal-image-wrapper img');
        const modalCode = document.getElementById('modalCode') || modal.querySelector('.modal-code');
        const modalTitle = document.getElementById('modalTitle') || modal.querySelector('.modal-title');
        const modalPrice = document.getElementById('modalPrice') || modal.querySelector('.modal-price');
        const modalColors = document.getElementById('modalColors') || modal.querySelector('.modal-colors-count');
        const modalDescription = document.getElementById('modalDescription');
        const modalFabric = document.getElementById('modalFabric');

        const modalCloseBtn = document.getElementById('modalCloseBtn') || modal.querySelector('.modal-close-btn');
        const modalOverlay = document.getElementById('modalOverlay') || modal.querySelector('.modal-overlay');

        function openModal(card) {
            // Вземане от data- атрибути или fallback от структурата на картата
            const code = card.getAttribute('data-code') || card.querySelector('.product-code')?.textContent || '';
            const title = card.getAttribute('data-title') || card.querySelector('.product-title')?.textContent || '';
            const price = card.getAttribute('data-price') || card.querySelector('.product-card-price')?.textContent || '';
            const imgSrc = card.getAttribute('data-img') || card.querySelector('.product-img')?.src || '';
            const colors = card.getAttribute('data-colors') || '';
            const description = card.getAttribute('data-description') || '';
            const fabric = card.getAttribute('data-fabric') || '';

            if (modalImg && imgSrc) modalImg.src = imgSrc;
            if (modalCode) modalCode.textContent = code;
            if (modalTitle) modalTitle.textContent = title;
            if (modalPrice) modalPrice.textContent = price;
            if (modalColors) modalColors.textContent = colors;
            if (modalDescription) modalDescription.textContent = description;
            
            if (modalFabric) {
                modalFabric.textContent = fabric;
                modalFabric.style.whiteSpace = 'pre-line'; // Запазва новите редове от data-fabric
            }

            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeModal() {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }

        productCards.forEach(card => {
            card.addEventListener('click', () => openModal(card));
        });

        if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
        if (modalOverlay) modalOverlay.addEventListener('click', closeModal);

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeModal();
            }
        });
    }

    // ==========================================
    // 5. ПРЕВКЛЮЧВАНЕ НА ТАБОВЕ (PRODUCT TABS)
    // ==========================================
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    if (tabBtns.length > 0 && tabContents.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const targetTab = btn.getAttribute('data-tab');

                tabBtns.forEach(b => b.classList.remove('active'));
                tabContents.forEach(c => c.classList.remove('active'));

                btn.classList.add('active');
                if (targetTab) {
                    const activeContent = document.getElementById(targetTab);
                    if (activeContent) activeContent.classList.add('active');
                }
            });
        });
    }
});
