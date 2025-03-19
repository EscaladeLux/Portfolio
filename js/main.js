// Mobile menu functionality
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navList = document.querySelector('.nav-list');

mobileMenuBtn.addEventListener('click', () => {
    navList.style.display = navList.style.display === 'flex' ? 'none' : 'flex';
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            if (window.innerWidth <= 768) {
                navList.style.display = 'none';
            }
        }
    });
});

// Form submission handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Here you would typically send the data to a server
        // For now, we'll just show a success message
        alert('Спасибо за ваше сообщение! Мы свяжемся с вами в ближайшее время.');
        this.reset();
    });
}

// Add scroll-based animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Безопасное отображение контактов
const contactLinks = {
    whatsapp: '+7 (901) 745-45-90',
    telegram: '@EscaladeLux',
    email: 'garanrzorgeeru@mail.ru'
};

document.querySelectorAll('.contact-item').forEach(item => {
    item.addEventListener('click', function() {
        const type = this.querySelector('i').classList.contains('fa-whatsapp') ? 'whatsapp' :
                    this.querySelector('i').classList.contains('fa-telegram') ? 'telegram' :
                    'email';
        
        const p = this.querySelector('p');
        const currentText = p.textContent;
        
        if (currentText.includes('X')) {
            p.textContent = `${type.charAt(0).toUpperCase() + type.slice(1)}: ${contactLinks[type]}`;
            setTimeout(() => {
                p.textContent = currentText;
            }, 5000); // Скрыть через 5 секунд
        }
    });
});

// Обработка клика по социальным кнопкам в футере
document.querySelectorAll('.social-links a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const type = this.classList.contains('whatsapp') ? 'whatsapp' : 'telegram';
        const contact = contactLinks[type];
        
        if (confirm(`Показать контакт ${type}?`)) {
            if (type === 'whatsapp') {
                window.open(`https://wa.me/${contact.replace(/\D/g, '')}`, '_blank');
            } else {
                window.open(`https://t.me/${contact.replace('@', '')}`, '_blank');
            }
        }
    });
}); 