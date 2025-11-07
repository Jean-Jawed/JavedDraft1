// ====================================
// NAVIGATION MENU
// ====================================

const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navClose = document.getElementById('nav-close');
const navLinks = document.querySelectorAll('.nav__link');

// Open menu
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show');
    });
}

// Close menu
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show');
    });
}

// Close menu when clicking on nav links
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('show');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (navMenu && navMenu.classList.contains('show')) {
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            navMenu.classList.remove('show');
        }
    }
});

// ====================================
// HEADER SCROLL EFFECT
// ====================================

const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 80) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// ====================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ====================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Skip if href is just "#" or empty
        if (href === '#' || href === '') {
            e.preventDefault();
            return;
        }

        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const headerOffset = 100;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ====================================
// PROJECTS FILTER SYSTEM
// ====================================

const filterButtons = document.querySelectorAll('.filter-btn');
const projectSections = document.querySelectorAll('.projects-section');

if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');

            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Filter projects
            projectSections.forEach(section => {
                const category = section.getAttribute('data-category');

                if (filter === 'all') {
                    // Show all sections with fade-in effect
                    section.style.opacity = '0';
                    section.classList.remove('hidden');
                    setTimeout(() => {
                        section.style.opacity = '1';
                    }, 10);
                } else if (category === filter) {
                    // Show matching section with fade-in effect
                    section.style.opacity = '0';
                    section.classList.remove('hidden');
                    setTimeout(() => {
                        section.style.opacity = '1';
                    }, 10);
                } else {
                    // Hide non-matching section
                    section.style.opacity = '0';
                    setTimeout(() => {
                        section.classList.add('hidden');
                    }, 300);
                }
            });
        });
    });
}

// Handle direct links to categories (e.g., from homepage)
window.addEventListener('DOMContentLoaded', () => {
    const hash = window.location.hash;
    if (hash) {
        const categoryMap = {
            '#android': 'android',
            '#webdesign': 'webdesign',
            '#ia': 'ia',
            '#data': 'data',
            '#webapp': 'webapp'
        };

        const category = categoryMap[hash];
        if (category && filterButtons.length > 0) {
            // Find and click the corresponding filter button
            const targetButton = Array.from(filterButtons).find(
                btn => btn.getAttribute('data-filter') === category
            );
            if (targetButton) {
                targetButton.click();
                
                // Scroll to the section after a short delay
                setTimeout(() => {
                    const section = document.getElementById(category);
                    if (section) {
                        const headerOffset = 100;
                        const elementPosition = section.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                        });
                    }
                }, 100);
            }
        }
    }
});

// ====================================
// CODE MODAL SYSTEM
// ====================================

const modal = document.getElementById('code-modal');
const codeButtons = document.querySelectorAll('[data-code]');
const modalClose = document.querySelector('.modal__close');
const modalOverlay = document.querySelector('.modal__overlay');
const codeContent = document.getElementById('code-content');

// Code snippets database
const codeSnippets = {
    spacevox: `// SpaceVox - Voice-controlled game example
class VoiceGameController {
    private lateinit var speechRecognizer: SpeechRecognizer
    private var isListening = false
    
    fun startVoiceRecognition() {
        speechRecognizer = SpeechRecognizer.createSpeechRecognizer(context)
        
        val intent = Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH).apply {
            putExtra(RecognizerIntent.EXTRA_LANGUAGE_MODEL, 
                    RecognizerIntent.LANGUAGE_MODEL_FREE_FORM)
            putExtra(RecognizerIntent.EXTRA_PARTIAL_RESULTS, true)
        }
        
        speechRecognizer.setRecognitionListener(object : RecognitionListener {
            override fun onResults(results: Bundle?) {
                val matches = results?.getStringArrayList(
                    SpeechRecognizer.RESULTS_RECOGNITION
                )
                matches?.let { processVoiceCommand(it[0]) }
            }
            
            override fun onError(error: Int) {
                Log.e("VoiceControl", "Recognition error: $error")
                restartListening()
            }
        })
        
        speechRecognizer.startListening(intent)
        isListening = true
    }
    
    private fun processVoiceCommand(command: String) {
        when {
            command.contains("up", ignoreCase = true) -> moveSpaceshipUp()
            command.contains("down", ignoreCase = true) -> moveSpaceshipDown()
            command.contains("fire", ignoreCase = true) -> fireWeapon()
            command.contains("shield", ignoreCase = true) -> activateShield()
        }
    }
}`,
    
    neuroharmonics: `// Neuroharmonics - Audio processing example
class BiofeedbackAudioProcessor {
    private val audioTrack: AudioTrack by lazy { createAudioTrack() }
    private val sampleRate = 44100
    
    fun generateBinauralBeat(
        baseFreq: Double,
        beatFreq: Double,
        amplitude: Double
    ): ShortArray {
        val duration = 1.0 // 1 second
        val numSamples = (sampleRate * duration).toInt()
        val samples = ShortArray(numSamples * 2) // Stereo
        
        for (i in 0 until numSamples) {
            val t = i.toDouble() / sampleRate
            
            // Left channel - base frequency
            val leftSample = (amplitude * sin(2 * PI * baseFreq * t)).toInt()
            
            // Right channel - base + beat frequency
            val rightSample = (amplitude * sin(2 * PI * (baseFreq + beatFreq) * t)).toInt()
            
            samples[i * 2] = leftSample.toShort()
            samples[i * 2 + 1] = rightSample.toShort()
        }
        
        return samples
    }
    
    fun applyHarmonicResonance(samples: ShortArray): ShortArray {
        val fft = FFT(samples.size / 2)
        val complex = samples.map { Complex(it.toDouble(), 0.0) }
        
        // Apply FFT
        fft.fft(complex.toTypedArray())
        
        // Enhance harmonics at specific frequencies
        enhanceFrequencyRange(complex, 40.0, 100.0) // Gamma waves
        enhanceFrequencyRange(complex, 8.0, 13.0)   // Alpha waves
        
        // Inverse FFT
        fft.ifft(complex.toTypedArray())
        
        return complex.map { it.real.toInt().toShort() }.toShortArray()
    }
}`,
    
    quarantedeux: `// QuaranteDeux - Game logic example
class DiceGame {
    private val players = mutableListOf<Player>()
    private var currentPlayerIndex = 0
    private val targetScore = 42
    
    data class Player(
        val name: String,
        var score: Int = 0,
        var consecutiveWins: Int = 0
    )
    
    fun rollDice(): Pair<Int, Int> {
        val dice1 = (1..6).random()
        val dice2 = (1..6).random()
        return Pair(dice1, dice2)
    }
    
    fun playTurn(): GameState {
        val currentPlayer = players[currentPlayerIndex]
        val (dice1, dice2) = rollDice()
        val total = dice1 + dice2
        
        return when {
            // Double six - special bonus
            dice1 == 6 && dice2 == 6 -> {
                currentPlayer.score += 12
                currentPlayer.consecutiveWins++
                GameState.BONUS_ROUND
            }
            
            // Regular scoring
            total == 7 -> {
                currentPlayer.score += total * 2 // Lucky seven
                checkWinCondition(currentPlayer)
            }
            
            else -> {
                currentPlayer.score += total
                checkWinCondition(currentPlayer)
            }
        }
    }
    
    private fun checkWinCondition(player: Player): GameState {
        return when {
            player.score == targetScore -> GameState.WIN
            player.score > targetScore -> {
                player.score -= 10 // Penalty for overshooting
                GameState.PENALTY
            }
            else -> {
                nextPlayer()
                GameState.CONTINUE
            }
        }
    }
    
    private fun nextPlayer() {
        currentPlayerIndex = (currentPlayerIndex + 1) % players.size
    }
    
    enum class GameState {
        CONTINUE, WIN, PENALTY, BONUS_ROUND
    }
}`
};

// Open modal
if (codeButtons.length > 0) {
    codeButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const codeKey = button.getAttribute('data-code');
            const code = codeSnippets[codeKey];

            if (code && codeContent) {
                codeContent.textContent = code;
                
                // Apply syntax highlighting if highlight.js is loaded
                if (typeof hljs !== 'undefined') {
                    hljs.highlightElement(codeContent);
                }
                
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });
}

// Close modal
const closeModal = () => {
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
};

if (modalClose) {
    modalClose.addEventListener('click', closeModal);
}

if (modalOverlay) {
    modalOverlay.addEventListener('click', closeModal);
}

// Close modal with ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
        closeModal();
    }
});

// ====================================
// SCROLL REVEAL ANIMATIONS
// ====================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all elements with scroll-reveal class
document.querySelectorAll('.scroll-reveal').forEach(element => {
    observer.observe(element);
});

// Add scroll-reveal class to project cards and category cards on page load
window.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.project-card, .category-card, .skill-category, .philosophy-card, .faq-item').forEach(element => {
        element.classList.add('scroll-reveal');
        observer.observe(element);
    });
});

// ====================================
// CONTACT FORM HANDLING
// ====================================

const contactForm = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-btn');
const successMessage = document.getElementById('success-message');
const errorMessage = document.getElementById('error-message');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Get form data
        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            subject: document.getElementById('subject').value.trim(),
            message: document.getElementById('message').value.trim()
        };

        // Basic validation
        let isValid = true;
        const errors = {};

        if (formData.name.length < 2) {
            errors.name = 'Le nom doit contenir au moins 2 caractères';
            isValid = false;
        }

        if (!isValidEmail(formData.email)) {
            errors.email = 'Veuillez entrer une adresse email valide';
            isValid = false;
        }

        if (formData.subject.length < 3) {
            errors.subject = 'Le sujet doit contenir au moins 3 caractères';
            isValid = false;
        }

        if (formData.message.length < 10) {
            errors.message = 'Le message doit contenir au moins 10 caractères';
            isValid = false;
        }

        // Display errors
        Object.keys(errors).forEach(key => {
            const errorElement = document.getElementById(`${key}-error`);
            if (errorElement) {
                errorElement.textContent = errors[key];
            }
        });

        // Clear previous errors for valid fields
        ['name', 'email', 'subject', 'message'].forEach(key => {
            if (!errors[key]) {
                const errorElement = document.getElementById(`${key}-error`);
                if (errorElement) {
                    errorElement.textContent = '';
                }
            }
        });

        if (!isValid) return;

        // Show loading state
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoader = submitBtn.querySelector('.btn-loader');
        btnText.style.display = 'none';
        btnLoader.style.display = 'inline-block';
        submitBtn.disabled = true;

        // Simulate form submission (replace with actual API call)
        // In production, integrate with EmailJS, Formspree, or your backend
        try {
            await simulateFormSubmission(formData);

            // Show success message
            successMessage.style.display = 'flex';
            errorMessage.style.display = 'none';
            
            // Reset form
            contactForm.reset();

            // Scroll to success message
            successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

        } catch (error) {
            // Show error message
            errorMessage.style.display = 'flex';
            successMessage.style.display = 'none';
            
            // Scroll to error message
            errorMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } finally {
            // Reset button state
            btnText.style.display = 'inline';
            btnLoader.style.display = 'none';
            submitBtn.disabled = false;
        }
    });
}

// Helper function to validate email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Simulate form submission (replace with actual implementation)
function simulateFormSubmission(data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simulate success (90% success rate for demo)
            if (Math.random() > 0.1) {
                console.log('Form submitted:', data);
                resolve();
            } else {
                reject(new Error('Submission failed'));
            }
        }, 2000);
    });
}

// ====================================
// LAZY LOADING IMAGES
// ====================================

if ('loading' in HTMLImageElement.prototype) {
    // Browser supports native lazy loading
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src || img.src;
    });
} else {
    // Fallback for browsers that don't support native lazy loading
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ====================================
// ACTIVE PAGE HIGHLIGHT
// ====================================

// Highlight current page in navigation
window.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });
});

// ====================================
// PERFORMANCE OPTIMIZATION
// ====================================

// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Use debounced scroll for better performance
const debouncedScroll = debounce(() => {
    // Add any additional scroll-based logic here
}, 100);

window.addEventListener('scroll', debouncedScroll);

// ====================================
// CONSOLE GREETING
// ====================================

console.log(
    '%cBienvenue sur javed.fr! 👋',
    'font-size: 20px; font-weight: bold; color: #3B82F6;'
);
console.log(
    '%cVous êtes curieux ? Moi aussi! N\'hésitez pas à explorer le code.',
    'font-size: 14px; color: #64748B;'
);