// Modern E-commerce Website JavaScript
class RoyalRajasthanSite {
    constructor() {
        this.cart = this.getFromStorage('cart') || [];
        this.wishlist = this.getFromStorage('wishlist') || [];
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updateCartBadge();
        this.updateWishlistBadge();
        this.initializeComponents();
    }

    // Event Listeners
    setupEventListeners() {
        // Mobile menu toggle
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const navMenu = document.querySelector('.nav-menu');
        
        if (mobileMenuBtn) {
            mobileMenuBtn.addEventListener('click', () => {
                mobileMenuBtn.classList.toggle('active');
                navMenu.classList.toggle('active');
            });
        }

        // Search functionality
        const searchInput = document.querySelector('.search-box input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.handleSearch(e.target.value);
            });
        }

        // Add to cart buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('add-to-cart')) {
                this.addToCart(e.target);
            }
            
            if (e.target.closest('.wishlist-btn')) {
                this.toggleWishlist(e.target);
            }
            
            if (e.target.closest('.icon-item')) {
                const iconItem = e.target.closest('.icon-item');
                if (iconItem.querySelector('.fa-shopping-bag')) {
                    this.toggleCartSidebar();
                }
                if (iconItem.querySelector('.fa-heart')) {
                    this.toggleWishlistSidebar();
                }
            }
        });

        // Newsletter form
        const newsletterForm = document.querySelector('.newsletter-form');
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleNewsletterSignup(e.target);
            });
        }

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Scroll effects
        window.addEventListener('scroll', () => {
            this.handleScroll();
        });
    }

    // Initialize Components
    initializeComponents() {
        this.initHeroSlider();
        this.initProductHovers();
        this.initLazyLoading();
    }

    // Hero Slider
    initHeroSlider() {
        const slides = document.querySelectorAll('.slide');
        if (slides.length <= 1) return;

        let currentSlide = 0;
        
        setInterval(() => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }, 5000);
    }

    // Product Hover Effects
    initProductHovers() {
        const productCards = document.querySelectorAll('.product-card');
        
        productCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-5px)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
            });
        });
    }

    // Lazy Loading for Images
    initLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    // Search Functionality
    handleSearch(query) {
        if (query.length < 2) return;
        
        // Simulate search - in production, this would call an API
        console.log(`Searching for: ${query}`);
        
        // Show search suggestions
        this.showSearchSuggestions(query);
    }

    showSearchSuggestions(query) {
        // Create search suggestions dropdown
        const searchBox = document.querySelector('.search-box');
        let dropdown = searchBox.querySelector('.search-dropdown');
        
        if (!dropdown) {
            dropdown = document.createElement('div');
            dropdown.className = 'search-dropdown';
            searchBox.appendChild(dropdown);
        }

        // Sample suggestions
        const suggestions = [
            'Royal Red Lehenga',
            'Golden Silk Saree',
            'Designer Kurta Set',
            'Bridal Jewelry'
        ].filter(item => item.toLowerCase().includes(query.toLowerCase()));

        dropdown.innerHTML = suggestions.map(item => 
            `<div class="suggestion-item">${item}</div>`
        ).join('');

        dropdown.style.display = suggestions.length ? 'block' : 'none';
    }

    // Cart Functionality
    addToCart(button) {
        const productCard = button.closest('.product-card');
        if (!productCard) return;

        const product = this.extractProductData(productCard);
        
        // Check if product already exists in cart
        const existingItem = this.cart.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({ ...product, quantity: 1 });
        }

        this.saveToStorage('cart', this.cart);
        this.updateCartBadge();
        this.showNotification('Product added to cart!', 'success');
        
        // Add visual feedback
        button.innerHTML = '<i class="fas fa-check"></i> Added';
        button.style.background = '#27ae60';
        
        setTimeout(() => {
            button.innerHTML = 'Add to Cart';
            button.style.background = '';
        }, 2000);
    }

    toggleWishlist(button) {
        const productCard = button.closest('.product-card');
        if (!productCard) return;

        const product = this.extractProductData(productCard);
        const existingIndex = this.wishlist.findIndex(item => item.id === product.id);
        
        if (existingIndex > -1) {
            this.wishlist.splice(existingIndex, 1);
            button.innerHTML = '<i class="far fa-heart"></i>';
            this.showNotification('Removed from wishlist', 'info');
        } else {
            this.wishlist.push(product);
            button.innerHTML = '<i class="fas fa-heart"></i>';
            this.showNotification('Added to wishlist!', 'success');
        }

        this.saveToStorage('wishlist', this.wishlist);
        this.updateWishlistBadge();
    }

    extractProductData(productCard) {
        const name = productCard.querySelector('h3')?.textContent || 'Unknown Product';
        const priceElement = productCard.querySelector('.current-price');
        const price = priceElement ? priceElement.textContent.replace('₹', '').replace(',', '') : '0';
        const image = productCard.querySelector('img')?.src || '';
        
        return {
            id: Date.now() + Math.random(),
            name,
            price: parseInt(price),
            image
        };
    }

    updateCartBadge() {
        const badge = document.querySelector('.fa-shopping-bag').parentElement.querySelector('.badge');
        if (badge) {
            const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
            badge.textContent = totalItems;
        }
    }

    updateWishlistBadge() {
        const badge = document.querySelector('.fa-heart').parentElement.querySelector('.badge');
        if (badge) {
            badge.textContent = this.wishlist.length;
        }
    }

    toggleCartSidebar() {
        this.showNotification('Cart sidebar - Coming Soon!', 'info');
    }

    toggleWishlistSidebar() {
        this.showNotification('Wishlist sidebar - Coming Soon!', 'info');
    }

    // Newsletter Signup
    handleNewsletterSignup(form) {
        const email = form.querySelector('input[type="email"]').value;
        
        if (this.validateEmail(email)) {
            // Simulate API call
            setTimeout(() => {
                this.showNotification('Successfully subscribed to newsletter!', 'success');
                form.reset();
            }, 1000);
            
            // Store subscription
            const subscribers = this.getFromStorage('newsletter_subscribers') || [];
            subscribers.push({ email, date: new Date().toISOString() });
            this.saveToStorage('newsletter_subscribers', subscribers);
        } else {
            this.showNotification('Please enter a valid email address', 'error');
        }
    }

    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Scroll Effects
    handleScroll() {
        const scrollY = window.scrollY;
        
        // Header background change
        const header = document.querySelector('.header');
        if (scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = '#ffffff';
            header.style.backdropFilter = 'none';
        }

        // Animate elements on scroll
        this.animateOnScroll();
    }

    animateOnScroll() {
        const elements = document.querySelectorAll('.category-card, .product-card, .feature-item');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }

    // Show notification with Rajasthani touch
    showNotification(message, type = 'success') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());

        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        
        const colors = {
            success: '#27ae60',
            error: '#e74c3c',
            info: '#3498db',
            warning: '#f39c12'
        };

        // Add Rajasthani greeting to success messages
        const greetingPrefix = type === 'success' ? 'धन्यवाद! ' : '';
        
        notification.innerHTML = `
            <div class="notification-content">
                <span>${greetingPrefix}${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;

        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${colors[type]};
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
            border-left: 4px solid var(--secondary-color);
        `;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Close button
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            this.removeNotification(notification);
        });

        // Auto remove after 4 seconds
        setTimeout(() => {
            this.removeNotification(notification);
        }, 4000);
    }

    removeNotification(notification) {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }

    // Storage Utilities
    saveToStorage(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
        } catch (error) {
            console.error('Error saving to localStorage:', error);
        }
    }

    getFromStorage(key) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error('Error reading from localStorage:', error);
            return null;
        }
    }

    // Performance Monitoring
    measurePerformance() {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                const loadTime = perfData.loadEventEnd - perfData.loadEventStart;
                
                console.log(`Page load time: ${loadTime}ms`);
                
                // Track performance metrics
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'page_load_time', {
                        event_category: 'Performance',
                        event_label: 'Load Time',
                        value: Math.round(loadTime)
                    });
                }
            }, 0);
        });
    }
}

// Additional CSS for notifications and search dropdown
const additionalStyles = `
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 15px;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 18px;
        cursor: pointer;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .search-dropdown {
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        border: 1px solid #e5e5e5;
        border-top: none;
        border-radius: 0 0 8px 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        z-index: 1000;
        display: none;
    }
    
    .suggestion-item {
        padding: 12px 15px;
        cursor: pointer;
        border-bottom: 1px solid #f0f0f0;
        transition: background 0.2s ease;
    }
    
    .suggestion-item:hover {
        background: #f8f9fa;
    }
    
    .suggestion-item:last-child {
        border-bottom: none;
    }
    
    /* Animation for elements */
    .category-card, .product-card, .feature-item {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    /* Mobile menu styles */
    @media (max-width: 768px) {
        .nav-menu.active {
            display: flex;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            flex-direction: column;
            padding: 20px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        
        .mobile-menu-btn.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .mobile-menu-btn.active span:nth-child(2) {
            opacity: 0;
        }
        
        .mobile-menu-btn.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Initialize the website
document.addEventListener('DOMContentLoaded', () => {
    const website = new RoyalRajasthanSite();
    website.measurePerformance();
    
    // Rajasthani Greeting Animation
    const greetingOverlay = document.getElementById('rajasthani-greeting');
    if (greetingOverlay) {
        // Show greeting for 3 seconds
        setTimeout(() => {
            greetingOverlay.classList.add('fade-out');
            setTimeout(() => {
                greetingOverlay.style.display = 'none';
            }, 1000);
        }, 3000);
    }
    
    // Make it globally accessible for debugging
    window.RoyalSite = website;
});

// Service Worker Registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}