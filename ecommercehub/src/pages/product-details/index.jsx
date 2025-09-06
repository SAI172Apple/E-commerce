import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import ProductImageGallery from './components/ProductImageGallery';
import ProductInfo from './components/ProductInfo';
import ProductSpecifications from './components/ProductSpecifications';
import CustomerReviews from './components/CustomerReviews';
import RelatedProducts from './components/RelatedProducts';
import Icon from '../../components/AppIcon';

const ProductDetails = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock product data
  const mockProducts = [
    {
      id: 1,
      name: "Premium Wireless Bluetooth Headphones with Active Noise Cancellation",
      brand: "AudioTech Pro",
      price: 199.99,
      originalPrice: 299.99,
      rating: 4.5,
      reviewCount: 2847,
      stock: 15,
      description: `Experience premium audio quality with these professional-grade wireless headphones. Featuring advanced active noise cancellation technology, premium drivers, and up to 30 hours of battery life. Perfect for music lovers, professionals, and travelers who demand the best in audio performance.`,
      features: [
        "Active Noise Cancellation with 3 modes",
        "30-hour battery life with quick charge",
        "Premium 40mm drivers for superior sound",
        "Comfortable over-ear design with memory foam",
        "Built-in microphone for crystal clear calls",
        "Bluetooth 5.0 with multipoint connection"
      ],
      images: [
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop",
        "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&h=800&fit=crop",
        "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=800&fit=crop",
        "https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=800&h=800&fit=crop"
      ],
      specifications: {
        driverSize: "40mm",
        frequency: "20Hz - 20kHz",
        impedance: "32 Ohm",
        batteryLife: "30 hours",
        chargingTime: "2 hours",
        weight: "250g",
        connectivity: "Bluetooth 5.0, 3.5mm jack",
        warranty: "2 years"
      },
      category: "Electronics"
    },
    {
      id: 2,
      name: "Smart Fitness Tracker with Heart Rate Monitor",
      brand: "FitLife",
      price: 89.99,
      originalPrice: 129.99,
      rating: 4.3,
      reviewCount: 1523,
      stock: 8,
      description: `Track your fitness journey with this advanced smart fitness tracker. Monitor heart rate, sleep patterns, steps, and calories burned. Water-resistant design perfect for all-day wear and workout sessions.`,
      features: [
        "24/7 heart rate monitoring",
        "Sleep tracking and analysis",
        "Water-resistant up to 50m",
        "7-day battery life",
        "Smart notifications",
        "Multiple sport modes"
      ],
      images: [
        "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=800&h=800&fit=crop",
        "https://images.unsplash.com/photo-1544117519-31a4b719223d?w=800&h=800&fit=crop"
      ],
      specifications: {
        display: "1.4 inch AMOLED",
        batteryLife: "7 days",
        waterRating: "5ATM",
        sensors: "Heart rate, Accelerometer, Gyroscope",
        compatibility: "iOS, Android",
        weight: "45g"
      },
      category: "Fitness"
    }
  ];

  // Mock reviews data
  const mockReviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      avatar: "https://randomuser.me/api/portraits/women/32.jpg",
      rating: 5,
      title: "Excellent sound quality and comfort",
      comment: `These headphones exceeded my expectations! The noise cancellation is fantastic, and I can wear them for hours without any discomfort. The sound quality is crisp and clear across all frequencies. Definitely worth the investment.`,
      date: "2024-08-15",
      verified: true,
      helpfulCount: 24
    },
    {
      id: 2,
      name: "Michael Chen",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
      rating: 4,
      title: "Great for travel and work",
      comment: `I use these daily for work calls and travel. The battery life is impressive, and the noise cancellation makes flights much more enjoyable. Only minor complaint is they can get a bit warm during extended use.`,
      date: "2024-08-10",
      verified: true,
      helpfulCount: 18
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      avatar: "https://randomuser.me/api/portraits/women/28.jpg",
      rating: 5,
      title: "Perfect for music production",
      comment: `As a music producer, I need headphones that deliver accurate sound reproduction. These headphones provide excellent clarity and detail. The build quality is also top-notch.`,
      date: "2024-08-05",
      verified: true,
      helpfulCount: 31
    },
    {
      id: 4,
      name: "David Thompson",
      avatar: "https://randomuser.me/api/portraits/men/52.jpg",
      rating: 4,
      title: "Good value for money",
      comment: `Solid headphones with good features. The noise cancellation works well in most environments. Setup was easy and they pair quickly with my devices.`,
      date: "2024-07-28",
      verified: false,
      helpfulCount: 12
    },
    {
      id: 5,
      name: "Lisa Wang",
      avatar: "https://randomuser.me/api/portraits/women/41.jpg",
      rating: 5,
      title: "Love the long battery life",
      comment: `The 30-hour battery life is a game changer! I can go days without charging. Sound quality is excellent and they're very comfortable for long listening sessions.`,
      date: "2024-07-22",
      verified: true,
      helpfulCount: 19
    }
  ];

  // Mock related products
  const mockRelatedProducts = [
    {
      id: 3,
      name: "Wireless Earbuds Pro",
      price: 149.99,
      originalPrice: 199.99,
      rating: 4.4,
      reviewCount: 892,
      image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop"
    },
    {
      id: 4,
      name: "Premium Over-Ear Headphones",
      price: 249.99,
      rating: 4.6,
      reviewCount: 1247,
      image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400&h=400&fit=crop"
    },
    {
      id: 5,
      name: "Portable Bluetooth Speaker",
      price: 79.99,
      originalPrice: 99.99,
      rating: 4.2,
      reviewCount: 634,
      image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop"
    },
    {
      id: 6,
      name: "Gaming Headset RGB",
      price: 129.99,
      rating: 4.3,
      reviewCount: 456,
      image: "https://images.unsplash.com/photo-1599669454699-248893623440?w=400&h=400&fit=crop"
    }
  ];

  useEffect(() => {
    const productId = searchParams?.get('id') || '1';
    
    // Simulate API call
    setTimeout(() => {
      const foundProduct = mockProducts?.find(p => p?.id?.toString() === productId);
      if (foundProduct) {
        setProduct(foundProduct);
        setRelatedProducts(mockRelatedProducts);
      }
      setLoading(false);
    }, 500);
  }, [searchParams]);

  const handleAddToCart = async (productToAdd, quantity) => {
    try {
      // Get existing cart
      const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
      
      // Check if product already exists in cart
      const existingItemIndex = existingCart?.findIndex(item => item?.id === productToAdd?.id);
      
      if (existingItemIndex >= 0) {
        // Update quantity
        existingCart[existingItemIndex].quantity += quantity;
      } else {
        // Add new item
        existingCart?.push({
          id: productToAdd?.id,
          name: productToAdd?.name,
          price: productToAdd?.price,
          image: productToAdd?.images ? productToAdd?.images?.[0] : productToAdd?.image,
          quantity: quantity
        });
      }
      
      // Save to localStorage
      localStorage.setItem('cart', JSON.stringify(existingCart));
      
      // Trigger storage event for header update
      window.dispatchEvent(new Event('storage'));
      
      // Show success message (you could use a toast library here)
      alert(`${productToAdd?.name} added to cart!`);
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add item to cart. Please try again.');
    }
  };

  const handleBuyNow = (productToBuy, quantity) => {
    // Add to cart first
    handleAddToCart(productToBuy, quantity);
    // Navigate to cart
    navigate('/shopping-cart');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16 flex items-center justify-center min-h-[calc(100vh-4rem)]">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
            <span className="text-muted-foreground">Loading product details...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16 flex items-center justify-center min-h-[calc(100vh-4rem)]">
          <div className="text-center space-y-4">
            <Icon name="Package" size={48} className="text-muted-foreground mx-auto" />
            <h2 className="text-xl font-semibold text-foreground">Product Not Found</h2>
            <p className="text-muted-foreground">The product you're looking for doesn't exist.</p>
            <button
              onClick={() => navigate('/product-catalog')}
              className="text-primary hover:text-primary/80 font-medium"
            >
              Browse Products
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-8">
            <button
              onClick={() => navigate('/product-catalog')}
              className="hover:text-foreground transition-colors"
            >
              Products
            </button>
            <Icon name="ChevronRight" size={16} />
            <span className="text-foreground">{product?.name}</span>
          </nav>

          {/* Product Details Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
            {/* Product Images */}
            <div className="lg:sticky lg:top-24 lg:self-start">
              <ProductImageGallery 
                images={product?.images} 
                productName={product?.name} 
              />
            </div>

            {/* Product Information */}
            <div>
              <ProductInfo
                product={product}
                onAddToCart={handleAddToCart}
                onBuyNow={handleBuyNow}
              />
            </div>
          </div>

          {/* Product Specifications */}
          <div className="mb-12">
            <ProductSpecifications specifications={product?.specifications} />
          </div>

          {/* Customer Reviews */}
          <div className="mb-12">
            <CustomerReviews
              reviews={mockReviews}
              averageRating={product?.rating}
              totalReviews={product?.reviewCount}
            />
          </div>

          {/* Related Products */}
          <div className="mb-12">
            <RelatedProducts
              products={relatedProducts}
              onAddToCart={handleAddToCart}
            />
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-card border-t border-border mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                    <Icon name="ShoppingBag" size={20} color="white" />
                  </div>
                  <span className="text-lg font-semibold text-foreground">EcommerceHub</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Your trusted online shopping destination for quality products at great prices.
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium text-foreground">Customer Service</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><a href="#" className="hover:text-foreground transition-colors">Help Center</a></li>
                  <li><a href="#" className="hover:text-foreground transition-colors">Returns & Exchanges</a></li>
                  <li><a href="#" className="hover:text-foreground transition-colors">Shipping Info</a></li>
                  <li><a href="#" className="hover:text-foreground transition-colors">Contact Us</a></li>
                </ul>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium text-foreground">Company</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><a href="#" className="hover:text-foreground transition-colors">About Us</a></li>
                  <li><a href="#" className="hover:text-foreground transition-colors">Careers</a></li>
                  <li><a href="#" className="hover:text-foreground transition-colors">Press</a></li>
                  <li><a href="#" className="hover:text-foreground transition-colors">Investors</a></li>
                </ul>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium text-foreground">Connect</h4>
                <div className="flex space-x-4">
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    <Icon name="Facebook" size={20} />
                  </a>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    <Icon name="Twitter" size={20} />
                  </a>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    <Icon name="Instagram" size={20} />
                  </a>
                </div>
              </div>
            </div>

            <div className="border-t border-border mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
              <p className="text-sm text-muted-foreground">
                © {new Date()?.getFullYear()} EcommerceHub. All rights reserved.
              </p>
              <div className="flex space-x-6 mt-4 sm:mt-0">
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Terms of Service
                </a>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default ProductDetails;