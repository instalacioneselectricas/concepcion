document.addEventListener('DOMContentLoaded', function() {
    // Menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    
    menuToggle.addEventListener('click', function() {
        nav.classList.toggle('active');
        this.querySelector('i').classList.toggle('fa-times');
        this.querySelector('i').classList.toggle('fa-bars');
    });
    
    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-list a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            nav.classList.remove('active');
            menuToggle.querySelector('i').classList.remove('fa-times');
            menuToggle.querySelector('i').classList.add('fa-bars');
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Gracias por su mensaje. Nos pondremos en contacto con usted pronto.');
            this.reset();
        });
    }
    
    // Project Modals
    const projectCards = document.querySelectorAll('.project-card');
    const modals = {
        'commercial': document.getElementById('commercial-modal'),
        'house': document.getElementById('house-modal'),
        'industrial': document.getElementById('industrial-modal')
    };
    
    // Initialize modals
    Object.keys(modals).forEach(key => {
        const modal = modals[key];
        if (modal) {
            // Close modal when clicking X
            modal.querySelector('.close-modal').addEventListener('click', () => {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            });
            
            // Close modal when clicking outside content
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }
            });
            
            // Initialize gallery for this modal
            initGallery(modal);
        }
    });
    
    // Add click events to project cards
    projectCards.forEach((card, index) => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', () => {
            let modal;
            switch(index) {
                case 0:
                    modal = modals['commercial'];
                    break;
                case 1:
                    modal = modals['house'];
                    break;
                case 2:
                    modal = modals['industrial'];
                    break;
            }
            
            if (modal) {
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
                
                // Reset gallery to first image when opening
                const gallery = modal.querySelector('.modal-gallery');
                const items = gallery.querySelectorAll('.gallery-item');
                const dots = gallery.querySelectorAll('.gallery-dot');
                
                items.forEach(item => item.classList.remove('active'));
                dots.forEach(dot => dot.classList.remove('active'));
                
                items[0].classList.add('active');
                dots[0].classList.add('active');
            }
        });
    });
    
    // Initialize gallery function
    function initGallery(modal) {
        const gallery = modal.querySelector('.modal-gallery');
        if (!gallery) return;
        
        const items = gallery.querySelectorAll('.gallery-item');
        const prevBtn = gallery.querySelector('.gallery-prev');
        const nextBtn = gallery.querySelector('.gallery-next');
        const dotsContainer = gallery.querySelector('.gallery-dots');
        
        // Create dots
        items.forEach((item, index) => {
            const dot = document.createElement('div');
            dot.classList.add('gallery-dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                showSlide(index, items, dotsContainer.children);
            });
            dotsContainer.appendChild(dot);
        });
        
        const dots = dotsContainer.querySelectorAll('.gallery-dot');
        
        // Previous button
        prevBtn.addEventListener('click', () => {
            let currentIndex = getCurrentIndex(items);
            showSlide((currentIndex - 1 + items.length) % items.length, items, dots);
        });
        
        // Next button
        nextBtn.addEventListener('click', () => {
            let currentIndex = getCurrentIndex(items);
            showSlide((currentIndex + 1) % items.length, items, dots);
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (modal.style.display === 'block') {
                let currentIndex = getCurrentIndex(items);
                
                if (e.key === 'ArrowLeft') {
                    showSlide((currentIndex - 1 + items.length) % items.length, items, dots);
                } else if (e.key === 'ArrowRight') {
                    showSlide((currentIndex + 1) % items.length, items, dots);
                } else if (e.key === 'Escape') {
                    modal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }
            }
        });
    }
    
    function getCurrentIndex(items) {
        for (let i = 0; i < items.length; i++) {
            if (items[i].classList.contains('active')) return i;
        }
        return 0;
    }
    
    function showSlide(index, items, dots) {
        items.forEach(item => item.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        items[index].classList.add('active');
        dots[index].classList.add('active');
    }
    
    // Animation on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.service-card, .project-card, .about-content, .contact-info');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for animation
    const animatedElements = document.querySelectorAll('.service-card, .project-card, .about-content, .contact-info');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on page load
});