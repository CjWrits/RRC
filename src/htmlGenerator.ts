import { PageConfig } from './types';

export class HTMLGenerator {
  static generateHead(config: PageConfig): string {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${config.title}</title>
    <meta name="description" content="${config.description}">
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="styles.css">
</head>
<body>`;
  }

  static generateHeader(activeNav: string): string {
    const navItems = [
      { name: 'Home', href: 'index.html' },
      { name: 'Collections', href: 'collections.html' },
      { name: 'Products', href: 'products.html' },
      { name: 'About', href: 'about.html' },
      { name: 'Contact', href: 'contact.html' }
    ];

    const navHTML = navItems.map(item => 
      `<li><a href="${item.href}"${item.name === activeNav ? ' class="active"' : ''}>${item.name}</a></li>`
    ).join('');

    return `
    <header class="header">
        <div class="header-top">
            <div class="container">
                <div class="header-top-content">
                    <div class="contact-info">
                        <span><i class="fas fa-phone"></i> +91-98765-43210</span>
                        <span><i class="fas fa-envelope"></i> info@royalrajasthan.com</span>
                    </div>
                    <div class="header-links">
                        <a href="#">Track Order</a>
                        <a href="#">Size Guide</a>
                        <a href="#">Account</a>
                    </div>
                </div>
            </div>
        </div>
        
        <nav class="navbar">
            <div class="container">
                <div class="nav-content">
                    <div class="logo">
                        <h1>Royal Rajasthan</h1>
                        <span>Collection</span>
                    </div>
                    
                    <ul class="nav-menu">
                        ${navHTML}
                    </ul>
                    
                    <div class="nav-actions">
                        <div class="search-box">
                            <input type="text" placeholder="Search products...">
                            <i class="fas fa-search"></i>
                        </div>
                        <div class="action-icons">
                            <div class="icon-item">
                                <i class="fas fa-heart"></i>
                                <span class="badge">0</span>
                            </div>
                            <div class="icon-item">
                                <i class="fas fa-shopping-bag"></i>
                                <span class="badge">0</span>
                            </div>
                            <div class="icon-item">
                                <i class="fas fa-user"></i>
                            </div>
                        </div>
                    </div>
                    
                    <div class="mobile-menu-btn">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>
        </nav>
    </header>`;
  }

  static generateFooter(): string {
    return `
    <footer class="footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-section">
                    <div class="footer-logo">
                        <h3>Royal Rajasthan Collection</h3>
                        <p>Preserving heritage through authentic craftsmanship and timeless designs.</p>
                    </div>
                    <div class="social-links">
                        <a href="#"><i class="fab fa-facebook"></i></a>
                        <a href="#"><i class="fab fa-instagram"></i></a>
                        <a href="#"><i class="fab fa-twitter"></i></a>
                        <a href="#"><i class="fab fa-youtube"></i></a>
                    </div>
                </div>
                
                <div class="footer-section">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a href="index.html">Home</a></li>
                        <li><a href="collections.html">Collections</a></li>
                        <li><a href="products.html">Products</a></li>
                        <li><a href="about.html">About Us</a></li>
                        <li><a href="contact.html">Contact</a></li>
                    </ul>
                </div>
                
                <div class="footer-section">
                    <h4>Customer Care</h4>
                    <ul>
                        <li><a href="#">Shipping Info</a></li>
                        <li><a href="#">Returns & Exchanges</a></li>
                        <li><a href="#">Size Guide</a></li>
                        <li><a href="#">Track Your Order</a></li>
                        <li><a href="#">FAQ</a></li>
                    </ul>
                </div>
                
                <div class="footer-section">
                    <h4>Contact Info</h4>
                    <div class="contact-info">
                        <p><i class="fas fa-map-marker-alt"></i> Jaipur, Rajasthan, India</p>
                        <p><i class="fas fa-phone"></i> +91-78789-39493</p>
                        <p><i class="fas fa-envelope"></i> info@royalrajasthan.com</p>
                        <p><i class="fas fa-clock"></i> Mon-Sat: 10AM-8PM</p>
                    </div>
                </div>
            </div>
            
            <div class="footer-bottom">
                <div class="footer-bottom-content">
                    <p>&copy; 2024 Royal Rajasthan Collection. All rights reserved.</p>
                    <div class="footer-links">
                        <a href="#">Privacy Policy</a>
                        <a href="#">Terms of Service</a>
                        <a href="#">Sitemap</a>
                    </div>
                </div>
            </div>
        </div>
    </footer>

    <div class="whatsapp-float">
        <a href="https://wa.me/919876543210" target="_blank">
            <i class="fab fa-whatsapp"></i>
        </a>
    </div>

    <script src="script.js"></script>
</body>
</html>`;
  }
}