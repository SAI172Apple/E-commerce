import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProductCard = ({ product, viewMode = 'grid', onAddToCart }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = async (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    onAddToCart(product);
    setIsAdded(true);
    setIsLoading(false);
    
    // Reset added state after 2 seconds
    setTimeout(() => setIsAdded(false), 2000);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars?.push(
        <Icon key={i} name="Star" size={14} className="text-yellow-400 fill-current" />
      );
    }
    
    if (hasHalfStar) {
      stars?.push(
        <Icon key="half" name="StarHalf" size={14} className="text-yellow-400 fill-current" />
      );
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars?.push(
        <Icon key={`empty-${i}`} name="Star" size={14} className="text-gray-300" />
      );
    }
    
    return stars;
  };

  if (viewMode === 'list') {
    return (
      <Link 
        to={`/product-details?id=${product?.id}`}
        className="block bg-card border border-border rounded-lg p-4 hover:shadow-elevated transition-smooth"
      >
        <div className="flex space-x-4">
          {/* Product Image */}
          <div className="flex-shrink-0 w-24 h-24 sm:w-32 sm:h-32 bg-muted rounded-lg overflow-hidden">
            <Image
              src={product?.image}
              alt={product?.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product Info */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-foreground line-clamp-2 mb-2">
                  {product?.name}
                </h3>
                
                <div className="flex items-center space-x-2 mb-2">
                  <div className="flex items-center space-x-1">
                    {renderStars(product?.rating)}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    ({product?.reviewCount?.toLocaleString()})
                  </span>
                </div>

                <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                  {product?.description}
                </p>

                <div className="flex items-center space-x-3">
                  <span className="text-2xl font-bold text-foreground">
                    ${product?.price?.toFixed(2)}
                  </span>
                  {product?.originalPrice && product?.originalPrice > product?.price && (
                    <>
                      <span className="text-lg text-muted-foreground line-through">
                        ${product?.originalPrice?.toFixed(2)}
                      </span>
                      <span className="text-sm font-medium text-success bg-success/10 px-2 py-1 rounded">
                        {Math.round(((product?.originalPrice - product?.price) / product?.originalPrice) * 100)}% off
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Add to Cart Button */}
              <div className="mt-4 sm:mt-0 sm:ml-4 flex-shrink-0">
                <Button
                  variant={isAdded ? "success" : "default"}
                  size="sm"
                  onClick={handleAddToCart}
                  loading={isLoading}
                  iconName={isAdded ? "Check" : "ShoppingCart"}
                  iconPosition="left"
                  className="w-full sm:w-auto"
                >
                  {isAdded ? 'Added!' : 'Add to Cart'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  // Grid view
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-elevated transition-smooth group">
      <Link to={`/product-details?id=${product?.id}`} className="block">
        {/* Product Image */}
        <div className="relative aspect-square bg-muted overflow-hidden">
          <Image
            src={product?.image}
            alt={product?.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Discount Badge */}
          {product?.originalPrice && product?.originalPrice > product?.price && (
            <div className="absolute top-2 left-2 bg-error text-error-foreground text-xs font-medium px-2 py-1 rounded">
              {Math.round(((product?.originalPrice - product?.price) / product?.originalPrice) * 100)}% OFF
            </div>
          )}

          {/* Quick Add Button - Desktop Only */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <Button
              variant="default"
              size="sm"
              onClick={handleAddToCart}
              loading={isLoading}
              iconName={isAdded ? "Check" : "ShoppingCart"}
              iconPosition="left"
              className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300"
            >
              {isAdded ? 'Added!' : 'Quick Add'}
            </Button>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4">
          <h3 className="text-sm font-semibold text-foreground line-clamp-2 mb-2 min-h-[2.5rem]">
            {product?.name}
          </h3>
          
          <div className="flex items-center space-x-1 mb-2">
            {renderStars(product?.rating)}
            <span className="text-xs text-muted-foreground ml-1">
              ({product?.reviewCount?.toLocaleString()})
            </span>
          </div>

          <div className="flex items-center space-x-2 mb-3">
            <span className="text-lg font-bold text-foreground">
              ${product?.price?.toFixed(2)}
            </span>
            {product?.originalPrice && product?.originalPrice > product?.price && (
              <span className="text-sm text-muted-foreground line-through">
                ${product?.originalPrice?.toFixed(2)}
              </span>
            )}
          </div>

          {/* Mobile Add to Cart Button */}
          <Button
            variant={isAdded ? "success" : "outline"}
            size="sm"
            onClick={handleAddToCart}
            loading={isLoading}
            iconName={isAdded ? "Check" : "ShoppingCart"}
            iconPosition="left"
            fullWidth
            className="lg:hidden"
          >
            {isAdded ? 'Added!' : 'Add to Cart'}
          </Button>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;