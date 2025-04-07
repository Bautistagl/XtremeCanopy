'use client'
import React, { useState, useEffect } from 'react';

import ProductList from './productComponent'; 
import ShoppingCart from './carritoComponent'; 
import { createClient } from '@/supabase/server';
import { createBrowserClient } from '@supabase/ssr';

export default function App() {
    const [userId, setUserId] = useState<string | null>(null);
    const [showCart, setShowCart] = useState<boolean>(false);
    const [cartItemCount, setCartItemCount] = useState<number>(0);
    const [supabase, setSupabase] = useState<any>(null);

  // Initialize Supabase client
  useEffect(() => {

    const supabaseClient = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    
    setSupabase(supabaseClient);
    
    // Set up auth listener after we have the client
    const { data: authListener } = supabaseClient.auth.onAuthStateChange(
      (event, session) => {
        if (session && session.user) {
          setUserId(session.user.id);
        } else {
          setUserId(null);
        }
      }
    );
    
    // Check session
    checkSession(supabaseClient);
    
    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);
  


  // Get initial session
  const checkSession = async (client: any) => {
    if (!client) return;
    
    const { data: { session } } = await client.auth.getSession();
    if (session && session.user) {
      setUserId(session.user.id);
    }
  };

  // Update cart item count - would be called after cart operations
  const updateCartCount = (count:number) => {
    setCartItemCount(count);
  };

  // Toggle cart visibility
  const toggleCart = () => {
    setShowCart(!showCart);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Online Store</h1>
        <div className="nav-actions">
          {userId ? (
            <>
              <button className="cart-button" onClick={toggleCart}>
                Cart ({cartItemCount})
              </button>
              <button 
                className="logout-button"
                onClick={() => supabase.auth.signOut()}
              >
                Logout
              </button>
            </>
          ) : (
            <button 
              className="login-button"
              onClick={() => {/* Show login UI */}}
            >
              Login
            </button>
          )}
        </div>
      </header>

      <main className="app-main">
        {showCart ? (
          <ShoppingCart 
            userId={userId} 
            onCartUpdate={updateCartCount} 
            onClose={toggleCart}
          />
        ) : (
          <ProductList userId={userId} />
        )}
      </main>

      <footer className="app-footer">
        <p>&copy; {new Date().getFullYear()} Your Store Name</p>
      </footer>
    </div>
  );
}