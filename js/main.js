:root {
    --primary-color: #003366; /* Navy blue */
    --secondary-color: #ffffff;
    --text-color: #333333;
}

body {
    margin: 0;
    padding: 0;
    font-family: 'Arial', sans-serif;
    line-height: 1.6;
}

.navbar {
    background-color: var(--primary-color);
    padding: 1rem;
    color: var(--secondary-color);
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.nav-logo {
    height: 40px;
    width: auto;
}

.nav-links {
    list-style: none;
    display: flex;
    gap: 2rem;
    margin: 0;
    padding: 0;
}

.nav-links a {
    color: var(--secondary-color);
    text-decoration: none;
}

.language-selector button {
    background: none;
    border: 1px solid var(--secondary-color);
    color: var(--secondary-color);
    padding: 5px 10px;
    cursor: pointer;
    margin-left: 5px;
}

.hero-section {
    position: relative;
    height: 80vh;
    background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
                url('../images/4valles-montana2.png');
    background-size: cover;
    background-position: center;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: var(--secondary-color);
}

.hero-content {
    padding: 2rem;
    max-width: 800px;
}// Esperar a que el documento esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Establecer idioma inicial basado en el navegador
    const userLanguage = navigator.language.substring(0, 2);
    if (userLanguage === 'fr' || userLanguage === 'en') {
        changeLanguage(userLanguage);
    } else {
        changeLanguage('fr'); // Idioma por defecto: francés
    }
});

// Función para cambiar el idioma
function changeLanguage(lang) {
    // Cambiar el atributo lang del HTML
    document.documentElement.lang = lang;
    
    // Actualizar todos los elementos con atributos data-lang
    const elements = document.querySelectorAll('[data-' + lang + ']');
    
    elements.forEach(element => {
        // Guardar el texto actual antes de cambiarlo (para poder volver atrás si es necesario)
        const currentText = element.textContent;
        const newText = element.getAttribute('data-' + lang);
        
        // Solo actualizar si el texto es diferente
        if (currentText !== newText) {
            element.textContent = newText;
        }
    });

    // Actualizar los botones de idioma para mostrar cuál está activo
    const buttons = document.querySelectorAll('.language-selector button');
    buttons.forEach(button => {
        if (button.textContent.toLowerCase() === lang.toLowerCase()) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });

    // Guardar la preferencia de idioma en localStorage
    localStorage.setItem('preferredLanguage', lang);
}

// Función para manejar el scroll suave a las secciones
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

// Función para añadir clase activa al menú cuando se hace scroll
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 60) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === currentSection) {
            link.classList.add('active');
        }
    });
});

// Añadir clase para animación de aparición al hacer scroll
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});
