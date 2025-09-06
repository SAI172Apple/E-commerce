import React from 'react';

const ProductSpecifications = ({ specifications }) => {
  if (!specifications || Object.keys(specifications)?.length === 0) {
    return null;
  }

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">
        Product Specifications
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(specifications)?.map(([key, value]) => (
          <div key={key} className="flex justify-between py-2 border-b border-border last:border-b-0">
            <span className="text-sm font-medium text-muted-foreground capitalize">
              {key?.replace(/([A-Z])/g, ' $1')?.trim()}
            </span>
            <span className="text-sm text-foreground font-medium">
              {value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductSpecifications;