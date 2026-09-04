// ========== МЕНЮ НАВИГАЦИИ ==========
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

// Открытие/закрытие мобильного меню
hamburger.addEventListener('click', () => {
    navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
    
    // Анимация гамбургера
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = navMenu.style.display === 'flex' ? 'rotate(45deg) translateY(15px)' : 'none';
    spans[1].style.opacity = navMenu.style.display === 'flex' ? '0' : '1';
    spans[2].style.transform = navMenu.style.display === 'flex' ? 'rotate(-45deg) translateY(-15px)' : 'none';
});

// Закрытие меню при клике на ссылку
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.style.display = 'none';
    });
});

// ========== ПЛАВНАЯ ПРОКРУТКА К СЕКЦИЯМ ==========
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// ========== ОБРАБОТКА ФОРМЫ КОНТАКТЫ ==========
function handleSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const inputs = form.querySelectorAll('input, textarea');
    
    // Получение данных формы
    const name = inputs[0].value;
    const email = inputs[1].value;
    const message = inputs[2].value;
    
    // Валидация
    if (!name || !email || !message) {
        alert('Пожалуйста, заполните все поля!');
        return;
    }
    
    // Проверка email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Пожалуйста, введите корректный email!');
        return;
    }
    
    // Имитация отправки (в реальном проекте здесь была бы отправка на сервер)
    console.log('Форма отправлена:', {
        name,
        email,
        message,
        timestamp: new Date().toLocaleString('ru-RU')
    });
    
    // Показываем сообщение об успехе
    alert('✅ Спасибо! Ваше сообщение отправлено.\n\nВ реальном проекте это сообщение было бы отправлено на почту.');
    
    // Очистка формы
    form.reset();
}

// ========== АНИМАЦИЯ ПРИ ПРОКРУТКЕ ==========
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Наблюдаем за элементами
document.querySelectorAll('.project-card, .about-content').forEach(el => {
    observer.observe(el);
});

// ========== ДОБАВЛЕНИЕ CSS АНИМАЦИИ ==========
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// ========== АКТИВНЫЙ ПУНКТ МЕНЮ ==========
window.addEventListener('scroll', () => {
    let current = '';
    
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.style.color = 'var(--primary-color)';
        } else {
            link.style.color = 'var(--text-dark)';
        }
    });
});

// ========== СГЛАЖИВАНИЕ ЗАГРУЗКИ ==========
document.addEventListener('DOMContentLoaded', () => {
    // Добавляем класс loaded к body для завершения анимаций
    document.body.classList.add('loaded');
    
    // Логирование в консоль
    console.log('✅ Портфолио загружено успешно!');
    console.log('📧 Email для контактов: your@email.com');
    console.log('🚀 Проект создан с HTML, CSS и JavaScript');
});

// ========== ОБРАБОТКА ОШИБОК ==========
window.addEventListener('error', (event) => {
    console.error('❌ Ошибка:', event.error);
});

// ========== УТИЛИТЫ ==========

// Функция для копирования в буфер обмена
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert('Скопировано: ' + text);
    }).catch(err => {
        console.error('Ошибка копирования:', err);
    });
}

// Функция для отправки письма (если нужна интеграция)
function sendEmail(email, subject, body) {
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
}

// ========== ТЕМНАЯ ТЕМА (ОПЦИОНАЛЬНО) ==========
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

// Проверка сохранённого режима
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}

// ========== ПРОКРУТКА К ВЕРХНЕЙ ЧАСТИ ==========
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '⬆️';
scrollToTopBtn.id = 'scrollToTop';
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    color: white;
    border: none;
    cursor: pointer;
    font-size: 20px;
    display: none;
    z-index: 999;
    box-shadow: 0 5px 20px rgba(99, 102, 241, 0.3);
    transition: all 0.3s ease;
`;

document.body.appendChild(scrollToTopBtn);

// Показываем/скрываем кнопку при прокрутке
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.style.display = 'flex';
        scrollToTopBtn.style.justifyContent = 'center';
        scrollToTopBtn.style.alignItems = 'center';
    } else {
        scrollToTopBtn.style.display = 'none';
    }
});

// Функционал кнопки
scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Эффект при наведении на кнопку
scrollToTopBtn.addEventListener('mouseover', () => {
    scrollToTopBtn.style.transform = 'scale(1.1)';
});

scrollToTopBtn.addEventListener('mouseout', () => {
    scrollToTopBtn.style.transform = 'scale(1)';
});
