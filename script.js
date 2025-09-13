// DOM Elements
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const skillCards = document.querySelectorAll('.skill-card');
const progressBars = document.querySelectorAll('.progress-bar');
const filterBtns = document.querySelectorAll('.filter-btn');
const blogCards = document.querySelectorAll('.blog-card');
const playButton = document.getElementById('playButton');
const gameCanvas = document.getElementById('gameCanvas');
const gameOverlay = document.getElementById('gameOverlay');
const gameScore = document.getElementById('gameScore');
const highScore = document.getElementById('highScore');

// Theme Toggle Functionality
let currentTheme = 'colorful';

function toggleTheme() {
    if (currentTheme === 'colorful') {
        body.setAttribute('data-theme', 'bw');
        currentTheme = 'bw';
        themeToggle.innerHTML = '<i class="fas fa-palette"></i>';
    } else {
        body.removeAttribute('data-theme');
        currentTheme = 'colorful';
        themeToggle.innerHTML = '<i class="fas fa-palette"></i>';
    }
    
    // Save theme preference
    localStorage.setItem('theme', currentTheme);
    
    // Update game theme if game is running
    if (game.isRunning) {
        updateGameTheme();
    }
}

// Load saved theme
function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'bw') {
        toggleTheme();
    }
}

// Initialize theme
loadTheme();

// Event Listeners
themeToggle.addEventListener('click', toggleTheme);

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements for animations
document.addEventListener('DOMContentLoaded', () => {
    // Add animation classes to elements
    skillCards.forEach((card, index) => {
        card.classList.add('fade-in');
        card.style.animationDelay = `${index * 0.1}s`;
        observer.observe(card);
    });
    
    document.querySelectorAll('.achievement-card').forEach((card, index) => {
        card.classList.add('slide-in-left');
        card.style.animationDelay = `${index * 0.1}s`;
        observer.observe(card);
    });
    
    document.querySelectorAll('.blog-card').forEach((card, index) => {
        card.classList.add('slide-in-right');
        card.style.animationDelay = `${index * 0.1}s`;
        observer.observe(card);
    });
    
    // Animate progress bars
    setTimeout(() => {
        progressBars.forEach(bar => {
            const progress = bar.getAttribute('data-progress');
            bar.style.width = progress + '%';
        });
    }, 1000);
});

// Blog Filtering
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        
        blogCards.forEach(card => {
            const category = card.getAttribute('data-category');
            
            if (filter === 'all' || category === filter) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.5s ease-in-out';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Read More Button Functionality
document.querySelectorAll('.read-more').forEach(btn => {
    btn.addEventListener('click', () => {
        // For now, just show an alert. In a real app, this would navigate to a blog post
        alert('This would open the full blog post in a new page or modal.');
    });
});

// Contact Form
document.querySelector('.contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    alert(`Thank you! We'll get back to you at ${email}`);
    e.target.reset();
});

// Game Implementation
class EndlessPinkHoodieRun {
    constructor() {
        console.log('Initializing game...');
        console.log('Game canvas:', gameCanvas);
        
        if (!gameCanvas) {
            throw new Error('Game canvas not found!');
        }
        
        this.canvas = gameCanvas;
        this.ctx = this.canvas.getContext('2d');
        
        if (!this.ctx) {
            throw new Error('Could not get 2D context from canvas!');
        }
        
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        
        console.log('Canvas dimensions:', this.width, 'x', this.height);
        
        // Test draw to make sure canvas is working
        this.testDraw();
        
        // Show that game is ready
        this.showGameReady();
        
        // Game state
        this.isRunning = false;
        this.isPaused = false;
        this.score = 0;
        this.highScore = parseInt(localStorage.getItem('highScore')) || 0;
        this.gameSpeed = 5;
        this.laneWidth = this.width / 3;
        
        // Player (little girl with pink hoodie)
        this.player = {
            x: this.width / 2,
            y: this.height - 100,
            width: 40,
            height: 60,
            lane: 1, // 0: left, 1: center, 2: right
            color: '#ec4899' // Pink
        };
        
        // Obstacles (monsters)
        this.obstacles = [];
        this.obstacleTypes = [
            { color: '#ef4444', width: 50, height: 50 }, // Red monster
            { color: '#8b5cf6', width: 60, height: 40 }, // Purple monster
            { color: '#f59e0b', width: 45, height: 55 }  // Orange monster
        ];
        
        // Road
        this.roadLines = [];
        this.generateRoadLines();
        
        // Input handling
        this.keys = {};
        this.setupInputs();
        
        // Update high score display
        highScore.textContent = this.highScore;
    }
    
    testDraw() {
        // Draw a simple test pattern to verify canvas is working
        this.ctx.fillStyle = '#00ff00';
        this.ctx.fillRect(0, 0, 50, 50);
        this.ctx.fillStyle = '#ff0000';
        this.ctx.fillRect(this.width - 50, 0, 50, 50);
        console.log('Test draw completed - canvas is working!');
    }
    
    showGameReady() {
        // Draw a "Game Ready" message on the canvas
        this.ctx.fillStyle = '#000000';
        this.ctx.fillRect(0, 0, this.width, this.height);
        
        this.ctx.fillStyle = '#ffffff';
        this.ctx.font = '24px Poppins';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('Game Ready!', this.width / 2, this.height / 2 - 20);
        this.ctx.font = '16px Poppins';
        this.ctx.fillText('Press SPACEBAR or click PLAY to start', this.width / 2, this.height / 2 + 20);
        this.ctx.fillText('Use LEFT/RIGHT arrow keys to move', this.width / 2, this.height / 2 + 50);
        
        console.log('Game ready message displayed');
    }
    
    generateRoadLines() {
        this.roadLines = [];
        for (let i = 0; i < 20; i++) {
            this.roadLines.push({
                y: i * 50,
                width: 4,
                height: 20
            });
        }
    }
    
    setupInputs() {
        document.addEventListener('keydown', (e) => {
            this.keys[e.key] = true;
            
            if (e.key === 'ArrowLeft' && this.player.lane > 0) {
                this.player.lane--;
                this.player.x = this.laneWidth * this.player.lane + this.laneWidth / 2 - this.player.width / 2;
                console.log('Moved left to lane', this.player.lane);
            } else if (e.key === 'ArrowRight' && this.player.lane < 2) {
                this.player.lane++;
                this.player.x = this.laneWidth * this.player.lane + this.laneWidth / 2 - this.player.width / 2;
                console.log('Moved right to lane', this.player.lane);
            }
        });
        
        document.addEventListener('keyup', (e) => {
            this.keys[e.key] = false;
        });
        
        // Add spacebar to start game for testing
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space' && !this.isRunning) {
                e.preventDefault();
                console.log('Spacebar pressed - starting game!');
                this.start();
            } else if (e.code === 'Escape' && this.isRunning) {
                // Pause/resume game with Escape key
                e.preventDefault();
                if (this.isPaused) {
                    this.resume();
                } else {
                    this.pause();
                }
            }
        });
    }
    
    spawnObstacle() {
        if (Math.random() < 0.02) { // 2% chance per frame
            const lane = Math.floor(Math.random() * 3);
            const type = this.obstacleTypes[Math.floor(Math.random() * this.obstacleTypes.length)];
            
            this.obstacles.push({
                x: lane * this.laneWidth + this.laneWidth / 2 - type.width / 2,
                y: -type.height,
                width: type.width,
                height: type.height,
                color: type.color,
                lane: lane
            });
        }
    }
    
    updateObstacles() {
        for (let i = this.obstacles.length - 1; i >= 0; i--) {
            const obstacle = this.obstacles[i];
            obstacle.y += this.gameSpeed;
            
            // Remove obstacles that are off screen
            if (obstacle.y > this.height) {
                this.obstacles.splice(i, 1);
                this.score++;
                gameScore.textContent = this.score;
                
                // Show score animation
                this.showScoreAnimation();
                
                // Increase game speed every 10 points
                if (this.score % 10 === 0) {
                    this.gameSpeed += 0.5;
                    console.log('Speed increased to:', this.gameSpeed);
                }
            }
        }
    }
    
    checkCollisions() {
        for (const obstacle of this.obstacles) {
            if (this.player.x < obstacle.x + obstacle.width &&
                this.player.x + this.player.width > obstacle.x &&
                this.player.y < obstacle.y + obstacle.height &&
                this.player.y + this.player.height > obstacle.y) {
                return true;
            }
        }
        return false;
    }
    
    updateRoadLines() {
        this.roadLines.forEach(line => {
            line.y += this.gameSpeed;
            if (line.y > this.height) {
                line.y = -line.height;
            }
        });
    }
    
    drawPlayer() {
        // Draw pink hoodie
        this.ctx.fillStyle = this.player.color;
        this.ctx.fillRect(this.player.x, this.player.y, this.player.width, this.player.height);
        
        // Draw hoodie details
        this.ctx.fillStyle = '#ffffff';
        this.ctx.fillRect(this.player.x + 5, this.player.y + 10, 30, 20); // Face
        
        // Draw eyes
        this.ctx.fillStyle = '#000000';
        this.ctx.fillRect(this.player.x + 12, this.player.y + 15, 4, 4);
        this.ctx.fillRect(this.player.x + 24, this.player.y + 15, 4, 4);
        
        // Draw smile
        this.ctx.beginPath();
        this.ctx.arc(this.player.x + 20, this.player.y + 20, 6, 0, Math.PI);
        this.ctx.stroke();
    }
    
    drawObstacles() {
        this.obstacles.forEach(obstacle => {
            this.ctx.fillStyle = obstacle.color;
            this.ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
            
            // Draw monster features
            this.ctx.fillStyle = '#ffffff';
            this.ctx.fillRect(obstacle.x + 5, obstacle.y + 5, 8, 8); // Eye 1
            this.ctx.fillRect(obstacle.x + obstacle.width - 13, obstacle.y + 5, 8, 8); // Eye 2
            
            this.ctx.fillStyle = '#000000';
            this.ctx.fillRect(obstacle.x + 7, obstacle.y + 7, 4, 4); // Pupil 1
            this.ctx.fillRect(obstacle.x + obstacle.width - 11, obstacle.y + 7, 4, 4); // Pupil 2
        });
    }
    
    drawRoad() {
        // Draw road background
        this.ctx.fillStyle = '#374151';
        this.ctx.fillRect(0, 0, this.width, this.height);
        
        // Draw lane dividers
        this.ctx.strokeStyle = '#ffffff';
        this.ctx.lineWidth = 3;
        this.ctx.setLineDash([20, 20]);
        
        // Left lane divider
        this.ctx.beginPath();
        this.ctx.moveTo(this.laneWidth, 0);
        this.ctx.lineTo(this.laneWidth, this.height);
        this.ctx.stroke();
        
        // Right lane divider
        this.ctx.beginPath();
        this.ctx.moveTo(this.laneWidth * 2, 0);
        this.ctx.lineTo(this.laneWidth * 2, this.height);
        this.ctx.stroke();
        
        // Draw road lines
        this.ctx.setLineDash([]);
        this.ctx.strokeStyle = '#ffffff';
        this.ctx.lineWidth = 2;
        
        this.roadLines.forEach(line => {
            this.ctx.fillStyle = '#ffffff';
            this.ctx.fillRect(this.width / 2 - line.width / 2, line.y, line.width, line.height);
        });
    }
    
    draw() {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.width, this.height);
        
        // Draw road
        this.drawRoad();
        
        // Draw obstacles
        this.drawObstacles();
        
        // Draw player
        this.drawPlayer();
        
        // Draw score
        this.ctx.fillStyle = '#ffffff';
        this.ctx.font = '20px Poppins';
        this.ctx.fillText(`Score: ${this.score}`, 20, 30);
    }
    
    update() {
        if (!this.isRunning) {
            console.log('Game not running, returning from update');
            return;
        }
        
        if (this.isPaused) {
            console.log('Game paused, not updating');
            return;
        }
        
        this.spawnObstacle();
        this.updateObstacles();
        this.updateRoadLines();
        
        if (this.checkCollisions()) {
            this.gameOver();
            return;
        }
        
        this.draw();
        requestAnimationFrame(() => this.update());
    }
    
    start() {
        console.log('Starting game...');
        
        // Reset game state when starting
        this.score = 0;
        this.gameSpeed = 5;
        this.obstacles = [];
        this.player.lane = 1;
        this.player.x = this.width / 2 - this.player.width / 2;
        this.generateRoadLines();
        gameScore.textContent = this.score;
        
        this.isRunning = true;
        this.isPaused = false;
        
        // Hide the game overlay completely
        if (this.gameOverlay) {
            this.gameOverlay.style.display = 'none';
            this.gameOverlay.style.visibility = 'hidden';
            this.gameOverlay.style.opacity = '0';
            this.gameOverlay.style.pointerEvents = 'none';
            console.log('Game overlay hidden with multiple properties');
            // Double-check the overlay is hidden
            setTimeout(() => {
                this.checkOverlayState();
            }, 100);
        }
        
        // Clear the canvas and start fresh
        this.ctx.clearRect(0, 0, this.width, this.height);
        
        console.log('Game started, calling update...');
        this.update();
    }
    
    pause() {
        if (this.isRunning && !this.isPaused) {
            this.isPaused = true;
            console.log('Game paused');
            
            // Show pause message on canvas (not overlay)
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
            this.ctx.fillRect(0, 0, this.width, this.height);
            
            this.ctx.fillStyle = '#ffffff';
            this.ctx.font = '32px Poppins';
            this.ctx.textAlign = 'center';
            this.ctx.fillText('GAME PAUSED', this.width / 2, this.height / 2 - 20);
            this.ctx.font = '18px Poppins';
            this.ctx.fillText('Press ESC to resume', this.width / 2, this.height / 2 + 20);
        }
    }
    
    resume() {
        if (this.isRunning && this.isPaused) {
            this.isPaused = false;
            console.log('Game resumed');
            this.update();
        }
    }
    
    showScoreAnimation() {
        // Create a temporary score popup
        const scorePopup = document.createElement('div');
        scorePopup.textContent = '+1';
        scorePopup.style.position = 'absolute';
        scorePopup.style.left = (this.canvas.offsetLeft + this.width / 2) + 'px';
        scorePopup.style.top = (this.canvas.offsetTop + this.height / 2) + 'px';
        scorePopup.style.color = '#00ff00';
        scorePopup.style.fontSize = '24px';
        scorePopup.style.fontWeight = 'bold';
        scorePopup.style.pointerEvents = 'none';
        scorePopup.style.zIndex = '1000';
        scorePopup.style.transition = 'all 0.5s ease-out';
        
        document.body.appendChild(scorePopup);
        
        // Animate the popup
        setTimeout(() => {
            scorePopup.style.transform = 'translateY(-50px)';
            scorePopup.style.opacity = '0';
        }, 100);
        
        // Remove the popup after animation
        setTimeout(() => {
            if (scorePopup.parentNode) {
                scorePopup.parentNode.removeChild(scorePopup);
            }
        }, 600);
    }
    
    gameOver() {
        this.isRunning = false;
        
        // Update high score
        if (this.score > this.highScore) {
            this.highScore = this.score;
            localStorage.setItem('highScore', this.highScore);
            highScore.textContent = this.highScore;
        }
        
        // Show game over screen
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        this.ctx.fillRect(0, 0, this.width, this.height);
        
        this.ctx.fillStyle = '#ffffff';
        this.ctx.font = '48px Poppins';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('Game Over!', this.width / 2, this.height / 2 - 50);
        
        this.ctx.font = '24px Poppins';
        this.ctx.fillText(`Score: ${this.score}`, this.width / 2, this.height / 2);
        this.ctx.fillText(`High Score: ${this.highScore}`, this.width / 2, this.height / 2 + 30);
        
        this.ctx.font = '18px Poppins';
        this.ctx.fillText('Press Play to try again!', this.width / 2, this.height / 2 + 80);
        
        // Reset game state
        this.score = 0;
        this.gameSpeed = 5;
        this.obstacles = [];
        this.player.lane = 1;
        this.player.x = this.width / 2 - this.player.width / 2;
        this.generateRoadLines();
        
        gameScore.textContent = this.score;
        
        // Show the game overlay with play button
        if (this.gameOverlay) {
            this.gameOverlay.style.display = 'flex';
            this.gameOverlay.style.visibility = 'visible';
            this.gameOverlay.style.opacity = '1';
            this.gameOverlay.style.pointerEvents = 'auto';
            console.log('Game overlay shown after game over');
        }
        
        // Make sure game is completely stopped
        this.isRunning = false;
        this.isPaused = false;
        
        console.log('Game over - overlay should be visible');
    }
    
    // Helper method to check overlay state
    checkOverlayState() {
        if (this.gameOverlay) {
            console.log('Overlay display style:', this.gameOverlay.style.display);
            console.log('Overlay computed display:', window.getComputedStyle(this.gameOverlay).display);
        } else {
            console.log('Game overlay not found');
        }
    }
    
    reset() {
        this.score = 0;
        this.gameSpeed = 5;
        this.obstacles = [];
        this.player.lane = 1;
        this.player.x = this.width / 2 - this.player.width / 2;
        this.generateRoadLines();
        gameScore.textContent = this.score;
        
        // Make sure game is not running
        this.isRunning = false;
        this.isPaused = false;
        
        // Show the game ready screen
        this.showGameReady();
    }
}

// Game instance (will be initialized after DOM loads)
let game;

// Play button event listener (will be set up after DOM loads)
function setupGameEventListeners() {
    console.log('Setting up game event listeners...');
    console.log('Play button:', playButton);
    
            if (playButton) {
            playButton.addEventListener('click', () => {
                console.log('Play button clicked!');
                console.log('Current game state - isRunning:', game?.isRunning, 'isPaused:', game?.isPaused);
                
                if (game) {
                    console.log('Game instance found, starting game...');
                    // Check overlay state before starting
                    game.checkOverlayState();
                    // Don't call reset() here, just start the game directly
                    game.start();
                } else {
                    console.error('Game instance not found!');
                }
            });
            console.log('Play button event listener added successfully');
        } else {
            console.error('Play button not found!');
        }
}

// Update game theme when theme changes
function updateGameTheme() {
    if (currentTheme === 'bw') {
        // Black and white theme
        game.player.color = '#000000';
        game.obstacleTypes.forEach(type => {
            type.color = '#666666';
        });
    } else {
        // Colorful theme
        game.player.color = '#ec4899'; // Pink
        game.obstacleTypes[0].color = '#ef4444'; // Red
        game.obstacleTypes[1].color = '#8b5cf6'; // Purple
        game.obstacleTypes[2].color = '#f59e0b'; // Orange
    }
}

// Mobile touch controls for the game
let touchStartX = 0;
let touchEndX = 0;

gameCanvas.addEventListener('touchstart', (e) => {
    e.preventDefault();
    touchStartX = e.changedTouches[0].screenX;
});

gameCanvas.addEventListener('touchend', (e) => {
    e.preventDefault();
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0 && game.player.lane < 2) {
            // Swipe left - move right
            game.player.lane++;
            game.player.x = game.laneWidth * game.player.lane + game.laneWidth / 2 - game.player.width / 2;
        } else if (diff < 0 && game.player.lane > 0) {
            // Swipe right - move left
            game.player.lane--;
            game.player.x = game.laneWidth * game.player.lane + game.laneWidth / 2 - game.player.width / 2;
        }
    }
}

// Add CSS animation for fadeIn
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(style);

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing game...');
    
    // Check if all required elements exist
    console.log('Game canvas:', gameCanvas);
    console.log('Game overlay:', gameOverlay);
    console.log('Play button:', playButton);
    console.log('Game score:', gameScore);
    console.log('High score:', highScore);
    
    // Initialize the game
    try {
        game = new EndlessPinkHoodieRun();
        console.log('Game initialized successfully!');
        setupGameEventListeners();
    } catch (error) {
        console.error('Error initializing game:', error);
    }
    
    // Add loading animation to placeholder images
    document.querySelectorAll('.placeholder-image').forEach(img => {
        img.classList.add('loading');
    });
    
    // Remove loading animation after a delay
    setTimeout(() => {
        document.querySelectorAll('.placeholder-image').forEach(img => {
            img.classList.remove('loading');
        });
    }, 2000);
    
    // Add hover effects to skill cards
    skillCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Performance optimization: Throttle scroll events
let ticking = false;
function updateOnScroll() {
    if (!ticking) {
        requestAnimationFrame(() => {
            // Update any scroll-based animations here
            ticking = false;
        });
        ticking = true;
    }
}

window.addEventListener('scroll', updateOnScroll);

// Add some fun micro-interactions
document.addEventListener('mousemove', (e) => {
    const shapes = document.querySelectorAll('.shape');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.5;
        const x = (mouseX - 0.5) * speed * 20;
        const y = (mouseY - 0.5) * speed * 20;
        shape.style.transform = `translate(${x}px, ${y}px) rotate(${x * 2}deg)`;
    });
});

// Easter egg: Konami code
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.code);
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        // Konami code activated!
        document.body.style.animation = 'rainbow 2s infinite';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 5000);
        
        // Add rainbow animation
        const rainbowStyle = document.createElement('style');
        rainbowStyle.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(rainbowStyle);
    }
});
