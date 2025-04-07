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
  // Sample team members data
  const teamMembers: TeamMember[] = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      bio: "15+ years of experience in product development and leadership.",
      imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
    },
    {
      name: "Michael Chen",
      role: "CTO",
      bio: "Former tech lead at major companies with expertise in scalable systems.",
      imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
    },
    {
      name: "Elena Rodriguez",
      role: "Head of Design",
      bio: "Award-winning designer with a passion for user-centered experiences.",
      imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
    }
  ];

  return (
    <div className="about-us-container">
      <div className="about-us-inner-container">
        {/* Header section */}
        <div className="about-us-header">
          <div>
            <Badge>Our Story</Badge>
          </div>
          <div className="about-us-title-container">
            <h2 className="about-us-title">
              Sobre Nosotros
            </h2>
            <p className="about-us-subtitle">
            En Xtreme Canopy, diseñamos y fabricamos gazebos de alta calidad para quienes buscan resistencia, funcionalidad y estilo. Nos especializamos en ofrecer soluciones para empresas que organizan eventos, equipos de competición de automovilismo, así como para quienes disfrutan de la playa y el aire libre con la mejor protección
            </p>
          </div>
        </div>

       

      

        {/* Mission statement section */}
        <div className="about-us-mission">
          <div className="mission-content">
            <h3 className="mission-title">Nuestra Mision</h3>
            <p className="mission-text">
            Nuestro compromiso es brindar estructuras duraderas y fáciles de montar, adaptadas a cualquier entorno. Ya sea para exhibiciones corporativas, paddocks de carreras o días soleados en la arena, nuestros gazebos están diseñados para ofrecer la máxima protección y presencia de marca.
            </p>
          </div>
          <div className="mission-image"></div>
        </div>
      </div>
    </div>
  );
};

export { AboutUs };