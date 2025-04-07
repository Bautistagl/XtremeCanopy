import React, { useEffect, useState } from 'react';
import { 
  getOrCreateCart, 
  getCartContents, 
  addToCart, 
  updateCartItemQuantity, 
  removeFromCart, 
  clearCart,
  CartContents
} from '../../lib/cart-actions'; 
import '.././productos/productos.css';

interface ShoppingCartProps {
    userId: string | null;
    onCartUpdate?: (itemCount: number) => void;
    onClose?: () => void;
  }

  export default function ShoppingCart({ userId, onCartUpdate, onClose }: ShoppingCartProps) {
    const [cart, setCart] = useState<any>(null);
    const [cartItems, setCartItems] = useState<CartContents>({
      items: [],
      total: 0,
      item_count: 0,
      product_count: 0
    });
  const [isLoading, setIsLoading] = useState(true);

  // Initialize cart
  useEffect(() => {
    async function initializeCart() {
      try {
        setIsLoading(true);
        // Get or create a cart for the user
        const userCart = await getOrCreateCart(userId);
        setCart(userCart);
        
        // Load cart contents
        const contents = await getCartContents(userCart.id);
        setCartItems(contents);
        
        // Update parent component with item count if callback exists
        if (typeof onCartUpdate === 'function') {
          onCartUpdate(contents.product_count);
        }
      } catch (error) {
        console.error('Error initializing cart:', error);
      } finally {
        setIsLoading(false);
      }
    }
    
    if (userId) {
      initializeCart();
    }
  }, [userId, onCartUpdate]);

  // Function to add a product to cart
  const handleAddToCart = async (productId: string, quantity: number = 1) => {
    if (!cart) return;
    
    try {
      await addToCart(cart.id, productId, quantity);
      // Refresh cart contents
      const contents = await getCartContents(cart.id);
      setCartItems(contents);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  // Function to update quantity
  const handleUpdateQuantity = async (cartItemId: string, quantity: number) => {
    try {
      await updateCartItemQuantity(cartItemId, quantity);
      // Refresh cart contents
      const contents = await getCartContents(cart.id);
      setCartItems(contents);
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  // Function to remove from cart
  const handleRemoveItem = async (cartItemId: string) => {
    try {
      await removeFromCart(cartItemId);
      // Refresh cart contents
      const contents = await getCartContents(cart.id);
      setCartItems(contents);
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  // Function to clear the entire cart
  const handleClearCart = async () => {
    if (!cart) return;
    
    try {
      await clearCart(cart.id);
      // Refresh cart contents
      const contents = await getCartContents(cart.id);
      setCartItems(contents);
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  if (isLoading) {
    return <div>Loading cart...</div>;
  }

  return (
    <div className="shopping-cart">
      <h2>Your Shopping Cart</h2>
      
      {cartItems.items && cartItems.items.length > 0 ? (
        <>
          <div className="products-grid">
            {cartItems.items.map((item) => {
              // Ensure we have valid product data
              const hasValidProduct = item.product && typeof item.product === 'object';
              const productName = hasValidProduct && item.product.name ? item.product.name : 'Product';
              const imageUrl = hasValidProduct && item.product.image_url ? item.product.image_url : '';
              
              return (
                <div key={item.id} className="product-card">
                   <div className="product-image">
                <div className="image-placeholder">
                {imageUrl && <img src={imageUrl} alt={productName} />}
                </div>
              </div>
                 
                  <div className="product-details">
                  <h2 className="product-title">{item.product.name}</h2>
                  </div>
                  <div className="specs">
                    <div className="spec-item">
                      <span className="spec-label">Dimensiones:</span>
                      <span className="spec-value">
                        {item.product.ancho} x {item.product.alto} cm
                      </span>
                    </div>
                    <div className="spec-item">
                      <span className="spec-label">Material:</span>
                      <span className="spec-value">{item.product.material}</span>
                    </div>
                  </div>
                  <div className="item-controls">
                    <button 
                      onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                      className="quantity-btn"
                    >
                      -
                    </button>
                    <span className="item-quantity">{item.quantity}</span>
                    <button 
                      onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                      className="quantity-btn"
                    >
                      +
                    </button>
                  </div>
                  <div className="item-total">
                    ${(item.item_total || 0).toFixed(2)}
                  </div>
                  <button 
                    onClick={() => handleRemoveItem(item.id)}
                    className="remove-btn"
                  >
                    Eliminar 
                  </button>
                </div>
              );
            })}
          </div>
          
          <div className="cart-summary">
            <div className="cart-total">
              <span>Total ({cartItems.product_count} items):</span>
              <span className="total-price">${cartItems.total.toFixed(2)}</span>
            </div>
            <button 
              onClick={handleClearCart}
              className="clear-cart-btn"
            >
              Clear Cart
            </button>
            <button className="checkout-btn">
              Proceed to Checkout
            </button>
          </div>
        </>
      ) : (
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <button className="shop-btn">
            Continue Shopping
          </button>
        </div>
      )}
    </div>
  );
}