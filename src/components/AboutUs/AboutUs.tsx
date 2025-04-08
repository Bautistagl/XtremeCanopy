import React from 'react';
import './about.css';

// Custom Badge component
const Badge: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <span className="badge">{children}</span>;
};

// TeamMember type definition
interface TeamMember {
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
}

const AboutUs: React.FC = () => {


  return (
    <div className="about-us-container">
      <div className="about-us-inner-container">
        {/* Header section */}
        <div className="about-us-header">
          <div className="about-us-title-container">
            <h2 className="feature-title2">Sobre Nosotros</h2>
            <p className="about-us-subtitle">
              En Xtreme Canopy, diseñamos y fabricamos gazebos de alta calidad
              para quienes buscan resistencia, funcionalidad y estilo. Nos
              especializamos en ofrecer soluciones para empresas que organizan
              eventos, equipos de competición de automovilismo, así como para
              quienes disfrutan de la playa y el aire libre con la mejor
              protección
            </p>
          </div>
        </div>

        {/* Mission statement section */}
        <div className="about-us-mission">
          <div className="mission-image"></div>
          <div className="mission-content">
            <h3 className="mission-title">Nuestra Mision</h3>
            <p className="mission-text">
              Nuestro compromiso es brindar estructuras duraderas y fáciles de
              montar, adaptadas a cualquier entorno. Ya sea para exhibiciones
              corporativas, paddocks de carreras o días soleados en la arena,
              nuestros gazebos están diseñados para ofrecer la máxima protección
              y presencia de marca.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export { AboutUs };