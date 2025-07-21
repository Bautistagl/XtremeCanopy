import React, { useState } from "react";
import "./Contact.css";
import Link from "next/link";
import Swal from "sweetalert2";
import Image from "next/image";

// Custom Badge component
const Badge: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <span className="badge">{children}</span>;
};

// Icons for contact info
const PhoneIcon: React.FC = () => (
  <svg
    className="contact-icon"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor" // Often WhatsApp icons are filled with their brand color
    // If you want a stroke, you can add it back: stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
  >
    <title>WhatsApp icon</title>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.748-2.201-.271-.439-.032-.67-.2-.686-.174-.016-.381-.006-.593-.006-.213 0-.525.074-.793.372-.269.298-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 1.984 3.407 4.75 4.536.63.253 1.129.405 1.518.529.567.182 1.083.163 1.482.098.4-.065 1.256-.519 1.439-1.026.18-.506.18-1.296.121-1.48-.058-.184-.213-.298-.44-.397zM12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 18c-3.313 0-6-2.687-6-6s2.687-6 6-6 6 2.687 6 6-2.687 6-6 6z" />
  </svg>
);

const EmailIcon: React.FC = () => (
  <svg
    className="contact-icon"
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
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
);

const MapPinIcon: React.FC = () => (
  <svg
    className="contact-icon"
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
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
);

const ClockIcon: React.FC = () => (
  <svg
    className="contact-icon"
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
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);

const InstagramIcon: React.FC = () => (
  <svg
    className="contact-icon"
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
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const FacebookIcon: React.FC = () => (
  <svg
    className="contact-icon"
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
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

// Location type
interface Location {
  name: string;
  address: string;
}

// Form data interface
interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const Contact: React.FC = () => {
  // Form state
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success?: boolean;
    message?: string;
  }>({});

  // Store the pickup and sales locations
  const locations: Location[] = [
    {
      name: "Punto de Retiro - Parque Industrial del Oeste",
      address: "Darwin Passaponti 6002, Moreno, Provincia de Buenos Aires",
    },
    {
      name: "Punto de Venta - Motoswift",
      address:
        "Av. Gaona 13101, B1746 Francisco Alvarez, Provincia de Buenos Aires",
    },
    {
      name: "Punto de Venta - Moto Adventure Garage",
      address: "Av. Libertador 15767, San Isidro",
    },
  ];

  // Form handlers
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({});

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({
          success: true,
          message: "Mensaje enviado correctamente. ¡Gracias por contactarnos!",
        });
        Swal.fire({
          title: "Mensaje enviado correctamente!",
          html: `<br>
               <strong></strong><br> `,
          icon: "success",
        });
        // Resetear el formulario después de un envío exitoso
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        setSubmitStatus({
          success: false,
          message:
            data.error ||
            "Error al enviar el mensaje. Por favor, inténtalo de nuevo.",
        });
      }
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      setSubmitStatus({
        success: false,
        message: "Error al enviar el mensaje. Por favor, inténtalo de nuevo.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-container">
      <div className="contact-inner-container">
        {/* Header section */}
        <div className="contact-header">
          <div>
            <Badge>Contacto</Badge>
          </div>
          <div className="contact-title-container">
            <h2 className="feature-title2">¿Cómo podemos ayudarte?</h2>
            <p className="contact-subtitle">
              Estamos disponibles para responder tus preguntas y atender tus
              pedidos.
            </p>
          </div>
        </div>

        {/* Main content */}
        <div className="contact-content">
          {/* Left column - Contact information */}
          <div className="contact-info">
            <h3 className="contact-section-title">Información de Contacto</h3>
            <Link href="tel:+5492374103483">
              <div className="contact-item">
                <Image
                  alt=""
                  height={25}
                  width={25}
                  src="/images\whatsapp.png"
                />
                <div>
                  <h4 className="contact-item-title">Whatsapp Business</h4>
                  <p className="contact-item-text">+54 9 2374 10-3483</p>
                </div>
              </div>
            </Link>

            <div className="contact-item">
              <EmailIcon />
              <div>
                <h4 className="contact-item-title">Email</h4>
                <p className="contact-item-text">
                  <Link href="mailto:xtremecanopy@gmail.com">
                    xtremecanopy@gmail.com
                  </Link>
                </p>
              </div>
            </div>

            <div className="contact-item">
              <ClockIcon />
              <div>
                <h4 className="contact-item-title">Horarios de Atención</h4>
                <p className="contact-item-text">
                  Lunes a viernes de 9am a 18pm
                </p>
              </div>
            </div>

            <div className="contact-social">
              <h4 className="contact-item-title">Redes Sociales</h4>
              <div className="social-links">
                <Link
                  href="https://www.instagram.com/xtremecanopy/"
                  className="social-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <InstagramIcon />
                  <span>@xtremecanopy</span>
                </Link>
                <Link
                  href="https://www.facebook.com/XtremeCanopy/"
                  className="social-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FacebookIcon />
                  <span>Xtreme Canopy</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Right column - Locations */}
          <div className="contact-locations">
            <h3 className="contact-section-title">Nuestras Ubicaciones</h3>

            <div className="locations-list">
              {locations.map((location, index) => (
                <div key={index} className="location-item">
                  <div className="location-icon-wrapper">
                    <MapPinIcon />
                  </div>
                  <div>
                    <h4 className="location-name">{location.name}</h4>
                    <p className="location-address">{location.address}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact form section */}
        <div className="contact-form-section">
          <h3 className="contact-form-title">Envíanos un mensaje</h3>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Nombre</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Tu nombre"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Tu email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="subject">Asunto</label>
              <input
                type="text"
                id="subject"
                name="subject"
                placeholder="Asunto del mensaje"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Mensaje</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder="Tu mensaje"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="submit-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Enviando..." : "Enviar mensaje"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export { Contact };
