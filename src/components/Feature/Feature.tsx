import React from 'react';
import './Feature.css';
import Image from 'next/image';

// Creating our own Badge component since we're not using shadcn
const Badge: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <span className="badge">{children}</span>;
};

// Check icon component to replace lucide-react
const CheckIcon: React.FC = () => {
  return (
    <svg 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className="check-icon"
    >
      <path 
        d="M20 6L9 17L4 12" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </svg>
  );
};

const Feature: React.FC = () => {
  return (
    <div className="feature-background">
      <div className="feature-container">
        <div className="feature-inner-container">
          <div className="feature-grid">
            <div className="feature-content">
              <div className="feature-header">
                <div>
                  <Badge>Calidad</Badge>
                </div>
                <div className="feature-title-container">
                  <h2 className="feature-title">Uniones Reforzadas</h2>
                  <p className="feature-subtitle">
                    Con piezas de extrusión de aluminio.
                  </p>
                </div>
              </div>
              <div className="feature-benefits">
                <div className="feature-benefit-item">
                  <CheckIcon />
                  <div className="feature-benefit-text">
                    <p>Maxima resistencia</p>
                    <p className="feature-benefit-description">
                      Las piezas de extrusión de aluminio brindan una estructura
                      sólida y duradera, capaz de soportar condiciones
                      exigentes.
                    </p>
                  </div>
                </div>
                <div className="feature-benefit-item">
                  <CheckIcon />
                  <div className="feature-benefit-text">
                    <p> Diseño optimizado</p>
                    <p className="feature-benefit-description">
                      Las uniones reforzadas mejoran la estabilidad y prolongan
                      la vida útil del gazebo, asegurando un rendimiento
                      superior en cualquier entorno.
                    </p>
                  </div>
                </div>
                <div className="feature-benefit-item">
                  <CheckIcon />
                  <div className="feature-benefit-text">
                    <p>Ligereza y facilidad de transporte</p>
                    <p className="feature-benefit-description">
                      El aluminio es un material liviano, lo que facilita el
                      montaje, desmontaje y transporte del gazebo sin
                      comprometer su resistencia.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <Image
              alt=""
              width={400}
              height={250}
              src="/images/fotoLanding.jpeg"
              className="feature-image"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export { Feature };