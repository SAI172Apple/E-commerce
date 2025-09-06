import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CartItem = ({ item, onUpdateQuantity, onRemoveItem }) => {
  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) return;
    onUpdateQuantity(item?.id, newQuantity);
  };

  const subtotal = item?.price * item?.quantity;

  return (
    <div className="flex flex-col sm:flex-row gap-4 p-4 bg-card rounded-lg border border-border">
      {/* Product Image */}
      <div className="flex-shrink-0">
        <div className="w-24 h-24 sm:w-32 sm:h-32 overflow-hidden rounded-lg bg-muted">
          <Image
            src={item?.image}
            alt={item?.name}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      {/* Product Details */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground line-clamp-2">
              {item?.name}
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              {item?.category}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-lg font-bold text-primary">
                ${item?.price?.toFixed(2)}
              </span>
              {item?.originalPrice && item?.originalPrice > item?.price && (
                <span className="text-sm text-muted-foreground line-through">
                  ${item?.originalPrice?.toFixed(2)}
                </span>
              )}
            </div>
          </div>

          {/* Quantity Controls */}
          <div className="flex items-center gap-3 mt-4 sm:mt-0">
            <div className="flex items-center border border-border rounded-lg">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleQuantityChange(item?.quantity - 1)}
                disabled={item?.quantity <= 1}
                className="h-10 w-10 p-0"
              >
                <Icon name="Minus" size={16} />
              </Button>
              <span className="px-4 py-2 text-center min-w-[60px] font-medium">
                {item?.quantity}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleQuantityChange(item?.quantity + 1)}
                className="h-10 w-10 p-0"
              >
                <Icon name="Plus" size={16} />
              </Button>
            </div>
          </div>
        </div>

        {/* Subtotal and Remove */}
        <div className="flex items-center justify-between mt-4">
          <div className="text-lg font-semibold text-foreground">
            Subtotal: ${subtotal?.toFixed(2)}
          </div>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onRemoveItem(item?.id)}
            iconName="Trash2"
            iconPosition="left"
            iconSize={16}
          >
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;