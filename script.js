// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
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
        education: {
            keywords: ['education', 'degree', 'university', 'college', 'study', 'certification'],
            responses: [
                "Sabari's educational background:\n\n🎓 **Degree:** BE Computer Science from Anna University (2023)\n🏆 **Certification:** IBM Certified in Developing .NET (2024)\n\n📚 **Continuous Learning:**\nHe stays updated with the latest technologies and frameworks, especially in:\n• AI/ML technologies\n• Modern web development\n• Cloud computing\n• Mobile development\n\nHis combination of formal education and industry certifications makes him well-equipped for modern software development challenges!"
            ]
        },
        ai: {
            keywords: ['ai', 'artificial intelligence', 'machine learning', 'ml', 'chatbot', 'langchain', 'openai'],
            responses: [
                "Sabari has extensive experience in AI/ML technologies:\n\n🧠 **AI Tools & Frameworks:**\n• LangChain for building AI applications\n• Streamlit for AI web interfaces\n• OpenAI & Groq LLM integration\n• Pinecone & ChromaDB for vector databases\n• Flowise for visual AI pipeline creation\n\n🚀 **AI Projects:**\n• ChatNova - Restaurant chatbot with intelligent conversations\n• RAG Chatbot - Retrieval-augmented generation system\n• Code Assistant - AI-powered development helper\n• Document/Video summarizers\n\nHe combines traditional software development with cutting-edge AI to create intelligent, interactive applications!"
            ]
        },
        default: [
            "That's an interesting question! Let me help you find what you're looking for. You can ask me about:\n\n• Sabari's technical skills and expertise\n• His professional experience and projects\n• How to contact or hire him\n• His AI/ML capabilities\n• His education and certifications\n\nWhat specifically would you like to know?",
            "I'd be happy to help! I can provide information about Sabari's background, skills, projects, and how to get in touch with him. What would you like to learn more about?",
            "Great question! I can tell you about Sabari's experience as a Full Stack Developer, his AI projects, technical skills, or how to contact him. What interests you most?"
        ]
    };

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

        // Show typing indicator
        showTypingIndicator();

        // Generate response after delay
        setTimeout(() => {
            hideTypingIndicator();
            const response = generateResponse(message);
            addMessage(response, 'bot');
            chatbotSend.disabled = false;
        }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
    }

    function addMessage(content, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.innerHTML = sender === 'bot' ? '<i class="fas fa-robot"></i>' : '<i class="fas fa-user"></i>';
        
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
        
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(messageContent);
        
        chatbotMessages.appendChild(messageDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    function showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot-message typing-message';
        typingDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="message-content">
                <div class="typing-indicator">
                    <span style="color: #8b949e; font-size: 0.9rem;">Sabari's assistant is typing</span>
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

    function generateResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        // Check for greeting patterns
        if (lowerMessage.match(/^(hi|hello|hey|good morning|good afternoon|good evening)/)) {
            return getRandomResponse(responses.greetings);
        }
        
        // Check each category
        for (const [category, data] of Object.entries(responses)) {
            if (category === 'greetings' || category === 'default') continue;
            
            if (data.keywords && data.keywords.some(keyword => lowerMessage.includes(keyword))) {
                return getRandomResponse(data.responses);
            }
        }
        
        // Default response
        return getRandomResponse(responses.default);
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
