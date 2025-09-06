import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import Header from '../../components/ui/Header';
import LoginForm from './components/LoginForm';
import LoginHeader from './components/LoginHeader';
import SecurityBadges from './components/SecurityBadges';
import SocialLoginButtons from './components/SocialLoginButtons';
import { useAuth } from '../../context/AuthContext';

const UserLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { user, signIn, signInWithOAuth } = useAuth();

  useEffect(() => {
    // Redirect if already logged in
    if (user) {
      navigate('/user-dashboard');
    }
  }, [user, navigate]);

  const handleLogin = async (formData) => {
    setIsLoading(true);
    
    try {
      const { data, error } = await signIn(formData?.email, formData?.password);
      
      if (error) {
        throw new Error(error?.message || 'Login failed');
      }

      if (data?.user) {
        // Restore cart data if exists
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
          console.log('Cart data restored for user:', data?.user?.email);
        }
        
        navigate('/user-dashboard');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error; // Re-throw for form handling
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider) => {
    try {
      const { error } = await signInWithOAuth(provider);
      if (error) {
        console.error(`${provider} login error:`, error);
        throw error;
      }
    } catch (error) {
      console.error('Social login error:', error);
    }
  };

  return (
    <>
      <Helmet>
        <title>Sign In - EcommerceHub | Secure Customer Login</title>
        <meta name="description" content="Sign in to your EcommerceHub account to access your saved cart, order history, and personalized shopping experience. Secure authentication with SSL encryption." />
        <meta name="keywords" content="login, sign in, customer account, secure authentication, shopping cart, order history" />
        <meta property="og:title" content="Sign In - EcommerceHub" />
        <meta property="og:description" content="Access your personalized shopping experience with secure login" />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <Header />
        
        <main className="pt-16">
          <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12">
            <motion.div 
              className="w-full max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <motion.div 
                className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-elevated border border-white/50 p-8 hover:shadow-glass transition-all duration-500"
                whileHover={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <LoginHeader />
                
                <div className="space-y-6">
                  <LoginForm 
                    onLogin={handleLogin}
                    isLoading={isLoading}
                  />
                  
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-white text-gray-500">Or continue with</span>
                    </div>
                  </div>
                  
                  <SocialLoginButtons 
                    onSocialLogin={handleSocialLogin}
                    isLoading={isLoading}
                  />
                </div>
                
                <SecurityBadges />
              </motion.div>
            </motion.div>
          </div>
        </main>

        {/* Enhanced Footer */}
        <motion.footer 
          className="bg-white/70 backdrop-blur-sm border-t border-white/50 py-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
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
                <Link to="/security" className="hover:text-foreground transition-smooth hover:scale-105 transform">
                  Security
                </Link>
                <Link to="/support" className="hover:text-foreground transition-smooth hover:scale-105 transform">
                  Support
                </Link>
              </div>
              
              <div className="text-sm text-muted-foreground">
                <p>&copy; {new Date()?.getFullYear()} EcommerceHub. All rights reserved.</p>
                <p className="mt-1">Secure shopping experience powered by advanced encryption technology.</p>
              </div>
            </div>
          </div>
        </motion.footer>
      </div>
    </>
  );
};

export default UserLogin;