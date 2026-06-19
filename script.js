// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Video Background Setup
    const heroVideo = document.getElementById('heroVideo');
    if (heroVideo) {
        heroVideo.addEventListener('loadeddata', function() {
            console.log('Video loaded successfully');
        });
        
        heroVideo.addEventListener('error', function(e) {
            console.log('Video error:', e);
            // Hide video background if it fails to load
            const videoBackground = document.querySelector('.video-background');
            if (videoBackground) {
                videoBackground.style.display = 'none';
            }
        });
        
        // Ensure video plays
        heroVideo.play().catch(e => {
            console.log('Video autoplay failed:', e);
        });
    }
    
    // Navigation functionality
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    navToggle.addEventListener('click', function() {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active navigation link highlighting
    function highlightActiveNavLink() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        const headerHeight = document.querySelector('.header').offsetHeight;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 50;
            const sectionHeight = section.offsetHeight;
            
            if (window.pageYOffset >= sectionTop && 
                window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }

    // Header background on scroll
    function handleHeaderScroll() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(13, 17, 23, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.5)';
        } else {
            header.style.background = 'rgba(13, 17, 23, 0.95)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.4)';
        }
    }

    // Typing animation for hero subtitle
    const typingText = document.querySelector('.typing-text');
    const titles = [
        'Full Stack Developer',
        'AI/ML Enthusiast',
        'Web Developer',
        'Mobile App Developer',
        'Microsoft Certified'
    ];
    
    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeTitle() {
        const currentTitle = titles[titleIndex];
        
        if (isDeleting) {
            typingText.textContent = currentTitle.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingText.textContent = currentTitle.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentTitle.length) {
            setTimeout(() => {
                isDeleting = true;
            }, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            titleIndex = (titleIndex + 1) % titles.length;
        }

        setTimeout(typeTitle, typingSpeed);
    }

    // Start typing animation
    typeTitle();

    // Scroll animations
    function animateOnScroll() {
        const elements = document.querySelectorAll('.fade-in');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('visible');
            }
        });
    }

    // Add fade-in class to elements that should animate
    function addFadeInClasses() {
        const animateElements = [
            '.about-content',
            '.skill-category',
            '.timeline-item',
            '.project-card',
            '.contact-content'
        ];

        animateElements.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(element => {
                element.classList.add('fade-in');
            });
        });
    }

    // Initialize fade-in animations
    addFadeInClasses();

    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');

            // Basic validation
            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }

            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }

            // Simulate form submission (replace with actual submission logic)
            showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
            this.reset();
        });
    }

    // Email validation
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Notification system
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;

        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10000;
            padding: 15px 20px;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            transform: translateX(400px);
            transition: transform 0.3s ease;
            max-width: 350px;
        `;

        // Set background color based on type
        const colors = {
            success: '#238636',
            error: '#da3633',
            info: '#58a6ff',
            warning: '#d29922'
        };
        notification.style.backgroundColor = colors[type] || colors.info;

        // Add to page
        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        });

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.transform = 'translateX(400px)';
                setTimeout(() => {
                    notification.remove();
                }, 300);
            }
        }, 5000);
    }

    // Skills animation on scroll
    function animateSkillTags() {
        const skillTags = document.querySelectorAll('.skill-tag');
        
        skillTags.forEach((tag, index) => {
            const tagTop = tag.getBoundingClientRect().top;
            
            if (tagTop < window.innerHeight - 100) {
                setTimeout(() => {
                    tag.style.opacity = '1';
                    tag.style.transform = 'translateY(0)';
                }, index * 50);
            }
        });
    }

    // Initialize skill tags
    function initSkillTags() {
        const skillTags = document.querySelectorAll('.skill-tag');
        skillTags.forEach(tag => {
            tag.style.opacity = '0';
            tag.style.transform = 'translateY(20px)';
            tag.style.transition = 'all 0.3s ease';
        });
    }

    // Project cards hover effect
    function initProjectCards() {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    // Statistics counter animation
    function animateStats() {
        const stats = document.querySelectorAll('.stat h3');
        
        stats.forEach(stat => {
            const statTop = stat.getBoundingClientRect().top;
            
            if (statTop < window.innerHeight - 100 && !stat.classList.contains('animated')) {
                stat.classList.add('animated');
                const finalValue = stat.textContent;
                const isNumber = !isNaN(parseInt(finalValue));
                
                if (isNumber) {
                    const targetValue = parseInt(finalValue);
                    let currentValue = 0;
                    const increment = targetValue / 50;
                    
                    const counter = setInterval(() => {
                        currentValue += increment;
                        if (currentValue >= targetValue) {
                            stat.textContent = finalValue;
                            clearInterval(counter);
                        } else {
                            stat.textContent = Math.floor(currentValue) + '+';
                        }
                    }, 50);
                }
            }
        });
    }

    // Parallax effect for hero section
    function parallaxHero() {
        const hero = document.querySelector('.hero');
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (hero) {
            hero.style.transform = `translateY(${rate}px)`;
        }
    }

    // Event listeners
    window.addEventListener('scroll', function() {
        highlightActiveNavLink();
        handleHeaderScroll();
        animateOnScroll();
        animateSkillTags();
        animateStats();
        // parallaxHero(); // Uncomment if you want parallax effect
    });

    window.addEventListener('resize', function() {
        // Close mobile menu on resize
        if (window.innerWidth > 768) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // Initialize functions
    initSkillTags();
    initProjectCards();
    
    // Initial calls
    highlightActiveNavLink();
    animateOnScroll();

    // Social links click handlers
    document.querySelectorAll('.social-link').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') {
                e.preventDefault();
                showNotification('Social link not configured yet', 'info');
            }
        });
    });

    // Project links click handlers
    document.querySelectorAll('.project-link').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') {
                e.preventDefault();
                showNotification('Project link will be available soon', 'info');
            }
        });
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        // Press 'Escape' to close mobile menu
        if (e.key === 'Escape') {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // Page load animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Add a subtle animation to the page load
        const heroContent = document.querySelector('.hero-content');
        const heroImage = document.querySelector('.hero-image');
        
        if (heroContent) {
            heroContent.style.opacity = '0';
            heroContent.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                heroContent.style.transition = 'all 1s ease';
                heroContent.style.opacity = '1';
                heroContent.style.transform = 'translateY(0)';
            }, 300);
        }
        
        if (heroImage) {
            heroImage.style.opacity = '0';
            heroImage.style.transform = 'translateX(30px)';
            
            setTimeout(() => {
                heroImage.style.transition = 'all 1s ease';
                heroImage.style.opacity = '1';
                heroImage.style.transform = 'translateX(0)';
            }, 600);
        }
    });

    // Add loading class initially
    document.body.classList.add('loading');

    // Initialize chatbot
    initializeChatbot();

    console.log('Portfolio loaded successfully! 🚀');
});

// Chatbot Functionality
function initializeChatbot() {
    const chatbotToggle = document.getElementById('chatbotToggle');
    const chatbotWindow = document.getElementById('chatbotWindow');
    const chatbotClose = document.getElementById('chatbotClose');
    const chatbotInput = document.getElementById('chatbotInput');
    const chatbotSend = document.getElementById('chatbotSend');
    const chatbotMessages = document.getElementById('chatbotMessages');
    const chatbotBadge = document.getElementById('chatbotBadge');

    let isOpen = false;
    let conversationStarted = false;

    // Chatbot responses database
    const responses = {
        greetings: [
            "Hello! I'm here to help you learn more about Sabari Abishake. What would you like to know?",
            "Hi there! I can tell you about Sabari's skills, projects, and experience. How can I assist you?",
            "Welcome! I'm Sabari's AI assistant. Feel free to ask me anything about his portfolio!"
        ],
        skills: {
            keywords: ['skill', 'technology', 'tech', 'programming', 'language', 'framework', 'tools'],
            responses: [
                "Sabari is a Full Stack Developer with expertise in:\n\n🔹 **Frontend:** Angular, Vue.js, React, HTML5, CSS3, JavaScript\n🔹 **Backend:** .NET Core, Node.js, Java, ASP.NET Core\n🔹 **Mobile:** Flutter, Xamarin, Ionic, Cordova\n🔹 **AI/ML:** LangChain, Streamlit, OpenAI, Groq LLM, Pinecone\n🔹 **Databases:** SQL Server, MongoDB, PostgreSQL, MySQL\n🔹 **Cloud:** Microsoft Azure, Jenkins CI/CD\n\nHe's also IBM certified in .NET development!"
            ]
        },
        experience: {
            keywords: ['experience', 'work', 'job', 'career', 'professional', 'company', 'dod'],
            responses: [
                "Sabari has 2+ years of professional experience as a Full Stack Web Developer at DOD IT Solution (March 2023 - Present).\n\n💼 **Key Achievements:**\n• Developed enterprise applications like boons, utctravel, utility bills pay\n• Built AI chatbots using LangChain and Streamlit\n• Created mobile apps with Flutter and Ionic\n• Implemented CI/CD pipelines with Jenkins\n• Worked with modern tech stack including .NET Core, Angular, and MongoDB\n\nHe's contributed to multiple successful projects in web development, mobile apps, and AI solutions!"
            ]
        },
        projects: {
            keywords: ['project', 'work', 'built', 'created', 'developed', 'portfolio', 'github'],
            responses: [
                "Sabari has worked on several impressive projects:\n\n🤖 **AI Projects:**\n• ChatNova - Smart restaurant chatbot with LangChain & Groq LLM\n• Code Assistant - AI-powered coding helper with RAG\n• Text Summarizer - Document summarization tool\n• YouTube Video Summarizer - Extract key insights from videos\n\n🌐 **Web Applications:**\n• Enterprise platforms: boons, utctravel, Reconbus\n• Utility payment systems\n• Cryptocurrency platforms\n\n📱 **Mobile Development:**\n• Cross-platform apps using Flutter\n• Native mobile solutions\n\nCheck out his GitHub at github.com/sabari612 for more details!"
            ]
        },
        contact: {
            keywords: ['contact', 'email', 'phone', 'reach', 'hire', 'connect', 'linkedin'],
            responses: [
                "You can reach Sabari through multiple channels:\n\n📧 **Email:** sabariabishake17abd@gmail.com\n📱 **Phone:** +91 9791675458\n💼 **LinkedIn:** linkedin.com/in/sabari-abishake-0a551a27b\n🐙 **GitHub:** github.com/sabari612\n\n💡 **Want to hire him?** You can use the contact form on this website or reach out directly via email. He's always open to discussing new opportunities and exciting projects!\n\nHe typically responds within 24 hours to all inquiries."
            ]
        },
        resume: {
            keywords: ['resume', 'cv', 'download', 'pdf', 'curriculum'],
            responses: [
                "📄 **Resume Download Available!**\n\nYou can download Sabari's complete resume which includes:\n\n• Professional experience details\n• Technical skills and certifications\n• Project highlights and achievements\n• Education and training background\n• Contact information\n\n**Click the download button below to get his latest resume in PDF format!**"
            ]
        },
        education: {
            keywords: ['education', 'degree', 'university', 'college', 'study', 'certification'],
            responses: [
                "Sabari's educational background:\n\n🎓 **Degree:** BE Computer Science from Anna University (2023)\n🏆 **Certification:** IBM Certified in Developing .NET (2024)\n\n📚 **Continuous Learning:**\nHe stays updated with the latest technologies and frameworks, especially in:\n• AI/ML technologies\n• Modern web development\n• Cloud computing\n• Mobile development\n\nHis combination of formal education and industry certifications makes him well-equipped for modern software development challenges!"
            ]
        },
        ai: {
            keywords: ['ai', 'artificial intelligence', 'machine learning', 'ml', 'langchain', 'openai', 'llm', 'genai', 'rag', 'vector', 'embedding'],
            responses: [
                "Sabari has extensive experience in AI/ML technologies:\n\n🧠 **AI Tools & Frameworks:**\n• LangChain for building AI applications\n• Streamlit for AI web interfaces\n• OpenAI & Groq LLM integration\n• Pinecone & ChromaDB for vector databases\n• Flowise for visual AI pipeline creation\n\n🚀 **AI Projects:**\n• ChatNova - Restaurant chatbot with intelligent conversations\n• RAG Chatbot - Retrieval-augmented generation system\n• Code Assistant - AI-powered development helper\n• Document/Video summarizers\n\nHe combines traditional software development with cutting-edge AI to create intelligent, interactive applications!"
            ]
        },
        location: {
            keywords: ['location', 'where', 'based', 'city', 'country', 'live', 'from', 'india', 'remote', 'relocate'],
            responses: [
                "📍 **Location:** Sabari is based in India and works as a Full Stack Developer at DOD IT Solution.\n\nHe's open to **remote work** and **collaboration opportunities** worldwide. For on-site discussions, feel free to reach out via email at sabariabishake17abd@gmail.com."
            ]
        },
        availability: {
            keywords: ['available', 'hire', 'hiring', 'freelance', 'opportunity', 'open to work', 'job offer', 'recruit'],
            responses: [
                "💼 **Open to Opportunities!**\n\nSabari is currently working full-time but is open to:\n• Exciting freelance / contract projects\n• AI / Full Stack consulting\n• Interesting collaborations\n\n📧 Reach him at **sabariabishake17abd@gmail.com** or use the contact form on this site. Typical response time: under 24 hours."
            ]
        },
        about: {
            keywords: ['who', 'about', 'introduce', 'yourself', 'tell me about', 'sabari', 'background'],
            responses: [
                "👋 **About Sabari Abishake.K**\n\nSabari is a passionate **Full Stack Developer** with 2+ years of experience building enterprise web apps, mobile apps and AI-powered solutions.\n\n🎓 BE Computer Science — Anna University (2023)\n🏆 IBM Certified .NET Developer (2024)\n💼 Currently at DOD IT Solution (Mar 2023 – Present)\n\nHe blends modern web development (Angular, .NET Core, Node.js) with cutting-edge AI (LangChain, OpenAI, RAG) to build intelligent products."
            ]
        },
        news: {
            keywords: ['news', 'latest', 'today', 'tech news', 'it news', 'world news', 'headlines', 'trending'],
            async: true
        },
        default: [
            "Let me think about that..."
        ]
    };

    // Compact portfolio context passed to the LLM as a system prompt so any open-ended
    // question still gets answered with accurate info about Sabari.
    const PORTFOLIO_CONTEXT = `You are the AI assistant on Sabari Abishake.K's portfolio website.
Answer the visitor's question concisely (2-5 short sentences) and helpfully.
If the question is about Sabari, use ONLY the facts below. If it's a general/IT/world/coding question, answer it directly and accurately.
Never invent facts about Sabari.

ABOUT SABARI:
- Full Stack Developer based in India, 2+ years of experience.
- Currently Full Stack Web Developer at DOD IT Solution (March 2023 - Present).
- BE Computer Science, Anna University (2023). IBM Certified .NET Developer (2024).
- Email: sabariabishake17abd@gmail.com | Phone: +91 9791675458
- GitHub: github.com/sabari612 | LinkedIn: linkedin.com/in/sabari-abishake-0a551a27b
- Open to freelance, remote opportunities and AI/full-stack collaborations.

SKILLS:
- Frontend: Angular, Vue.js, React, HTML5, CSS3, JavaScript, TypeScript
- Backend: .NET Core, ASP.NET Core, Node.js, Java
- Mobile: Flutter, Ionic, Xamarin, Cordova
- AI/ML: LangChain, Streamlit, OpenAI, Groq LLM, Pinecone, ChromaDB, Flowise, RAG
- Databases: SQL Server, MongoDB, PostgreSQL, MySQL
- Cloud / DevOps: Microsoft Azure, Jenkins CI/CD, Git

KEY PROJECTS:
- ChatNova: Smart restaurant chatbot (LangChain + Groq LLM)
- Code Assistant: AI coding helper with RAG
- Text Summarizer & YouTube Video Summarizer
- Enterprise apps: boons, utctravel, Reconbus, utility bill payments
- Cross-platform mobile apps in Flutter

STYLE: Friendly, professional, no emojis spam (1-2 max). Use markdown **bold** for key terms. Keep answers tight.`;

    // Toggle chatbot
    chatbotToggle.addEventListener('click', function() {
        toggleChatbot();
    });

    chatbotClose.addEventListener('click', function() {
        closeChatbot();
    });

    // Send message functionality
    chatbotSend.addEventListener('click', function() {
        sendMessage();
    });

    chatbotInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Quick reply buttons
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('quick-reply') || e.target.classList.contains('suggestion-chip')) {
            const message = e.target.getAttribute('data-message');
            if (message) {
                chatbotInput.value = message;
                sendMessage();
            }
        }
    });

    function toggleChatbot() {
        if (isOpen) {
            closeChatbot();
        } else {
            openChatbot();
        }
    }

    function openChatbot() {
        chatbotWindow.classList.add('active');
        chatbotBadge.style.display = 'none';
        isOpen = true;
        
        if (!conversationStarted) {
            setTimeout(() => {
                showWelcomeMessage();
            }, 500);
            conversationStarted = true;
        }
    }

    function closeChatbot() {
        chatbotWindow.classList.remove('active');
        isOpen = false;
        
        setTimeout(() => {
            chatbotBadge.style.display = 'block';
        }, 2000);
    }

    function showWelcomeMessage() {
        // This is handled by the initial HTML message
    }

    function sendMessage() {
        const message = chatbotInput.value.trim();
        if (!message) return;

        // Add user message
        addMessage(message, 'user');
        chatbotInput.value = '';
        chatbotSend.disabled = true;

        // Route news queries through the async fetcher (auto-updates daily)
        if (isNewsIntent(message)) {
            showTypingIndicator();
            fetchITNews()
                .then(articles => {
                    hideTypingIndicator();
                    addMessage(formatNewsResponse(articles), 'bot');
                    chatbotSend.disabled = false;
                })
                .catch(() => {
                    hideTypingIndicator();
                    addMessage("Sorry, I couldn't fetch the latest IT news right now. Please try again in a moment.", 'bot');
                    chatbotSend.disabled = false;
                });
            return;
        }

        // Fast path: try local keyword/intent match first
        const localMatch = tryLocalMatch(message);
        if (localMatch) {
            showTypingIndicator();
            const isResumeQuery = /resume|cv|download|pdf|curriculum/i.test(message);
            setTimeout(() => {
                hideTypingIndicator();
                addMessage(localMatch, 'bot', !!isResumeQuery);
                chatbotSend.disabled = false;
            }, 600 + Math.random() * 600);
            return;
        }

        // LLM fallback for anything else - lets the bot answer ANY question
        showThinkingIndicator();
        askAI(message)
            .then(reply => {
                hideTypingIndicator();
                addMessage(reply, 'bot', false, true);
                chatbotSend.disabled = false;
            })
            .catch(() => {
                hideTypingIndicator();
                addMessage("I'm having trouble reaching my AI brain right now. Try asking about Sabari's **skills**, **projects**, **experience**, **AI work** or **today's IT news** — I can answer those instantly!", 'bot');
                chatbotSend.disabled = false;
            });
    }

    function isNewsIntent(message) {
        const lower = message.toLowerCase();
        return responses.news.keywords.some(k => lower.includes(k));
    }

    // Returns a matched local response or null if no keyword intent fires.
    function tryLocalMatch(message) {
        const lower = message.toLowerCase();
        if (/^(hi|hello|hey|yo|hola|namaste|good\s*(morning|afternoon|evening|night))\b/.test(lower)) {
            return getRandomResponse(responses.greetings);
        }
        for (const [category, data] of Object.entries(responses)) {
            if (category === 'greetings' || category === 'default' || data.async) continue;
            if (data.keywords && data.keywords.some(k => lower.includes(k))) {
                return getRandomResponse(data.responses);
            }
        }
        return null;
    }

    // Free, no-API-key LLM fallback via Pollinations.ai. Public endpoint, CORS-enabled.
    // Sends the portfolio context as a system prompt so answers stay grounded.
    async function askAI(userMessage) {
        const endpoint = 'https://text.pollinations.ai/';
        const payload = {
            messages: [
                { role: 'system', content: PORTFOLIO_CONTEXT },
                { role: 'user', content: userMessage }
            ],
            model: 'openai',
            seed: Math.floor(Math.random() * 100000)
        };
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 20000);
        try {
            const res = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
                signal: controller.signal
            });
            if (!res.ok) throw new Error('AI request failed: ' + res.status);
            const text = (await res.text()).trim();
            if (!text) throw new Error('Empty AI response');
            return text;
        } finally {
            clearTimeout(timeoutId);
        }
    }

    // Daily auto-updating IT news via Hacker News Algolia API (no key, CORS-enabled).
    // Cached in localStorage per UTC date so it refreshes once a day automatically.
    async function fetchITNews() {
        const todayKey = 'itNewsCache_' + new Date().toISOString().slice(0, 10);
        const cached = localStorage.getItem(todayKey);
        if (cached) {
            try { return JSON.parse(cached); } catch (e) { /* fall through */ }
        }

        const endpoint = 'https://hn.algolia.com/api/v1/search?tags=front_page';
        const res = await fetch(endpoint);
        if (!res.ok) throw new Error('News fetch failed');
        const data = await res.json();

        const articles = (data.hits || [])
            .filter(h => h.title && h.url)
            .slice(0, 5)
            .map(h => ({ title: h.title, url: h.url, points: h.points || 0 }));

        // Clear any previous-day cache entries before storing today's
        Object.keys(localStorage)
            .filter(k => k.startsWith('itNewsCache_') && k !== todayKey)
            .forEach(k => localStorage.removeItem(k));

        localStorage.setItem(todayKey, JSON.stringify(articles));
        return articles;
    }

    function formatNewsResponse(articles) {
        if (!articles || articles.length === 0) {
            return "No IT news available right now. Please check back later!";
        }
        const today = new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
        const items = articles.map((a, i) => {
            const safeTitle = a.title.replace(/</g, '&lt;').replace(/>/g, '&gt;');
            return `${i + 1}. <a href="${a.url}" target="_blank" rel="noopener noreferrer" style="color:#58a6ff;">${safeTitle}</a> <span style="color:#8b949e;">(${a.points} pts)</span>`;
        }).join('\n');
        return `📰 **Latest IT & Tech News — ${today}**\n\n${items}\n\n_Updated automatically every day from Hacker News._`;
    }

    function addMessage(content, sender, includeResumeButton = false, isAI = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message` + (isAI ? ' ai-message' : '');

        const avatar = document.createElement('div');
        avatar.className = 'message-avatar' + (isAI ? ' ai-avatar' : '');
        if (sender === 'bot') {
            avatar.innerHTML = isAI ? '<i class="fas fa-wand-magic-sparkles"></i>' : '<i class="fas fa-robot"></i>';
        } else {
            avatar.innerHTML = '<i class="fas fa-user"></i>';
        }

        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';

        const messageParagraph = document.createElement('p');

        // Convert markdown-like formatting to HTML
        const formattedContent = content
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/🔹|•/g, '<span style="color: #58a6ff;">•</span>')
            .replace(/\n/g, '<br>');

        messageParagraph.innerHTML = formattedContent;
        messageContent.appendChild(messageParagraph);

        // Small "AI" badge under LLM-generated answers
        if (isAI && sender === 'bot') {
            const badge = document.createElement('div');
            badge.className = 'ai-badge';
            badge.innerHTML = '<i class="fas fa-sparkles"></i> Generated by AI';
            messageContent.appendChild(badge);
        }

        // Add resume download button if this is a resume-related response
        if (includeResumeButton && sender === 'bot') {
            const resumeButtonDiv = document.createElement('div');
            resumeButtonDiv.className = 'quick-replies';
            resumeButtonDiv.style.marginTop = '10px';

            const resumeButton = document.createElement('a');
            resumeButton.href = 'resume.pdf';
            resumeButton.download = 'Sabari_Abishake_Resume.pdf';
            resumeButton.className = 'quick-reply resume-download';
            resumeButton.innerHTML = '<i class="fas fa-download"></i> Download Resume';

            resumeButtonDiv.appendChild(resumeButton);
            messageContent.appendChild(resumeButtonDiv);
        }

        messageDiv.appendChild(avatar);
        messageDiv.appendChild(messageContent);

        chatbotMessages.appendChild(messageDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    function showTypingIndicator() {
        renderTypingIndicator('<i class="fas fa-robot"></i>', "Sabari's assistant is typing");
    }

    // Distinct indicator when waiting on the LLM so the visitor knows AI is working
    function showThinkingIndicator() {
        renderTypingIndicator('<i class="fas fa-wand-magic-sparkles"></i>', 'AI is thinking', true);
    }

    function renderTypingIndicator(avatarHTML, label, isAI = false) {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot-message typing-message' + (isAI ? ' ai-message' : '');
        typingDiv.innerHTML = `
            <div class="message-avatar${isAI ? ' ai-avatar' : ''}">
                ${avatarHTML}
            </div>
            <div class="message-content">
                <div class="typing-indicator${isAI ? ' ai-thinking' : ''}">
                    <span style="color: #8b949e; font-size: 0.9rem;">${label}</span>
                    <div class="typing-dots">
                        <div class="typing-dot"></div>
                        <div class="typing-dot"></div>
                        <div class="typing-dot"></div>
                    </div>
                </div>
            </div>
        `;

        chatbotMessages.appendChild(typingDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    function hideTypingIndicator() {
        const typingMessage = document.querySelector('.typing-message');
        if (typingMessage) {
            typingMessage.remove();
        }
    }

    function getRandomResponse(responseArray) {
        return responseArray[Math.floor(Math.random() * responseArray.length)];
    }

    // Auto-show badge after page load
    setTimeout(() => {
        if (!isOpen && chatbotBadge) {
            chatbotBadge.style.opacity = '1';
            chatbotBadge.style.transform = 'translateY(0)';
        }
    }, 3000);
}

// Contact Form Handling - EmailJS Integration
document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS with public service
    if (typeof emailjs !== 'undefined') {
        emailjs.init("YOUR_PUBLIC_KEY");
    }
    
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const formMessage = document.getElementById('formMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Show loading state
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Try EmailJS first, then fallback to mailto
            if (typeof emailjs !== 'undefined') {
                // EmailJS method (will work when properly configured)
                const templateParams = {
                    from_name: name,
                    from_email: email,
                    subject: subject,
                    message: message,
                    to_email: 'sabariabishake17abd@gmail.com'
                };
                
                // For now, skip EmailJS and go straight to mailto
                sendViaMailto(name, email, subject, message);
            } else {
                // Direct mailto fallback
                sendViaMailto(name, email, subject, message);
            }
        });
    }
    
    function sendViaMailto(name, email, subject, message) {
        // Create professional email content
        const emailBody = `Hello Sabari,

You have received a new message from your portfolio contact form:

---
FROM: ${name}
EMAIL: ${email}
SUBJECT: ${subject}

MESSAGE:
${message}

---
This message was sent from your portfolio website.
Please reply directly to: ${email}`;
        
        // Create mailto link
        const mailtoLink = `mailto:sabariabishake17abd@gmail.com?subject=${encodeURIComponent('New Portfolio Message: ' + subject)}&body=${encodeURIComponent(emailBody)}`;
        
        // Show success message
        showMessage('✅ Thank you! Opening your email client...', 'success');
        
        // Open email client
        setTimeout(() => {
            try {
                // Try multiple methods to ensure it works
                const link = document.createElement('a');
                link.href = mailtoLink;
                link.click();
            } catch (error) {
                window.location.href = mailtoLink;
            }
            
            // Reset form
            contactForm.reset();
            submitBtn.textContent = 'Send Message';
            submitBtn.disabled = false;
            
            // Show additional info
            setTimeout(() => {
                showMessage('📧 Email opened! Send it to complete your message. Or email directly: sabariabishake17abd@gmail.com', 'success');
            }, 3000);
            
        }, 1000);
    }
    
    function showMessage(message, type) {
        if (formMessage) {
            formMessage.innerHTML = message;
            formMessage.className = `form-message ${type}`;
            formMessage.style.display = 'block';
            
            // Hide message after 8 seconds
            setTimeout(() => {
                if (formMessage) {
                    formMessage.style.display = 'none';
                }
            }, 8000);
        }
    }
});
