import React, { useEffect, useState } from 'react';
import { addToCart, getOrCreateCart } from '@/lib/cart-actions';
import { Product } from '@/lib/cart-actions'; 
import { createClient } from '@/supabase/server';
import { createBrowserClient } from '@supabase/ssr';
import '.././productos/productos.css';


interface ProductCardProps {
  product: Product;
  userId: string | null;
  onAddToCart: (productId: string) => void;
}

// Component to display a single product
function ProductCard({ product, userId, onAddToCart }: ProductCardProps) {
  const handleAddToCart = () => {
    onAddToCart(product.id);
  };

  return (
    <div className="product-card">
      <div className="product-image">
                <div className="image-placeholder">
                {product.image_url && (
          <img src={product.image_url} alt={product.name} />
        )}
                  <span>{product.name.split(" ")[0]}</span>
                </div>
              </div>
    
      <div className="product-details">
      <h2 className="product-title">{product.name}</h2>
      <p className="product-description">{product.description}</p>
      <div className="product-meta">
                  <div className="price-stock">
                    <span className="price">${product.price.toFixed(2)}</span>
                    <span className="stock">Stock: {product.stock}</span>
                  </div>

                  <div className="specs">
                    <div className="spec-item">
                      <span className="spec-label">Dimensiones:</span>
                      <span className="spec-value">
                        {product.ancho} x {product.alto} cm
                      </span>
                    </div>
                    <div className="spec-item">
                      <span className="spec-label">Material:</span>
                      <span className="spec-value">{product.material}</span>
                    </div>
                  </div>
                </div>
      </div>
      <div className="product-actions">

      <button
        onClick={handleAddToCart}
        className="btn-primary"
        disabled={product.stock <= 0}
      >
        {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
      </button>
      </div>
    </div>
  );
}

interface ProductListProps {
  userId: string | null;
}

// Component to display a list of products
export default function ProductList({ userId }: ProductListProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [supabase, setSupabase] = useState<any>(null);
  // Initialize data and cart
  useEffect(() => {
    async function initialize() {
      try {
        setIsLoading(true);
        
       const supabaseClient = createBrowserClient(
             process.env.NEXT_PUBLIC_SUPABASE_URL!,
             process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
           );
           
           setSupabase(supabaseClient);
      
        
        // Fetch products
        const { data: productsData, error: productsError } = await supabaseClient
          .from('products')
          .select('*')
          .order('name');
          
        if (productsError) throw productsError;
        setProducts(productsData);
        
        // Get or create user cart
        if (userId) {
          const userCart = await getOrCreateCart(userId);
          setCart(userCart);
        }
      } catch (error) {
        console.error('Error initializing data:', error);
      } finally {
        setIsLoading(false);
      }
    }
    
    initialize();
  }, [userId]);

  // Handle adding product to cart
  const handleAddToCart = async (productId: string) => {
    if (!userId) {
      // Handle not logged in case - could redirect to login or show a message
      alert('Please log in to add items to your cart');
      return;
    }
    
    try {
      // Ensure we have a cart
      let userCart = cart;
      if (!userCart) {
        userCart = await getOrCreateCart(userId);
        setCart(userCart);
      }
      
      // Add product to cart
      await addToCart(userCart.id, productId, 1);
      
      // Show success message or update cart indicator
      alert('Product added to cart!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add product to cart');
    }
  };

  if (isLoading) {
    return <div>Loading products...</div>;
  }

  return (
    <div className="products-container">
      <h2>Our Products</h2>
      
      {products.length > 0 ? (
        <div className="products-grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              userId={userId}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      ) : (
        <div className="no-products">
          <p>No products available</p>
        </div>
      )}
    </div>
  );
}