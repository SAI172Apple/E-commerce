-- Location: supabase/migrations/20250906060000_ecommerce_user_dashboard.sql
-- Schema Analysis: Creating new user dashboard integration for e-commerce platform
-- Integration Type: addition - adding user authentication and dashboard features
-- Dependencies: auth.users (Supabase built-in authentication)

-- 1. Create custom types
CREATE TYPE public.user_role AS ENUM ('admin', 'customer', 'premium');
CREATE TYPE public.order_status AS ENUM ('pending', 'processing', 'shipped', 'delivered', 'cancelled');
CREATE TYPE public.payment_status AS ENUM ('pending', 'paid', 'failed', 'refunded');

-- 2. Create user_profiles table (intermediary for auth.users)
CREATE TABLE public.user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL UNIQUE,
    full_name TEXT,
    role public.user_role DEFAULT 'customer'::public.user_role,
    avatar_url TEXT,
    phone TEXT,
    is_active BOOLEAN DEFAULT true,
    preferences JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 3. Create addresses table
CREATE TABLE public.addresses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    label TEXT DEFAULT 'Home',
    street_address TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    postal_code TEXT NOT NULL,
    country TEXT DEFAULT 'USA',
    is_default BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 4. Create orders table
CREATE TABLE public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    order_number TEXT UNIQUE NOT NULL,
    status public.order_status DEFAULT 'pending'::public.order_status,
    payment_status public.payment_status DEFAULT 'pending'::public.payment_status,
    subtotal DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    tax_amount DECIMAL(10,2) DEFAULT 0.00,
    shipping_amount DECIMAL(10,2) DEFAULT 0.00,
    total_amount DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    currency TEXT DEFAULT 'USD',
    shipping_address JSONB,
    billing_address JSONB,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 5. Create order_items table
CREATE TABLE public.order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
    product_id UUID, -- Reference to products if they exist
    product_name TEXT NOT NULL,
    product_sku TEXT,
    quantity INTEGER NOT NULL DEFAULT 1,
    unit_price DECIMAL(10,2) NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    product_data JSONB, -- Store product snapshot
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 6. Create saved_items table (wishlist)
CREATE TABLE public.saved_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    product_id UUID, -- Reference to products if they exist
    product_name TEXT NOT NULL,
    product_price DECIMAL(10,2),
    product_image_url TEXT,
    product_data JSONB, -- Store product snapshot
    saved_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 7. Create user_activity table
CREATE TABLE public.user_activity (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    activity_type TEXT NOT NULL, -- 'order', 'save', 'delivery', 'review', 'profile', 'cart'
    activity_title TEXT NOT NULL,
    activity_description TEXT,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 8. Create essential indexes
CREATE INDEX idx_user_profiles_email ON public.user_profiles(email);
CREATE INDEX idx_user_profiles_role ON public.user_profiles(role);
CREATE INDEX idx_addresses_user_id ON public.addresses(user_id);
CREATE INDEX idx_addresses_is_default ON public.addresses(user_id, is_default);
CREATE INDEX idx_orders_user_id ON public.orders(user_id);
CREATE INDEX idx_orders_status ON public.orders(status);
CREATE INDEX idx_orders_created_at ON public.orders(created_at DESC);
CREATE INDEX idx_order_items_order_id ON public.order_items(order_id);
CREATE INDEX idx_saved_items_user_id ON public.saved_items(user_id);
CREATE INDEX idx_user_activity_user_id ON public.user_activity(user_id, created_at DESC);

-- 9. Create functions for automatic profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
SECURITY DEFINER
LANGUAGE plpgsql
AS $$
BEGIN
  INSERT INTO public.user_profiles (id, email, full_name, role)
  VALUES (
    NEW.id, 
    NEW.email, 
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'role', 'customer')::public.user_role
  );
  RETURN NEW;
END;
$$;

-- 10. Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$;

-- 11. Enable RLS on all tables
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_activity ENABLE ROW LEVEL SECURITY;

-- 12. Create RLS policies using safe patterns

-- Pattern 1: Core user table (user_profiles) - Simple only, no functions
CREATE POLICY "users_manage_own_profile"
ON public.user_profiles
FOR ALL
TO authenticated
USING (id = auth.uid())
WITH CHECK (id = auth.uid());

-- Pattern 2: Simple user ownership for other tables
CREATE POLICY "users_manage_own_addresses"
ON public.addresses
FOR ALL
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

CREATE POLICY "users_manage_own_orders"
ON public.orders
FOR ALL
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

CREATE POLICY "users_view_own_order_items"
ON public.order_items
FOR SELECT
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM public.orders o
        WHERE o.id = order_id AND o.user_id = auth.uid()
    )
);

CREATE POLICY "users_manage_own_saved_items"
ON public.saved_items
FOR ALL
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

CREATE POLICY "users_manage_own_activity"
ON public.user_activity
FOR ALL
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- 13. Create triggers
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON public.user_profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_addresses_updated_at
  BEFORE UPDATE ON public.addresses
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON public.orders
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 14. Create mock data
DO $$
DECLARE
    user1_id UUID := gen_random_uuid();
    user2_id UUID := gen_random_uuid();
    admin_id UUID := gen_random_uuid();
    order1_id UUID := gen_random_uuid();
    order2_id UUID := gen_random_uuid();
    order3_id UUID := gen_random_uuid();
BEGIN
    -- Create auth users with complete required fields
    INSERT INTO auth.users (
        id, instance_id, aud, role, email, encrypted_password, email_confirmed_at,
        created_at, updated_at, raw_user_meta_data, raw_app_meta_data,
        is_sso_user, is_anonymous, confirmation_token, confirmation_sent_at,
        recovery_token, recovery_sent_at, email_change_token_new, email_change,
        email_change_sent_at, email_change_token_current, email_change_confirm_status,
        reauthentication_token, reauthentication_sent_at, phone, phone_change,
        phone_change_token, phone_change_sent_at
    ) VALUES
        (user1_id, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'john.doe@example.com', crypt('password123', gen_salt('bf', 10)), now(), now(), now(),
         '{"full_name": "John Doe"}'::jsonb, '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null),
        (user2_id, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'sarah.wilson@example.com', crypt('secure456', gen_salt('bf', 10)), now(), now(), now(),
         '{"full_name": "Sarah Wilson"}'::jsonb, '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null),
        (admin_id, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'admin@ecommercehub.com', crypt('admin2024', gen_salt('bf', 10)), now(), now(), now(),
         '{"full_name": "Admin User", "role": "admin"}'::jsonb, '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null);

    -- Create addresses
    INSERT INTO public.addresses (user_id, label, street_address, city, state, postal_code, is_default)
    VALUES
        (user1_id, 'Home', '123 Main Street', 'New York', 'NY', '10001', true),
        (user1_id, 'Office', '456 Business Ave', 'New York', 'NY', '10002', false),
        (user2_id, 'Home', '789 Oak Street', 'Los Angeles', 'CA', '90210', true);

    -- Create orders with proper order numbers
    INSERT INTO public.orders (id, user_id, order_number, status, payment_status, subtotal, tax_amount, shipping_amount, total_amount, shipping_address)
    VALUES
        (order1_id, user1_id, 'ORD-2024-001', 'delivered', 'paid', 109.98, 8.80, 11.21, 129.99, 
         '{"street": "123 Main Street", "city": "New York", "state": "NY", "zip": "10001"}'::jsonb),
        (order2_id, user2_id, 'ORD-2024-002', 'shipped', 'paid', 79.99, 6.40, 0.00, 86.39,
         '{"street": "789 Oak Street", "city": "Los Angeles", "state": "CA", "zip": "90210"}'::jsonb),
        (order3_id, user1_id, 'ORD-2024-003', 'processing', 'paid', 199.99, 16.00, 0.00, 215.99,
         '{"street": "123 Main Street", "city": "New York", "state": "NY", "zip": "10001"}'::jsonb);

    -- Create order items
    INSERT INTO public.order_items (order_id, product_name, product_sku, quantity, unit_price, total_price, product_data)
    VALUES
        (order1_id, 'Premium Wireless Headphones', 'PWH-001', 1, 89.99, 89.99, 
         '{"brand": "TechSound", "color": "Black", "rating": 4.5}'::jsonb),
        (order1_id, 'USB-C Cable', 'USBC-002', 2, 9.99, 19.99,
         '{"length": "6ft", "color": "White"}'::jsonb),
        (order2_id, 'Bluetooth Speaker', 'BTS-003', 1, 79.99, 79.99,
         '{"brand": "AudioMax", "color": "Blue", "waterproof": true}'::jsonb),
        (order3_id, 'Smart Watch', 'SW-004', 1, 199.99, 199.99,
         '{"brand": "FitTech", "color": "Silver", "features": ["GPS", "Heart Rate"]}'::jsonb);

    -- Create saved items (wishlist)
    INSERT INTO public.saved_items (user_id, product_name, product_price, product_data)
    VALUES
        (user1_id, 'Premium Wireless Earbuds', 149.99, 
         '{"brand": "AudioPro", "color": "Black", "battery": "8 hours", "rating": 4.5, "reviews": 1248}'::jsonb),
        (user1_id, 'Smart Fitness Tracker', 89.99,
         '{"brand": "FitLife", "features": ["Heart Rate", "Sleep Tracking"], "rating": 4.3, "reviews": 892}'::jsonb),
        (user2_id, 'Portable Bluetooth Speaker', 79.99,
         '{"brand": "SoundWave", "waterproof": true, "battery": "12 hours", "rating": 4.7, "reviews": 2156}'::jsonb);

    -- Create user activity
    INSERT INTO public.user_activity (user_id, activity_type, activity_title, activity_description, metadata)
    VALUES
        (user1_id, 'order', 'Order placed', 'Smart Watch - Order #ORD-2024-003', 
         '{"order_id": "' || order3_id || '", "amount": 215.99}'::jsonb),
        (user1_id, 'save', 'Item saved', 'Added Premium Wireless Earbuds to wishlist',
         '{"product": "Premium Wireless Earbuds", "price": 149.99}'::jsonb),
        (user2_id, 'delivery', 'Order delivered', 'Bluetooth Speaker - Order #ORD-2024-002',
         '{"order_id": "' || order2_id || '", "delivered_date": "2024-09-04"}'::jsonb),
        (user1_id, 'review', 'Review submitted', 'Reviewed Premium Wireless Headphones (5 stars)',
         '{"product": "Premium Wireless Headphones", "rating": 5}'::jsonb),
        (user2_id, 'profile', 'Profile updated', 'Updated shipping address',
         '{"updated_fields": ["address"]}'::jsonb);

EXCEPTION
    WHEN foreign_key_violation THEN
        RAISE NOTICE 'Foreign key error: %', SQLERRM;
    WHEN unique_violation THEN
        RAISE NOTICE 'Unique constraint error: %', SQLERRM;
    WHEN OTHERS THEN
        RAISE NOTICE 'Unexpected error: %', SQLERRM;
END $$;

-- 15. Create cleanup function for development
CREATE OR REPLACE FUNCTION public.cleanup_test_data()
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    auth_user_ids_to_delete UUID[];
BEGIN
    -- Get auth user IDs from test accounts
    SELECT ARRAY_AGG(id) INTO auth_user_ids_to_delete
    FROM auth.users
    WHERE email IN ('john.doe@example.com', 'sarah.wilson@example.com', 'admin@ecommercehub.com');

    -- Delete in dependency order (children first)
    DELETE FROM public.user_activity WHERE user_id = ANY(auth_user_ids_to_delete);
    DELETE FROM public.saved_items WHERE user_id = ANY(auth_user_ids_to_delete);
    DELETE FROM public.order_items WHERE order_id IN (
        SELECT id FROM public.orders WHERE user_id = ANY(auth_user_ids_to_delete)
    );
    DELETE FROM public.orders WHERE user_id = ANY(auth_user_ids_to_delete);
    DELETE FROM public.addresses WHERE user_id = ANY(auth_user_ids_to_delete);
    DELETE FROM public.user_profiles WHERE id = ANY(auth_user_ids_to_delete);
    
    -- Delete auth.users last
    DELETE FROM auth.users WHERE id = ANY(auth_user_ids_to_delete);
    
    RAISE NOTICE 'Test data cleanup completed';
EXCEPTION
    WHEN foreign_key_violation THEN
        RAISE NOTICE 'Foreign key constraint prevents deletion: %', SQLERRM;
    WHEN OTHERS THEN
        RAISE NOTICE 'Cleanup failed: %', SQLERRM;
END;
$$;