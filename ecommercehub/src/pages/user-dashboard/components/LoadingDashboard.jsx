import React from 'react';
import { motion } from 'framer-motion';
import Header from '../../../components/ui/Header';

const LoadingDashboard = () => {
  const shimmerVariants = {
    initial: { x: '-100%' },
    animate: {
      x: '100%',
      transition: {
        repeat: Infinity,
        repeatType: 'loop',
        duration: 2,
        ease: 'easeInOut'
      }
    }
  };

  const SkeletonCard = ({ height = 'h-32', className = '' }) => (
    <motion.div 
      className={`bg-white/80 backdrop-blur-sm rounded-2xl border border-white/50 p-6 ${height} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent">
          <motion.div
            className="h-full w-full bg-gradient-to-r from-transparent via-white/40 to-transparent"
            variants={shimmerVariants}
            initial="initial"
            animate="animate"
          />
        </div>
        <div className="space-y-3">
          <div className="h-4 bg-gray-200/60 rounded-lg w-3/4"></div>
          <div className="h-3 bg-gray-200/60 rounded-lg w-1/2"></div>
          <div className="h-3 bg-gray-200/60 rounded-lg w-2/3"></div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Loading Welcome Header */}
          <motion.div 
            className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-elevated border border-white/50 p-6 md:p-8 mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gray-200/60 rounded-full relative overflow-hidden">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                    variants={shimmerVariants}
                    initial="initial"
                    animate="animate"
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="h-6 bg-gray-200/60 rounded-lg w-48 relative overflow-hidden">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                      variants={shimmerVariants}
                      initial="initial"
                      animate="animate"
                    />
                  </div>
                  <div className="h-4 bg-gray-200/60 rounded-lg w-32 relative overflow-hidden">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                      variants={shimmerVariants}
                      initial="initial"
                      animate="animate"
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <div className="h-8 w-20 bg-gray-200/60 rounded-lg relative overflow-hidden">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                    variants={shimmerVariants}
                    initial="initial"
                    animate="animate"
                  />
                </div>
                <div className="h-8 w-20 bg-gray-200/60 rounded-lg relative overflow-hidden">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                    variants={shimmerVariants}
                    initial="initial"
                    animate="animate"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Loading Quick Actions */}
          <SkeletonCard height="h-40" className="mb-8" />

          {/* Loading Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              <SkeletonCard height="h-64" />
              <SkeletonCard height="h-48" />
            </div>

            {/* Right Column */}
            <div className="lg:col-span-1 space-y-8">
              <SkeletonCard height="h-56" />
              <SkeletonCard height="h-40" />
            </div>
          </div>

          {/* Loading State Message */}
          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
              className="inline-block w-6 h-6 border-2 border-primary border-t-transparent rounded-full mb-4"
            />
            <p className="text-gray-600 text-sm">Loading your dashboard...</p>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default LoadingDashboard;