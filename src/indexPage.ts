import { HTMLGenerator } from './htmlGenerator';
import { PageConfig } from './types';

export class IndexPage {
  private config: PageConfig = {
    title: 'Royal Rajasthan Collection - Premium Indian Ethnic Wear',
    description: 'Shop premium Rajasthani clothing - Lehengas, Sarees, Kurtas. Free shipping, COD available. Authentic handcrafted ethnic wear.',
    activeNav: 'Home'
  };

  generateHTML(): string {
    return `${HTMLGenerator.generateHead(this.config)}
    ${this.generateLoadingScreen()}
    ${HTMLGenerator.generateHeader(this.config.activeNav)}
    ${this.generateHeroSection()}
    ${this.generateCategoriesSection()}
    ${this.generateFeaturedProducts()}
    ${this.generateNewsletter()}
    ${HTMLGenerator.generateFooter()}
    ${this.generateLoadingScript()}`;
  }

  private generateLoadingScreen(): string {
    return `
    <div id="loading-screen" class="greeting-overlay">
        <div class="regional-maps">
            <div class="region kashmir">
                <div class="region-greeting">السلام علیکم</div>
                <div class="region-english">Assalam Walekum</div>
            </div>
            <div class="region gujarat">
                <div class="region-greeting">જય જિનેન્દ્ર</div>
                <div class="region-english">Jai Jinendra</div>
            </div>
            <div class="region seven-sisters">
                <div class="region-greeting">নমস্কাৰ</div>
                <div class="region-english">Nomoskar</div>
            </div>
        </div>
        <div class="greeting-animation">
            <div class="namaste-hands">🙏</div>
            <div class="greeting-text">
                <h2 class="hindi-greeting">खम्मा गणी सा</h2>
                <p class="english-greeting">Khamma Ghani Sa</p>
                <p class="welcome-text">
                    <span class="welcome-word">Welcome</span>
                    <span class="welcome-word">to</span>
                    <span class="welcome-word">Royal</span>
                    <span class="welcome-word">Rajasthan</span>
                    <span class="welcome-word">Collection</span>
                </p>
            </div>
            <div class="loading-dots">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    </div>`;
  }

  private generateHeroSection(): string {
    return `
    <section class="hero">
        <div class="hero-slider">
            <div class="slide active">
                <div class="slide-bg"></div>
                <div class="container">
                    <div class="hero-content">
                        <div class="hero-text">
                            <h2>Discover Royal Heritage</h2>
                            <p>Exquisite handcrafted Rajasthani clothing that celebrates tradition with contemporary elegance</p>
                            <div class="hero-buttons">
                                <a href="collections.html" class="btn btn-primary">Shop Collection</a>
                                <a href="about.html" class="btn btn-outline">Our Story</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="hero-features">
            <div class="container">
                <div class="features-grid">
                    <div class="feature-item">
                        <i class="fas fa-shipping-fast"></i>
                        <span>Free Shipping Above ₹2999</span>
                    </div>
                    <div class="feature-item">
                        <i class="fas fa-undo-alt"></i>
                        <span>Easy 30-Day Returns</span>
                    </div>
                    <div class="feature-item">
                        <i class="fas fa-shield-alt"></i>
                        <span>100% Authentic Products</span>
                    </div>
                    <div class="feature-item">
                        <i class="fas fa-headset"></i>
                        <span>24/7 Customer Support</span>
                    </div>
                </div>
            </div>
        </div>
    </section>`;
  }

  private generateCategoriesSection(): string {
    const categories = [
      { name: 'Lehengas', price: '₹15,999', image: 'https://static.vecteezy.com/system/resources/thumbnails/070/420/243/small/vibrant-indian-sarees-and-fabrics-displayed-for-sale-free-photo.jpg' },
      { name: 'Sarees', price: '₹8,999', image: 'https://static.vecteezy.com/system/resources/thumbnails/070/420/243/small/vibrant-indian-sarees-and-fabrics-displayed-for-sale-free-photo.jpg' },
      { name: 'Kurtas', price: '₹3,999', image: 'https://static.vecteezy.com/system/resources/thumbnails/070/420/243/small/vibrant-indian-sarees-and-fabrics-displayed-for-sale-free-photo.jpg' },
      { name: 'Accessories', price: '₹1,999', image: 'https://static.vecteezy.com/system/resources/thumbnails/070/420/243/small/vibrant-indian-sarees-and-fabrics-displayed-for-sale-free-photo.jpg' }
    ];

    const categoryCards = categories.map(cat => `
      <div class="category-card">
          <div class="category-image">
              <img src="${cat.image}" alt="${cat.name}">
              <div class="category-overlay">
                  <h3>${cat.name}</h3>
                  <p>Starting from ${cat.price}</p>
                  <a href="collections.html" class="category-btn">Shop Now</a>
              </div>
          </div>
      </div>`).join('');

    return `
    <section class="categories">
        <div class="container">
            <div class="section-header">
                <h2>Shop by Category</h2>
                <p>Discover our curated collections of authentic Rajasthani wear</p>
            </div>
            <div class="categories-grid">
                ${categoryCards}
            </div>
        </div>
    </section>`;
  }

  private generateFeaturedProducts(): string {
    return `
    <section class="featured-products">
        <div class="container">
            <div class="section-header">
                <h2>Featured Products</h2>
                <p>Handpicked bestsellers from our collection</p>
            </div>
            <div class="products-grid">
                <div class="product-card">
                    <div class="product-image">
                        <img src="https://static.vecteezy.com/system/resources/thumbnails/070/420/243/small/vibrant-indian-sarees-and-fabrics-displayed-for-sale-free-photo.jpg" alt="Royal Red Lehenga">
                        <div class="product-badges">
                            <span class="badge sale">28% OFF</span>
                        </div>
                        <div class="product-actions">
                            <button class="action-btn wishlist-btn"><i class="fas fa-heart"></i></button>
                            <button class="action-btn quick-view-btn"><i class="fas fa-eye"></i></button>
                        </div>
                    </div>
                    <div class="product-info">
                        <h3>Royal Red Lehenga</h3>
                        <div class="product-rating">
                            <div class="stars">
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                            </div>
                            <span class="rating-count">(124)</span>
                        </div>
                        <div class="product-price">
                            <span class="current-price">₹25,999</span>
                            <span class="original-price">₹35,999</span>
                        </div>
                        <button class="btn btn-primary add-to-cart">Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>
    </section>`;
  }

  private generateNewsletter(): string {
    return `
    <section class="newsletter">
        <div class="container">
            <div class="newsletter-content">
                <div class="newsletter-text">
                    <h3>Stay in Style</h3>
                    <p>Subscribe to get exclusive offers and latest collection updates</p>
                </div>
                <form class="newsletter-form">
                    <input type="email" placeholder="Enter your email address" required>
                    <button type="submit" class="btn btn-primary">Subscribe</button>
                </form>
            </div>
        </div>
    </section>`;
  }

  private generateLoadingScript(): string {
    return `
    <style>
        .greeting-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, rgba(139, 69, 19, 0.6) 0%, rgba(212, 175, 55, 0.6) 100%), url('https://imgs.search.brave.com/S6nvD8i-htdQrrBHP_Yt0U6NpSNqfrmGWQhoNMFKMnI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJiYXQuY29t/L2ltZy82NzA1ODEt/aW5kaWFuLW1hcC13/YWxscGFwZXItdG9w/LWZyZWUtaW5kaWFu/LW1hcC1iYWNrZ3Jv/dW5kLmpwZw');
            background-size: cover;
            background-position: center;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
        }
        .fade-out { animation: fadeOut 1s ease-out forwards; }
        @keyframes fadeOut { 0% { opacity: 1; } 100% { opacity: 0; visibility: hidden; } }
    </style>
    <script>
        setTimeout(() => {
            const overlay = document.getElementById('loading-screen');
            if (overlay) overlay.classList.add('fade-out');
        }, 4000);
    </script>`;
  }
}