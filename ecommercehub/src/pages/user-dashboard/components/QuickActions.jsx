import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import Icon from '../../../components/AppIcon';

const QuickActions = () => {
  const actions = [
    {
      title: 'Shop Now',
      description: 'Browse our latest products',
      icon: 'ShoppingBag',
      href: '/product-catalog',
      color: 'from-blue-500 to-blue-600',
      hoverColor: 'hover:from-blue-600 hover:to-blue-700'
    },
    {
      title: 'View Cart',
      description: 'Review your selected items',
      icon: 'ShoppingCart',
      href: '/shopping-cart',
      color: 'from-green-500 to-green-600',
      hoverColor: 'hover:from-green-600 hover:to-green-700'
    },
    {
      title: 'Track Orders',
      description: 'Monitor your deliveries',
      icon: 'Truck',
      href: '/orders',
      color: 'from-orange-500 to-orange-600',
      hoverColor: 'hover:from-orange-600 hover:to-orange-700'
    },
    {
      title: 'Support',
      description: 'Get help when you need it',
      icon: 'MessageCircle',
      href: '/support',
      color: 'from-purple-500 to-purple-600',
      hoverColor: 'hover:from-purple-600 hover:to-purple-700'
    }
  ];

  return (
    <motion.div 
      className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-elevated border border-white/50 p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ scale: 1.005 }}
    >
      <motion.h2 
        className="text-xl font-semibold text-gray-900 mb-6"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        Quick Actions
      </motion.h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {actions?.map((action, index) => (
          <motion.div
            key={action?.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index, duration: 0.5 }}
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to={action?.href}
              className="block group"
            >
              <div className={`bg-gradient-to-br ${action?.color} ${action?.hoverColor} rounded-xl p-4 text-white shadow-soft transition-all duration-300 group-hover:shadow-elevated`}>
                <motion.div 
                  className="flex flex-col items-center space-y-3"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <Icon name={action?.icon} size={20} className="text-white" />
                  </div>
                  
                  <div className="text-center">
                    <h3 className="font-semibold text-sm">{action?.title}</h3>
                    <p className="text-xs opacity-90 mt-1">{action?.description}</p>
                  </div>
                </motion.div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
      {/* Additional Quick Stats */}
      <motion.div 
        className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-200/50"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">12</div>
          <div className="text-xs text-gray-600">Total Orders</div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">$1,248</div>
          <div className="text-xs text-gray-600">Total Spent</div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">5</div>
          <div className="text-xs text-gray-600">Saved Items</div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default QuickActions;