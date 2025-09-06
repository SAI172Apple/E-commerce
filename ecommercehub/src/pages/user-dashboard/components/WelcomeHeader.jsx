import React from 'react';
import { motion } from 'framer-motion';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const WelcomeHeader = ({ user, userProfile, onSignOut }) => {
  const getUserDisplayName = () => {
    if (userProfile?.full_name) {
      return userProfile?.full_name;
    }
    if (user?.user_metadata?.full_name) {
      return user?.user_metadata?.full_name;
    }
    if (user?.email) {
      return user?.email?.split('@')?.[0];
    }
    return 'Guest User';
  };

  const getUserRole = () => {
    if (userProfile?.role) {
      return userProfile?.role;
    }
    if (user?.user_metadata?.role) {
      return user?.user_metadata?.role;
    }
    return 'customer';
  };

  const getGreeting = () => {
    const hour = new Date()?.getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <motion.div 
      className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-elevated border border-white/50 p-6 md:p-8"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ scale: 1.01 }}
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        {/* Welcome Message */}
        <div className="flex items-center space-x-4">
          <motion.div 
            className="w-12 h-12 bg-gradient-to-br from-primary to-purple-600 rounded-full flex items-center justify-center shadow-soft"
            whileHover={{ rotate: 5, scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <Icon name="User" size={24} className="text-white" />
          </motion.div>
          
          <div>
            <motion.h1 
              className="text-2xl md:text-3xl font-bold text-gray-900"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              {getGreeting()}, {getUserDisplayName()}!
            </motion.h1>
            
            <motion.div 
              className="flex items-center space-x-2 mt-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <span className="text-gray-600 text-sm">
                {getUserRole() === 'admin' ? 'Administrator' : 'Customer'}
              </span>
              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
              <span className="text-gray-600 text-sm">
                Member since {new Date(user?.created_at)?.getFullYear()}
              </span>
            </motion.div>
          </div>
        </div>

        {/* Action Buttons */}
        <motion.div 
          className="flex items-center space-x-3"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Button
            variant="outline"
            size="sm"
            iconName="Settings"
            className="transition-all duration-300 hover:scale-105 hover:shadow-soft"
          >
            Settings
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onSignOut}
            iconName="LogOut"
            className="text-gray-600 hover:text-gray-900 transition-all duration-300 hover:scale-105"
          >
            Sign Out
          </Button>
        </motion.div>
      </div>
      {/* Status Indicators */}
      <motion.div 
        className="flex items-center space-x-6 mt-6 pt-6 border-t border-gray-200/50"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse-soft"></div>
          <span className="text-sm text-gray-600">Account Active</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <Icon name="Shield" size={14} className="text-green-500" />
          <span className="text-sm text-gray-600">Verified Account</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <Icon name="Star" size={14} className="text-yellow-500" />
          <span className="text-sm text-gray-600">
            {getUserRole() === 'admin' ? 'Premium Member' : 'Standard Member'}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default WelcomeHeader;