document.addEventListener('DOMContentLoaded', function() {
    // 1. Theme Toggle
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    
    const savedTheme = localStorage.getItem('theme') || 
                      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    body.setAttribute('data-theme', savedTheme);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

    // 2. Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-link');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // 3. Smooth Scrolling
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

    // 4. Sticky Navbar
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        navbar.classList.toggle('sticky', window.scrollY > 0);
    });

    // 5. Section Highlight
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });

    // 6. Reveal Animations
    const animateElements = document.querySelectorAll('[data-animate]');
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                animationObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    animateElements.forEach(element => {
        animationObserver.observe(element);
    });

    // 7. Back to Top Button
    const backToTopButton = document.getElementById('back-to-top');
    const progressFill = document.querySelector('.progress-fill');
    
    window.addEventListener('scroll', function() {
        // Visibility
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
        
        // Progress circle
        const scrollHeight = document.documentElement.scrollHeight;
        const clientHeight = document.documentElement.clientHeight;
        const scrollPercentage = (window.pageYOffset / (scrollHeight - clientHeight)) * 100;
        progressFill.style.strokeDashoffset = 138 - (138 * scrollPercentage / 100);
    });

    backToTopButton.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // 8. Resume Download Tracking
    const resumeDownload = document.querySelector('.btn-primary');
    if (resumeDownload) {
        resumeDownload.addEventListener('click', function() {
            console.log('Resume downloaded');
            // Add analytics tracking if needed
            if (typeof gtag !== 'undefined') {
                gtag('event', 'download', {
                    'event_category': 'Resume',
                    'event_label': 'DevOps Resume Download'
                });
            }
            this.classList.add('loading');
            setTimeout(() => this.classList.remove('loading'), 1000);
        });
    }

    // 9. Social Media Tracking
    document.querySelectorAll('.social-link').forEach(link => {
        link.addEventListener('click', function() {
            const platform = this.querySelector('i').classList[1].replace('fa-', '');
            console.log(`${platform} link clicked`);
            if (typeof gtag !== 'undefined') {
                gtag('event', 'social_click', {
                    'event_category': 'Social',
                    'event_label': platform
                });
            }
        });
    });

    // 10. Footer Year
    document.getElementById('year').textContent = new Date().getFullYear();
});