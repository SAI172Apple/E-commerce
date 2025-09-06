import React from 'react';
import ProductCard from './ProductCard';
import ProductSkeleton from './ProductSkeleton';

const ProductGrid = ({ 
  products, 
  viewMode, 
  onAddToCart, 
  loading, 
  hasMore, 
  onLoadMore 
}) => {
  if (loading && products?.length === 0) {
    return (
      <div className={`grid gap-6 ${
        viewMode === 'grid' ?'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' :'grid-cols-1'
      }`}>
        {Array.from({ length: 12 })?.map((_, index) => (
          <ProductSkeleton key={index} viewMode={viewMode} />
        ))}
      </div>
    );
  }

  if (products?.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
          <svg className="w-12 h-12 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2 2v-5m16 0h-2M4 13h2m13-8V4a1 1 0 00-1-1H7a1 1 0 00-1 1v1m8 0V4.5" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">No products found</h3>
        <p className="text-muted-foreground mb-6">
          Try adjusting your filters or search terms to find what you're looking for.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Products Grid */}
      <div className={`grid gap-6 ${
        viewMode === 'grid' ?'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' :'grid-cols-1'
      }`}>
        {products?.map((product) => (
          <ProductCard
            key={product?.id}
            product={product}
            viewMode={viewMode}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
      {/* Loading More Skeletons */}
      {loading && products?.length > 0 && (
        <div className={`grid gap-6 ${
          viewMode === 'grid' ?'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' :'grid-cols-1'
        }`}>
          {Array.from({ length: 8 })?.map((_, index) => (
            <ProductSkeleton key={`loading-${index}`} viewMode={viewMode} />
          ))}
        </div>
      )}
      {/* Load More Button */}
      {hasMore && !loading && (
        <div className="text-center py-8">
          <button
            onClick={onLoadMore}
            className="px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-smooth font-medium"
          >
            Load More Products
          </button>
        </div>
      )}
      {/* End of Results */}
      {!hasMore && products?.length > 0 && (
        <div className="text-center py-8 border-t border-border">
          <p className="text-muted-foreground">
            You've reached the end of the results
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;