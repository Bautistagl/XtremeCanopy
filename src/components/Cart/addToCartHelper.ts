import { CartItem } from "./CartContext"; 
import { v4 as uuidv4 } from 'uuid';
// Función auxiliar para generar IDs únicos
export const generateUniqueId = (productName: string, size?: string, color?: string): string => {
  return `${productName.toLowerCase().replace(/\s+/g, '-')}-${size || 'default'}-${color || 'default'}`;
};

// Función para formatear un producto para el carrito
export const formatProductForCart = (
  name: string,
  price: number,
  quantity: number,
  size?: string,
  color?: string,
  image?: string
): CartItem => {
  return {
    id: uuidv4(), 
    name,
    price,
    quantity,
    size,
    color,
    image: image || "/images/product-placeholder.jpg" // Usa la imagen proporcionada o un placeholder
  };
};

// Ejemplo de uso en el componente de producto:
/*
import { useCart } from './CartContext';
import { formatProductForCart } from './addToCartHelper';

const ProductComponent = () => {
  const { addItem } = useCart();
  
  const handleAddToCart = () => {
    const product = formatProductForCart(
      'Gazebo Aluminio HEX 50',
      25000,
      1,
      '3x3',
      'Negro',
      '/images/gazebo.jpg'
    );
    
    addItem(product);
  };
  
  return (
    <button onClick={handleAddToCart}>Agregar al carrito</button>
  );
};
*/