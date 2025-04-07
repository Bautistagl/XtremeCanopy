import React from 'react';
import './Contact.css';
import Link from "next/link";

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
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
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

const Contact: React.FC = () => {
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

  return (
    <div className="contact-container">
      <div className="contact-inner-container">
        {/* Header section */}
        <div className="contact-header">
          <div>
            <Badge>Contacto</Badge>
          </div>
          <div className="contact-title-container">
            <h2 className="contact-title">¿Cómo podemos ayudarte?</h2>
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

            <div className="contact-item">
              <PhoneIcon />
              <div>
                <h4 className="contact-item-title">Teléfono</h4>
                <p className="contact-item-text">
                  <Link href="tel:+5492374103483">+54 9 2374 10-3483</Link>
                </p>
              </div>
            </div>

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
          <form className="contact-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Nombre</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Tu nombre"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Tu email"
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="subject">Asunto</label>
              <input
                type="text"
                id="sub ject"
                name="subject"
                placeholder="Asunto del mensaje"
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Mensaje</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder="Tu mensaje"
              ></textarea>
            </div>
            <button type="submit" className="submit-button">
              Enviar mensaje
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export { Contact };