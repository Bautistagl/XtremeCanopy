import React from "react";
import Link from "next/link";
import "./Gallery.css";

export interface Product {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  slug: string;
  subtitle?: string; // Subtítulo opcional para mostrar en hover
}

interface ProductsGridProps {
  title: string;
  products: Product[];
}

const ProductsGrid: React.FC<ProductsGridProps> = ({ title, products }) => {
  // Limitar a 6 productos (2 filas de 3 columnas)
  const displayProducts = products.slice(0, 6);

  return (
    <div className="products-container">
      <h2 className="feature-title2">{title}</h2>
      <div className="products-grid">
        {displayProducts.map((product) => (
          <Link
            href={`/${product.slug}`}
            key={product.id}
            className="product-card"
          >
            <div className="product-image-wrapper">
              <div className="product-image-container">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="product-image"
                />
                {/* Capa de overlay con texto para el efecto hover */}
                <div className="product-overlay">
                  <h3 className="product-overlay-title">{product.name}</h3>
                  {product.subtitle && (
                    <p className="product-overlay-subtitle">
                      {product.subtitle}
                    </p>
                  )}
                </div>
              </div>
              {/* Información del producto debajo de la imagen (opcional) */}
              {false && (
                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                  {product.price && (
                    <p className="product-price">${product.price}</p>
                  )}
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductsGrid;
