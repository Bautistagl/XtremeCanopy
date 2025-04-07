// QuotationPopup.tsx
import React, { useState, useEffect } from 'react';
import './contact.css';

interface QuotationPopupProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  selectedSize?: string;
  selectedColor?: string;
}

const QuotationPopup: React.FC<QuotationPopupProps> = ({
  isOpen,
  onClose,
  productName,
  selectedSize,
  selectedColor
}) => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    empresa: '',
    mensaje: '',
    tamano: selectedSize || '',
    color: selectedColor || '',
    cantidad: '',
  });
  
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

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

  useEffect(() => {
    if (selectedSize || selectedColor) {
      setFormData(prev => ({
        ...prev,
        tamano: selectedSize || prev.tamano,
        color: selectedColor || prev.color
      }));
    }
  }, [selectedSize, selectedColor]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when field is edited
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
    
    if (!formData.email.trim()) {
      newErrors.email = 'Por favor ingrese su email';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Por favor ingrese un email válido';
    }
    
    if (!formData.telefono.trim()) {
      newErrors.telefono = 'Por favor ingrese su teléfono';
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
        
        const response = await fetch('/api/solicitar-coti', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Error al enviar la solicitud');
        }
        
        setSubmitSuccess(true);
        
        // Resetear el formulario
        setFormData({
          nombre: '',
          email: '',
          telefono: '',
          empresa: '',
          mensaje: '',
          tamano: '',
          color: '',
          cantidad: '',
        });
        
        setTimeout(() => {
          onClose();
          setSubmitSuccess(false);
        }, 2000);
      } catch (error) {
        console.error('Error al enviar el formulario:', error);
        setSubmitError(error instanceof Error ? error.message : 'Error al enviar la solicitud');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  if (!isOpen) return null;

  const tamanosDisponibles = ['3x3', '3x4.5', '3x6', 'Hexagonal'];
  const coloresDisponibles = ['Negro', 'Blanco', 'Rojo', 'Azul', 'Verde'];

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <button className="close-button" onClick={onClose}>×</button>
        
        {submitSuccess ? (
          <div className="success-message">
            <svg viewBox="0 0 24 24" className="success-icon">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"></path>
            </svg>
            <h3>¡Solicitud enviada!</h3>
            <p>Nos pondremos en contacto con usted a la brevedad.</p>
          </div>
        ) : (
          <>
            <div className="popup-header">
              <h2>Solicitar Cotización</h2>
              <p>{productName || 'Gazebo Aluminio HEX 40'}</p>
            </div>
            
            <form onSubmit={handleSubmit} className="quotation-form">
              {submitError && (
                <div className="error-banner">
                  <p>{submitError}</p>
                </div>
              )}
              
              <div className="form-group">
                <label htmlFor="nombre">Nombre *</label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  className={errors.nombre ? 'error' : ''}
                />
                {errors.nombre && <span className="error-message">{errors.nombre}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? 'error' : ''}
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="telefono">Teléfono *</label>
                <input
                  type="tel"
                  id="telefono"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  className={errors.telefono ? 'error' : ''}
                />
                {errors.telefono && <span className="error-message">{errors.telefono}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="empresa">Empresa</label>
                <input
                  type="text"
                  id="empresa"
                  name="empresa"
                  value={formData.empresa}
                  onChange={handleChange}
                />
              </div>
              
              
              <div className="form-row">
                <div className="form-group half">
                  <label htmlFor="tamano">Tamaño</label>
                  <select
                    id="tamano"
                    name="tamano"
                    value={formData.tamano}
                    onChange={handleChange}
                  >
                    <option value="">Seleccionar</option>
                    {tamanosDisponibles.map(size => (
                      <option key={size} value={size}>{size}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group half">
                  <label htmlFor="cantidad">Cantidad</label>
                  <input
                    type="text"
                    id="cantidad"
                    name="cantidad"
                    value={formData.cantidad}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="form-group half">
                  <label htmlFor="color">Color</label>
                  <select
                    id="color"
                    name="color"
                    value={formData.color}
                    onChange={handleChange}
                  >
                    <option value="">Seleccionar</option>
                    {coloresDisponibles.map(color => (
                      <option key={color} value={color}>{color}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="mensaje">Mensaje</label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  rows={3}
                  value={formData.mensaje}
                  onChange={handleChange}
                  placeholder="Detalles adicionales sobre su requerimiento..."
                ></textarea>
              </div>
              
              <div className="form-actions">
                <button type="button" className="btn-secondary" onClick={onClose}>
                  Cancelar
                </button>
                <button type="submit" className="btn-primary" disabled={isSubmitting}>
                  {isSubmitting ? 'Enviando...' : 'Enviar Solicitud'}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default QuotationPopup;