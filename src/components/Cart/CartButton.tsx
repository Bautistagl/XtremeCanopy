"use client"

import React, { useState } from 'react';
import { useCart } from './CartContext';
import Image from "next/image";
import "./cart.css";
import CheckoutPopup from "../CheckoutPopUp/Component";

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

const ColorCircle: React.FC<{ color: string }> = ({ color }) => {
  // Convertir nombres de colores comunes a sus valores hexadecimales
  const getColorValue = (colorName: string): string => {
    const colorMap: Record<string, string> = {
      negro: "#000000",
      blanco: "#FFFFFF",
      rojo: "#FF0000",
      azul: "#0000FF",
      verde: "#008000",
      naranja: "#FFA500",
      // Puedes agregar más colores según necesites
    };

    // Si el color está en el mapa, usarlo, de lo contrario intentar usar el nombre directamente
    return colorMap[colorName.toLowerCase()] || colorName;
  };

  return (
    <span
      className="color-circle"
      style={{
        display: "inline-block",
        width: "12px",
        height: "12px",
        borderRadius: "50%",
        backgroundColor: getColorValue(color),
        border: "1px solid #ccc",
        marginRight: "5px",
        verticalAlign: "middle",
      }}
    />
  );
};

const CartButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
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

  const handleOpenCheckout = () => {
    setIsCheckoutOpen(true);
    // Opcionalmente, puedes cerrar el carrito cuando abras el checkout
    setIsOpen(false);
  };

  const handleCloseCheckout = () => {
    setIsCheckoutOpen(false);
  };

  // Formatea el precio en formato de moneda
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  // Imagen por defecto si no hay una específica
  const defaultImage = "/images/product-placeholder.jpg";

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
                        <Image
                          src={item.image || defaultImage}
                          alt={item.name}
                          width={40}
                          height={40}
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                      <div className="cart-item-info">
                        <div className="cart-item-name">{item.name}</div>
                        {(item.size || item.color) && (
                          <div className="cart-item-details">
                            {item.size && `Tamaño: ${item.size}`}
                            {item.size && item.color && " | "}
                            {item.color && (
                              <>
                                Color: <ColorCircle color={item.color} />
                                {item.color}
                              </>
                            )}
                            <span className="cart-price"> U$D{item.price}</span>
                          </div>
                        )}
                      </div>

                      <div className="cart-quantity-control">
                        <button
                          className="cart-quantity-button"
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              item.quantity - 1,
                              item.size,
                              item.color
                            )
                          }
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <span className="cart-quantity">{item.quantity}</span>
                        <button
                          className="cart-quantity-button"
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              item.quantity + 1,
                              item.size,
                              item.color
                            )
                          }
                        >
                          +
                        </button>
                      </div>

                      <button
                        className="remove-button"
                        onClick={() =>
                          removeItem(item.id, item.size, item.color)
                        }
                        aria-label="Eliminar producto"
                        title="Eliminar producto"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>

                <div className="cart-summary">
                  <div className="cart-summary-row cart-total">
                    <span>Total:</span>
                    <span>{formatCurrency(totalPrice)}</span>
                  </div>
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
                    onClick={handleOpenCheckout}
                    disabled={items.length === 0}
                  >
                    Realizar Pedido
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        <CheckoutPopup isOpen={isCheckoutOpen} onClose={handleCloseCheckout} />
      </div>
    </>
  );
};

export default CartButton;