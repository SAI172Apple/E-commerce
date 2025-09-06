import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SavedItems = ({ user }) => {
  const [savedItems, setSavedItems] = useState([
    {
      id: 1,
      name: 'Premium Wireless Earbuds',
      price: 149.99,
      originalPrice: 199.99,
      image: '/api/placeholder/80/80',
      inStock: true,
      rating: 4.5,
      reviews: 1248
    },
    {
      id: 2,
      name: 'Smart Fitness Tracker',
      price: 89.99,
      originalPrice: 119.99,
      image: '/api/placeholder/80/80',
      inStock: true,
      rating: 4.3,
      reviews: 892
    },
    {
      id: 3,
      name: 'Portable Bluetooth Speaker',
      price: 79.99,
      originalPrice: 99.99,
      image: '/api/placeholder/80/80',
      inStock: false,
      rating: 4.7,
      reviews: 2156
    }
  ]);

  const handleRemoveItem = (itemId) => {
    setSavedItems(prev => prev?.filter(item => item?.id !== itemId));
  };

  const handleAddToCart = (item) => {
    // Add to cart logic
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cart?.find(cartItem => cartItem?.id === item?.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart?.push({ ...item, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    console.log('Added to cart:', item?.name);
  };

  return (
    <motion.div 
      className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-elevated border border-white/50 p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ scale: 1.005 }}
    >
      <div className="flex items-center justify-between mb-6">
        <motion.h2 
          className="text-xl font-semibold text-gray-900"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Saved Items ({savedItems?.length})
        </motion.h2>
        
        <Button
          variant="ghost"
          size="sm"
          iconName="Heart"
          className="text-red-500 hover:text-red-600 transition-all duration-300 hover:scale-105"
        >
          Manage
        </Button>
      </div>
      {savedItems?.length === 0 ? (
        <motion.div 
          className="text-center py-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Icon name="Heart" size={48} className="text-gray-300 mx-auto mb-4" />
          <h3 className="text-gray-600 font-medium mb-2">No saved items yet</h3>
          <p className="text-gray-500 text-sm mb-4">Save items you love for easy access later</p>
          <Button variant="outline" asChild>
            <Link to="/product-catalog">
              <Icon name="ShoppingBag" size={16} className="mr-2" />
              Start Shopping
            </Link>
          </Button>
        </motion.div>
      ) : (
        <div className="space-y-4">
          {savedItems?.map((item, index) => (
            <motion.div
              key={item?.id}
              className="border border-gray-200/60 rounded-xl p-4 hover:shadow-soft transition-all duration-300 bg-white/60 backdrop-blur-sm group"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
              whileHover={{ x: 5, scale: 1.01 }}
            >
              <div className="flex items-start space-x-4">
                {/* Product Image */}
                <motion.div 
                  className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0 overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                    <Icon name="Package" size={24} className="text-gray-400" />
                  </div>
                </motion.div>

                {/* Product Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-900 text-sm mb-1 group-hover:text-primary transition-colors">
                    {item?.name}
                  </h3>
                  
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-lg font-bold text-gray-900">${item?.price}</span>
                    {item?.originalPrice > item?.price && (
                      <span className="text-sm text-gray-500 line-through">${item?.originalPrice}</span>
                    )}
                    {item?.originalPrice > item?.price && (
                      <span className="text-xs bg-red-100 text-red-800 px-2 py-0.5 rounded-full">
                        Save ${(item?.originalPrice - item?.price)?.toFixed(2)}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center space-x-2 mb-3">
                    <div className="flex items-center">
                      {[...Array(5)]?.map((_, i) => (
                        <Icon
                          key={i}
                          name="Star"
                          size={12}
                          className={`${
                            i < Math.floor(item?.rating) 
                              ? 'text-yellow-400 fill-current' :'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-600">
                      {item?.rating} ({item?.reviews?.toLocaleString()})
                    </span>
                  </div>

                  {/* Stock Status */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <div className={`w-2 h-2 rounded-full ${item?.inStock ? 'bg-green-500' : 'bg-red-500'}`}></div>
                      <span className={`text-xs ${item?.inStock ? 'text-green-600' : 'text-red-600'}`}>
                        {item?.inStock ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col space-y-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveItem(item?.id)}
                    iconName="X"
                    className="text-gray-400 hover:text-red-500 transition-all duration-300 hover:scale-110"
                  />
                  
                  {item?.inStock && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleAddToCart(item)}
                      iconName="ShoppingCart"
                      className="text-gray-600 hover:text-primary transition-all duration-300 hover:scale-110"
                    />
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
      {savedItems?.length > 0 && (
        <motion.div 
          className="text-center mt-6 pt-4 border-t border-gray-200/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Button
            variant="outline"
            asChild
            className="transition-all duration-300 hover:scale-105 hover:shadow-soft"
          >
            <Link to="/wishlist">
              View Full Wishlist
            </Link>
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default SavedItems;