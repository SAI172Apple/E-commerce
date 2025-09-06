import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const CartActions = ({ onUpdateCart, onClearCart, isUpdating, itemCount }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center p-4 bg-muted/50 rounded-lg border border-border">
      <div className="flex items-center gap-2">
        <Icon name="ShoppingCart" size={20} className="text-primary" />
        <span className="text-sm text-muted-foreground">
          {itemCount} {itemCount === 1 ? 'item' : 'items'} in your cart
        </span>
      </div>
      
      <div className="flex gap-3 w-full sm:w-auto">
        <Button
          variant="outline"
          size="sm"
          onClick={onUpdateCart}
          loading={isUpdating}
          iconName="RefreshCw"
          iconPosition="left"
          iconSize={16}
          className="flex-1 sm:flex-none"
        >
          Update Cart
        </Button>
        
        <Button
          variant="destructive"
          size="sm"
          onClick={onClearCart}
          iconName="Trash2"
          iconPosition="left"
          iconSize={16}
          className="flex-1 sm:flex-none"
        >
          Clear All
        </Button>
      </div>
    </div>
  );
};

export default CartActions;