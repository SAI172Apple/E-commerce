import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '../../components/ui/Header';
import FilterPanel from './components/FilterPanel';
import SortControls from './components/SortControls';
import ProductGrid from './components/ProductGrid';

const ProductCatalog = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('relevance');
  const [filters, setFilters] = useState({
    categories: [],
    brands: [],
    priceRange: [0, 1000]
  });

  // Mock product data
  const mockProducts = [
    {
      id: 1,
      name: "Apple iPhone 15 Pro Max 256GB Natural Titanium",
      price: 1199.99,
      originalPrice: 1299.99,
      rating: 4.8,
      reviewCount: 2847,
      category: 'electronics',
      brand: 'apple',
      image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&h=500&fit=crop",
      description: "The most advanced iPhone ever with titanium design, A17 Pro chip, and professional camera system."
    },
    {
      id: 2,
      name: "Samsung Galaxy S24 Ultra 512GB Titanium Black",
      price: 1299.99,
      rating: 4.7,
      reviewCount: 1923,
      category: 'electronics',
      brand: 'samsung',
      image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500&h=500&fit=crop",
      description: "Ultimate Galaxy experience with S Pen, 200MP camera, and AI-powered features."
    },
    {
      id: 3,
      name: "Nike Air Max 270 React Men\'s Running Shoes",
      price: 149.99,
      originalPrice: 179.99,
      rating: 4.5,
      reviewCount: 856,
      category: 'sports',
      brand: 'nike',
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop",
      description: "Comfortable running shoes with Max Air cushioning and React foam technology."
    },
    {
      id: 4,
      name: "Adidas Ultraboost 22 Running Shoes Black/White",
      price: 189.99,
      rating: 4.6,
      reviewCount: 1247,
      category: 'sports',
      brand: 'adidas',
      image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&h=500&fit=crop",
      description: "Premium running shoes with Boost midsole and Primeknit upper for ultimate comfort."
    },
    {
      id: 5,
      name: "Sony WH-1000XM5 Wireless Noise Canceling Headphones",
      price: 399.99,
      originalPrice: 449.99,
      rating: 4.9,
      reviewCount: 3421,
      category: 'electronics',
      brand: 'sony',
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
      description: "Industry-leading noise canceling with exceptional sound quality and 30-hour battery life."
    },
    {
      id: 6,
      name: "LG OLED C3 65-inch 4K Smart TV",
      price: 1799.99,
      originalPrice: 2199.99,
      rating: 4.8,
      reviewCount: 892,
      category: 'electronics',
      brand: 'lg',
      image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500&h=500&fit=crop",
      description: "Self-lit OLED pixels deliver perfect blacks and infinite contrast for stunning picture quality."
    },
    {
      id: 7,
      name: "Women\'s Casual Summer Dress - Floral Print",
      price: 79.99,
      originalPrice: 99.99,
      rating: 4.3,
      reviewCount: 567,
      category: 'clothing',
      brand: 'generic',
      image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500&h=500&fit=crop",
      description: "Comfortable and stylish summer dress perfect for casual outings and special occasions."
    },
    {
      id: 8,
      name: "Men\'s Classic Denim Jacket - Dark Blue",
      price: 89.99,
      rating: 4.4,
      reviewCount: 423,
      category: 'clothing',
      brand: 'generic',
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&h=500&fit=crop",
      description: "Timeless denim jacket made from premium cotton with classic fit and vintage styling."
    },
    {
      id: 9,
      name: "The Psychology of Money by Morgan Housel",
      price: 16.99,
      originalPrice: 19.99,
      rating: 4.7,
      reviewCount: 2156,
      category: 'books',
      brand: 'generic',
      image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&h=500&fit=crop",
      description: "Timeless lessons on wealth, greed, and happiness from one of the most important voices in finance."
    },
    {
      id: 10,
      name: "Atomic Habits by James Clear - Hardcover",
      price: 18.99,
      rating: 4.8,
      reviewCount: 4523,
      category: 'books',
      brand: 'generic',
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500&h=500&fit=crop",
      description: "An easy and proven way to build good habits and break bad ones with practical strategies."
    },
    {
      id: 11,
      name: "Indoor Plant Collection - Set of 3 Succulents",
      price: 34.99,
      originalPrice: 44.99,
      rating: 4.5,
      reviewCount: 789,
      category: 'home',
      brand: 'generic',
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500&h=500&fit=crop",
      description: "Beautiful collection of low-maintenance succulents perfect for home or office decoration."
    },
    {
      id: 12,
      name: "Ceramic Coffee Mug Set - Set of 4",
      price: 29.99,
      rating: 4.2,
      reviewCount: 345,
      category: 'home',
      brand: 'generic',
      image: "https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=500&h=500&fit=crop",
      description: "Elegant ceramic mugs with comfortable handles, perfect for your morning coffee or tea."
    },
    {
      id: 13,
      name: "Organic Face Moisturizer with SPF 30",
      price: 24.99,
      originalPrice: 32.99,
      rating: 4.6,
      reviewCount: 1234,
      category: 'beauty',
      brand: 'generic',
      image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500&h=500&fit=crop",
      description: "Natural moisturizer with sun protection, suitable for all skin types and daily use."
    },
    {
      id: 14,
      name: "Professional Makeup Brush Set - 12 Pieces",
      price: 49.99,
      originalPrice: 69.99,
      rating: 4.4,
      reviewCount: 892,
      category: 'beauty',
      brand: 'generic',
      image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500&h=500&fit=crop",
      description: "Complete makeup brush set with synthetic bristles and ergonomic handles for professional results."
    },
    {
      id: 15,
      name: "Yoga Mat - Extra Thick Non-Slip Exercise Mat",
      price: 39.99,
      rating: 4.7,
      reviewCount: 1567,
      category: 'sports',
      brand: 'generic',
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&h=500&fit=crop",
      description: "Premium yoga mat with superior grip and cushioning for comfortable practice sessions."
    },
    {
      id: 16,
      name: "Wireless Bluetooth Earbuds - True Wireless",
      price: 79.99,
      originalPrice: 99.99,
      rating: 4.3,
      reviewCount: 2341,
      category: 'electronics',
      brand: 'generic',
      image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&h=500&fit=crop",
      description: "High-quality wireless earbuds with active noise cancellation and 24-hour battery life."
    }
  ];

  // Initialize products and apply search filter
  useEffect(() => {
    const searchQuery = searchParams?.get('search');
    let initialProducts = [...mockProducts];

    if (searchQuery) {
      initialProducts = initialProducts?.filter(product =>
        product?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        product?.description?.toLowerCase()?.includes(searchQuery?.toLowerCase())
      );
    }

    setProducts(initialProducts);
    setLoading(false);
  }, [searchParams]);

  // Apply filters and sorting
  useEffect(() => {
    let filtered = [...products];

    // Apply category filter
    if (filters?.categories?.length > 0) {
      filtered = filtered?.filter(product => 
        filters?.categories?.includes(product?.category)
      );
    }

    // Apply brand filter
    if (filters?.brands?.length > 0) {
      filtered = filtered?.filter(product => 
        filters?.brands?.includes(product?.brand)
      );
    }

    // Apply price range filter
    filtered = filtered?.filter(product => 
      product?.price >= filters?.priceRange?.[0] && 
      product?.price <= filters?.priceRange?.[1]
    );

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        filtered?.sort((a, b) => a?.price - b?.price);
        break;
      case 'price-high':
        filtered?.sort((a, b) => b?.price - a?.price);
        break;
      case 'rating':
        filtered?.sort((a, b) => b?.rating - a?.rating);
        break;
      case 'newest':
        filtered?.sort((a, b) => b?.id - a?.id);
        break;
      case 'popularity':
        filtered?.sort((a, b) => b?.reviewCount - a?.reviewCount);
        break;
      default:
        // Keep original order for relevance
        break;
    }

    setFilteredProducts(filtered);
  }, [products, filters, sortBy]);

  const handleAddToCart = useCallback((product) => {
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = existingCart?.find(item => item?.id === product?.id);

    let updatedCart;
    if (existingItem) {
      updatedCart = existingCart?.map(item =>
        item?.id === product?.id
          ? { ...item, quantity: item?.quantity + 1 }
          : item
      );
    } else {
      updatedCart = [...existingCart, { ...product, quantity: 1 }];
    }

    localStorage.setItem('cart', JSON.stringify(updatedCart));
    
    // Trigger storage event for header cart count update
    window.dispatchEvent(new Event('storage'));
  }, []);

  const handleLoadMore = () => {
    setLoading(true);
    // Simulate loading more products
    setTimeout(() => {
      setCurrentPage(prev => prev + 1);
      setLoading(false);
      // For demo purposes, we'll set hasMore to false after first load
      if (currentPage >= 2) {
        setHasMore(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex gap-8">
            {/* Filter Panel */}
            <FilterPanel
              filters={filters}
              onFiltersChange={setFilters}
              isOpen={isFilterOpen}
              onToggle={() => setIsFilterOpen(!isFilterOpen)}
              productCount={filteredProducts?.length}
            />

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              {/* Sort Controls */}
              <SortControls
                sortBy={sortBy}
                onSortChange={setSortBy}
                viewMode={viewMode}
                onViewModeChange={setViewMode}
                onFilterToggle={() => setIsFilterOpen(true)}
                productCount={filteredProducts?.length}
              />

              {/* Product Grid */}
              <div className="mt-6">
                <ProductGrid
                  products={filteredProducts}
                  viewMode={viewMode}
                  onAddToCart={handleAddToCart}
                  loading={loading}
                  hasMore={hasMore}
                  onLoadMore={handleLoadMore}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Footer */}
      <footer className="bg-card border-t border-border mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-sm text-muted-foreground">
            <p>&copy; {new Date()?.getFullYear()} EcommerceHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProductCatalog;