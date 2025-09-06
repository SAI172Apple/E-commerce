import React from 'react';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SortControls = ({ 
  sortBy, 
  onSortChange, 
  viewMode, 
  onViewModeChange, 
  onFilterToggle,
  productCount 
}) => {
  const sortOptions = [
    { value: 'relevance', label: 'Best Match' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Customer Rating' },
    { value: 'newest', label: 'Newest Arrivals' },
    { value: 'popularity', label: 'Most Popular' }
  ];

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-card border border-border rounded-lg p-4">
      {/* Left Section - Results Count & Mobile Filter */}
      <div className="flex items-center space-x-4">
        <div className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">{productCount?.toLocaleString()}</span> products found
        </div>
        
        {/* Mobile Filter Button */}
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onFilterToggle}
          className="lg:hidden"
          iconName="Filter"
          iconPosition="left"
        >
          Filters
        </Button>
      </div>
      {/* Right Section - Sort & View Controls */}
      <div className="flex items-center space-x-4 w-full sm:w-auto">
        {/* Sort Dropdown */}
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground whitespace-nowrap">Sort by:</span>
          <Select
            options={sortOptions}
            value={sortBy}
            onChange={onSortChange}
            className="min-w-[160px]"
          />
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center border border-border rounded-md overflow-hidden">
          <button
            onClick={() => onViewModeChange('grid')}
            className={`p-2 transition-smooth ${
              viewMode === 'grid' ?'bg-primary text-primary-foreground' :'bg-background text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
            title="Grid View"
          >
            <Icon name="Grid3X3" size={16} />
          </button>
          <button
            onClick={() => onViewModeChange('list')}
            className={`p-2 transition-smooth ${
              viewMode === 'list' ?'bg-primary text-primary-foreground' :'bg-background text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
            title="List View"
          >
            <Icon name="List" size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SortControls;