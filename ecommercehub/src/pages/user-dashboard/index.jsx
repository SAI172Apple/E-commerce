import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import Header from '../../components/ui/Header';
import WelcomeHeader from './components/WelcomeHeader';
import QuickActions from './components/QuickActions';
import OrderHistory from './components/OrderHistory';
import SavedItems from './components/SavedItems';
import AccountSettings from './components/AccountSettings';
import RecentActivity from './components/RecentActivity';
import LoadingDashboard from './components/LoadingDashboard';
import { useAuth } from '../../context/AuthContext';

const UserDashboard = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const navigate = useNavigate();
  const { user, userProfile, loading, profileLoading, signOut } = useAuth();

  useEffect(() => {
    // Redirect if not logged in
    if (!loading && !user) {
      navigate('/user-login');
    }
  }, [user, loading, navigate]);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/user-login');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  if (loading || profileLoading) {
    return <LoadingDashboard />;
  }

  if (!user) {
    return null;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>My Dashboard - EcommerceHub | Account Overview</title>
        <meta name="description" content="Manage your EcommerceHub account, view order history, track shipments, and access personalized shopping insights." />
        <meta name="keywords" content="account dashboard, order history, saved items, account settings, shopping preferences" />
        <meta property="og:title" content="My Dashboard - EcommerceHub" />
        <meta property="og:description" content="Your personalized shopping dashboard with account management and order insights" />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <Header />
        
        <main className="pt-16">
          <motion.div 
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Welcome Header */}
            <motion.div variants={itemVariants}>
              <WelcomeHeader 
                user={user}
                userProfile={userProfile}
                onSignOut={handleSignOut}
              />
            </motion.div>

            {/* Quick Actions */}
            <motion.div variants={itemVariants}>
              <QuickActions />
            </motion.div>

            {/* Main Dashboard Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
              {/* Left Column - Primary Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Order History Section */}
                <motion.div variants={itemVariants}>
                  <OrderHistory user={user} />
                </motion.div>

                {/* Recent Activity */}
                <motion.div variants={itemVariants}>
                  <RecentActivity user={user} />
                </motion.div>
              </div>

              {/* Right Column - Secondary Content */}
              <div className="lg:col-span-1 space-y-8">
                {/* Saved Items */}
                <motion.div variants={itemVariants}>
                  <SavedItems user={user} />
                </motion.div>

                {/* Account Settings */}
                <motion.div variants={itemVariants}>
                  <AccountSettings 
                    user={user}
                    userProfile={userProfile}
                  />
                </motion.div>
              </div>
            </div>

            {/* Mobile Navigation (hidden on desktop) */}
            <motion.div 
              className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm border-t border-white/50 px-4 py-2 z-50"
              variants={itemVariants}
            >
              <div className="flex justify-around">
                <button
                  onClick={() => setActiveSection('orders')}
                  className={`flex flex-col items-center py-2 px-4 text-sm transition-all duration-200 ${
                    activeSection === 'orders' ?'text-primary font-semibold' :'text-gray-600'
                  }`}
                >
                  <span className="text-lg mb-1">📦</span>
                  Orders
                </button>
                <button
                  onClick={() => setActiveSection('saved')}
                  className={`flex flex-col items-center py-2 px-4 text-sm transition-all duration-200 ${
                    activeSection === 'saved' ?'text-primary font-semibold' :'text-gray-600'
                  }`}
                >
                  <span className="text-lg mb-1">❤️</span>
                  Saved
                </button>
                <button
                  onClick={() => setActiveSection('account')}
                  className={`flex flex-col items-center py-2 px-4 text-sm transition-all duration-200 ${
                    activeSection === 'account' ?'text-primary font-semibold' :'text-gray-600'
                  }`}
                >
                  <span className="text-lg mb-1">⚙️</span>
                  Account
                </button>
              </div>
            </motion.div>
          </motion.div>
        </main>

        {/* Enhanced Footer */}
        <motion.footer 
          className="bg-white/70 backdrop-blur-sm border-t border-white/50 py-8 mt-16"
          variants={itemVariants}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
                <Link to="/privacy" className="hover:text-foreground transition-smooth hover:scale-105 transform">
                  Privacy Policy
                </Link>
                <Link to="/terms" className="hover:text-foreground transition-smooth hover:scale-105 transform">
                  Terms of Service
                </Link>
                <Link to="/help" className="hover:text-foreground transition-smooth hover:scale-105 transform">
                  Help Center
                </Link>
                <Link to="/contact" className="hover:text-foreground transition-smooth hover:scale-105 transform">
                  Contact Us
                </Link>
              </div>
              
              <div className="text-sm text-muted-foreground">
                <p>&copy; {new Date()?.getFullYear()} EcommerceHub. All rights reserved.</p>
                <p className="mt-1">Your trusted partner for seamless online shopping experiences.</p>
              </div>
            </div>
          </div>
        </motion.footer>
      </div>
    </>
  );
};

export default UserDashboard;