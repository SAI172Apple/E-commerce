import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProductInfo = ({ product, onAddToCart, onBuyNow }) => {
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= product?.stock) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    await onAddToCart(product, quantity);
    setIsAddingToCart(false);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars?.push(
        <Icon key={i} name="Star" size={16} className="text-amber-400 fill-current" />
      );
    }

    if (hasHalfStar) {
      stars?.push(
        <Icon key="half" name="Star" size={16} className="text-amber-400 fill-current opacity-50" />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars?.push(
        <Icon key={`empty-${i}`} name="Star" size={16} className="text-gray-300" />
      );
    }

    return stars;
  };

  const discountPercentage = product?.originalPrice 
    ? Math.round(((product?.originalPrice - product?.price) / product?.originalPrice) * 100)
    : 0;

  return (
    <div className="space-y-6">
      {/* Product Title */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-semibold text-foreground mb-2">
          {product?.name}
        </h1>
        <p className="text-muted-foreground">{product?.brand}</p>
      </div>
      {/* Rating and Reviews */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-1">
          {renderStars(product?.rating)}
          <span className="text-sm font-medium text-foreground ml-1">
            {product?.rating}
          </span>
        </div>
        <span className="text-sm text-muted-foreground">
          ({product?.reviewCount?.toLocaleString()} reviews)
        </span>
      </div>
      {/* Pricing */}
      <div className="space-y-2">
        <div className="flex items-center space-x-3">
          <span className="text-3xl font-bold text-foreground">
            ${product?.price?.toFixed(2)}
          </span>
          {product?.originalPrice && (
            <>
              <span className="text-lg text-muted-foreground line-through">
                ${product?.originalPrice?.toFixed(2)}
              </span>
              <span className="bg-error text-error-foreground px-2 py-1 rounded text-sm font-medium">
                -{discountPercentage}%
              </span>
            </>
          )}
        </div>
        <p className="text-sm text-muted-foreground">
          Free shipping on orders over $35
        </p>
      </div>
      {/* Stock Status */}
      <div className="flex items-center space-x-2">
        <Icon 
          name={product?.stock > 0 ? "CheckCircle" : "XCircle"} 
          size={16} 
          className={product?.stock > 0 ? "text-success" : "text-error"} 
        />
        <span className={`text-sm font-medium ${
          product?.stock > 0 ? "text-success" : "text-error"
        }`}>
          {product?.stock > 0 ? `In Stock (${product?.stock} available)` : "Out of Stock"}
        </span>
      </div>
      {/* Product Description */}
      <div className="space-y-2">
        <h3 className="font-medium text-foreground">About this item</h3>
        <p className="text-muted-foreground leading-relaxed">
          {product?.description}
        </p>
      </div>
      {/* Key Features */}
      {product?.features && (
        <div className="space-y-2">
          <h3 className="font-medium text-foreground">Key Features</h3>
          <ul className="space-y-1">
            {product?.features?.map((feature, index) => (
              <li key={index} className="flex items-start space-x-2 text-sm text-muted-foreground">
                <Icon name="Check" size={16} className="text-success mt-0.5 flex-shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {/* Quantity Selector and Actions */}
      {product?.stock > 0 && (
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-foreground">Quantity:</span>
            <div className="flex items-center border border-border rounded-md">
              <button
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
                className="p-2 hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Icon name="Minus" size={16} />
              </button>
              <span className="px-4 py-2 text-center min-w-[60px] border-x border-border">
                {quantity}
              </span>
              <button
                onClick={() => handleQuantityChange(1)}
                disabled={quantity >= product?.stock}
                className="p-2 hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Icon name="Plus" size={16} />
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
            <Button
              onClick={handleAddToCart}
              loading={isAddingToCart}
              iconName="ShoppingCart"
              iconPosition="left"
              className="flex-1"
            >
              Add to Cart
            </Button>
            <Button
              variant="outline"
              onClick={() => onBuyNow(product, quantity)}
              iconName="Zap"
              iconPosition="left"
              className="flex-1"
            >
              Buy Now
            </Button>
          </div>
        </div>
      )}
      {/* Trust Signals */}
      <div className="border-t border-border pt-4 space-y-3">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Shield" size={16} className="text-success" />
          <span>30-day return policy</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Truck" size={16} className="text-primary" />
          <span>Free shipping on orders over $35</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Award" size={16} className="text-accent" />
          <span>1-year manufacturer warranty</span>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;