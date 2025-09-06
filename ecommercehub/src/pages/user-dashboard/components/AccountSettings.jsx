import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const AccountSettings = ({ user, userProfile }) => {
  const settingsOptions = [
    {
      title: 'Profile Information',
      description: 'Update your personal details',
      icon: 'User',
      href: '/profile',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Address Book',
      description: 'Manage shipping addresses',
      icon: 'MapPin',
      href: '/addresses',
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Payment Methods',
      description: 'Manage cards and payment options',
      icon: 'CreditCard',
      href: '/payment-methods',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      title: 'Notifications',
      description: 'Email and push preferences',
      icon: 'Bell',
      href: '/notifications',
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    },
    {
      title: 'Privacy & Security',
      description: 'Password and security settings',
      icon: 'Shield',
      href: '/security',
      color: 'text-red-600',
      bgColor: 'bg-red-100'
    }
  ];

  const accountStats = [
    {
      label: 'Account Status',
      value: 'Active',
      icon: 'CheckCircle',
      color: 'text-green-600'
    },
    {
      label: 'Member Since',
      value: new Date(user?.created_at)?.getFullYear() || '2024',
      icon: 'Calendar',
      color: 'text-blue-600'
    },
    {
      label: 'Total Orders',
      value: '12',
      icon: 'Package',
      color: 'text-purple-600'
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
        Account Settings
      </motion.h2>
      {/* Account Statistics */}
      <motion.div 
        className="grid grid-cols-3 gap-3 mb-6 p-4 bg-gray-50/60 rounded-xl"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        {accountStats?.map((stat, index) => (
          <motion.div 
            key={stat?.label}
            className="text-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 * index + 0.4, duration: 0.4 }}
          >
            <div className="flex items-center justify-center mb-1">
              <Icon name={stat?.icon} size={14} className={stat?.color} />
            </div>
            <div className="text-sm font-semibold text-gray-900">{stat?.value}</div>
            <div className="text-xs text-gray-600">{stat?.label}</div>
          </motion.div>
        ))}
      </motion.div>
      {/* Settings Options */}
      <div className="space-y-3">
        {settingsOptions?.map((option, index) => (
          <motion.div
            key={option?.title}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * index + 0.5, duration: 0.4 }}
            whileHover={{ x: 5, scale: 1.02 }}
          >
            <Link
              to={option?.href}
              className="block group"
            >
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50/60 transition-all duration-300 border border-transparent hover:border-gray-200/60">
                <motion.div 
                  className={`w-8 h-8 ${option?.bgColor} rounded-full flex items-center justify-center`}
                  whileHover={{ rotate: 5, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <Icon name={option?.icon} size={16} className={option?.color} />
                </motion.div>
                
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 text-sm group-hover:text-primary transition-colors">
                    {option?.title}
                  </h3>
                  <p className="text-xs text-gray-600">{option?.description}</p>
                </div>
                
                <Icon 
                  name="ChevronRight" 
                  size={16} 
                  className="text-gray-400 group-hover:text-gray-600 transition-all duration-300 group-hover:translate-x-1" 
                />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
      {/* Quick Actions */}
      <motion.div 
        className="mt-6 pt-4 border-t border-gray-200/50"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            size="sm"
            iconName="Download"
            className="transition-all duration-300 hover:scale-105 hover:shadow-soft"
          >
            Export Data
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            iconName="MessageCircle"
            className="transition-all duration-300 hover:scale-105 hover:shadow-soft"
          >
            Contact Support
          </Button>
        </div>
      </motion.div>
      {/* Account Health Indicator */}
      <motion.div 
        className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.9, duration: 0.5 }}
        whileHover={{ scale: 1.02 }}
      >
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse-soft"></div>
          <span className="text-sm text-green-800 font-medium">Account Health: Excellent</span>
        </div>
        <p className="text-xs text-green-700 mt-1">
          All security features are active and your account is fully protected.
        </p>
      </motion.div>
    </motion.div>
  );
};

export default AccountSettings;