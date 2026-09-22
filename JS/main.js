// ========== 1. TYPING EFFECT ==========
const texts = ["Python Developer", "Backend Engineer", "Django Expert", "API Specialist"];
let count = 0;
let index = 0;
let currentText = "";
let letter = "";
let isDeleting = false;

function type() {
    if (count === texts.length) {
        count = 0;
    }
    currentText = texts[count];
    if (isDeleting) {
        letter = currentText.slice(0, --index);
    } else {
        letter = currentText.slice(0, ++index);
    }
    document.getElementById("typedText").textContent = letter;
    if (!isDeleting && letter.length === currentText.length) {
        isDeleting = true;
        setTimeout(type, 2000);
    } else if (isDeleting && letter.length === 0) {
        isDeleting = false;
        count++;
        setTimeout(type, 500);
    } else {
        setTimeout(type, 100);
    }
}
type();

// ========== 2. THEME TOGGLE ==========
const themeToggle = document.getElementById('themeToggle');
const icon = themeToggle.querySelector('i');
const currentTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', currentTheme);
if (currentTheme === 'light') {
    icon.className = 'fas fa-sun';
}

themeToggle.addEventListener('click', () => {
    let theme = document.documentElement.getAttribute('data-theme');
    if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        icon.className = 'fas fa-sun';
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        icon.className = 'fas fa-moon';
    }
});

// ========== 3. MOBILE MENU ==========
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active'); // FIX: animates hamburger into an X
});

function closeMenu() {
    navLinks.classList.remove('active');
    hamburger.classList.remove('active');
}

// ========== 4. SCROLL REVEAL (throttled via requestAnimationFrame) ==========
let revealTicking = false;
function reveal() {
    const reveals = document.querySelectorAll(".reveal");
    const windowHeight = window.innerHeight;
    const elementVisible = 150;
    reveals.forEach((el) => {
        const elementTop = el.getBoundingClientRect().top;
        if (elementTop < windowHeight - elementVisible) {
            el.classList.add("active");
        }
    });
    revealTicking = false;
}
window.addEventListener("scroll", () => {
    if (!revealTicking) {
        window.requestAnimationFrame(reveal);
        revealTicking = true;
    }
});
reveal();

// ========== 5. ANIMATED SKILL BARS ==========
const skillBars = document.querySelectorAll('.skill-bar-fill');
const skillSection = document.getElementById('skills');

function animateSkills() {
    const rect = skillSection.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
        skillBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            bar.style.width = width + '%';
        });
        window.removeEventListener('scroll', animateSkills);
    }
}
window.addEventListener('scroll', animateSkills);
animateSkills();

// ========== 6. FAQ ACCORDION ==========
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        faqItems.forEach(i => i.classList.remove('active'));
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// ========== 7. BACK TO TOP (throttled) ==========
const backToTopBtn = document.getElementById('backToTop');
let backToTopTicking = false;
window.addEventListener('scroll', () => {
    if (!backToTopTicking) {
        window.requestAnimationFrame(() => {
            backToTopBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
            backToTopTicking = false;
        });
        backToTopTicking = true;
    }
});
backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ========== 8. CONTACT FORM ==========
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.innerHTML;

    submitButton.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';
    submitButton.disabled = true;

    try {
        const response = await fetch(contactForm.action, {
            method: 'POST',
            body: new FormData(contactForm),
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            alert('Thank you for reaching out! Your message has been sent successfully. 😊');
            contactForm.reset();
        } else {
            alert('Sorry, there was a problem sending your message. Please try again.');
        }
    } catch (error) {
        alert('Something went wrong. Please try again later.');
        console.error('Form submission error:', error);
    } finally {
        submitButton.innerHTML = originalButtonText;
        submitButton.disabled = false;
    }
});

// ========== 9. ANIMAL FUN EFFECTS ==========
const animalEmojis = ['🦄', '🐉', '🦊', '🐼', '🐨', '🦁', '🐯', '🐱', '🐶', '🐺', '🦝', '🐮', '🐧', '🐦', '🐤', '🐣', '🐥', '🦆', '🦅', '🦉', '🐴', '🐝', '🐞', '🦋', '🐙', '🦑', '🐬', '🐳', '🐊', '🦕', '🦖'];

const animalButton = document.getElementById('animalButton');
animalButton.addEventListener('click', function () {
    const display = document.getElementById('animalDisplay');
    const randomEmoji = animalEmojis[Math.floor(Math.random() * animalEmojis.length)];

    display.textContent = randomEmoji;
    display.classList.remove('animal-float');
    void display.offsetWidth; // trigger reflow to restart animation
    display.classList.add('animal-float');

    createAnimalBurst(randomEmoji);

    const messages = ['🐾 Woof!', '🦄 Magical!', '🐉 Roar!', '🦊 What does the fox say?', '🐼 Panda-monium!', '🦁 King of the jungle!'];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];

    const button = this;
    const originalText = button.innerHTML;
    button.innerHTML = `<i class="fas fa-paw"></i> ${randomMessage}`;
    setTimeout(() => {
        button.innerHTML = originalText;
    }, 1500);
});

function createAnimalBurst(emoji) {
    const container = document.getElementById('animalEffectContainer');

    for (let i = 0; i < 8; i++) {
        const burst = document.createElement('div');
        burst.className = 'animal-burst';
        burst.textContent = emoji;

        const x = window.innerWidth / 2 + (Math.random() - 0.5) * 300;
        const y = window.innerHeight / 2 + (Math.random() - 0.5) * 200;
        burst.style.left = x + 'px';
        burst.style.top = y + 'px';
        burst.style.fontSize = (2 + Math.random() * 3) + 'rem';
        burst.style.animationDuration = (1.5 + Math.random() * 1) + 's';

        container.appendChild(burst);

        setTimeout(() => {
            burst.remove();
        }, 3000);
    }
}

// ========== 10. KEYBOARD SHORTCUT: Press 'A' for animal ==========
// FIX: previously fired even while typing in the contact form (e.g. typing "Tania").
// Now it's ignored whenever focus is inside an input, textarea, or editable field.
document.addEventListener('keydown', (e) => {
    const tag = document.activeElement.tagName;
    const isTyping = tag === 'INPUT' || tag === 'TEXTAREA' || document.activeElement.isContentEditable;
    if (!isTyping && (e.key === 'a' || e.key === 'A')) {
        animalButton.click();
    }
});

// ========== 11. BUTTON RIPPLE EFFECT ==========
document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('click', function (e) {
        const rect = this.getBoundingClientRect();
        const ripple = document.createElement('span');
        const size = Math.max(rect.width, rect.height);
        ripple.className = 'ripple';
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
        ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    });
});

// ========== 12. TILT-ON-HOVER FOR CARDS ==========
// Adds a subtle 3D tilt that follows the cursor on project/service/cert cards.
const tiltCards = document.querySelectorAll('.tilt-card');
tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((x - centerX) / centerX) * 6; // max ~6deg
        const rotateY = ((y - centerY) / centerY) * -6;
        card.style.setProperty('--rx', rotateX + 'deg');
        card.style.setProperty('--ry', rotateY + 'deg');
    });
    card.addEventListener('mouseleave', () => {
        card.style.setProperty('--rx', '0deg');
        card.style.setProperty('--ry', '0deg');
    });
});

console.log('🐾 Portfolio loaded. Press "A" anywhere outside a form field for a surprise animal!');