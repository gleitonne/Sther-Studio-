document.addEventListener('DOMContentLoaded', () => {
    // Dark Mode Toggle
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (themeToggleBtn) {
        const themeIcon = themeToggleBtn.querySelector('i');
        
        // Verifica se há tema salvo
        if (localStorage.getItem('theme') === 'dark') {
            document.body.classList.add('dark-mode');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }

        themeToggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');
            
            if (isDark) {
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
                localStorage.setItem('theme', 'dark');
            } else {
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
                localStorage.setItem('theme', 'light');
            }
        });
    }

    // Menu Mobile Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    const navbar = document.getElementById('navbar');

    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        const icon = mobileMenuBtn.querySelector('i');
        if (mobileMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Fechar menu mobile ao clicar em um link
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    // Navbar Scroll Effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
            navbar.style.padding = '10px 0';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
            navbar.style.padding = '16px 0';
        }

        // Active link logic
        const sections = document.querySelectorAll('section, footer');
        const navLinks = document.querySelectorAll('.nav-links a');
        
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Formulário do WhatsApp
    const whatsappForm = document.getElementById('whatsappForm');
    if (whatsappForm) {
        whatsappForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const service = document.getElementById('service').value;
            const message = document.getElementById('message').value;
            
            let text = `Olá! Meu nome é ${name}. Gostaria de agendar ou saber mais sobre: ${service}.`;
            if (message) {
                text += `\n\nMensagem: ${message}`;
            }
            
            const encodedText = encodeURIComponent(text);
            const whatsappNumber = '5511961010296';
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedText}`;
            
            window.open(whatsappUrl, '_blank');
        });
    }

    // Lightbox / Zoom na Galeria com Carrossel
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');
    const galleryImages = document.querySelectorAll('.gallery-item img');
    let currentIndex = 0;

    if (lightbox && galleryImages.length > 0) {
        
        function updateLightbox(index) {
            const img = galleryImages[index];
            lightboxImg.src = img.src;
            
            if (img.classList.contains('crop-status')) {
                lightboxImg.classList.add('crop-status-lightbox');
            } else {
                lightboxImg.classList.remove('crop-status-lightbox');
            }
            if (img.classList.contains('crop-extra')) {
                lightboxImg.classList.add('crop-extra-lightbox');
            } else {
                lightboxImg.classList.remove('crop-extra-lightbox');
            }
        }

        // Abrir o lightbox ao clicar na imagem
        galleryImages.forEach((img, index) => {
            img.addEventListener('click', function() {
                currentIndex = index;
                lightbox.classList.add('show');
                updateLightbox(currentIndex);
                // Impede o scroll do body quando o lightbox está aberto
                document.body.style.overflow = 'hidden';
            });
        });

        const showNext = () => {
            currentIndex = (currentIndex + 1) % galleryImages.length;
            updateLightbox(currentIndex);
        };

        const showPrev = () => {
            currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
            updateLightbox(currentIndex);
        };

        if(lightboxNext) lightboxNext.addEventListener('click', showNext);
        if(lightboxPrev) lightboxPrev.addEventListener('click', showPrev);

        // Função para fechar
        const closeLightbox = () => {
            lightbox.classList.remove('show');
            document.body.style.overflow = '';
        };

        // Fechar ao clicar no "X"
        if(lightboxClose) lightboxClose.addEventListener('click', closeLightbox);

        // Fechar ao clicar fora da imagem (no fundo)
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });

        // Controles de teclado
        document.addEventListener('keydown', function(e) {
            if (!lightbox.classList.contains('show')) return;
            
            if (e.key === 'Escape') {
                closeLightbox();
            } else if (e.key === 'ArrowRight') {
                showNext();
            } else if (e.key === 'ArrowLeft') {
                showPrev();
            }
        });
    }
});
