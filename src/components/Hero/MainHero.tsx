import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import './MainHero.css';

interface MainHeroSectionProps {
  title?: string;
  subtitle?: string;
  catalogButtonText?: string;
  contactButtonText?: string;
  catalogLink?: string;
  contactLink?: string;
  imageSrc?: string;
}

const MainHeroSection: React.FC<MainHeroSectionProps> = ({
  title = "Gazebos Portátiles Premium",
  subtitle = "Estructuras portátiles para eventos que combinan funcionalidad y estilo.",
  catalogButtonText = "hex 40",
  contactButtonText = "Contactar",
  catalogLink = "/catalogo",
  contactLink = "/contacto",
  
}) => {
  return (
    <section className="primary-hero-container">
      <div className="primary-hero-inner">
        <div className="primary-hero-text-block">
          <h1 className="primary-hero-heading">{title}</h1>
          <p className="primary-hero-description">{subtitle}</p>
          <div className="primary-hero-actions">
            <Link href='/Hex40'>
              <button className="primary-hero-button primary-hero-main-button">
                {catalogButtonText}
              </button>
            </Link>
            <Link href='/Hex50'>
              <button className="primary-hero-button primary-hero-main-button">
                {contactButtonText}
              </button>
            </Link>
          </div>
        </div>
        <div className="primary-hero-visual">
          <div className="primary-hero-image-wrapper">
            <Image 
              src="/images/picLand.jpg"
              alt={title} 
              width={450} 
              height={300}
              priority
              className="primary-hero-image"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainHeroSection;