import React from 'react';
import Icon from '../../../components/AppIcon';

const BenefitsSection = () => {
  const benefits = [
    {
      icon: 'ShoppingCart',
      title: 'Personalized Shopping',
      description: 'Get product recommendations tailored to your preferences and shopping history'
    },
    {
      icon: 'Heart',
      title: 'Wishlist & Favorites',
      description: 'Save items you love and get notified when they go on sale'
    },
    {
      icon: 'Truck',
      title: 'Fast & Free Shipping',
      description: 'Enjoy free shipping on orders over $50 and express delivery options'
    },
    {
      icon: 'RotateCcw',
      title: 'Easy Returns',
      description: '30-day hassle-free returns with prepaid shipping labels'
    },
    {
      icon: 'Bell',
      title: 'Price Alerts',
      description: 'Get notified when items in your wishlist drop in price'
    },
    {
      icon: 'Award',
      title: 'Loyalty Rewards',
      description: 'Earn points on every purchase and unlock exclusive member benefits'
    }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto mt-16">
      <div className="text-center mb-12">
        <h2 className="text-2xl font-semibold text-foreground mb-4">Why Join EcommerceHub?</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Create your account today and unlock a world of benefits designed to enhance your shopping experience
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {benefits?.map((benefit, index) => (
          <div key={index} className="bg-card rounded-lg p-6 shadow-soft hover:shadow-elevated transition-smooth">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <Icon name={benefit?.icon} size={24} className="text-primary" />
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">{benefit?.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{benefit?.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BenefitsSection;