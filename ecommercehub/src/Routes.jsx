import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import ShoppingCart from './pages/shopping-cart';
import UserLogin from './pages/user-login';
import ProductCatalog from './pages/product-catalog';
import ProductDetails from './pages/product-details';
import UserRegistration from './pages/user-registration';
import UserDashboard from './pages/user-dashboard';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<ProductCatalog />} />
        <Route path="/shopping-cart" element={<ShoppingCart />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/product-catalog" element={<ProductCatalog />} />
        <Route path="/product-details" element={<ProductDetails />} />
        <Route path="/user-registration" element={<UserRegistration />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;