// assets/js/script.js

document.addEventListener('DOMContentLoaded', () => {
    const openNavBtn = document.getElementById('open-nav-btn');
    const closeNavBtn = document.getElementById('close-nav-btn');
    const navSidebar = document.getElementById('nav-sidebar');
    const navOverlay = document.getElementById('nav-overlay');

    // Function to open the navigation
    const openNav = () => {
        if (navSidebar && navOverlay) {
            navSidebar.classList.add('active');
            navOverlay.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling when nav is open
        }
    };

    // Function to close the navigation
    const closeNav = () => {
        if (navSidebar && navOverlay) {
            navSidebar.classList.remove('active');
            navOverlay.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
        }
    };

    // Event listeners for opening and closing the navigation
    if (openNavBtn) {
        openNavBtn.addEventListener('click', openNav);
    }

    if (closeNavBtn) {
        closeNavBtn.addEventListener('click', closeNav);
    }

    if (navOverlay) {
        navOverlay.addEventListener('click', closeNav); // Close nav when overlay is clicked
    }

    // Close nav when any link inside it is clicked (for single page apps or to ensure menu closes)
    if (navSidebar) {
        const navLinks = navSidebar.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', closeNav);
        });
    }

    // Optional: Smooth scrolling for anchor links (if you implement them within a single page)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId && targetId !== '#') { // Ensure it's not just a "#" link
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                    // Close nav if it's open and it's a link click
                    if (navSidebar && navSidebar.classList.contains('active')) {
                        closeNav();
                    }
                }
            }
        });
    });

    // Example of simple scroll-based fade-in for sections (requires Intersection Observer for better performance)
    // For a more advanced "scroll into view" animation, you'd typically use Intersection Observer API.
    // This is a very basic example:
    const sections = document.querySelectorAll('section:not(.hero-banner)');
    const fadeInOnScroll = () => {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const screenHeight = window.innerHeight;
            if (sectionTop < screenHeight * 0.8) { // When 80% of the section is visible
                section.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }
        });
    };

    // Set initial state for sections for the fade-in effect
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
    });

    window.addEventListener('scroll', fadeInOnScroll);
    fadeInOnScroll(); // Run once on load to catch elements already in view
});