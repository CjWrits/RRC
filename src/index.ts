import * as fs from 'fs';
import * as path from 'path';
import { IndexPage } from './indexPage';
import { ContactPage } from './contactPage';
import { ProductsPage } from './productsPage';

class WebsiteGenerator {
  private outputDir: string;

  constructor(outputDir: string = '../') {
    this.outputDir = outputDir;
  }

  generateAllPages(): void {
    console.log('Generating Royal Rajasthan Collection website...');

    // Generate Index Page
    const indexPage = new IndexPage();
    this.writeFile('index.html', indexPage.generateHTML());

    // Generate Contact Page
    const contactPage = new ContactPage();
    this.writeFile('contact.html', contactPage.generateHTML());

    // Generate Products Page
    const productsPage = new ProductsPage();
    this.writeFile('products.html', productsPage.generateHTML());

    // Generate About Page (simplified)
    this.generateAboutPage();

    // Generate Collections Page (simplified)
    this.generateCollectionsPage();

    console.log('All pages generated successfully!');
  }

  private generateAboutPage(): void {
    const aboutHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>About Us - Royal Rajasthan Collection</title>
    <link rel="stylesheet" href="styles.css">
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
    <header class="header">
        <div class="header-top">
            <div class="container">
                <div class="header-top-content">
                    <div class="contact-info">
                        <span><i class="fas fa-phone"></i> +91-98765-43210</span>
                        <span><i class="fas fa-envelope"></i> info@royalrajasthan.com</span>
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
                        <li><a href="index.html">Home</a></li>
                        <li><a href="collections.html">Collections</a></li>
                        <li><a href="products.html">Products</a></li>
                        <li><a href="about.html" class="active">About</a></li>
                        <li><a href="contact.html">Contact</a></li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>

    <section class="page-hero">
        <div class="page-hero-bg"></div>
        <div class="container">
            <div class="page-hero-content">
                <h1>About Royal Rajasthan Collection</h1>
                <p>Preserving heritage through authentic craftsmanship and timeless designs</p>
            </div>
        </div>
    </section>

    <section class="about-main">
        <div class="container">
            <div class="about-content">
                <div class="about-text">
                    <h2>Our Heritage Story</h2>
                    <p>Royal Rajasthan Collection was born from a deep passion for preserving the rich textile heritage of Rajasthan.</p>
                </div>
            </div>

            <section class="stats-section">
                <div class="stats-grid">
                    <div class="stat-item">
                        <div class="stat-number">15+</div>
                        <div class="stat-label">Years of Excellence</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-number">500+</div>
                        <div class="stat-label">Artisan Partners</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-number">10,000+</div>
                        <div class="stat-label">Happy Customers</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-number">1000+</div>
                        <div class="stat-label">Unique Designs</div>
                    </div>
                </div>
            </section>
        </div>
    </section>

    <footer class="footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-section">
                    <div class="footer-logo">
                        <h3>Royal Rajasthan Collection</h3>
                        <p>Preserving heritage through authentic craftsmanship and timeless designs.</p>
                    </div>
                </div>
            </div>
        </div>
    </footer>

    <script src="script.js"></script>
</body>
</html>`;

    this.writeFile('about.html', aboutHTML);
  }

  private generateCollectionsPage(): void {
    const collectionsHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Collections - Royal Rajasthan Collection</title>
    <link rel="stylesheet" href="styles.css">
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
    <header class="header">
        <div class="header-top">
            <div class="container">
                <div class="header-top-content">
                    <div class="contact-info">
                        <span><i class="fas fa-phone"></i> +91-98765-43210</span>
                        <span><i class="fas fa-envelope"></i> info@royalrajasthan.com</span>
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
                        <li><a href="index.html">Home</a></li>
                        <li><a href="collections.html" class="active">Collections</a></li>
                        <li><a href="products.html">Products</a></li>
                        <li><a href="about.html">About</a></li>
                        <li><a href="contact.html">Contact</a></li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>

    <section class="page-hero">
        <div class="page-hero-bg"></div>
        <div class="container">
            <div class="page-hero-content">
                <h1>Our Collections</h1>
                <p>Discover the finest traditional Rajasthani clothing crafted with love and heritage</p>
            </div>
        </div>
    </section>

    <section class="collections-main">
        <div class="container">
            <div class="collections-grid">
                <div class="collection-card-large">
                    <div class="collection-image">
                        <img src="https://static.vecteezy.com/system/resources/thumbnails/070/420/243/small/vibrant-indian-sarees-and-fabrics-displayed-for-sale-free-photo.jpg" alt="Bridal Collection">
                        <div class="collection-overlay">
                            <div class="collection-content">
                                <h2>Bridal Collection</h2>
                                <p>Exquisite lehengas and sarees for your special day</p>
                                <span class="item-count">150+ Items</span>
                                <a href="products.html" class="btn btn-primary">View Collection</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <footer class="footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-section">
                    <div class="footer-logo">
                        <h3>Royal Rajasthan Collection</h3>
                        <p>Preserving heritage through authentic craftsmanship and timeless designs.</p>
                    </div>
                </div>
            </div>
        </div>
    </footer>

    <script src="script.js"></script>
</body>
</html>`;

    this.writeFile('collections.html', collectionsHTML);
  }

  private writeFile(filename: string, content: string): void {
    const filePath = path.join(__dirname, this.outputDir, filename);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Generated: ${filename}`);
  }
}

// Generate all pages
const generator = new WebsiteGenerator();
generator.generateAllPages();