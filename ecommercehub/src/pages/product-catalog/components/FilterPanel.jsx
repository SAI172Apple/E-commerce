import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterPanel = ({ 
  filters, 
  onFiltersChange, 
  isOpen, 
  onToggle, 
  productCount 
}) => {
  const [priceRange, setPriceRange] = useState(filters?.priceRange || [0, 1000]);

  const categories = [
    { id: 'electronics', label: 'Electronics', count: 156 },
    { id: 'clothing', label: 'Clothing & Fashion', count: 243 },
    { id: 'home', label: 'Home & Garden', count: 89 },
    { id: 'books', label: 'Books & Media', count: 67 },
    { id: 'sports', label: 'Sports & Outdoors', count: 134 },
    { id: 'beauty', label: 'Beauty & Personal Care', count: 98 }
  ];

  const brands = [
    { id: 'apple', label: 'Apple', count: 45 },
    { id: 'samsung', label: 'Samsung', count: 38 },
    { id: 'nike', label: 'Nike', count: 52 },
    { id: 'adidas', label: 'Adidas', count: 41 },
    { id: 'sony', label: 'Sony', count: 29 },
    { id: 'lg', label: 'LG', count: 33 }
  ];

  const handleCategoryChange = (categoryId, checked) => {
    const updatedCategories = checked
      ? [...(filters?.categories || []), categoryId]
      : (filters?.categories || [])?.filter(id => id !== categoryId);
    
    onFiltersChange({
      ...filters,
      categories: updatedCategories
    });
  };

  const handleBrandChange = (brandId, checked) => {
    const updatedBrands = checked
      ? [...(filters?.brands || []), brandId]
      : (filters?.brands || [])?.filter(id => id !== brandId);
    
    onFiltersChange({
      ...filters,
      brands: updatedBrands
    });
  };

  const handlePriceRangeChange = (value, index) => {
    const newRange = [...priceRange];
    newRange[index] = parseInt(value);
    setPriceRange(newRange);
    
    onFiltersChange({
      ...filters,
      priceRange: newRange
    });
  };

  const clearAllFilters = () => {
    setPriceRange([0, 1000]);
    onFiltersChange({
      categories: [],
      brands: [],
      priceRange: [0, 1000]
    });
  };

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Filter Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Filters</h3>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">
            {productCount} products
          </span>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={clearAllFilters}
            className="text-xs"
          >
            Clear All
          </Button>
        </div>
      </div>

      {/* Price Range */}
      <div className="space-y-3">
        <h4 className="font-medium text-foreground">Price Range</h4>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <div className="flex-1">
              <label className="block text-xs text-muted-foreground mb-1">Min</label>
              <input
                type="number"
                value={priceRange?.[0]}
                onChange={(e) => handlePriceRangeChange(e?.target?.value, 0)}
                className="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="$0"
              />
            </div>
            <div className="flex-1">
              <label className="block text-xs text-muted-foreground mb-1">Max</label>
              <input
                type="number"
                value={priceRange?.[1]}
                onChange={(e) => handlePriceRangeChange(e?.target?.value, 1)}
                className="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="$1000"
              />
            </div>
          </div>
          <div className="text-sm text-muted-foreground">
            ${priceRange?.[0]} - ${priceRange?.[1]}
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="space-y-3">
        <h4 className="font-medium text-foreground">Categories</h4>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {categories?.map((category) => (
            <div key={category?.id} className="flex items-center justify-between">
              <Checkbox
                label={category?.label}
                checked={(filters?.categories || [])?.includes(category?.id)}
                onChange={(e) => handleCategoryChange(category?.id, e?.target?.checked)}
                className="flex-1"
              />
              <span className="text-xs text-muted-foreground ml-2">
                ({category?.count})
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Brands */}
      <div className="space-y-3">
        <h4 className="font-medium text-foreground">Brands</h4>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {brands?.map((brand) => (
            <div key={brand?.id} className="flex items-center justify-between">
              <Checkbox
                label={brand?.label}
                checked={(filters?.brands || [])?.includes(brand?.id)}
                onChange={(e) => handleBrandChange(brand?.id, e?.target?.checked)}
                className="flex-1"
              />
              <span className="text-xs text-muted-foreground ml-2">
                ({brand?.count})
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Filter Panel */}
      <div className="hidden lg:block w-80 bg-card border border-border rounded-lg p-6 h-fit sticky top-20">
        <FilterContent />
      </div>

      {/* Mobile Filter Overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50">
          <div className="fixed inset-y-0 left-0 w-80 bg-background border-r border-border overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-foreground">Filters</h3>
                <Button variant="ghost" size="sm" onClick={onToggle}>
                  <Icon name="X" size={20} />
                </Button>
              </div>
              <FilterContent />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FilterPanel;