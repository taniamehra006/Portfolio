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
});

function closeMenu() {
    navLinks.classList.remove('active');
}

// ========== 4. SCROLL REVEAL ==========
function reveal() {
    var reveals = document.querySelectorAll(".reveal");
    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 150;
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        }
    }
}
window.addEventListener("scroll", reveal);
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

// ========== 7. BACK TO TOP ==========
const backToTopBtn = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopBtn.style.display = 'block';
    } else {
        backToTopBtn.style.display = 'none';
    }
});
backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ========== 8. CONTACT FORM ========== //
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.innerHTML;

    // Show sending status
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
const animalEmojis = ['🦄', '🐉', '🦊', '🐼', '🐨', '🦁', '🐯', '🐱', '🐶', '🐺', '🦝', '🐮', '🦄', '🐧', '🐦', '🐤', '🐣', '🐥', '🦆', '🦅', '🦉', '🐴', '🦄', '🐝', '🐞', '🦋', '🐙', '🦑', '🐬', '🐳', '🐊', '🦕', '🦖', '🐉'];

let animalInterval;

document.getElementById('animalButton').addEventListener('click', function() {
    const display = document.getElementById('animalDisplay');
    const randomEmoji = animalEmojis[Math.floor(Math.random() * animalEmojis.length)];
    
    // Update display with animation
    display.textContent = randomEmoji;
    display.classList.remove('animal-float');
    // Trigger reflow
    void display.offsetWidth;
    display.classList.add('animal-float');
    
    // Create burst effect
    createAnimalBurst(randomEmoji);
    
    // Add a fun message
    const messages = ['🐾 Woof!', '🦄 Magical!', '🐉 Roar!', '🦊 What does the fox say?', '🐼 Panda-monium!', '🦁 King of the jungle!'];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    
    // Show message temporarily
    const button = this;
    const originalText = button.innerHTML;
    button.innerHTML = `<i class="fas fa-paw"></i> ${randomMessage}`;
    setTimeout(() => {
        button.innerHTML = originalText;
    }, 1500);
});

function createAnimalBurst(emoji) {
    const container = document.getElementById('animalEffectContainer');
    
    // Create multiple burst elements
    for (let i = 0; i < 8; i++) {
        const burst = document.createElement('div');
        burst.className = 'animal-burst';
        burst.textContent = emoji;
        
        // Random position around the center
        const x = window.innerWidth / 2 + (Math.random() - 0.5) * 300;
        const y = window.innerHeight / 2 + (Math.random() - 0.5) * 200;
        burst.style.left = x + 'px';
        burst.style.top = y + 'px';
        burst.style.fontSize = (2 + Math.random() * 3) + 'rem';
        burst.style.animationDuration = (1.5 + Math.random() * 1) + 's';
        
        container.appendChild(burst);
        
        // Remove after animation
        setTimeout(() => {
            burst.remove();
        }, 3000);
    }
}

// ========== 10. ADDITIONAL: Random Animal Fact ==========
console.log('🐾 Welcome to the Animal Fun section! Click the button to see magical animals!');

// ========== 11. KEYBOARD SHORTCUT: Press 'A' for animal ==========
document.addEventListener('keydown', (e) => {
    if (e.key === 'a' || e.key === 'A') {
        document.getElementById('animalButton').click();
    }
});