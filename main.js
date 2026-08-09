// Initialize all components when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeTypewriter();
    initializeScrollAnimations();
    initializeSkillsRadar();
    initializeProjectCarousel();
    initializeSkillProgress();
    initializeSmoothScrolling();
    initializeMobileMenu();
    initializePageAnimations();
    initializeChatInput();
});

function initializeTypewriter() {
    const el = document.getElementById('typed-text');
    if (!el || typeof Typed === 'undefined') return;

    new Typed('#typed-text', {
        strings: [
            'Building intelligent ERP solutions',
            'Creating AI-powered automation tools',
            'Developing custom Python applications',
            'Integrating systems for efficiency',
            'Delivering practical tech solutions'
        ],
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 2000,
        loop: true,
        showCursor: true,
        cursorChar: '|'
    });
}

function initializeScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.section-reveal').forEach(el => observer.observe(el));
}

function initializeSkillsRadar() {
    const chartDom = document.getElementById('skills-radar');
    if (!chartDom || typeof echarts === 'undefined') return;

    const myChart = echarts.init(chartDom);

    myChart.setOption({
        title: {
            text: 'Technical Skills Overview',
            left: 'center',
            textStyle: {
                color: '#0C2329',
                fontSize: 18,
                fontWeight: 'bold',
                fontFamily: 'Syne, sans-serif'
            }
        },
        radar: {
            indicator: [
                { name: 'Python Development', max: 100 },
                { name: 'ERPNext', max: 100 },
                { name: 'AI & ML', max: 100 },
                { name: 'Networking', max: 100 },
                { name: 'Automation', max: 100 },
                { name: 'System Admin', max: 100 }
            ],
            shape: 'polygon',
            splitNumber: 5,
            axisName: {
                color: '#3A555C',
                fontSize: 12,
                fontFamily: 'Manrope, sans-serif'
            },
            splitLine: {
                lineStyle: { color: '#D8E2E4' }
            },
            splitArea: {
                show: true,
                areaStyle: {
                    color: ['rgba(20, 145, 155, 0.10)', 'rgba(20, 145, 155, 0.04)']
                }
            }
        },
        series: [{
            name: 'Skills',
            type: 'radar',
            data: [{
                value: [95, 90, 85, 80, 88, 82],
                name: 'Current Level',
                areaStyle: { color: 'rgba(20, 145, 155, 0.28)' },
                lineStyle: { color: '#14919B', width: 3 },
                itemStyle: {
                    color: '#14919B',
                    borderColor: '#fff',
                    borderWidth: 2
                }
            }],
            animationDuration: 2000,
            animationEasing: 'cubicOut'
        }]
    });

    window.addEventListener('resize', () => myChart.resize());
}

function initializeProjectCarousel() {
    const carousel = document.getElementById('projects-carousel');
    if (!carousel || typeof Splide === 'undefined') return;

    new Splide('#projects-carousel', {
        type: 'loop',
        perPage: 3,
        perMove: 1,
        gap: '2rem',
        autoplay: true,
        interval: 5000,
        pauseOnHover: true,
        breakpoints: {
            1024: { perPage: 2 },
            640: { perPage: 1 }
        }
    }).mount();
}

function initializeSkillProgress() {
    const skillBars = document.querySelectorAll('.skill-progress');
    if (!skillBars.length || typeof anime === 'undefined') return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const bar = entry.target;
            const width = bar.getAttribute('data-width');
            anime({
                targets: bar,
                width: width + '%',
                duration: 1500,
                easing: 'easeOutCubic'
            });
            observer.unobserve(bar);
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => {
        bar.style.width = '0%';
        observer.observe(bar);
    });
}

function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (!href || href === '#') return;
            const target = document.querySelector(href);
            if (!target) return;
            e.preventDefault();
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
            const menu = document.getElementById('mobile-menu');
            if (menu) menu.classList.remove('open');
        });
    });
}

function initializeMobileMenu() {
    const toggle = document.getElementById('menu-toggle');
    const menu = document.getElementById('mobile-menu');
    if (!toggle || !menu) return;

    toggle.addEventListener('click', () => {
        menu.classList.toggle('open');
    });
}

const chatResponses = {
    default: [
        'I can help you with ERPNext customization, Python development, and automation solutions.',
        'My expertise includes ERPNext v14 & v15, AI assistants, and system integration.',
        'Would you like to discuss a specific project or technical challenge?'
    ],
    erpnext: [
        'I specialize in ERPNext v14 and v15 with extensive experience in custom app development.',
        'My ERPNext services include workflow automation, custom modules, and third-party integrations.',
        'I can help optimize your ERPNext implementation for better performance and usability.'
    ],
    automation: [
        'I develop automation solutions using Python, including task scheduling and workflow optimization.',
        'My automation tools can integrate with various systems including ERPNext, databases, and APIs.',
        'I can help streamline your business processes with intelligent automation.'
    ],
    ai: [
        'My AI assistants support both online and offline operation with multilingual capabilities.',
        'I integrate OCR, face recognition, and natural language processing in AI solutions.',
        'The AI systems I build can automate complex tasks and provide intelligent insights.'
    ]
};

function sendMessage() {
    const input = document.getElementById('chat-input');
    if (!input) return;
    const message = input.value.trim();
    if (!message) return;

    addChatMessage(message, 'user');
    input.value = '';

    setTimeout(() => {
        addChatMessage(getAIResponse(message), 'ai');
    }, 1000);
}

function askQuestion(question) {
    const input = document.getElementById('chat-input');
    if (!input) return;
    input.value = question;
    sendMessage();
}

function addChatMessage(message, sender) {
    const chatContainer = document.getElementById('chat-messages');
    if (!chatContainer) return;

    const messageDiv = document.createElement('div');
    if (sender === 'user') {
        messageDiv.className = 'chat-bubble bg-ink/5 p-4 mr-8';
        messageDiv.innerHTML = `<p class="text-sm text-ink/80">${message}</p>`;
    } else {
        messageDiv.className = 'chat-bubble bg-teal-500/10 p-4 ml-8';
        messageDiv.innerHTML = `<p class="text-sm text-ink/80">${message}</p>`;
    }

    chatContainer.appendChild(messageDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;

    if (typeof anime !== 'undefined') {
        anime({
            targets: messageDiv,
            opacity: [0, 1],
            translateY: [16, 0],
            duration: 450,
            easing: 'easeOutCubic'
        });
    } else {
        messageDiv.style.opacity = '1';
        messageDiv.style.transform = 'none';
    }
}

function getAIResponse(message) {
    const lowerMessage = message.toLowerCase();
    if (lowerMessage.includes('erpnext') || lowerMessage.includes('erp')) {
        return chatResponses.erpnext[Math.floor(Math.random() * chatResponses.erpnext.length)];
    }
    if (lowerMessage.includes('automation') || lowerMessage.includes('automate')) {
        return chatResponses.automation[Math.floor(Math.random() * chatResponses.automation.length)];
    }
    if (lowerMessage.includes('ai') || lowerMessage.includes('assistant')) {
        return chatResponses.ai[Math.floor(Math.random() * chatResponses.ai.length)];
    }
    return chatResponses.default[Math.floor(Math.random() * chatResponses.default.length)];
}

function initializeChatInput() {
    const chatInput = document.getElementById('chat-input');
    if (!chatInput) return;
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') sendMessage();
    });

    // Reveal the initial greeting bubble
    const firstBubble = document.querySelector('#chat-messages .chat-bubble');
    if (firstBubble && typeof anime !== 'undefined') {
        anime({
            targets: firstBubble,
            opacity: [0, 1],
            translateY: [12, 0],
            duration: 500,
            easing: 'easeOutCubic',
            delay: 200
        });
    } else if (firstBubble) {
        firstBubble.style.opacity = '1';
        firstBubble.style.transform = 'none';
    }
}

function initializePageAnimations() {
    if (typeof anime === 'undefined') return;

    anime.timeline({
        easing: 'easeOutExpo',
        duration: 900
    })
    .add({
        targets: '.hero-media',
        scale: [1.08, 1],
        duration: 1600,
        easing: 'easeOutCubic'
    })
    .add({
        targets: '.hero-brand',
        translateY: [36, 0],
        opacity: [0, 1],
        duration: 900
    }, '-=1200')
    .add({
        targets: '.hero-line',
        width: ['0%', '4.5rem'],
        duration: 700
    }, '-=650')
    .add({
        targets: '.hero-content h1, .hero-content p, .hero-content .flex',
        translateY: [24, 0],
        opacity: [0, 1],
        delay: anime.stagger(90),
        duration: 700
    }, '-=500');
}

window.addEventListener('scroll', function() {
    const navbar = document.querySelector('nav');
    if (!navbar) return;
    if (window.scrollY > 50) {
        navbar.classList.add('shadow-lg');
    } else {
        navbar.classList.remove('shadow-lg');
    }
});
