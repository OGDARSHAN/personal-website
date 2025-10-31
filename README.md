# DARSHAN K - D TALKS Personal Website

A modern, interactive personal website showcasing your skills, achievements, blogs, and featuring an original game "Endless Pink Hoodie Run".

## 🚀 Features

### ✨ Modern Design & Animations
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Smooth Animations**: Scroll-triggered animations and hover effects
- **Theme Toggle**: Switch between colorful and black & white themes
- **Interactive Elements**: Hover effects, micro-interactions, and smooth transitions

### 🎮 Original Game: "Endless Pink Hoodie Run"
- **2D Endless Runner**: Control a little girl with a pink hoodie
- **3-Lane System**: Use LEFT/RIGHT arrow keys to switch lanes
- **Monster Obstacles**: Avoid colorful monsters while running forward
- **Progressive Difficulty**: Game speed increases as you score higher
- **Touch Controls**: Swipe left/right on mobile devices
- **Theme Integration**: Game adapts to your chosen theme (colorful or B&W)

### 📱 Responsive Sections
1. **Header & Navigation**: Sticky navbar with smooth scrolling
2. **Intro Section**: Hero banner with your photo and introduction
3. **Skills Section**: Interactive skill cards with progress bars
4. **Achievements Section**: Grid layout for your accomplishments
5. **Blogs Section**: Filterable blog posts by category
6. **Game Section**: Embedded game with instructions
7. **Footer**: Social links and contact form

## 🎨 Customization Guide

### Adding Your Personal Photos

#### 1. Intro Section Photo
Replace the placeholder in the intro section:
```html
<!-- Find this section in index.html -->
<div class="intro-image">
    <!-- COMMENT: Insert your best personal portrait here -->
    <div class="placeholder-image">
        <i class="fas fa-user-circle"></i>
        <p>Your Photo Here</p>
    </div>
</div>
```

**Replace with:**
```html
<div class="intro-image">
    <img src="path/to/your/photo.jpg" alt="DARSHAN K" class="profile-photo">
</div>
```

#### 2. Achievement Photos
Replace achievement placeholders:
```html
<!-- Find achievement cards in index.html -->
<div class="achievement-image">
    <!-- COMMENT: Insert image of certificate, event moment, or related visual -->
    <div class="placeholder-image">
        <i class="fas fa-trophy"></i>
        <p>Achievement Image</p>
    </div>
</div>
```

**Replace with:**
```html
<div class="achievement-image">
    <img src="path/to/achievement.jpg" alt="Achievement Description">
</div>
```

#### 3. Blog Images
Replace blog placeholders:
```html
<!-- Find blog cards in index.html -->
<div class="blog-image">
    <div class="placeholder-image">
        <i class="fas fa-film"></i>
        <p>Blog Image</p>
    </div>
</div>
```

**Replace with:**
```html
<div class="blog-image">
    <img src="path/to/blog-image.jpg" alt="Blog Title">
</div>
```

### Adding CSS for Images
Add this CSS to `styles.css`:
```css
.profile-photo {
    width: 300px;
    height: 300px;
    border-radius: 20px;
    object-fit: cover;
    box-shadow: var(--shadow-lg);
    transition: var(--transition);
}

.profile-photo:hover {
    transform: scale(1.05);
}

.achievement-image img,
.blog-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: var(--transition);
}

.achievement-image img:hover,
.blog-image img:hover {
    transform: scale(1.05);
}
```

### Customizing Content

#### 1. Personal Information
- Update your name, title, and description in the intro section
- Modify skill percentages in the skills section
- Add your real achievements with dates
- Write your actual blog posts

#### 2. Skills & Progress
Adjust skill levels by changing the `data-progress` attribute:
```html
<div class="progress-bar" data-progress="95"></div>
```

#### 3. Social Links
Update social media links in the footer:
```html
<a href="https://github.com/yourusername" class="social-link">
    <i class="fab fa-github"></i>
</a>
```

#### 4. Contact Information
Update the contact form and email handling in the footer section.

## 🎮 Game Customization

### Game Mechanics
- **Player**: Little girl with pink hoodie (customizable colors)
- **Obstacles**: Three types of monsters with different sizes
- **Controls**: Arrow keys for desktop, swipe for mobile
- **Scoring**: Points increase as you avoid obstacles
- **Difficulty**: Speed increases every 10 points

### Customizing the Game
Modify game parameters in `script.js`:
```javascript
// Game speed
this.gameSpeed = 5; // Initial speed

// Obstacle spawn rate
if (Math.random() < 0.02) // 2% chance per frame

// Speed increase
if (this.score % 10 === 0) {
    this.gameSpeed += 0.5; // Increase by 0.5 every 10 points
}
```

## 🚀 Getting Started

### 1. File Structure
```
personal-website/
├── index.html          # Main HTML file
├── styles.css          # CSS styling and animations
├── script.js           # JavaScript functionality and game
└── README.md           # This file
```

### 2. Local Development
1. Open `index.html` in your web browser
2. Or use a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   ```

### 3. Deployment
- Upload all files to your web hosting service
- Ensure all file paths are correct
- Test the website on different devices

## 🎨 Theme System

### Colorful Theme (Default)
- Vibrant colors with gradients
- Modern, playful aesthetic
- Perfect for showcasing creativity

### Black & White Theme
- Clean, professional look
- High contrast for readability
- Suitable for formal presentations

### Theme Persistence
Your theme choice is automatically saved and restored on page reload.

## 📱 Mobile Optimization

- **Touch Controls**: Swipe gestures for the game
- **Responsive Layout**: Adapts to all screen sizes
- **Mobile Navigation**: Hamburger menu for small screens
- **Touch-Friendly**: Optimized button sizes and spacing

## 🔧 Browser Compatibility

- **Modern Browsers**: Chrome, Firefox, Safari, Edge (latest versions)
- **Mobile Browsers**: iOS Safari, Chrome Mobile, Samsung Internet
- **Features Used**: CSS Grid, Flexbox, CSS Variables, Canvas API, Intersection Observer

## 🎯 Performance Features

- **Lazy Loading**: Animations trigger on scroll
- **Optimized Animations**: CSS transforms and opacity changes
- **Efficient Rendering**: Canvas-based game with requestAnimationFrame
- **Minimal Dependencies**: Only Font Awesome for icons

## 🎁 Easter Eggs

- **Konami Code**: Try the classic Konami code for a surprise!
- **Mouse Interactions**: Move your mouse around the intro section
- **Hidden Animations**: Scroll to discover smooth transitions

## 📞 Support & Customization

### Common Customizations
1. **Colors**: Modify CSS variables in `:root`
2. **Fonts**: Change Google Fonts import in HTML
3. **Layout**: Adjust grid layouts in CSS
4. **Animations**: Modify timing and effects in CSS

### Adding New Sections
1. Add HTML structure to `index.html`
2. Style with CSS in `styles.css`
3. Add JavaScript functionality if needed
4. Update navigation links

## 🚀 Future Enhancements

- **Blog CMS Integration**: Connect to a headless CMS
- **Portfolio Gallery**: Add image galleries for projects
- **Contact Form Backend**: Connect to email service
- **Analytics**: Add visitor tracking
- **SEO Optimization**: Meta tags and structured data

## 📄 License

This project is created for personal use. Feel free to modify and customize as needed.

---

**Created with ❤️ for DARSHAN K - D TALKS**

*Blending creativity with technology to create amazing digital experiences.*

try here 
https://ogdarshan.github.io/personal-website/
