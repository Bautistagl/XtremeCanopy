"use server"
import { createClient } from '@/supabase/server'


export interface Product {
    id: string;
    name: string;
    description?: string;
    price: number;
    stock: number;
    image_url?: string;
    created_at?: string;
    updated_at?: string;
    ancho?: number;
    alto?: number;
    material?: string;
  }
  
  export interface Cart {
    id: string;
    user_id: string;
    created_at?: string;
    updated_at?: string;
  }
  
  export interface CartItem {
    id: string;
    cart_id: string;
    product_id: string;
    quantity: number;
    added_at?: string;
    products?: Product | Product[]; // Handle both single object and array cases
  }
  
  export interface CartContents {
    items: {
      id: string;
      quantity: number;
      added_at?: string;
      product: Product;
      price: number;
      item_total: number;
    }[];
    total: number;
    item_count: number;
    product_count: number;
  }
/**
 * Creates a new cart for a user
 * @param {string} userId - The ID of the user
 * @returns {Promise<Object>} - The created cart
 */
export async function createCart(userId: any) {
 const supabase = await createClient()
  const { data, error } = await supabase
    .from('carts')
    .insert([{ user_id: userId }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Gets a user's active cart or creates one if none exists
 * @param {string} userId - The ID of the user
 * @returns {Promise<Object>} - The user's cart
 */
export async function getOrCreateCart(userId: any) {
    const supabase = await createClient()
  // First try to get an existing cart
  const { data: existingCart } = await supabase
    .from('carts')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  // If cart exists, return it
  if (existingCart) return existingCart;

  // Otherwise create a new cart
  return createCart(userId);
}

/**
 * Adds a product to a cart
 * @param {string} cartId - The ID of the cart
 * @param {string} productId - The ID of the product
 * @param {number} quantity - The quantity of the product
 * @returns {Promise<Object>} - The created cart item
 */
export async function addToCart(cartId: any, productId: any, quantity = 1) {
    const supabase = await createClient()
  // Check if product exists in cart already
  const { data: existingItem } = await supabase
    .from('cart_items')
    .select('*')
    .eq('cart_id', cartId)
    .eq('product_id', productId)
    .single();

  if (existingItem) {
    // Update quantity if product already in cart
    const newQuantity = existingItem.quantity + quantity;
    
    const { data, error } = await supabase
      .from('cart_items')
      .update({ quantity: newQuantity })
      .eq('id', existingItem.id)
      .select()
      .single();
      
    if (error) throw error;
    return data;
  } else {
    // Insert new cart item if product not in cart
    const { data, error } = await supabase
      .from('cart_items')
      .insert([{
        cart_id: cartId,
        product_id: productId,
        quantity: quantity
      }])
      .select()
      .single();
      
    if (error) throw error;
    return data;
  }
}

/**
 * Updates the quantity of a product in a cart
 * @param {string} cartItemId - The ID of the cart item
 * @param {number} quantity - The new quantity
 * @returns {Promise<Object>} - The updated cart item
 */
export async function updateCartItemQuantity(cartItemId: any, quantity: number) {
    const supabase = await createClient()
  if (quantity <= 0) {
    // Remove item if quantity is 0 or negative
    return removeFromCart(cartItemId);
  }

  const { data, error } = await supabase
    .from('cart_items')
    .update({ quantity })
    .eq('id', cartItemId)
    .select()
    .single();
    
  if (error) throw error;
  return data;
}

/**
 * Removes a product from a cart
 * @param {string} cartItemId - The ID of the cart item
 * @returns {Promise<void>}
 */
export async function removeFromCart(cartItemId: any) {
    const supabase = await createClient()
  const { error } = await supabase
    .from('cart_items')
    .delete()
    .eq('id', cartItemId);
    
  if (error) throw error;
}

/**
 * Gets all items in a cart with product details
 * @param {string} cartId - The ID of the cart
 * @returns {Promise<Array>} - The cart items with product details
 */
export async function getCartContents(cartId: any) {
    const supabase = await createClient()
  const { data, error } = await supabase
    .from('cart_items')
    .select(`
      id,
      quantity,
      added_at,
      product_id,
      products (
        id,
        name,
        price,
        image_url,
        description,
        alto,
        ancho,
        material
      )
    `)
    .eq('cart_id', cartId);
    
  if (error) throw error;
  
  // Calculate totals and format response
  const cartItems = data.map((item: { products: any[]; id: any; quantity: number; added_at: any; }) => {
    // Handle the case where products might be an array or a single object
    const product = Array.isArray(item.products) ? item.products[0] : item.products;
    
    // Make sure we have a valid product with price
    if (!product || typeof product.price !== 'number') {
      console.error('Invalid product or price:', product);
      return {
        id: item.id,
        quantity: item.quantity,
        added_at: item.added_at,
        product: product || {},
        price: 0,
        item_total: 0
      };
    }
    
    return {
      id: item.id,
      quantity: item.quantity,
      added_at: item.added_at,
      product: product,
      price: product.price,
      item_total: item.quantity * product.price
    };
  });
  
  const cartTotal = cartItems.reduce((sum: any, item: { item_total: any; }) => sum + item.item_total, 0);
  
  return {
    items: cartItems,
    total: cartTotal,
    item_count: cartItems.length,
    product_count: cartItems.reduce((sum: any, item: { quantity: any; }) => sum + item.quantity, 0)
  };
}

/**
 * Empties a cart by removing all items
 * @param {string} cartId - The ID of the cart
 * @returns {Promise<void>}
 */
export async function clearCart(cartId: any) {
    const supabase = await createClient()
  const { error } = await supabase
    .from('cart_items')
    .delete()
    .eq('cart_id', cartId);
    
  if (error) throw error;
}