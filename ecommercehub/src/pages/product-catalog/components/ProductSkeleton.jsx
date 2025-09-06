import React from 'react';

const ProductSkeleton = ({ viewMode = 'grid' }) => {
  if (viewMode === 'list') {
    return (
      <div className="bg-card border border-border rounded-lg p-4 animate-pulse">
        <div className="flex space-x-4">
          {/* Image Skeleton */}
          <div className="flex-shrink-0 w-24 h-24 sm:w-32 sm:h-32 bg-muted rounded-lg"></div>
          
          {/* Content Skeleton */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
              <div className="flex-1 min-w-0 space-y-3">
                {/* Title */}
                <div className="h-6 bg-muted rounded w-3/4"></div>
                
                {/* Rating */}
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    {Array.from({ length: 5 })?.map((_, i) => (
                      <div key={i} className="w-3 h-3 bg-muted rounded"></div>
                    ))}
                  </div>
                  <div className="h-4 bg-muted rounded w-16"></div>
                </div>
                
                {/* Description */}
                <div className="space-y-2">
                  <div className="h-4 bg-muted rounded w-full"></div>
                  <div className="h-4 bg-muted rounded w-2/3"></div>
                </div>
                
                {/* Price */}
                <div className="flex items-center space-x-3">
                  <div className="h-8 bg-muted rounded w-20"></div>
                  <div className="h-6 bg-muted rounded w-16"></div>
                  <div className="h-6 bg-muted rounded w-12"></div>
                </div>
              </div>
              
              {/* Button */}
              <div className="mt-4 sm:mt-0 sm:ml-4 flex-shrink-0">
                <div className="h-9 bg-muted rounded w-24"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid view skeleton
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden animate-pulse">
      {/* Image Skeleton */}
      <div className="aspect-square bg-muted"></div>
      {/* Content Skeleton */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <div className="space-y-2">
          <div className="h-4 bg-muted rounded w-full"></div>
          <div className="h-4 bg-muted rounded w-2/3"></div>
        </div>
        
        {/* Rating */}
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            {Array.from({ length: 5 })?.map((_, i) => (
              <div key={i} className="w-3 h-3 bg-muted rounded"></div>
            ))}
          </div>
          <div className="h-3 bg-muted rounded w-12"></div>
        </div>
        
        {/* Price */}
        <div className="flex items-center space-x-2">
          <div className="h-6 bg-muted rounded w-16"></div>
          <div className="h-5 bg-muted rounded w-12"></div>
        </div>
        
        {/* Button - Mobile */}
        <div className="lg:hidden">
          <div className="h-9 bg-muted rounded w-full"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductSkeleton;