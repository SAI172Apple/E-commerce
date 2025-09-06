import React from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RelatedProducts = ({ products, onAddToCart }) => {
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    
    for (let i = 0; i < fullStars; i++) {
      stars?.push(
        <Icon key={i} name="Star" size={12} className="text-amber-400 fill-current" />
      );
    }
    
    const emptyStars = 5 - fullStars;
    for (let i = 0; i < emptyStars; i++) {
      stars?.push(
        <Icon key={`empty-${i}`} name="Star" size={12} className="text-gray-300" />
      );
    }
    
    return stars;
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <h3 className="text-lg font-semibold text-foreground mb-6">
        Related Products
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {products?.map((product) => (
          <div key={product?.id} className="bg-background rounded-lg border border-border overflow-hidden hover:shadow-elevated transition-shadow duration-200">
            <Link to={`/product-details?id=${product?.id}`} className="block">
              <div className="aspect-square overflow-hidden">
                <Image
                  src={product?.image}
                  alt={product?.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                />
              </div>
            </Link>
            
            <div className="p-4 space-y-3">
              <Link 
                to={`/product-details?id=${product?.id}`}
                className="block hover:text-primary transition-colors"
              >
                <h4 className="font-medium text-foreground line-clamp-2 text-sm">
                  {product?.name}
                </h4>
              </Link>
              
              <div className="flex items-center space-x-1">
                {renderStars(product?.rating)}
                <span className="text-xs text-muted-foreground ml-1">
                  ({product?.reviewCount})
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <span className="text-lg font-bold text-foreground">
                    ${product?.price?.toFixed(2)}
                  </span>
                  {product?.originalPrice && (
                    <div className="text-xs text-muted-foreground line-through">
                      ${product?.originalPrice?.toFixed(2)}
                    </div>
                  )}
                </div>
                
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onAddToCart(product, 1)}
                  iconName="Plus"
                  className="flex-shrink-0"
                >
                  Add
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;