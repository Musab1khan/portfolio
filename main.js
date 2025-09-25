// Initialize all components when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeTypewriter();
    initializeScrollAnimations();
    initializeSkillsRadar();
    initializeProjectCarousel();
    initializeSkillProgress();
    initializeSmoothScrolling();
});

// Typewriter effect for hero section
function initializeTypewriter() {
    const typed = new Typed('#typed-text', {
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

// Scroll animations for sections
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, observerOptions);

    // Observe all sections with reveal animation
    document.querySelectorAll('.section-reveal').forEach(el => {
        observer.observe(el);
    });
}

// Skills radar chart
function initializeSkillsRadar() {
    const chartDom = document.getElementById('skills-radar');
    if (!chartDom) return;

    const myChart = echarts.init(chartDom);
    
    const option = {
        title: {
            text: 'Technical Skills Overview',
            left: 'center',
            textStyle: {
                color: '#1e293b',
                fontSize: 18,
                fontWeight: 'bold'
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
                color: '#374151',
                fontSize: 12
            },
            splitLine: {
                lineStyle: {
                    color: '#e5e7eb'
                }
            },
            splitArea: {
                show: true,
                areaStyle: {
                    color: ['rgba(6, 182, 212, 0.1)', 'rgba(6, 182, 212, 0.05)']
                }
            }
        },
        series: [{
            name: 'Skills',
            type: 'radar',
            data: [{
                value: [95, 90, 85, 80, 88, 82],
                name: 'Current Level',
                areaStyle: {
                    color: 'rgba(6, 182, 212, 0.3)'
                },
                lineStyle: {
                    color: '#06b6d4',
                    width: 3
                },
                itemStyle: {
                    color: '#06b6d4',
                    borderColor: '#fff',
                    borderWidth: 2
                }
            }],
            animationDuration: 2000,
            animationEasing: 'cubicOut'
        }]
    };

    myChart.setOption(option);

    // Responsive chart
    window.addEventListener('resize', function() {
        myChart.resize();
    });
}

// Project carousel
function initializeProjectCarousel() {
    const carousel = document.getElementById('projects-carousel');
    if (!carousel) return;

    new Splide('#projects-carousel', {
        type: 'loop',
        perPage: 3,
        perMove: 1,
        gap: '2rem',
        autoplay: true,
        interval: 5000,
        pauseOnHover: true,
        breakpoints: {
            1024: {
                perPage: 2,
            },
            640: {
                perPage: 1,
            }
        }
    }).mount();
}

// Skill progress bars animation
function initializeSkillProgress() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.getAttribute('data-width');
                
                anime({
                    targets: bar,
                    width: width + '%',
                    duration: 1500,
                    easing: 'easeOutCubic',
                    delay: anime.stagger(200)
                });
            }
        });
    }, observerOptions);

    skillBars.forEach(bar => {
        bar.style.width = '0%';
        observer.observe(bar);
    });
}

// Smooth scrolling for navigation links
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed nav
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// AI Chat functionality
const chatResponses = {
    'default': [
        'I can help you with ERPNext customization, Python development, and automation solutions.',
        'My expertise includes ERPNext v14 & v15, AI assistants, and system integration.',
        'Would you like to discuss a specific project or technical challenge?'
    ],
    'erpnext': [
        'I specialize in ERPNext v14 and v15 with extensive experience in custom app development.',
        'My ERPNext services include workflow automation, custom modules, and third-party integrations.',
        'I can help optimize your ERPNext implementation for better performance and usability.'
    ],
    'automation': [
        'I develop automation solutions using Python, including task scheduling and workflow optimization.',
        'My automation tools can integrate with various systems including ERPNext, databases, and APIs.',
        'I can help streamline your business processes with intelligent automation.'
    ],
    'ai': [
        'My AI assistants support both online and offline operation with multilingual capabilities.',
        'I integrate OCR, face recognition, and natural language processing in AI solutions.',
        'The AI systems I build can automate complex tasks and provide intelligent insights.'
    ]
};

function sendMessage() {
    const input = document.getElementById('chat-input');
    const message = input.value.trim();
    
    if (!message) return;
    
    addChatMessage(message, 'user');
    input.value = '';
    
    // Simulate AI response
    setTimeout(() => {
        const response = getAIResponse(message);
        addChatMessage(response, 'ai');
    }, 1000);
}

function askQuestion(question) {
    document.getElementById('chat-input').value = question;
    sendMessage();
}

function addChatMessage(message, sender) {
    const chatContainer = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    
    if (sender === 'user') {
        messageDiv.className = 'chat-bubble bg-blue-100 p-4 rounded-lg mr-12';
        messageDiv.innerHTML = `<p class="text-sm">${message}</p>`;
    } else {
        messageDiv.className = 'chat-bubble bg-teal-100 p-4 rounded-lg ml-12';
        messageDiv.innerHTML = `<p class="text-sm">${message}</p>`;
    }
    
    chatContainer.appendChild(messageDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
    
    // Animate the message appearance
    anime({
        targets: messageDiv,
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 500,
        easing: 'easeOutCubic'
    });
}

function getAIResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('erpnext') || lowerMessage.includes('erp')) {
        return chatResponses.erpnext[Math.floor(Math.random() * chatResponses.erpnext.length)];
    } else if (lowerMessage.includes('automation') || lowerMessage.includes('automate')) {
        return chatResponses.automation[Math.floor(Math.random() * chatResponses.automation.length)];
    } else if (lowerMessage.includes('ai') || lowerMessage.includes('assistant')) {
        return chatResponses.ai[Math.floor(Math.random() * chatResponses.ai.length)];
    } else {
        return chatResponses.default[Math.floor(Math.random() * chatResponses.default.length)];
    }
}

// Enter key support for chat input
document.addEventListener('DOMContentLoaded', function() {
    const chatInput = document.getElementById('chat-input');
    if (chatInput) {
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
});

// Add some interactive hover effects
document.addEventListener('DOMContentLoaded', function() {
    // Skill cards hover animation
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            anime({
                targets: this,
                scale: 1.02,
                duration: 300,
                easing: 'easeOutCubic'
            });
        });
        
        card.addEventListener('mouseleave', function() {
            anime({
                targets: this,
                scale: 1,
                duration: 300,
                easing: 'easeOutCubic'
            });
        });
    });

    // Project cards hover animation
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            anime({
                targets: this,
                translateY: -8,
                duration: 400,
                easing: 'easeOutCubic'
            });
        });
        
        card.addEventListener('mouseleave', function() {
            anime({
                targets: this,
                translateY: 0,
                duration: 400,
                easing: 'easeOutCubic'
            });
        });
    });
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('nav');
    if (window.scrollY > 50) {
        navbar.classList.add('shadow-lg');
    } else {
        navbar.classList.remove('shadow-lg');
    }
});

// Loading animation for page elements
function initializePageAnimations() {
    // Animate hero elements on load
    anime.timeline({
        easing: 'easeOutExpo',
        duration: 1000
    })
    .add({
        targets: '.hero-content h1',
        translateY: [50, 0],
        opacity: [0, 1],
        delay: 300
    })
    .add({
        targets: '.hero-content p',
        translateY: [30, 0],
        opacity: [0, 1],
        delay: 200
    }, '-=800')
    .add({
        targets: '.hero-content .flex',
        translateY: [20, 0],
        opacity: [0, 1],
        delay: anime.stagger(100)
    }, '-=600');
}

// Initialize page animations after DOM load
document.addEventListener('DOMContentLoaded', initializePageAnimations);