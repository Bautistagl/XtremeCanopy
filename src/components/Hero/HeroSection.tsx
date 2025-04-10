import React, { useState } from 'react';
import './Hero.css';
import Image from "next/image";
import Link from "next/link";

interface FeatureProps {
  icon: React.ReactNode;
  text: string;
  isSelected: boolean;
  onClick: () => void;
}

const Feature: React.FC<FeatureProps> = ({
  icon,
  text,
  isSelected,
  onClick,
}) => {
  return (
    <div
      className={`hero-section-feature ${
        isSelected ? "hero-section-feature-selected" : ""
      }`}
      onClick={onClick}
    >
      <span className="hero-section-feature-icon">{icon}</span>
      <span className="hero-section-feature-text">{text}</span>
    </div>
  );
};

interface FeatureData {
  id: number;
  text: string;
  icon: React.ReactNode;
  description: string;
  title: string;
  image: any;
  tag: string;
  link: string;
}

interface HeroSectionProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaAction: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  ctaText,
  ctaAction,
}) => {
  const features: FeatureData[] = [
    {
      id: 1,
      text: "HEX 40",
      title: "Gazebo Lite Series HEX 40",
      icon: "",
      description:
        "Ideal para uso ocasional o profesional, perfecto para ferias, eventos corporativos, reuniones al aire libre y más. Su peso optimizado y sistema de plegado facilitan el transporte y almacenamiento sin complicaciones",
      image: "/images/gaze.jpg",
      tag: "Mas vendido",
      link: "/Hex40",
    },
    {
      id: 2,
      text: "HEX 50",
      title: "Gazebo Aluminio HEX 50",
      icon: "",
      description:
        "La categoría HEX 50 está diseñada para resistir cualquier tipo de clima, desde sol intenso hasta lluvias fuertes o viento. Su estructura de aluminio de alta gama y su techo impermeable proporcionan una cobertura confiable durante todo el año, sin importar las condiciones meteorológicas.",
      image: "/images/gaze2.jpg",
      tag: "HEX 50 3X6",
      link: "/Hex50",
    },
  ];

  const [selectedFeature, setSelectedFeature] = useState<FeatureData>(
    features[0]
  );

  const handleFeatureClick = (feature: FeatureData) => {
    setSelectedFeature(feature);
  };

  return (
    <div className="hero-section-wrapper">
      <main className="hero-section-content">
        <div className="hero-section-content-left">
          <div className="hero-section-tag">{selectedFeature.tag}</div>
          <h2 className="hero-section-content-title">
            {selectedFeature.title}
          </h2>
          <p className="hero-section-content-description">
            {selectedFeature.description}
          </p>
          <Link href={selectedFeature.link} scroll={false}>
            <button className="hero-section-cta-button">{ctaText}</button>
          </Link>
        </div>
        <div className="hero-section-content-right">
          <div className="hero-section-cube-image">
            <Image
              src={selectedFeature.image}
              alt={selectedFeature.text}
              className="hero-section-cube"
              width={400}
              height={400}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default HeroSection;