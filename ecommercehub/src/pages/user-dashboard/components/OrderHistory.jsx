import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const OrderHistory = ({ user }) => {
  const [showAll, setShowAll] = useState(false);

  // Mock order data
  const orders = [
    {
      id: 'ORD-2024-001',
      date: '2024-09-05',
      status: 'delivered',
      total: 129.99,
      items: [
        { name: 'Premium Wireless Headphones', price: 89.99, quantity: 1, image: '/api/placeholder/60/60' },
        { name: 'USB-C Cable', price: 19.99, quantity: 2, image: '/api/placeholder/60/60' }
      ]
    },
    {
      id: 'ORD-2024-002',
      date: '2024-09-03',
      status: 'shipped',
      total: 79.99,
      items: [
        { name: 'Bluetooth Speaker', price: 79.99, quantity: 1, image: '/api/placeholder/60/60' }
      ]
    },
    {
      id: 'ORD-2024-003',
      date: '2024-09-01',
      status: 'processing',
      total: 199.99,
      items: [
        { name: 'Smart Watch', price: 199.99, quantity: 1, image: '/api/placeholder/60/60' }
      ]
    },
    {
      id: 'ORD-2024-004',
      date: '2024-08-28',
      status: 'delivered',
      total: 45.99,
      items: [
        { name: 'Phone Case', price: 25.99, quantity: 1, image: '/api/placeholder/60/60' },
        { name: 'Screen Protector', price: 19.99, quantity: 1, image: '/api/placeholder/60/60' }
      ]
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-800 border-green-200';
      case 'shipped': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'processing': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered': return 'CheckCircle';
      case 'shipped': return 'Truck';
      case 'processing': return 'Clock';
      default: return 'Package';
    }
  };

  const displayedOrders = showAll ? orders : orders?.slice(0, 2);

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
          Recent Orders
        </motion.h2>
        
        <Button
          variant="ghost"
          size="sm"
          iconName="ExternalLink"
          className="text-primary hover:text-primary/80 transition-all duration-300 hover:scale-105"
        >
          View All
        </Button>
      </div>
      <div className="space-y-4">
        {displayedOrders?.map((order, index) => (
          <motion.div
            key={order?.id}
            className="border border-gray-200/60 rounded-xl p-4 hover:shadow-soft transition-all duration-300 bg-white/60 backdrop-blur-sm"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * index, duration: 0.5 }}
            whileHover={{ x: 5, scale: 1.01 }}
          >
            {/* Order Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <motion.div 
                  className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center"
                  whileHover={{ rotate: 5, scale: 1.1 }}
                >
                  <Icon name={getStatusIcon(order?.status)} size={16} className="text-primary" />
                </motion.div>
                
                <div>
                  <h3 className="font-medium text-gray-900">{order?.id}</h3>
                  <p className="text-sm text-gray-600">
                    {new Date(order?.date)?.toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
              
              <div className="text-right">
                <div className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(order?.status)}`}>
                  {order?.status?.charAt(0)?.toUpperCase() + order?.status?.slice(1)}
                </div>
                <p className="text-sm font-semibold text-gray-900 mt-1">${order?.total}</p>
              </div>
            </div>

            {/* Order Items */}
            <div className="space-y-2">
              {order?.items?.slice(0, 2)?.map((item, itemIndex) => (
                <motion.div 
                  key={itemIndex}
                  className="flex items-center space-x-3 p-2 bg-gray-50/50 rounded-lg"
                  whileHover={{ backgroundColor: 'rgba(243, 244, 246, 0.8)' }}
                >
                  <div className="w-10 h-10 bg-gray-200 rounded-lg flex-shrink-0"></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{item?.name}</p>
                    <p className="text-xs text-gray-600">Qty: {item?.quantity} • ${item?.price}</p>
                  </div>
                </motion.div>
              ))}
              
              {order?.items?.length > 2 && (
                <p className="text-xs text-gray-600 text-center py-1">
                  +{order?.items?.length - 2} more items
                </p>
              )}
            </div>

            {/* Order Actions */}
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-200/50">
              <div className="flex space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Eye"
                  className="text-gray-600 hover:text-gray-900 transition-all duration-300 hover:scale-105"
                >
                  View
                </Button>
                
                {order?.status === 'delivered' && (
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="RotateCcw"
                    className="text-gray-600 hover:text-gray-900 transition-all duration-300 hover:scale-105"
                  >
                    Reorder
                  </Button>
                )}
              </div>
              
              {order?.status === 'shipped' && (
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="MapPin"
                  className="text-primary hover:text-primary/80 transition-all duration-300 hover:scale-105"
                >
                  Track
                </Button>
              )}
            </div>
          </motion.div>
        ))}
      </div>
      {orders?.length > 2 && (
        <motion.div 
          className="text-center mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Button
            variant="outline"
            onClick={() => setShowAll(!showAll)}
            className="transition-all duration-300 hover:scale-105 hover:shadow-soft"
          >
            {showAll ? 'Show Less' : `View ${orders?.length - 2} More Orders`}
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default OrderHistory;