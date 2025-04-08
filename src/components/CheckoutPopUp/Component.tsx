"use client"

import React, { useState, useEffect } from 'react';
import { useCart } from '../Cart/CartContext'; 
import Image from "next/image";
import './checkout.css';

// Componente para mostrar el círculo de color
const ColorCircle: React.FC<{ color: string }> = ({ color }) => {
  // Convertir nombres de colores comunes a sus valores hexadecimales
  const getColorValue = (colorName: string): string => {
    const colorMap: Record<string, string> = {
      negro: '#000000',
      blanco: '#FFFFFF',
      rojo: '#FF0000',
      azul: '#0000FF',
      verde: '#008000',
      amarillo: '#FFFF00',
      naranja: '#FFA500',
      morado: '#800080',
      rosado: '#FFC0CB',
      gris: '#808080',
      marron: '#A52A2A',
      marrón: '#A52A2A',
      cafe: '#A52A2A',
      café: '#A52A2A',
      brown: '#A52A2A',
      beige: '#F5F5DC',
    };
    
    return colorMap[colorName.toLowerCase()] || colorName;
  };

  return (
    <span 
      className="color-circle"
      style={{
        display: 'inline-block',
        width: '12px',
        height: '12px',
        borderRadius: '50%',
        backgroundColor: getColorValue(color),
        border: '1px solid #ccc',
        marginRight: '5px',
        verticalAlign: 'middle'
      }}
    />
  );
};

interface CheckoutPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  direccion: string;
  ciudad: string;
  codigoPostal: string;
  metodoPago: string;
  notasAdicionales: string;
}

const CheckoutPopup: React.FC<CheckoutPopupProps> = ({
  isOpen,
  onClose,
}) => {
  const { items, totalItems, totalPrice, clearCart } = useCart();
  
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    direccion: '',
    ciudad: '',
    codigoPostal: '',
    metodoPago: 'transferencia',
    notasAdicionales: ''
  });
  
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  
  // Bloquear scroll cuando el popup está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpiar error cuando se edita el campo
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.nombre.trim()) {
      newErrors.nombre = 'Por favor ingrese su nombre';
    }
    
    if (!formData.apellido.trim()) {
      newErrors.apellido = 'Por favor ingrese su apellido';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Por favor ingrese su email';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Por favor ingrese un email válido';
    }
    
    if (!formData.telefono.trim()) {
      newErrors.telefono = 'Por favor ingrese su teléfono';
    }
    
    if (!formData.direccion.trim()) {
      newErrors.direccion = 'Por favor ingrese su dirección';
    }
    
    if (!formData.ciudad.trim()) {
      newErrors.ciudad = 'Por favor ingrese su ciudad';
    }
    
    if (!formData.codigoPostal.trim()) {
      newErrors.codigoPostal = 'Por favor ingrese su código postal';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      setSubmitError('');
      
      try {
        // Crear un objeto con todos los datos del pedido
        const orderData = {
          cliente: formData,
          items: items,
          totalItems: totalItems,
          totalPrecio: totalPrice
        };
        
        // Enviar la información al backend
        const response = await fetch('/api/solicitar-coti', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(orderData),
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Error al procesar el pedido');
        }
        
        setSubmitSuccess(true);
        
        // Limpiar el carrito después de un pedido exitoso
        clearCart();
        
        // Resetear el formulario
        setFormData({
          nombre: '',
          apellido: '',
          email: '',
          telefono: '',
          direccion: '',
          ciudad: '',
          codigoPostal: '',
          metodoPago: 'transferencia',
          notasAdicionales: ''
        });
        
        // Cerrar el popup después de un breve retraso
        setTimeout(() => {
          onClose();
          setSubmitSuccess(false);
          setCurrentStep(1);
        }, 3000);
      } catch (error) {
        console.error('Error al enviar el pedido:', error);
        setSubmitError(error instanceof Error ? error.message : 'Error al procesar el pedido');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const nextStep = () => {
    if (currentStep === 1) {
      setCurrentStep(2);
    }
  };

  const prevStep = () => {
    if (currentStep === 2) {
      setCurrentStep(1);
    }
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString('es-CL', { 
      style: 'currency', 
      currency: 'CLP',
      minimumFractionDigits: 0
    });
  };

  // Imagen por defecto si no hay una específica
  const defaultImage = "/images/product-placeholder.jpg";

  if (!isOpen) return null;

  return (
    <div className="checkout-overlay">
      <div className="checkout-container">
        <button className="close-button" onClick={onClose}>
          ×
        </button>

        {submitSuccess ? (
          <div className="success-message">
            <svg viewBox="0 0 24 24" className="success-icon">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"></path>
            </svg>
            <h3>¡Pedido realizado con éxito!</h3>
            <p>
              Hemos recibido tu pedido. Te enviaremos un correo con los detalles
              y pasos a seguir.
            </p>
          </div>
        ) : (
          <>
            <div className="checkout-header">
              <h2>Finalizar Compra</h2>
              <div className="checkout-steps">
                <div className={`step ${currentStep === 1 ? "active" : ""}`}>
                  1. Revisar Carrito
                </div>
                <div className={`step ${currentStep === 2 ? "active" : ""}`}>
                  2. Información de Envío
                </div>
              </div>
            </div>

            <div className="checkout-content">
              {currentStep === 1 && (
                <div className="cart-summary">
                  <h3>Resumen del Pedido</h3>

                  {items.length === 0 ? (
                    <div className="empty-cart-message">
                      Tu carrito está vacío. Por favor, añade productos antes de
                      continuar.
                    </div>
                  ) : (
                    <>
                      <div className="cart-items-summary">
                        {items.map((item) => (
                          <div
                            key={`${item.id}-${item.size}-${item.color}`}
                            className="cart-item-summary"
                          >
                            <div className="item-image">
                              <Image
                                src={item.image || defaultImage}
                                alt={item.name}
                                width={60}
                                height={60}
                                style={{ objectFit: "cover" }}
                              />
                            </div>
                            <div className="item-details">
                              <div className="item-name">{item.name}</div>
                              <div className="item-specs">
                                {item.size && <span>Tamaño: {item.size}</span>}
                                {item.color && (
                                  <span>
                                    Color: <ColorCircle color={item.color} />
                                    {item.color}
                                  </span>
                                )}
                                <span>Cantidad: {item.quantity}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="cart-total">
                        <div className="total-items">
                          Productos: <span>{totalItems}</span>
                        </div>
                      </div>

                      <div className="cart-actions">
                        <button className="btn-secondary" onClick={onClose}>
                          Volver al Carrito
                        </button>
                        <button
                          className="btn-primary"
                          onClick={nextStep}
                          disabled={items.length === 0}
                        >
                          Continuar
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}

              {currentStep === 2 && (
                <form onSubmit={handleSubmit} className="checkout-form">
                  {submitError && (
                    <div className="error-banner">
                      <p>{submitError}</p>
                    </div>
                  )}

                  <div className="form-section">
                    <h3>Información Personal</h3>

                    <div className="form-row">
                      <div className="form-group half">
                        <label htmlFor="nombre">Nombre *</label>
                        <input
                          type="text"
                          id="nombre"
                          name="nombre"
                          value={formData.nombre}
                          onChange={handleChange}
                          className={errors.nombre ? "error" : ""}
                        />
                        {errors.nombre && (
                          <span className="error-message">{errors.nombre}</span>
                        )}
                      </div>

                      <div className="form-group half">
                        <label htmlFor="apellido">Apellido *</label>
                        <input
                          type="text"
                          id="apellido"
                          name="apellido"
                          value={formData.apellido}
                          onChange={handleChange}
                          className={errors.apellido ? "error" : ""}
                        />
                        {errors.apellido && (
                          <span className="error-message">
                            {errors.apellido}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group half">
                        <label htmlFor="email">Email *</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={errors.email ? "error" : ""}
                        />
                        {errors.email && (
                          <span className="error-message">{errors.email}</span>
                        )}
                      </div>

                      <div className="form-group half">
                        <label htmlFor="telefono">Teléfono *</label>
                        <input
                          type="tel"
                          id="telefono"
                          name="telefono"
                          value={formData.telefono}
                          onChange={handleChange}
                          className={errors.telefono ? "error" : ""}
                        />
                        {errors.telefono && (
                          <span className="error-message">
                            {errors.telefono}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="form-section">
                    <h3>Dirección de Envío</h3>

                    <div className="form-group">
                      <label htmlFor="direccion">Dirección *</label>
                      <input
                        type="text"
                        id="direccion"
                        name="direccion"
                        value={formData.direccion}
                        onChange={handleChange}
                        className={errors.direccion ? "error" : ""}
                        placeholder="Calle, número, depto/casa"
                      />
                      {errors.direccion && (
                        <span className="error-message">
                          {errors.direccion}
                        </span>
                      )}
                    </div>

                    <div className="form-row">
                      <div className="form-group half">
                        <label htmlFor="ciudad">Ciudad *</label>
                        <input
                          type="text"
                          id="ciudad"
                          name="ciudad"
                          value={formData.ciudad}
                          onChange={handleChange}
                          className={errors.ciudad ? "error" : ""}
                        />
                        {errors.ciudad && (
                          <span className="error-message">{errors.ciudad}</span>
                        )}
                      </div>

                      <div className="form-group half">
                        <label htmlFor="codigoPostal">Código Postal *</label>
                        <input
                          type="text"
                          id="codigoPostal"
                          name="codigoPostal"
                          value={formData.codigoPostal}
                          onChange={handleChange}
                          className={errors.codigoPostal ? "error" : ""}
                        />
                        {errors.codigoPostal && (
                          <span className="error-message">
                            {errors.codigoPostal}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="notasAdicionales">Notas Adicionales</label>
                    <textarea
                      id="notasAdicionales"
                      name="notasAdicionales"
                      rows={3}
                      value={formData.notasAdicionales}
                      onChange={handleChange}
                      placeholder="Instrucciones especiales para la entrega, etc."
                    ></textarea>
                  </div>

                  <div className="form-actions">
                    <button
                      type="button"
                      className="btn-secondary"
                      onClick={prevStep}
                    >
                      Volver
                    </button>
                    <button
                      type="submit"
                      className="btn-primary"
                      disabled={isSubmitting}
                      onClick={handleSubmit}
                    >
                      {isSubmitting ? "Procesando..." : "Realizar Pedido"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CheckoutPopup;