// Modern Glass Portfolio - script.js

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the portfolio functionality
    initPortfolio();
});

function initPortfolio() {
    // Initialize all components
    initNavigation();
    initScrollAnimations();
    initSkillBars();
    initContactForm();
}

// Navigation functionality
function initNavigation() {
    const header = document.querySelector('header');
    const navLinks = document.querySelectorAll('nav ul li a');
    const sections = document.querySelectorAll('section');
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 100,
                    behavior: 'smooth'
                });
                
                // Update active link
                navLinks.forEach(link => link.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
    
    // Header scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.padding = '10px 0';
            header.querySelector('.glass-container').style.padding = '10px 30px';
        } else {
            header.style.padding = '20px 0';
            header.querySelector('.glass-container').style.padding = '15px 30px';
        }
        
        // Update active navigation based on scroll position
        updateActiveNavOnScroll(navLinks, sections);
    });
}

// Update active navigation link based on scroll position
function updateActiveNavOnScroll(navLinks, sections) {
    const scrollPosition = window.scrollY + 150;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Scroll animations
function initScrollAnimations() {
    // Animate elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.project-card, .skill-item, .contact-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for animated elements
    const elementsToAnimate = document.querySelectorAll('.project-card, .skill-item, .contact-item');
    elementsToAnimate.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.6s ease';
    });
    
    // Run animation on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Run once on load
    animateOnScroll();
}

// Animate skill bars
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const animateSkillBars = function() {
        skillBars.forEach(bar => {
            const skillSection = document.querySelector('.skills');
            const sectionPosition = skillSection.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (sectionPosition < screenPosition) {
                const width = bar.parentElement.previousElementSibling.querySelector('.skill-percentage').textContent;
                bar.style.width = width;
            }
        });
    };
    
    // Set initial state for skill bars
    skillBars.forEach(bar => {
        bar.style.width = '0';
    });
    
    // Run animation on scroll
    window.addEventListener('scroll', animateSkillBars);
    
    // Run once on load
    setTimeout(animateSkillBars, 500);
}

// Contact form handling
function initContactForm() {
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Basic validation
            if (!name || !email || !subject || !message) {
                showFormMessage('Please fill in all fields', 'error');
                return;
            }
            
            // Email validation
            if (!isValidEmail(email)) {
                showFormMessage('Please enter a valid email address', 'error');
                return;
            }
            
            // Simulate form submission (in a real project, this would send data to a server)
            showFormMessage('Thank you! Your message has been sent.', 'success');
            contactForm.reset();
        });
    }
}

// Show form submission message
function showFormMessage(message, type) {
    // Remove any existing message
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create new message element
    const messageElement = document.createElement('div');
    messageElement.className = `form-message ${type}`;
    messageElement.textContent = message;
    
    // Add to DOM
    const contactForm = document.querySelector('.contact-form form');
    contactForm.appendChild(messageElement);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        messageElement.remove();
    }, 5000);
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Add CSS for form messages
function addFormMessageStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .form-message {
            padding: 10px 15px;
            margin-top: 15px;
            border-radius: 5px;
            font-size: 0.9rem;
            animation: fadeIn 0.3s ease;
        }
        
        .form-message.success {
            background: rgba(76, 175, 80, 0.2);
            border: 1px solid rgba(76, 175, 80, 0.5);
            color: #4CAF50;
        }
        
        .form-message.error {
            background: rgba(244, 67, 54, 0.2);
            border: 1px solid rgba(244, 67, 54, 0.5);
            color: #F44336;
        }
    `;
    document.head.appendChild(style);
}

// Call to add form message styles
addFormMessageStyles();

// Parallax effect for background shapes
function initParallaxEffect() {
    const shapes = document.querySelectorAll('.shape');
    
    window.addEventListener('mousemove', function(e) {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 20;
            const xOffset = (x * speed) - (speed / 2);
            const yOffset = (y * speed) - (speed / 2);
            
            shape.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
        });
    });
}

// Initialize parallax effect
initParallaxEffect();

// Typing effect for hero section
function initTypingEffect() {
    const typingElement = document.querySelector('.hero-content h2');
    const originalText = typingElement.textContent;
    typingElement.textContent = '';
    
    let i = 0;
    const typingInterval = setInterval(() => {
        if (i < originalText.length) {
            typingElement.textContent += originalText.charAt(i);
            i++;
        } else {
            clearInterval(typingInterval);
        }
    }, 100);
}

// Initialize typing effect with a slight delay
setTimeout(initTypingEffect, 1000);