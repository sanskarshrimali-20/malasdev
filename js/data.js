/**
 * Malas Dev - Centralized Data Repository
 * Dynamic content definitions for services, calculator, solutions, FAQs, and terminal commands.
 */

const MalasDevData = {
    // Company Metadata
    meta: {
        name: "Malas Dev",
        entity: "Sanskar Shrimali (Malas Dev Studios)",
        domain: "malasdev.online",
        email: "support@malasdev.online",
        phone: "+91 9131095346",
        phoneFormatted: "+91 9131095346",
        location: "India",
        year: new Date().getFullYear(),
        stack: ["Flutter", "Android", "Supabase", "PhonePe SDK", "Razorpay", "Resend SMTP", "Node.js"]
    },

    // Dynamic Services List
    services: [
        {
            id: "mobile-apps",
            category: "mobile",
            title: "Custom Mobile Apps",
            icon: "smartphone",
            badge: "Most Popular",
            badgeColor: "blue",
            shortDesc: "Cross-platform Flutter mobile applications for Android & iOS with smooth UX, deep linking, and native speed.",
            fullDesc: "Production-ready mobile applications built with clean architecture, state management (BLoC / Provider), deep link routing, push notifications (FCM), and biometric security.",
            basePrice: 1499,
            features: [
                "Android & iOS single codebase (Flutter)",
                "Firebase / Supabase backend integration",
                "Deep linking & Push notifications",
                "Biometric auth & Secure Storage",
                "Play Store & App Store deployment guidance"
            ]
        },
        {
            id: "web-apps",
            category: "web",
            title: "Web Applications & Portals",
            icon: "globe",
            badge: "High Demand",
            badgeColor: "indigo",
            shortDesc: "Modern, responsive web platforms and admin frontends built with clean CSS, web frameworks, and auth pipelines.",
            fullDesc: "High-performance web applications, SaaS user dashboards, and custom client portals with fast loading times, SEO optimization, and responsive design across device screen sizes.",
            basePrice: 999,
            features: [
                "Responsive HTML5, Tailwind CSS, JS/React",
                "Authentication & OAuth single sign-on",
                "Admin management dashboards",
                "Fast SEO & Lighthouse audit score",
                "Custom domain & SSL configuration"
            ]
        },
        {
            id: "cloud-backend",
            category: "backend",
            title: "Cloud Backend Infra",
            icon: "server",
            badge: "Scalable",
            badgeColor: "emerald",
            shortDesc: "Supabase architecture, Edge Functions, automated SMTP deliverability (Resend), and SQL database design.",
            fullDesc: "Serverless backend architecture setup including PostgreSQL database design, Row Level Security (RLS), serverless Edge Functions, RESTful APIs, and deliverability-verified automated email workflows.",
            basePrice: 799,
            features: [
                "Supabase / Firebase cloud backend",
                "PostgreSQL schema & Row Level Security",
                "Resend SMTP email deliverability setup",
                "Edge Functions & Webhook handling",
                "Automated nightly DB backups"
            ]
        },
        {
            id: "payment-gateways",
            category: "payments",
            title: "Payment Gateways SDK",
            icon: "credit-card",
            badge: "Compliant",
            badgeColor: "purple",
            shortDesc: "Seamless integration of mobile payment gateways (PhonePe Business, Razorpay) with backend webhooks.",
            fullDesc: "Complete integration of PhonePe Business SDK, Razorpay, or Stripe into mobile and web apps with secure checksum verification, server-side callback handling, and automated refund triggers.",
            basePrice: 499,
            features: [
                "PhonePe Business SDK & Razorpay support",
                "Server-side SHA256 checksum verification",
                "UPI, Credit Card, & NetBanking support",
                "Real-time webhook callback processing",
                "Legal & policy setup for merchant approval"
            ]
        }
    ],

    // Interactive Cost Estimator Options
    calculatorOptions: {
        platform: [
            { id: "calc_android", label: "Android Mobile App (Flutter)", price: 800, icon: "smartphone" },
            { id: "calc_ios", label: "iOS Mobile App (Flutter)", price: 700, icon: "tablet" },
            { id: "calc_web", label: "Web Application / Dashboard", price: 600, icon: "globe" }
        ],
        features: [
            { id: "calc_auth", label: "User Authentication & Social Login", price: 200, defaultChecked: true },
            { id: "calc_db", label: "Supabase / SQL Cloud Database", price: 350, defaultChecked: true },
            { id: "calc_payment", label: "Payment Gateway (PhonePe/Razorpay)", price: 300, defaultChecked: true },
            { id: "calc_email", label: "Automated Email Notifications (Resend)", price: 150 },
            { id: "calc_admin", label: "Admin Control Dashboard", price: 400 },
            { id: "calc_appstore", label: "App Store Publishing Support", price: 250 }
        ]
    },

    // Dynamic Showcase / Portfolio Projects
    portfolio: [
        {
            id: "project-1",
            title: "PayPulse Mobile UPI Suite",
            category: "Mobile & Payments",
            tag: "Flutter + PhonePe",
            description: "A fast, secure mobile wallet app with real-time UPI transaction logs, bio-auth, and automatic payment status webhooks.",
            stats: "50k+ Active Users",
            image: "https://images.unsplash.com/photo-1556742049-0a67e0e7a2bd?auto=format&fit=crop&w=600&q=80",
            stack: ["Flutter", "Supabase", "PhonePe SDK", "Node.js"],
            details: "Built for seamless merchant payments in India. Features instant payment link generation, soundbox notifications simulation, and SHA-256 HMAC verified webhook callbacks."
        },
        {
            id: "project-2",
            title: "CloudVault SaaS Admin Dashboard",
            category: "Web & Backend",
            tag: "Web + Supabase",
            description: "An umbrella multi-tenant admin portal to manage users, API keys, subscription licenses, and analytics.",
            stats: "99.99% Uptime",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
            stack: ["Tailwind CSS", "JavaScript", "Supabase RLS", "PostgreSQL"],
            details: "Features fine-grained role-based access control (RBAC), live metric graphs, automated DMARC-compliant email dispatch via Resend, and dynamic policy updates."
        },
        {
            id: "project-3",
            title: "Subscribely In-App Subscription Hub",
            category: "Mobile & Backend",
            tag: "Flutter + Razorpay",
            description: "Utility mobile app managing digital active subscriptions with automated invoice generation and email receipts.",
            stats: "$2M+ Handled",
            image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&q=80",
            stack: ["Flutter", "Razorpay Webhooks", "Resend SMTP", "Edge Functions"],
            details: "Handles recurring subscription cycles, automated graceful retry on failed payments, and instant cancellation/refund processing compliant with app store rules."
        }
    ],

    // Testimonials
    testimonials: [
        {
            name: "Aarav Sharma",
            role: "Founder, TechScale India",
            avatar: "https://i.pravatar.cc/100?img=11",
            content: "Malas Dev delivered our Flutter mobile application integrated with PhonePe payment gateway in record time. The architecture was extremely clean and merchant approval went smoothly!",
            rating: 5,
            project: "Flutter & Payment Integration"
        },
        {
            name: "Priya Mehta",
            role: "Product Lead, FinSolve",
            avatar: "https://i.pravatar.cc/100?img=32",
            content: "Sanskar's expertise in Supabase cloud infra and security policies made our web app backend bulletproof. Reliable, transparent pricing and top-tier code quality.",
            rating: 5,
            project: "Cloud Backend & Security"
        },
        {
            name: "Rohan Verma",
            role: "CTO, DigitalPulse",
            avatar: "https://i.pravatar.cc/100?img=53",
            content: "The legal policy setup and web platform created by Malas Dev satisfied all merchant onboarding compliance requirements without friction. Highly recommended studio!",
            rating: 5,
            project: "Web App & Compliance"
        }
    ],

    // Stats Dynamic Counter
    stats: [
        { id: "stat-apps", value: 35, suffix: "+", label: "Delivered Applications" },
        { id: "stat-uptime", value: 99, decimal: ".9%", label: "Cloud Infra Uptime" },
        { id: "stat-clients", value: 100, suffix: "%", label: "Client Satisfaction" },
        { id: "stat-trans", value: 5, prefix: "$", suffix: "M+", label: "Transactions Processed" }
    ],

    // FAQs
    faqs: [
        {
            q: "What technologies does Malas Dev specialize in?",
            a: "We specialize in Flutter for multi-platform mobile apps (Android & iOS), Supabase/Firebase for cloud backends, payment gateway SDK integrations (PhonePe, Razorpay, Stripe), and web frontends using modern HTML/CSS/JS and React."
        },
        {
            q: "How long does a typical mobile application project take?",
            a: "Simple utility mobile apps take 2–3 weeks. Custom apps with user auth, database backends, and payment integrations typically take 4–6 weeks from architecture design to app store launch."
        },
        {
            q: "Do you assist with payment gateway merchant onboarding & policies?",
            a: "Yes! We provide complete end-to-end integration along with compliant Legal Policies (Privacy, Terms, Refund/Cancellation) required by merchant acquirers such as PhonePe Business and Razorpay."
        },
        {
            q: "What is your pricing structure and support agreement?",
            a: "We offer clear, upfront fixed-price milestones starting at $499 for payment SDK integrations up to $1,499+ for full custom mobile applications. All projects include 30 days of post-launch maintenance and support."
        },
        {
            q: "Can I customize an estimated quote for my project?",
            a: "Yes, you can use our dynamic Project Estimator calculator on this site to select individual modules and instantly send us a prefilled quote request!"
        }
    ]
};
