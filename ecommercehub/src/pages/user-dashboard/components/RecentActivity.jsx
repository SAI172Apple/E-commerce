import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const RecentActivity = ({ user }) => {
  const activities = [
    {
      id: 1,
      type: 'order',
      title: 'Order placed',
      description: 'Smart Watch - Order #ORD-2024-003',
      timestamp: '2 hours ago',
      icon: 'ShoppingBag',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      id: 2,
      type: 'save',
      title: 'Item saved',
      description: 'Added Premium Wireless Earbuds to wishlist',
      timestamp: '5 hours ago',
      icon: 'Heart',
      color: 'text-red-600',
      bgColor: 'bg-red-100'
    },
    {
      id: 3,
      type: 'delivery',
      title: 'Order delivered',
      description: 'Bluetooth Speaker - Order #ORD-2024-002',
      timestamp: '1 day ago',
      icon: 'CheckCircle',
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      id: 4,
      type: 'review',
      title: 'Review submitted',
      description: 'Reviewed Premium Wireless Headphones (5 stars)',
      timestamp: '2 days ago',
      icon: 'Star',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100'
    },
    {
      id: 5,
      type: 'profile',
      title: 'Profile updated',
      description: 'Updated shipping address',
      timestamp: '3 days ago',
      icon: 'User',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      id: 6,
      type: 'cart',
      title: 'Cart updated',
      description: 'Added 2 items to shopping cart',
      timestamp: '4 days ago',
      icon: 'ShoppingCart',
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
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
        Recent Activity
      </motion.h2>
      <div className="space-y-4">
        {activities?.slice(0, 5)?.map((activity, index) => (
          <motion.div
            key={activity?.id}
            className="flex items-start space-x-4 p-3 hover:bg-gray-50/60 rounded-lg transition-all duration-300 group cursor-pointer"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * index + 0.3, duration: 0.5 }}
            whileHover={{ x: 5, scale: 1.01 }}
          >
            {/* Activity Icon */}
            <motion.div 
              className={`w-10 h-10 ${activity?.bgColor} rounded-full flex items-center justify-center flex-shrink-0`}
              whileHover={{ rotate: 5, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <Icon name={activity?.icon} size={18} className={activity?.color} />
            </motion.div>

            {/* Activity Details */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-gray-900 text-sm group-hover:text-primary transition-colors">
                  {activity?.title}
                </h3>
                <span className="text-xs text-gray-500 flex-shrink-0">
                  {activity?.timestamp}
                </span>
              </div>
              
              <p className="text-sm text-gray-600 mt-1">
                {activity?.description}
              </p>
            </div>

            {/* Activity Status Indicator */}
            <div className="flex items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full opacity-60"></div>
            </div>
          </motion.div>
        ))}
      </div>
      {/* View All Activities Link */}
      <motion.div 
        className="text-center mt-6 pt-4 border-t border-gray-200/50"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <button className="text-sm text-primary hover:text-primary/80 font-medium transition-all duration-300 hover:scale-105 transform">
          View All Activity ({activities?.length})
        </button>
      </motion.div>
      {/* Activity Summary */}
      <motion.div 
        className="mt-4 grid grid-cols-3 gap-4 p-4 bg-gray-50/60 rounded-xl"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.9, duration: 0.5 }}
      >
        <div className="text-center">
          <div className="text-lg font-bold text-blue-600">3</div>
          <div className="text-xs text-gray-600">Orders This Month</div>
        </div>
        
        <div className="text-center">
          <div className="text-lg font-bold text-green-600">2</div>
          <div className="text-xs text-gray-600">Items Delivered</div>
        </div>
        
        <div className="text-center">
          <div className="text-lg font-bold text-red-600">5</div>
          <div className="text-xs text-gray-600">Wishlist Items</div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default RecentActivity;