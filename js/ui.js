/**
 * Malas Dev - Interactive UI Engine
 * Controls dynamic UI components, state management, calculator, modal system, toast notifications, search, and form handling.
 */

// Toast System
function showToast(message, type = 'info', duration = 4000) {
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    let iconName = 'info';
    if (type === 'success') iconName = 'check-circle';
    if (type === 'warning') iconName = 'alert-triangle';
    if (type === 'error') iconName = 'alert-circle';

    toast.innerHTML = `
        <i data-lucide="${iconName}" class="w-5 h-5 flex-shrink-0 ${type === 'success' ? 'text-emerald-400' : type === 'warning' ? 'text-amber-400' : type === 'error' ? 'text-red-400' : 'text-blue-400'}"></i>
        <span class="text-xs sm:text-sm font-medium leading-tight text-slate-100">${message}</span>
    `;

    container.appendChild(toast);
    if (window.lucide) window.lucide.createIcons();

    // Trigger animation
    setTimeout(() => toast.classList.add('show'), 10);

    // Auto removal
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

// Modal Management System
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;

    modal.classList.remove('modal-hidden');
    modal.classList.add('modal-visible');
    document.body.style.overflow = 'hidden';

    // Focus input if any inside modal
    const input = modal.querySelector('input');
    if (input) setTimeout(() => input.focus(), 100);
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;

    modal.classList.remove('modal-visible');
    modal.classList.add('modal-hidden');
    document.body.style.overflow = 'auto';
}

// Render Dynamic Services
function renderServices(filterCategory = 'all') {
    const grid = document.getElementById('services-grid');
    if (!grid) return;

    const filtered = filterCategory === 'all'
        ? MalasDevData.services
        : MalasDevData.services.filter(s => s.category === filterCategory);

    grid.innerHTML = filtered.map(service => `
        <div class="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-1 glow-effect group flex flex-col justify-between relative overflow-hidden">
            ${service.badge ? `
                <div class="absolute top-4 right-4 px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-${service.badgeColor || 'blue'}-500/10 text-${service.badgeColor || 'blue'}-400 border border-${service.badgeColor || 'blue'}-500/20">
                    ${service.badge}
                </div>
            ` : ''}
            <div>
                <div class="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 transition-transform">
                    <i data-lucide="${service.icon}" class="w-6 h-6"></i>
                </div>
                <h3 class="text-xl font-bold text-white mb-2">${service.title}</h3>
                <p class="text-slate-400 text-sm leading-relaxed mb-6">${service.shortDesc}</p>

                <ul class="space-y-2 mb-6 text-xs text-slate-300">
                    ${service.features.map(f => `
                        <li class="flex items-center space-x-2">
                            <i data-lucide="check" class="w-3.5 h-3.5 text-blue-400 flex-shrink-0"></i>
                            <span>${f}</span>
                        </li>
                    `).join('')}
                </ul>
            </div>

            <div class="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <div>
                    <span class="text-[10px] text-slate-500 uppercase font-mono block">Starting at</span>
                    <span class="text-2xl font-bold text-blue-400">$${service.basePrice}</span>
                </div>
                <button onclick="selectServiceForQuote('${service.title}', ${service.basePrice})" class="px-3.5 py-2 rounded-xl bg-blue-600/20 hover:bg-blue-600 text-blue-300 hover:text-white text-xs font-semibold transition-all border border-blue-500/30">
                    Get Quote
                </button>
            </div>
        </div>
    `).join('');

    if (window.lucide) window.lucide.createIcons();
}

// Select Service for Quote Handler
function selectServiceForQuote(serviceName, basePrice) {
    const textarea = document.querySelector('#contact-form textarea');
    if (textarea) {
        textarea.value = `Hi Malas Dev,\n\nI am interested in getting a quote for: ${serviceName} (Est. Base $${basePrice}).\n\nPlease let me know the process to get started.`;
    }
    showToast(`Selected '${serviceName}'! Form prefilled below.`, 'info');
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Project Cost Estimator Calculator Engine
class CostCalculator {
    constructor() {
        this.totalElement = document.getElementById('calc-total-price');
        this.container = document.getElementById('calculator-options-container');
        if (!this.container || !this.totalElement) return;

        this.init();
    }

    init() {
        const { platform, features } = MalasDevData.calculatorOptions;

        this.container.innerHTML = `
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <!-- Step 1: Select Platform -->
                <div class="space-y-4">
                    <h4 class="text-sm font-mono text-blue-400 uppercase tracking-wider flex items-center space-x-2">
                        <span>1. Choose App Platform(s)</span>
                    </h4>
                    <div class="space-y-3">
                        ${platform.map(p => `
                            <label class="flex items-center justify-between p-4 rounded-xl bg-slate-950 border border-slate-800/80 hover:border-slate-700 cursor-pointer transition-all">
                                <div class="flex items-center space-x-3">
                                    <input type="checkbox" data-price="${p.price}" data-label="${p.label}" class="calc-check w-4 h-4 rounded text-blue-600 bg-slate-900 border-slate-700 focus:ring-blue-500 focus:ring-offset-slate-950 cursor-pointer" ${p.id === 'calc_android' ? 'checked' : ''} />
                                    <i data-lucide="${p.icon}" class="w-5 h-5 text-slate-400"></i>
                                    <span class="text-sm font-medium text-slate-200">${p.label}</span>
                                </div>
                                <span class="text-xs font-mono font-bold text-blue-400">+$${p.price}</span>
                            </label>
                        `).join('')}
                    </div>
                </div>

                <!-- Step 2: Select Features & Infra -->
                <div class="space-y-4">
                    <h4 class="text-sm font-mono text-blue-400 uppercase tracking-wider flex items-center space-x-2">
                        <span>2. Add Integrated Modules</span>
                    </h4>
                    <div class="space-y-3">
                        ${features.map(f => `
                            <label class="flex items-center justify-between p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 hover:border-slate-700 cursor-pointer transition-all">
                                <div class="flex items-center space-x-3">
                                    <input type="checkbox" data-price="${f.price}" data-label="${f.label}" class="calc-check w-4 h-4 rounded text-blue-600 bg-slate-900 border-slate-700 focus:ring-blue-500 focus:ring-offset-slate-950 cursor-pointer" ${f.defaultChecked ? 'checked' : ''} />
                                    <span class="text-sm font-medium text-slate-200">${f.label}</span>
                                </div>
                                <span class="text-xs font-mono font-bold text-blue-400">+$${f.price}</span>
                            </label>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;

        if (window.lucide) window.lucide.createIcons();

        // Listen for checkbox changes
        this.container.querySelectorAll('.calc-check').forEach(chk => {
            chk.addEventListener('change', () => this.recalculate());
        });

        // Initial calculation
        this.recalculate();

        // Bind Apply Quote Button
        const applyBtn = document.getElementById('calc-apply-quote-btn');
        if (applyBtn) {
            applyBtn.addEventListener('click', () => this.applyQuoteToForm());
        }
    }

    recalculate() {
        let total = 0;
        const selectedLabels = [];

        this.container.querySelectorAll('.calc-check:checked').forEach(chk => {
            const price = parseFloat(chk.getAttribute('data-price')) || 0;
            total += price;
            selectedLabels.push(chk.getAttribute('data-label'));
        });

        this.totalPrice = total;
        this.selectedLabels = selectedLabels;

        // Smooth number animation
        this.totalElement.textContent = `$${total.toLocaleString()}`;
    }

    applyQuoteToForm() {
        if (!this.selectedLabels || this.selectedLabels.length === 0) {
            showToast('Please select at least one module for the estimate.', 'warning');
            return;
        }

        const msg = `Hi Malas Dev,\n\nI generated a custom estimate using your online estimator tool:\n\nModules Selected:\n${this.selectedLabels.map(l => `- ${l}`).join('\n')}\n\nEstimated Total: $${this.totalPrice}\n\nPlease reach out to me with full project specifications.`;

        const textarea = document.querySelector('#contact-form textarea');
        if (textarea) {
            textarea.value = msg;
        }

        showToast(`Applied estimated quote ($${this.totalPrice}) to contact form!`, 'success');
        const contactSec = document.getElementById('contact');
        if (contactSec) {
            contactSec.scrollIntoView({ behavior: 'smooth' });
        }
    }
}

// Dynamic Portfolio Showcase
function renderPortfolio() {
    const container = document.getElementById('portfolio-grid');
    if (!container) return;

    container.innerHTML = MalasDevData.portfolio.map(item => `
        <div class="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition-all flex flex-col justify-between group">
            <div class="relative h-48 overflow-hidden">
                <img src="${item.image}" alt="${item.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100" />
                <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
                <span class="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-800 text-[10px] font-mono text-blue-400">
                    ${item.tag}
                </span>
                <span class="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-semibold">
                    ${item.stats}
                </span>
            </div>

            <div class="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                    <h3 class="text-xl font-bold text-white group-hover:text-blue-400 transition-colors mb-2">${item.title}</h3>
                    <p class="text-slate-400 text-sm leading-relaxed mb-4">${item.description}</p>

                    <div class="flex flex-wrap gap-1.5 mb-4">
                        ${item.stack.map(st => `
                            <span class="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-[10px] font-mono text-slate-300">
                                ${st}
                            </span>
                        `).join('')}
                    </div>
                </div>

                <button onclick="openProjectModal('${item.id}')" class="w-full py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-200 text-xs font-semibold transition-colors flex items-center justify-center space-x-2">
                    <span>View Architecture Details</span>
                    <i data-lucide="arrow-right" class="w-4 h-4"></i>
                </button>
            </div>
        </div>
    `).join('');

    if (window.lucide) window.lucide.createIcons();
}

// Project Details Modal Handler
function openProjectModal(projectId) {
    const item = MalasDevData.portfolio.find(p => p.id === projectId);
    if (!item) return;

    const modalBody = document.getElementById('project-modal-body');
    const modalTitle = document.getElementById('project-modal-title');

    if (modalTitle) modalTitle.textContent = item.title;
    if (modalBody) {
        modalBody.innerHTML = `
            <div class="space-y-4 text-slate-300 text-sm">
                <div class="relative h-48 rounded-xl overflow-hidden mb-4">
                    <img src="${item.image}" alt="${item.title}" class="w-full h-full object-cover" />
                    <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
                </div>
                <div class="flex items-center space-x-2 text-xs font-mono text-blue-400">
                    <span>Category: ${item.category}</span>
                    <span>•</span>
                    <span class="text-emerald-400">${item.stats}</span>
                </div>
                <p class="leading-relaxed">${item.details}</p>
                <div>
                    <h5 class="text-xs font-mono text-slate-400 uppercase mb-2">Technology Stack</h5>
                    <div class="flex flex-wrap gap-2">
                        ${item.stack.map(s => `<span class="px-2.5 py-1 rounded bg-slate-950 border border-slate-800 text-xs font-mono text-blue-300">${s}</span>`).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    openModal('project-modal');
}

// Dynamic Testimonials
function renderTestimonials() {
    const grid = document.getElementById('testimonials-grid');
    if (!grid) return;

    grid.innerHTML = MalasDevData.testimonials.map(t => `
        <div class="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 flex flex-col justify-between hover:border-slate-700 transition-colors">
            <div class="space-y-4">
                <div class="flex items-center justify-between">
                    <div class="flex space-x-1 text-amber-400">
                        ${Array(t.rating).fill('<i data-lucide="star" class="w-4 h-4 fill-amber-400"></i>').join('')}
                    </div>
                    <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">${t.project}</span>
                </div>
                <p class="text-slate-300 text-sm leading-relaxed italic">"${t.content}"</p>
            </div>

            <div class="pt-4 mt-6 border-t border-slate-800/60 flex items-center space-x-3">
                <img src="${t.avatar}" alt="${t.name}" class="w-10 h-10 rounded-full border border-slate-700 object-cover" />
                <div>
                    <h4 class="text-white text-sm font-semibold">${t.name}</h4>
                    <p class="text-slate-500 text-xs">${t.role}</p>
                </div>
            </div>
        </div>
    `).join('');

    if (window.lucide) window.lucide.createIcons();
}

// Accordion & FAQs with Dynamic Search Filter
function renderFAQs() {
    const container = document.getElementById('faqs-container');
    if (!container) return;

    container.innerHTML = `
        <div class="mb-8 max-w-md mx-auto">
            <div class="relative">
                <i data-lucide="search" class="w-4 h-4 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2"></i>
                <input type="text" id="faq-search-input" placeholder="Search questions or keywords..." class="w-full pl-11 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 transition-colors" />
            </div>
        </div>

        <div id="faq-list" class="space-y-4 max-w-3xl mx-auto"></div>
    `;

    if (window.lucide) window.lucide.createIcons();

    const faqList = document.getElementById('faq-list');
    const searchInput = document.getElementById('faq-search-input');

    const renderList = (filterText = '') => {
        const query = filterText.toLowerCase();
        const filtered = MalasDevData.faqs.filter(f => f.q.toLowerCase().includes(query) || f.a.toLowerCase().includes(query));

        if (filtered.length === 0) {
            faqList.innerHTML = `<p class="text-center text-slate-500 text-sm py-8">No matching questions found.</p>`;
            return;
        }

        faqList.innerHTML = filtered.map((f, idx) => `
            <div class="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden transition-all">
                <button class="faq-toggle w-full px-6 py-4 text-left flex items-center justify-between focus:outline-none" data-idx="${idx}">
                    <span class="font-semibold text-white text-sm sm:text-base">${f.q}</span>
                    <i data-lucide="chevron-down" class="faq-icon w-5 h-5 text-slate-400 transition-transform duration-200"></i>
                </button>
                <div class="accordion-content px-6 pb-0">
                    <p class="text-slate-400 text-sm leading-relaxed pb-4 border-t border-slate-800/60 pt-3">${f.a}</p>
                </div>
            </div>
        `).join('');

        if (window.lucide) window.lucide.createIcons();

        // Bind toggles
        faqList.querySelectorAll('.faq-toggle').forEach(btn => {
            btn.addEventListener('click', () => {
                const parent = btn.parentElement;
                const content = parent.querySelector('.accordion-content');
                const icon = btn.querySelector('.faq-icon');

                const isOpen = content.classList.contains('open');

                // Close all other accordions
                faqList.querySelectorAll('.accordion-content').forEach(c => c.classList.remove('open'));
                faqList.querySelectorAll('.faq-icon').forEach(i => i.style.transform = 'rotate(0deg)');

                if (!isOpen) {
                    content.classList.add('open');
                    if (icon) icon.style.transform = 'rotate(180deg)';
                }
            });
        });
    };

    renderList();

    if (searchInput) {
        searchInput.addEventListener('input', (e) => renderList(e.target.value));
    }
}

// Stats Counter Animation
function initStatsCounter() {
    const statsContainer = document.getElementById('stats-section');
    if (!statsContainer) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumbers();
                observer.disconnect();
            }
        });
    }, { threshold: 0.3 });

    observer.observe(statsContainer);
}

function animateNumbers() {
    MalasDevData.stats.forEach(s => {
        const el = document.getElementById(s.id);
        if (!el) return;

        let current = 0;
        const target = s.value;
        const duration = 1500;
        const increment = target / (duration / 16);

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            el.textContent = `${s.prefix || ''}${Math.floor(current)}${s.decimal || ''}${s.suffix || ''}`;
        }, 16);
    });
}

// Command Palette Search (Ctrl + K)
class CommandPalette {
    constructor() {
        this.modal = document.getElementById('cmd-palette-modal');
        this.input = document.getElementById('cmd-input');
        this.resultsContainer = document.getElementById('cmd-results');
        if (!this.modal || !this.input || !this.resultsContainer) return;

        this.commands = [
            { title: "Explore Services & Pricing", category: "Navigation", action: () => { closeModal('cmd-palette-modal'); document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }); } },
            { title: "Launch Project Cost Estimator", category: "Tool", action: () => { closeModal('cmd-palette-modal'); document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' }); } },
            { title: "View Digital Products Showcase", category: "Navigation", action: () => { closeModal('cmd-palette-modal'); document.getElementById('solutions')?.scrollIntoView({ behavior: 'smooth' }); } },
            { title: "Read Privacy Policy", category: "Legal", action: () => { closeModal('cmd-palette-modal'); openModal('privacy-modal'); } },
            { title: "Read Terms & Conditions", category: "Legal", action: () => { closeModal('cmd-palette-modal'); openModal('terms-modal'); } },
            { title: "Read Refund & Cancellation Policy", category: "Legal", action: () => { closeModal('cmd-palette-modal'); openModal('refund-modal'); } },
            { title: "Send Direct Lead / Inquiry", category: "Contact", action: () => { closeModal('cmd-palette-modal'); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); } },
            { title: "Copy Support Email", category: "Action", action: () => { navigator.clipboard.writeText(MalasDevData.meta.email); showToast('Support email copied to clipboard!', 'success'); closeModal('cmd-palette-modal'); } }
        ];

        this.init();
    }

    init() {
        // Global key shortcut Ctrl+K or Cmd+K
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
                e.preventDefault();
                openModal('cmd-palette-modal');
            }
            if (e.key === 'Escape') {
                closeModal('cmd-palette-modal');
                closeModal('privacy-modal');
                closeModal('terms-modal');
                closeModal('refund-modal');
                closeModal('project-modal');
            }
        });

        // Search Listener
        this.input.addEventListener('input', () => this.filterCommands());
        this.filterCommands();
    }

    filterCommands() {
        const q = this.input.value.toLowerCase().trim();
        const filtered = this.commands.filter(c => c.title.toLowerCase().includes(q) || c.category.toLowerCase().includes(q));

        if (filtered.length === 0) {
            this.resultsContainer.innerHTML = `<p class="p-4 text-center text-slate-500 text-xs">No matching commands found.</p>`;
            return;
        }

        this.resultsContainer.innerHTML = filtered.map((c, i) => `
            <button class="cmd-item w-full p-3 text-left hover:bg-slate-800/80 rounded-xl flex items-center justify-between group transition-colors" data-idx="${i}">
                <div class="flex items-center space-x-3">
                    <i data-lucide="corner-down-right" class="w-4 h-4 text-blue-400 group-hover:translate-x-0.5 transition-transform"></i>
                    <span class="text-sm font-medium text-slate-200 group-hover:text-white">${c.title}</span>
                </div>
                <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800">${c.category}</span>
            </button>
        `).join('');

        if (window.lucide) window.lucide.createIcons();

        // Bind click event
        this.resultsContainer.querySelectorAll('.cmd-item').forEach((btn, idx) => {
            btn.addEventListener('click', () => {
                filtered[idx].action();
            });
        });
    }
}

// ScrollSpy Navigation & Header Shadow
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const header = document.querySelector('nav');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            header?.classList.add('shadow-xl', 'border-slate-800/90');
        } else {
            header?.classList.remove('shadow-xl', 'border-slate-800/90');
        }

        let current = '';
        sections.forEach(sec => {
            const sectionTop = sec.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                current = sec.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Contact Form Handler
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = form.querySelector('input[type="text"]').value.trim();
        const email = form.querySelector('input[type="email"]').value.trim();
        const submitBtn = form.querySelector('button[type="submit"]');

        if (!name || !email) {
            showToast('Please fill in your name and email address.', 'warning');
            return;
        }

        // Show loading state on submit button
        submitBtn.disabled = true;
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = `
            <span class="inline-flex items-center space-x-2">
                <svg class="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Sending Message...</span>
            </span>
        `;

        setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
            form.reset();

            const successBox = document.getElementById('form-success');
            if (successBox) {
                successBox.classList.remove('hidden');
                setTimeout(() => successBox.classList.add('hidden'), 6000);
            }

            showToast(`Thank you ${name}! Your inquiry has been sent to support@malasdev.online`, 'success', 5000);
        }, 1200);
    });
}
