import { Snowflake } from 'lucide-react';

export function Footer() {
  return (
    <footer id="contact" className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <a href="#" className="flex items-center gap-2 mb-4">
              <Snowflake className="h-6 w-6" />
              <span className="font-display text-xl font-bold">Pablo Store</span>
            </a>
            <p className="text-sm text-primary-foreground/70">
              Premium winter fashion for the modern individual. Stay warm, stay stylish.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Shop</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li><a href="#products" className="hover:text-primary-foreground transition-colors">All Products</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Jackets</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Sweaters</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Accessories</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li><a href="#" className="hover:text-primary-foreground transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Shipping</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Returns</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Size Guide</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li>hello@pablostore.com</li>
              <li>+91 98765 43210</li>
              <li>Mon - Sat: 10am - 7pm</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-8 pt-8 text-center text-sm text-primary-foreground/50">
          <p>© 2025 Pablo Store. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
