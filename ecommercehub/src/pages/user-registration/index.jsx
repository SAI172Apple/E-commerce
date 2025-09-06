import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import RegistrationForm from './components/RegistrationForm';
import TrustSignals from './components/TrustSignals';
import BenefitsSection from './components/BenefitsSection';
import Icon from '../../components/AppIcon';

const UserRegistration = () => {
  const currentYear = new Date()?.getFullYear();

  return (
    <>
      <Helmet>
        <title>Create Account - EcommerceHub | Join Thousands of Happy Customers</title>
        <meta name="description" content="Create your EcommerceHub account today and enjoy personalized shopping, exclusive deals, fast shipping, and secure checkout. Join thousands of satisfied customers." />
        <meta name="keywords" content="create account, sign up, register, ecommerce, online shopping, secure registration" />
        <meta property="og:title" content="Create Account - EcommerceHub" />
        <meta property="og:description" content="Join EcommerceHub for the best online shopping experience with personalized recommendations and exclusive member benefits." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="/user-registration" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        {/* Main Content */}
        <main className="pt-16">
          {/* Hero Section */}
          <section className="bg-gradient-to-br from-primary/5 via-background to-accent/5 py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <Icon name="ShoppingBag" size={40} color="white" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                  Welcome to EcommerceHub
                </h1>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Create your account and discover thousands of products with personalized recommendations, 
                  exclusive deals, and a shopping experience tailored just for you.
                </p>
              </div>

              {/* Registration Form */}
              <div className="flex justify-center">
                <RegistrationForm />
              </div>

              {/* Trust Signals */}
              <TrustSignals />
            </div>
          </section>

          {/* Benefits Section */}
          <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
            <div className="max-w-7xl mx-auto">
              <BenefitsSection />
            </div>
          </section>

          {/* Statistics Section */}
          <section className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">50K+</div>
                  <div className="text-sm text-muted-foreground">Happy Customers</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">100K+</div>
                  <div className="text-sm text-muted-foreground">Products</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">99.9%</div>
                  <div className="text-sm text-muted-foreground">Uptime</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">4.8★</div>
                  <div className="text-sm text-muted-foreground">Customer Rating</div>
                </div>
              </div>
            </div>
          </section>

          {/* Call to Action Section */}
          <section className="py-16 px-4 sm:px-6 lg:px-8 bg-primary text-primary-foreground">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Start Shopping?</h2>
              <p className="text-xl opacity-90 mb-8">
                Join thousands of satisfied customers who trust EcommerceHub for their online shopping needs.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                <div className="flex items-center space-x-2">
                  <Icon name="Shield" size={20} />
                  <span>Secure & Safe</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Truck" size={20} />
                  <span>Fast Delivery</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="RotateCcw" size={20} />
                  <span>Easy Returns</span>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-foreground text-background py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Company Info */}
              <div className="md:col-span-2">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                    <Icon name="ShoppingBag" size={20} color="white" />
                  </div>
                  <span className="text-xl font-semibold">EcommerceHub</span>
                </div>
                <p className="text-sm opacity-80 mb-4 max-w-md">
                  Your trusted online shopping destination with thousands of products, 
                  competitive prices, and exceptional customer service.
                </p>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Icon name="Shield" size={16} />
                    <span className="text-xs">SSL Secured</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Award" size={16} />
                    <span className="text-xs">Trusted Platform</span>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="font-medium mb-4">Quick Links</h3>
                <ul className="space-y-2 text-sm opacity-80">
                  <li>About Us</li>
                  <li>Contact Support</li>
                  <li>Shipping Info</li>
                  <li>Return Policy</li>
                </ul>
              </div>

              {/* Legal */}
              <div>
                <h3 className="font-medium mb-4">Legal</h3>
                <ul className="space-y-2 text-sm opacity-80">
                  <li>Privacy Policy</li>
                  <li>Terms of Service</li>
                  <li>Cookie Policy</li>
                  <li>GDPR Compliance</li>
                </ul>
              </div>
            </div>

            <div className="border-t border-background/20 mt-8 pt-8 text-center">
              <p className="text-sm opacity-60">
                © {currentYear} EcommerceHub. All rights reserved. | 
                Secure shopping experience powered by advanced encryption technology.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default UserRegistration;