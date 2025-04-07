import type React from 'react';
import { useState } from 'react';
import './Card.css';
import Image from 'next/image';

interface ProductCardProps {
  model: string;
  size: string;
  profile: {
    size: string;
    thickness: string;
  };
  resistance: number;
  included: boolean;
  imageSrc: any;
  carpaSrc: any;
  brandName: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  model,
  size,
  profile,
  resistance,
  included,
  imageSrc,
  brandName,
  carpaSrc
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Convert resistance to stars (max 5 stars)
  const resistanceStars = Array(5).fill(0).map((_, index) => {
    const starValue = (resistance / 2) - index;
    if (starValue >= 1) return 1; // full star
    if (starValue > 0) return 0.5; // half star
    return 0; // empty star
  });

  return (
    <div
      className={`product-card ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="product-card-header">
        <div className="brand-logo">
          <Image height={50} width={50} src={imageSrc} alt="CarpalPro Logo" className="logo-image" />
        </div>
       
      </div>

      <div className="product-image-container">
        <Image height={200} width={200} src={carpaSrc} alt={`${brandName} ${model} Canopy Tent`} className="product-image" />
        <div className="size-indicator">
        <div className="professional-badge">PROFESSIONAL GRADE TENT</div>
        </div>
      </div>

      <div className="product-name">{model}</div>

      <div className="product-specs">
        <div className="spec-item">
          <span className="spec-title">PROFILE</span>
          <span className="spec-value">{profile.size}</span>
          <span className="spec-detail">{profile.thickness}</span>
        </div>

        <div className="spec-item">
          <span className="spec-title">RESISTANCE</span>
          <div className="spec-stars">
            {resistanceStars.map((star, index) => (
              <span
                key={`star-${index}-${star}`}
                className={`star ${star === 1 ? 'full' : star === 0.5 ? 'half' : 'empty'}`}
              >
                {star === 1 ? '★' : star === 0.5 ? '⯨' : '☆'}
              </span>
            ))}
          </div>
        </div>

        <div className="spec-item">
          <span className="spec-title">ACCESSORIES</span>
          <span className="spec-value included">{included ? 'INCLUDED' : 'NOT INCLUDED'}</span>
        </div>
      </div>

      <button className="view-details-btn">View Details</button>
    </div>
  );
};

export default ProductCard;