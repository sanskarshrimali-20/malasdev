/**
 * Malas Dev - Application Entry Point
 * Orchestrates modules initialization on DOM Ready.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Icons
    if (window.lucide) {
        window.lucide.createIcons();
    }

    // 2. Set Dynamic Year
    const yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    // 3. Initialize Particles Canvas Background in Hero
    try {
        new ParticleNetwork('particles-canvas');
    } catch (e) {
        console.warn('Particle canvas initialization omitted:', e);
    }

    // 4. Initialize Interactive Terminal
    try {
        new MalasTerminal('interactive-terminal');
    } catch (e) {
        console.warn('Terminal initialization omitted:', e);
    }

    // 5. Render Dynamic UI Components
    renderServices('all');
    new CostCalculator();
    renderPortfolio();
    renderTestimonials();
    renderFAQs();

    // 6. Initialize Command Palette & Stats Counter
    new CommandPalette();
    initStatsCounter();
    initScrollSpy();
    initContactForm();

    // 7. Service Filter Buttons Listener
    const filterBtns = document.querySelectorAll('.service-filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('filter-btn', 'active', 'bg-blue-600', 'text-white'));
            filterBtns.forEach(b => b.classList.add('bg-slate-900', 'text-slate-400'));

            btn.classList.remove('bg-slate-900', 'text-slate-400');
            btn.classList.add('filter-btn', 'active', 'bg-blue-600', 'text-white');

            const category = btn.getAttribute('data-category');
            renderServices(category);
        });
    });

    // 8. Mobile Menu Toggle
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        // Close mobile menu on link click
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    // Welcome Toast
    setTimeout(() => {
        showToast('Welcome to Malas Dev! Press Ctrl+K to open Quick Search.', 'info', 4000);
    }, 1000);
});
