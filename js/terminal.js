/**
 * Malas Dev - Interactive Terminal Emulator
 * Enables users to run shell-like commands to explore services, stack, architecture, and request quotes.
 */

class MalasTerminal {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;

        this.history = [];
        this.historyIndex = -1;
        this.initTerminal();
    }

    initTerminal() {
        this.container.innerHTML = `
            <div class="bg-slate-900 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
                <div class="flex items-center space-x-2">
                    <span class="w-3 h-3 rounded-full bg-red-500/80 inline-block cursor-pointer hover:bg-red-400" title="Clear terminal" id="term-btn-clear"></span>
                    <span class="w-3 h-3 rounded-full bg-yellow-500/80 inline-block cursor-pointer hover:bg-yellow-400" title="Help" id="term-btn-help"></span>
                    <span class="w-3 h-3 rounded-full bg-green-500/80 inline-block cursor-pointer hover:bg-green-400" title="Run Stack" id="term-btn-stack"></span>
                </div>
                <div class="flex items-center space-x-2 text-slate-400 text-[11px] font-mono">
                    <i data-lucide="terminal" class="w-3.5 h-3.5 text-blue-400"></i>
                    <span>malasdev_cli v2.4.0</span>
                </div>
            </div>

            <!-- Terminal Output Area -->
            <div id="term-output-area" class="p-4 space-y-2 h-72 overflow-y-auto font-mono text-xs text-slate-300 leading-relaxed">
                <p class="text-slate-400">Welcome to <span class="text-blue-400 font-bold">Malas Dev Interactive CLI</span>.</p>
                <p class="text-slate-400">Type <span class="text-yellow-400 font-semibold">'help'</span> to see available commands or click quick action buttons below.</p>
                <div class="my-2 border-b border-slate-800/80"></div>
            </div>

            <!-- Quick Action Buttons Bar -->
            <div class="px-4 py-2 bg-slate-950/60 border-t border-slate-800/80 flex flex-wrap gap-2 text-[11px] font-mono">
                <button class="term-quick-btn px-2.5 py-1 rounded bg-slate-800 hover:bg-blue-600 hover:text-white text-slate-300 transition-colors" data-cmd="stack">stack</button>
                <button class="term-quick-btn px-2.5 py-1 rounded bg-slate-800 hover:bg-blue-600 hover:text-white text-slate-300 transition-colors" data-cmd="services">services</button>
                <button class="term-quick-btn px-2.5 py-1 rounded bg-slate-800 hover:bg-blue-600 hover:text-white text-slate-300 transition-colors" data-cmd="quote">quote</button>
                <button class="term-quick-btn px-2.5 py-1 rounded bg-slate-800 hover:bg-blue-600 hover:text-white text-slate-300 transition-colors" data-cmd="contact">contact</button>
                <button class="term-quick-btn px-2.5 py-1 rounded bg-slate-800 hover:bg-blue-600 hover:text-white text-slate-300 transition-colors" data-cmd="clear">clear</button>
            </div>

            <!-- Terminal Input Prompt -->
            <div class="px-4 py-3 bg-slate-950 border-t border-slate-800 flex items-center space-x-2 font-mono text-xs">
                <span class="text-blue-400 font-bold">malasdev@studio:~$</span>
                <input type="text" id="term-input-field" class="flex-1 bg-transparent text-slate-100 focus:outline-none placeholder-slate-600 font-mono" placeholder="type a command..." autocomplete="off" spellcheck="false" />
            </div>
        `;

        this.outputArea = this.container.querySelector('#term-output-area');
        this.inputField = this.container.querySelector('#term-input-field');

        this.bindEvents();
    }

    bindEvents() {
        if (!this.inputField) return;

        // Command Submission on Enter
        this.inputField.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const cmd = this.inputField.value.trim();
                if (cmd) {
                    this.executeCommand(cmd);
                    this.history.push(cmd);
                    this.historyIndex = this.history.length;
                    this.inputField.value = '';
                }
            } else if (e.key === 'ArrowUp') {
                if (this.historyIndex > 0) {
                    this.historyIndex--;
                    this.inputField.value = this.history[this.historyIndex];
                }
            } else if (e.key === 'ArrowDown') {
                if (this.historyIndex < this.history.length - 1) {
                    this.historyIndex++;
                    this.inputField.value = this.history[this.historyIndex];
                } else {
                    this.historyIndex = this.history.length;
                    this.inputField.value = '';
                }
            }
        });

        // Quick action buttons
        this.container.querySelectorAll('.term-quick-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const cmd = btn.getAttribute('data-cmd');
                if (cmd) {
                    this.executeCommand(cmd);
                }
            });
        });

        // Window buttons
        const clearBtn = this.container.querySelector('#term-btn-clear');
        if (clearBtn) clearBtn.addEventListener('click', () => this.executeCommand('clear'));

        const helpBtn = this.container.querySelector('#term-btn-help');
        if (helpBtn) helpBtn.addEventListener('click', () => this.executeCommand('help'));

        const stackBtn = this.container.querySelector('#term-btn-stack');
        if (stackBtn) stackBtn.addEventListener('click', () => this.executeCommand('stack'));
    }

    printLine(text, className = '') {
        const line = document.createElement('div');
        line.className = className;
        line.innerHTML = text;
        this.outputArea.appendChild(line);
        this.outputArea.scrollTop = this.outputArea.scrollHeight;
    }

    executeCommand(command) {
        const lowerCmd = command.toLowerCase().trim();

        // Echo command line
        this.printLine(`<span class="term-prompt">malasdev@studio:~$</span> <span class="term-cmd">${this.escapeHtml(command)}</span>`);

        switch (lowerCmd) {
            case 'help':
                this.printLine(`
                    <div class="text-slate-300 space-y-1 my-1">
                        <p class="text-yellow-400 font-semibold">Available Commands:</p>
                        <p><span class="text-blue-400 font-mono w-24 inline-block">stack</span> - View technical architecture & frameworks</p>
                        <p><span class="text-blue-400 font-mono w-24 inline-block">services</span> - List development services & starting prices</p>
                        <p><span class="text-blue-400 font-mono w-24 inline-block">quote</span> - Launch interactive cost estimator</p>
                        <p><span class="text-blue-400 font-mono w-24 inline-block">contact</span> - Display studio contact channels & lead form</p>
                        <p><span class="text-blue-400 font-mono w-24 inline-block">about</span> - Operating entity details & domain info</p>
                        <p><span class="text-blue-400 font-mono w-24 inline-block">ping</span> - Test backend server latency simulation</p>
                        <p><span class="text-blue-400 font-mono w-24 inline-block">clear</span> - Clean terminal buffer screen</p>
                    </div>
                `);
                break;

            case 'stack':
                this.printLine(`
                    <div class="space-y-1 text-slate-300">
                        <p class="term-success">✓ Active Technology Stack Configuration:</p>
                        <p>• Mobile: <span class="text-blue-400">Flutter 3.x (Dart), Android SDK, iOS Native Bridges</span></p>
                        <p>• Cloud Infra: <span class="text-emerald-400">Supabase, PostgreSQL, Row Level Security, Edge Functions</span></p>
                        <p>• Payments: <span class="text-purple-400">PhonePe Business SDK, Razorpay, SHA256 Webhook Verification</span></p>
                        <p>• Deliverability: <span class="text-amber-400">Resend Automated SMTP, DKIM & DMARC Verified</span></p>
                        <p>• Security: <span class="text-sky-400">TLS 1.3 Encryption, Biometric Storage, OAuth 2.0</span></p>
                    </div>
                `);
                break;

            case 'services':
                this.printLine(`
                    <div class="space-y-1 text-slate-300">
                        <p class="text-yellow-400 font-semibold">Development Services Catalog:</p>
                        ${MalasDevData.services.map(s => `
                            <p>• <span class="text-white font-bold">${s.title}</span> - <span class="text-emerald-400">Starting at $${s.basePrice}</span></p>
                        `).join('')}
                    </div>
                `);
                break;

            case 'quote':
                this.printLine(`<p class="term-success">Redirecting to Interactive Project Estimator Tool...</p>`);
                const calcElement = document.getElementById('calculator');
                if (calcElement) {
                    calcElement.scrollIntoView({ behavior: 'smooth' });
                }
                break;

            case 'contact':
                this.printLine(`
                    <div class="space-y-1 text-slate-300">
                        <p class="text-blue-400 font-bold">Malas Dev Contact Channels:</p>
                        <p>• Email: <a href="mailto:${MalasDevData.meta.email}" class="text-blue-300 underline">${MalasDevData.meta.email}</a></p>
                        <p>• Phone: <a href="tel:${MalasDevData.meta.phone}" class="text-blue-300 underline">${MalasDevData.meta.phoneFormatted}</a></p>
                        <p>• Official Site: <span class="text-emerald-400">https://${MalasDevData.meta.domain}</span></p>
                        <p>• Entity: <span class="text-purple-300">${MalasDevData.meta.entity}</span></p>
                    </div>
                `);
                const contactSec = document.getElementById('contact');
                if (contactSec) {
                    contactSec.scrollIntoView({ behavior: 'smooth' });
                }
                break;

            case 'about':
                this.printLine(`
                    <div class="space-y-1 text-slate-300">
                        <p><span class="text-white font-bold">${MalasDevData.meta.name}</span> (${MalasDevData.meta.entity})</p>
                        <p class="term-output">Custom Mobile & Web Application Studio specialized in production software, secure payment integrations, and cloud infrastructure.</p>
                    </div>
                `);
                break;

            case 'ping':
                const pingTime = Math.floor(Math.random() * 25) + 12;
                this.printLine(`<p class="term-success">PING api.malasdev.online (104.21.48.210) 56(84) bytes of data.</p>`);
                this.printLine(`<p class="term-output">64 bytes from api.malasdev.online: icmp_seq=1 ttl=58 time=${pingTime} ms</p>`);
                this.printLine(`<p class="text-emerald-400 font-semibold">✓ Status: Operational (Latency ${pingTime}ms)</p>`);
                break;

            case 'clear':
                this.outputArea.innerHTML = '';
                break;

            default:
                this.printLine(`<p class="term-error">Command not recognized: '${this.escapeHtml(command)}'. Type <span class="text-yellow-400">'help'</span> for list of commands.</p>`);
                break;
        }

        // Refresh Lucide icons if any rendered inside terminal
        if (window.lucide) {
            window.lucide.createIcons();
        }
    }

    escapeHtml(str) {
        return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
    }
}
