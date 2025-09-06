import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const LoginHeader = () => {
  return (
    <div className="text-center mb-8">
      {/* Logo */}
      <Link to="/product-catalog" className="inline-flex items-center space-x-2 mb-6">
        <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
          <Icon name="ShoppingBag" size={24} color="white" />
        </div>
        <span className="text-2xl font-bold text-foreground">EcommerceHub</span>
      </Link>

      {/* Welcome Message */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Welcome Back</h1>
        <p className="text-muted-foreground text-lg">
          Sign in to access your account and continue shopping
        </p>
      </div>

      {/* Benefits */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
        <div className="flex items-center justify-center space-x-2 text-muted-foreground">
          <Icon name="ShoppingCart" size={16} className="text-primary" />
          <span>Saved cart items</span>
        </div>
        <div className="flex items-center justify-center space-x-2 text-muted-foreground">
          <Icon name="Heart" size={16} className="text-primary" />
          <span>Wishlist & favorites</span>
        </div>
        <div className="flex items-center justify-center space-x-2 text-muted-foreground">
          <Icon name="Truck" size={16} className="text-primary" />
          <span>Order tracking</span>
        </div>
        <div className="flex items-center justify-center space-x-2 text-muted-foreground">
          <Icon name="CreditCard" size={16} className="text-primary" />
          <span>Saved payment methods</span>
        </div>
      </div>
    </div>
  );
};

export default LoginHeader;