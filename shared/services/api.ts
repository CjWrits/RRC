const API_BASE_URL = 'http://localhost:3000/api'; // Replace with your backend URL

export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  rating: number;
  color: string;
  category: string;
  description?: string;
}

export interface Collection {
  id: number;
  name: string;
  description: string;
  itemCount: string;
  image: string;
}

export interface ContactForm {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

class ApiService {
  // Products API
  async getProducts(filters?: {
    category?: string;
    priceRange?: string;
    color?: string;
    rating?: number;
    sortBy?: string;
  }): Promise<Product[]> {
    try {
      const queryParams = new URLSearchParams();
      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value) queryParams.append(key, value.toString());
        });
      }
      
      const response = await fetch(`${API_BASE_URL}/products?${queryParams}`);
      if (!response.ok) throw new Error('Failed to fetch products');
      return await response.json();
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }

  async getProduct(id: string): Promise<Product> {
    try {
      const response = await fetch(`${API_BASE_URL}/products/${id}`);
      if (!response.ok) throw new Error('Failed to fetch product');
      return await response.json();
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  }

  // Collections API
  async getCollections(): Promise<Collection[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/collections`);
      if (!response.ok) throw new Error('Failed to fetch collections');
      return await response.json();
    } catch (error) {
      console.error('Error fetching collections:', error);
      throw error;
    }
  }

  // Contact API
  async submitContact(data: ContactForm): Promise<{ success: boolean; message: string }> {
    try {
      const response = await fetch(`${API_BASE_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) throw new Error('Failed to submit contact form');
      return await response.json();
    } catch (error) {
      console.error('Error submitting contact form:', error);
      throw error;
    }
  }

  // Cart API
  async addToCart(productId: number, quantity: number = 1): Promise<{ success: boolean }> {
    try {
      const response = await fetch(`${API_BASE_URL}/cart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId, quantity }),
      });
      
      if (!response.ok) throw new Error('Failed to add to cart');
      return await response.json();
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    }
  }
}

export const apiService = new ApiService();