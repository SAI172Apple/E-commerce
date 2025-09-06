import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const CartSummary = ({ cartItems, onProceedToCheckout }) => {
  const subtotal = cartItems?.reduce((sum, item) => sum + (item?.price * item?.quantity), 0);
  const tax = subtotal * 0.08; // 8% tax
  const shipping = subtotal > 50 ? 0 : 9.99; // Free shipping over $50
  const total = subtotal + tax + shipping;

  const totalItems = cartItems?.reduce((sum, item) => sum + item?.quantity, 0);

  return (
    <div className="bg-card border border-border rounded-lg p-6 sticky top-24">
      <h2 className="text-xl font-semibold text-foreground mb-4">
        Order Summary
      </h2>
      {/* Items Count */}
      <div className="flex justify-between items-center py-2 border-b border-border">
        <span className="text-muted-foreground">
          Items ({totalItems})
        </span>
        <span className="font-medium text-foreground">
          ${subtotal?.toFixed(2)}
        </span>
      </div>
      {/* Shipping */}
      <div className="flex justify-between items-center py-2 border-b border-border">
        <span className="text-muted-foreground">Shipping</span>
        <div className="text-right">
          {shipping === 0 ? (
            <div>
              <span className="font-medium text-success">FREE</span>
              <div className="text-xs text-muted-foreground">
                Orders over $50
              </div>
            </div>
          ) : (
            <span className="font-medium text-foreground">
              ${shipping?.toFixed(2)}
            </span>
          )}
        </div>
      </div>
      {/* Tax */}
      <div className="flex justify-between items-center py-2 border-b border-border">
        <span className="text-muted-foreground">
          Estimated Tax (8%)
        </span>
        <span className="font-medium text-foreground">
          ${tax?.toFixed(2)}
        </span>
      </div>
      {/* Total */}
      <div className="flex justify-between items-center py-4 border-b border-border">
        <span className="text-lg font-semibold text-foreground">
          Order Total
        </span>
        <span className="text-xl font-bold text-primary">
          ${total?.toFixed(2)}
        </span>
      </div>
      {/* Free Shipping Progress */}
      {subtotal < 50 && (
        <div className="mt-4 p-3 bg-accent/10 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="Truck" size={16} className="text-accent" />
            <span className="text-sm font-medium text-accent-foreground">
              Add ${(50 - subtotal)?.toFixed(2)} for FREE shipping
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-accent h-2 rounded-full transition-all duration-300"
              style={{ width: `${Math.min((subtotal / 50) * 100, 100)}%` }}
            />
          </div>
        </div>
      )}
      {/* Checkout Button */}
      <Button
        variant="default"
        size="lg"
        fullWidth
        onClick={onProceedToCheckout}
        iconName="CreditCard"
        iconPosition="left"
        className="mt-6"
      >
        Proceed to Checkout
      </Button>
      {/* Security Badge */}
      <div className="flex items-center justify-center gap-2 mt-4 text-xs text-muted-foreground">
        <Icon name="Shield" size={14} />
        <span>Secure 256-bit SSL encryption</span>
      </div>
    </div>
  );
};

export default CartSummary;