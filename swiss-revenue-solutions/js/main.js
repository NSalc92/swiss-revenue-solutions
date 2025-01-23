document.addEventListener('DOMContentLoaded', function() {
    // Establecer idioma inicial
    const userLanguage = navigator.language.substring(0, 2);
    if (userLanguage === 'fr' || userLanguage === 'en') {
        changeLanguage(userLanguage);
    } else {
        changeLanguage('fr');
    }

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(0, 51, 102, 0.95)';
        } else {
            navbar.style.backgroundColor = 'var(--primary-color)';
        }
    });

    // Smooth scroll para los enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Función para cambiar el idioma
function changeLanguage(lang) {
    document.documentElement.lang = lang;
    
    // Actualizar todos los elementos con data-lang
    document.querySelectorAll(`[data-\${lang}]`).forEach(element => {
        element.textContent = element.getAttribute(`data-\${lang}`);
    });

    // Actualizar botones de idioma
    document.querySelectorAll('.language-selector button').forEach(button => {
        if (button.textContent.toLowerCase() === lang.toLowerCase()) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });

    // Guardar preferencia de idioma
    localStorage.setItem('preferredLanguage', lang);
}

// Animaciones al hacer scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar elementos para animaciones
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
    observer.observe(section);
});

        
