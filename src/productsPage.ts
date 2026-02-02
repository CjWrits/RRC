import { HTMLGenerator } from './htmlGenerator';
import { PageConfig, Product } from './types';

export class ProductsPage {
  private config: PageConfig = {
    title: 'Products - Royal Rajasthan Collection',
    description: 'Browse our complete collection of authentic Rajasthani clothing - Lehengas, Sarees, Kurtas, and Accessories.',
    activeNav: 'Products'
  };

  private products: Record<string, Product[]> = {
    lehenga: [
      {id: 1, name: "Royal Red Lehenga", price: 25999, originalPrice: 35999, image: "https://static.vecteezy.com/system/resources/thumbnails/070/420/243/small/vibrant-indian-sarees-and-fabrics-displayed-for-sale-free-photo.jpg", rating: 5, color: "red", category: "lehenga"},
      {id: 2, name: "Golden Bridal Lehenga", price: 45999, originalPrice: 55999, image: "https://static.vecteezy.com/system/resources/thumbnails/070/420/243/small/vibrant-indian-sarees-and-fabrics-displayed-for-sale-free-photo.jpg", rating: 5, color: "gold", category: "lehenga"}
    ],
    saree: [
      {id: 4, name: "Silk Saree", price: 12999, originalPrice: 16999, image: "https://static.vecteezy.com/system/resources/thumbnails/070/420/243/small/vibrant-indian-sarees-and-fabrics-displayed-for-sale-free-photo.jpg", rating: 4, color: "blue", category: "saree"}
    ],
    kurta: [
      {id: 6, name: "Cotton Kurta Set", price: 3999, originalPrice: 5999, image: "https://static.vecteezy.com/system/resources/thumbnails/070/420/243/small/vibrant-indian-sarees-and-fabrics-displayed-for-sale-free-photo.jpg", rating: 4, color: "green", category: "kurta"}
    ],
    accessories: [
      {id: 8, name: "Jewelry Set", price: 5999, originalPrice: 7999, image: "https://static.vecteezy.com/system/resources/thumbnails/070/420/243/small/vibrant-indian-sarees-and-fabrics-displayed-for-sale-free-photo.jpg", rating: 5, color: "gold", category: "accessories"}
    ]
  };

  generateHTML(): string {
    return `${HTMLGenerator.generateHead(this.config)}
    ${this.generateStyles()}
    ${HTMLGenerator.generateHeader(this.config.activeNav)}
    ${this.generatePageHero()}
    ${this.generateCategorySelection()}
    ${this.generateFilterSection()}
    ${this.generateProductsMain()}
    ${HTMLGenerator.generateFooter()}
    ${this.generateScript()}`;
  }

  private generateStyles(): string {
    return `
    <style>
        .filter-section {
            background: linear-gradient(135deg, #8B4513 0%, #D4AF37 100%);
            padding: 3rem 0;
            margin-bottom: 3rem;
        }
        .filter-container {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 2rem;
            margin-bottom: 2rem;
        }
        .filter-card {
            background: rgba(255,255,255,0.95);
            padding: 1.5rem;
            border-radius: 15px;
            box-shadow: 0 8px 25px rgba(0,0,0,0.1);
            transition: all 0.3s ease;
        }
        .filter-card:hover {
            transform: translateY(-5px);
        }
        .custom-select select {
            width: 100%;
            padding: 12px 15px;
            border: 2px solid #e0e0e0;
            border-radius: 10px;
            background: white;
            font-size: 1rem;
            cursor: pointer;
        }
        .apply-filters-btn {
            background: linear-gradient(135deg, #8B4513 0%, #D4AF37 100%);
            color: white;
            padding: 15px 30px;
            border: none;
            border-radius: 25px;
            font-size: 1.1rem;
            cursor: pointer;
        }
        .category-tabs {
            display: flex;
            justify-content: center;
            gap: 1rem;
            margin-bottom: 2rem;
            flex-wrap: wrap;
        }
        .category-tab {
            padding: 12px 25px;
            background: white;
            border: 2px solid #e0e0e0;
            border-radius: 25px;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        .category-tab.active {
            background: linear-gradient(135deg, #8B4513 0%, #D4AF37 100%);
            color: white;
        }
    </style>`;
  }

  private generatePageHero(): string {
    return `
    <section class="page-hero">
        <div class="page-hero-bg"></div>
        <div class="container">
            <div class="page-hero-content">
                <h1>Our Products</h1>
                <p>Discover authentic Rajasthani clothing with advanced filters</p>
            </div>
        </div>
    </section>`;
  }

  private generateCategorySelection(): string {
    return `
    <section class="category-selection">
        <div class="container">
            <h2>Choose a Category</h2>
            <div class="category-tabs">
                <div class="category-tab active" data-category="all">All Products</div>
                <div class="category-tab" data-category="lehenga">Lehengas</div>
                <div class="category-tab" data-category="saree">Sarees</div>
                <div class="category-tab" data-category="kurta">Kurtas</div>
                <div class="category-tab" data-category="accessories">Accessories</div>
            </div>
        </div>
    </section>`;
  }

  private generateFilterSection(): string {
    return `
    <section class="filter-section">
        <div class="container">
            <div class="filter-container">
                <div class="filter-card">
                    <h3>Price Range</h3>
                    <div class="custom-select">
                        <select id="price-filter">
                            <option value="">All Prices</option>
                            <option value="0-5000">Under ₹5,000</option>
                            <option value="5000-15000">₹5,000 - ₹15,000</option>
                            <option value="15000-30000">₹15,000 - ₹30,000</option>
                            <option value="30000+">Above ₹30,000</option>
                        </select>
                    </div>
                </div>
                
                <div class="filter-card">
                    <h3>Color</h3>
                    <div class="custom-select">
                        <select id="color-filter">
                            <option value="">All Colors</option>
                            <option value="red">Red</option>
                            <option value="blue">Blue</option>
                            <option value="green">Green</option>
                            <option value="gold">Gold</option>
                        </select>
                    </div>
                </div>
                
                <div class="filter-card">
                    <h3>Sort By</h3>
                    <div class="custom-select">
                        <select id="sort-filter">
                            <option value="featured">Featured</option>
                            <option value="price-low">Price: Low to High</option>
                            <option value="price-high">Price: High to Low</option>
                            <option value="rating">Highest Rated</option>
                        </select>
                    </div>
                </div>
            </div>
            
            <div style="text-align: center;">
                <button class="apply-filters-btn" onclick="applyFilters()">
                    Apply Filters
                </button>
            </div>
        </div>
    </section>`;
  }

  private generateProductsMain(): string {
    return `
    <section class="products-main">
        <div class="container">
            <div class="products-display active" id="products-container">
                <div class="no-products">
                    <h3>Select filters and click "Apply Filters" to view products</h3>
                    <p>Choose your preferred category, price range, and other filters above</p>
                </div>
            </div>
        </div>
    </section>`;
  }

  private generateScript(): string {
    return `
    <script>
        const products = ${JSON.stringify(this.products)};
        let currentCategory = 'all';

        document.querySelectorAll('.category-tab').forEach(tab => {
            tab.addEventListener('click', function() {
                document.querySelectorAll('.category-tab').forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                currentCategory = this.dataset.category;
            });
        });

        function applyFilters() {
            const container = document.getElementById('products-container');
            let filteredProducts = [];
            
            if (currentCategory === 'all') {
                filteredProducts = Object.values(products).flat();
            } else {
                filteredProducts = products[currentCategory] || [];
            }
            
            const priceFilter = document.getElementById('price-filter').value;
            const colorFilter = document.getElementById('color-filter').value;
            const sortFilter = document.getElementById('sort-filter').value;
            
            if (priceFilter) {
                if (priceFilter === '30000+') {
                    filteredProducts = filteredProducts.filter(p => p.price >= 30000);
                } else {
                    const [min, max] = priceFilter.split('-').map(Number);
                    filteredProducts = filteredProducts.filter(p => p.price >= min && p.price <= max);
                }
            }
            
            if (colorFilter) {
                filteredProducts = filteredProducts.filter(p => p.color === colorFilter);
            }
            
            if (sortFilter === 'price-low') {
                filteredProducts.sort((a, b) => a.price - b.price);
            } else if (sortFilter === 'price-high') {
                filteredProducts.sort((a, b) => b.price - a.price);
            }
            
            displayProducts(filteredProducts);
        }

        function displayProducts(products) {
            const container = document.getElementById('products-container');
            
            if (products.length === 0) {
                container.innerHTML = '<div class="no-products"><h3>No products found</h3></div>';
                return;
            }
            
            const productsHTML = products.map(product => \`
                <div class="product-card">
                    <div class="product-image">
                        <img src="\${product.image}" alt="\${product.name}">
                        <div class="product-badges">
                            <span class="badge sale">\${Math.round((1 - product.price/product.originalPrice) * 100)}% OFF</span>
                        </div>
                    </div>
                    <div class="product-info">
                        <h3>\${product.name}</h3>
                        <div class="product-price">
                            <span class="current-price">₹\${product.price.toLocaleString()}</span>
                            <span class="original-price">₹\${product.originalPrice.toLocaleString()}</span>
                        </div>
                        <button class="btn btn-primary add-to-cart">Add to Cart</button>
                    </div>
                </div>
            \`).join('');
            
            container.innerHTML = \`<div class="products-grid">\${productsHTML}</div>\`;
        }
    </script>`;
  }
}