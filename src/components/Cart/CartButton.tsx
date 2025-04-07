"use client"

import React, { useState } from 'react';
import { useCart } from './CartContext';
import Image from "next/image";
import "./cart.css";
// Estilos CSS para el componente

// Crear un ícono de carrito simple usando SVG
const CartIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="9" cy="21" r="1"></circle>
    <circle cx="20" cy="21" r="1"></circle>
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
  </svg>
);

const CartButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    items,
    totalItems,
    totalPrice,
    updateQuantity,
    removeItem,
    clearCart,
  } = useCart();

  const toggleCart = () => {
    setIsOpen(!isOpen);
  };

  const closeCart = () => {
    setIsOpen(false);
  };

  const handleCheckout = () => {
    // Aquí podrías redirigir a una página de checkout
    alert("Redirigiendo al checkout...");
    closeCart();
  };

  // Generar un nombre para nuestro placeholder de imagen
  const getImagePlaceholder = (name: string) => {
    return `/img/product-placeholder.jpg`;
  };

  return (
    <>
      <div className="cart-button-container">
        <button className="cart-button" onClick={toggleCart}>
          <div className="cart-icon">
            <CartIcon />
            {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
          </div>
        </button>

        {isOpen && (
          <div className="cart-popup">
            <div className="cart-popup-header">
              <h3 className="cart-popup-title">Tu Carrito</h3>
              <button className="close-button" onClick={closeCart}>
                ✕
              </button>
            </div>

            {items.length === 0 ? (
              <div className="cart-empty">Tu carrito está vacío</div>
            ) : (
              <>
                <div className="cart-items">
                  {items.map((item) => (
                    <div
                      key={`${item.id}-${item.size}-${item.color}`}
                      className="cart-item"
                    >
                      <div className="cart-item-image">
                        {item ? (
                          <Image
                            src="/images/gaze4.jpg"
                            alt={item.name}
                            width={40}
                            height={40}
                            objectFit="cover"
                          />
                        ) : (
                          <div
                            style={{
                              width: "40px",
                              height: "40px",
                              backgroundColor: "#f0f0f0",
                            }}
                          />
                        )}
                      </div>
                      <div className="cart-item-info">
                        <div className="cart-item-name">{item.name}</div>
                        {(item.size || item.color) && (
                          <div className="cart-item-details">
                            {item.size && `Tamaño: ${item.size}`}
                            {item.size && item.color && " | "}
                            {item.color && `Color: ${item.color}`}
                          </div>
                        )}
                        <div className="cart-item-price">
                          Cantidad: {item.quantity}
                        </div>
                      </div>
                      <div className="cart-quantity-control">
                        <button
                          className="cart-quantity-button"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                        >
                          -
                        </button>
                        <span className="cart-quantity">{item.quantity}</span>
                        <button
                          className="cart-quantity-button"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                        >
                          +
                        </button>
                      </div>
                      <button
                        className="remove-button"
                        onClick={() => removeItem(item.id)}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>

                <div className="cart-actions">
                  <button
                    className="cart-action-button clear-button"
                    onClick={clearCart}
                  >
                    Vaciar
                  </button>
                  <button
                    className="cart-action-button checkout-button"
                    onClick={handleCheckout}
                  >
                    Realizar Pedido
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default CartButton;