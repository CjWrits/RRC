import { HTMLGenerator } from './htmlGenerator';
import { PageConfig } from './types';

export class ContactPage {
  private config: PageConfig = {
    title: 'Contact Us - Royal Rajasthan Collection',
    description: 'Get in touch with Royal Rajasthan Collection. Visit our store, call us, or send us a message for any inquiries.',
    activeNav: 'Contact'
  };

  generateHTML(): string {
    return `${HTMLGenerator.generateHead(this.config)}
    ${HTMLGenerator.generateHeader(this.config.activeNav)}
    ${this.generatePageHero()}
    ${this.generateContactMain()}
    ${HTMLGenerator.generateFooter()}`;
  }

  private generatePageHero(): string {
    return `
    <section class="page-hero">
        <div class="page-hero-bg"></div>
        <div class="container">
            <div class="page-hero-content">
                <h1>Contact Us</h1>
                <p>We'd love to hear from you. Get in touch with us for any inquiries.</p>
            </div>
        </div>
    </section>`;
  }

  private generateContactMain(): string {
    return `
    <section class="contact-main">
        <div class="container">
            <div class="contact-content">
                ${this.generateContactInfo()}
                ${this.generateContactForm()}
            </div>
        </div>
    </section>`;
  }

  private generateContactInfo(): string {
    const contactMethods = [
      {
        icon: 'fas fa-map-marker-alt',
        title: 'Visit Our Store',
        info: 'CD-48 First Floor Dadudayal Nagar<br>Jaipur, Rajasthan 302020<br>India'
      },
      {
        icon: 'fas fa-phone',
        title: 'Call Us',
        info: '+91-78789-39493<br>Mon-Sat: 10AM-8PM'
      },
      {
        icon: 'fas fa-envelope',
        title: 'Email Us',
        info: 'info@royalrajasthan.com<br>We reply within 24 hours'
      },
      {
        icon: 'fab fa-whatsapp',
        title: 'WhatsApp',
        info: '+91-78789-39493<br>Available 24/7'
      }
    ];

    const methodsHTML = contactMethods.map(method => `
      <div class="contact-method">
          <div class="method-icon">
              <i class="${method.icon}"></i>
          </div>
          <div class="method-info">
              <h3>${method.title}</h3>
              <p>${method.info}</p>
          </div>
      </div>`).join('');

    return `
    <div class="contact-info-section">
        <h2>Get in Touch</h2>
        <p>Have questions about our products or need assistance with your order? We're here to help!</p>
        <div class="contact-methods">
            ${methodsHTML}
        </div>
    </div>`;
  }

  private generateContactForm(): string {
    return `
    <div class="contact-form-section">
        <h2>Send us a Message</h2>
        <form class="contact-form" id="contact-form">
            <div class="form-row">
                <div class="form-group">
                    <input type="text" id="firstName" name="firstName" placeholder="First Name *" required>
                </div>
                <div class="form-group">
                    <input type="text" id="lastName" name="lastName" placeholder="Last Name *" required>
                </div>
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <input type="email" id="email" name="email" placeholder="Email Address *" required>
                </div>
                <div class="form-group">
                    <input type="tel" id="phone" name="phone" placeholder="Phone Number">
                </div>
            </div>
            
            <div class="form-group">
                <select id="subject" name="subject" required>
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="order">Order Support</option>
                    <option value="product">Product Information</option>
                    <option value="custom">Custom Order</option>
                    <option value="wholesale">Wholesale Inquiry</option>
                    <option value="other">Other</option>
                </select>
            </div>
            
            <div class="form-group">
                <textarea id="message" name="message" rows="6" placeholder="Tell us how we can help you..." required></textarea>
            </div>
            
            <button type="submit" class="btn btn-primary">Send Message</button>
        </form>
    </div>`;
  }
}