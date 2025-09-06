import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import CartItem from './components/CartItem';
import CartSummary from './components/CartSummary';
import EmptyCart from './components/EmptyCart';
import CartActions from './components/CartActions';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Mock cart data
  const mockCartItems = [
    {
      id: 1,
      name: "Apple iPhone 15 Pro Max 256GB Natural Titanium",
      category: "Electronics",
      price: 1199.99,
      originalPrice: 1299.99,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop"
    },
    {
      id: 2,
      name: "Sony WH-1000XM5 Wireless Noise Canceling Headphones",
      category: "Electronics",
      price: 349.99,
      originalPrice: 399.99,
      quantity: 2,
      image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop"
    },
    {
      id: 3,
      name: "Nike Air Max 270 Running Shoes - Black/White",
      category: "Fashion",
      price: 129.99,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop"
    },
    {
      id: 4,
      name: "Instant Pot Duo 7-in-1 Electric Pressure Cooker 6 Quart",
      category: "Home & Kitchen",
      price: 79.99,
      originalPrice: 99.99,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop"
    }
  ];

  useEffect(() => {
    // Check authentication status
    const token = localStorage.getItem('authToken');
    setIsAuthenticated(!!token);

    // Load cart items from localStorage
    const loadCartItems = () => {
      try {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
          const parsedCart = JSON.parse(savedCart);
          setCartItems(parsedCart);
        } else {
          // Use mock data for demonstration
          setCartItems(mockCartItems);
          localStorage.setItem('cart', JSON.stringify(mockCartItems));
        }
      } catch (error) {
        console.error('Error loading cart:', error);
        setCartItems([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadCartItems();
  }, []);

  const updateCartInStorage = (updatedCart) => {
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    // Trigger storage event for header cart count update
    window.dispatchEvent(new Event('storage'));
  };

  const handleUpdateQuantity = (itemId, newQuantity) => {
    const updatedCart = cartItems?.map(item =>
      item?.id === itemId ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCart);
    updateCartInStorage(updatedCart);
  };

  const handleRemoveItem = (itemId) => {
    const updatedCart = cartItems?.filter(item => item?.id !== itemId);
    setCartItems(updatedCart);
    updateCartInStorage(updatedCart);
  };

  const handleUpdateCart = async () => {
    setIsUpdating(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsUpdating(false);
  };

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to remove all items from your cart?')) {
      setCartItems([]);
      updateCartInStorage([]);
    }
  };

  const handleProceedToCheckout = () => {
    if (!isAuthenticated) {
      // Redirect to login with return URL
      navigate('/user-login?redirect=/shopping-cart');
      return;
    }
    
    // Mock checkout process
    alert('Checkout functionality will be implemented in the next phase. Your cart has been saved!');
  };

  const totalItems = cartItems?.reduce((sum, item) => sum + item?.quantity, 0);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16 flex items-center justify-center min-h-screen">
          <div className="flex items-center gap-3">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <span className="text-muted-foreground">Loading your cart...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Shopping Cart - EcommerceHub</title>
        <meta name="description" content="Review and manage your selected items before checkout. Secure shopping cart with persistent data across sessions." />
      </Helmet>
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link to="/product-catalog" className="hover:text-foreground transition-smooth">
              Products
            </Link>
            <Icon name="ChevronRight" size={16} />
            <span className="text-foreground font-medium">Shopping Cart</span>
          </nav>

          {cartItems?.length === 0 ? (
            <EmptyCart />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-6">
                {/* Page Header */}
                <div className="flex items-center justify-between">
                  <h1 className="text-3xl font-bold text-foreground">
                    Shopping Cart
                  </h1>
                  <div className="text-sm text-muted-foreground">
                    {totalItems} {totalItems === 1 ? 'item' : 'items'}
                  </div>
                </div>

                {/* Cart Actions */}
                <CartActions
                  onUpdateCart={handleUpdateCart}
                  onClearCart={handleClearCart}
                  isUpdating={isUpdating}
                  itemCount={totalItems}
                />

                {/* Cart Items List */}
                <div className="space-y-4">
                  {cartItems?.map((item) => (
                    <CartItem
                      key={item?.id}
                      item={item}
                      onUpdateQuantity={handleUpdateQuantity}
                      onRemoveItem={handleRemoveItem}
                    />
                  ))}
                </div>

                {/* Continue Shopping */}
                <div className="flex justify-center pt-6">
                  <Button
                    variant="outline"
                    asChild
                    iconName="ArrowLeft"
                    iconPosition="left"
                  >
                    <Link to="/product-catalog">
                      Continue Shopping
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Cart Summary */}
              <div className="lg:col-span-1">
                <CartSummary
                  cartItems={cartItems}
                  onProceedToCheckout={handleProceedToCheckout}
                />
              </div>
            </div>
          )}
        </div>

        {/* Trust Signals */}
        <section className="bg-muted/50 py-12 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mb-4">
                  <Icon name="Shield" size={24} className="text-success" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Secure Checkout</h3>
                <p className="text-sm text-muted-foreground">
                  Your payment information is protected with 256-bit SSL encryption
                </p>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Icon name="Truck" size={24} className="text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Free Shipping</h3>
                <p className="text-sm text-muted-foreground">
                  Free shipping on orders over $50. Fast delivery nationwide
                </p>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                  <Icon name="RotateCcw" size={24} className="text-accent" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Easy Returns</h3>
                <p className="text-sm text-muted-foreground">
                  30-day return policy. No questions asked, full refund guaranteed
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-foreground text-background py-8 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-sm opacity-80">
              © {new Date()?.getFullYear()} EcommerceHub. All rights reserved. 
              Secure shopping experience powered by advanced encryption technology.
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default ShoppingCart;