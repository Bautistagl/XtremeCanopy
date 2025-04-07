'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';
import './productos.css'; // Archivo CSS separado para los estilos

// Inicializa el cliente de Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

// Definición del tipo de producto
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  image_url: string | null;
  ancho: number;
  alto: number;
  material: string;
  created_at: string;
  updated_at: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        
        // Realizar la consulta a Supabase
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) {
          throw error;
        }
        
        setProducts(data || []);
      } catch (err: any) {
        setError(err.message || 'Error al cargar los productos');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    }
    
    fetchProducts();
  }, []);
  
  // Función para agregar al carrito (implementación básica)
  const addToCart = (product: Product) => {
    // Aquí implementarías la lógica del carrito
    console.log('Producto agregado al carrito:', product);
    alert(`${product.name} agregado al carrito`);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-text">Cargando productos...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-message">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="products-container">
      <h1 className="page-title">Nuestros Productos</h1>

      {products.length === 0 ? (
        <div className="no-products-message">No hay productos disponibles</div>
      ) : (
        <div className="products-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-image">
                <div className="image-placeholder">
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

                <div className="product-actions">
                  <button onClick={() => addToCart(product)} className="btn-primary">
                    Agregar al carrito
                  </button>
                  <Link href={`/productos/${product.id}`} className="btn-secondary">
                    Detalles
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}