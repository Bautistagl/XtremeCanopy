// GalleryComponent.tsx
import React, { useState, useEffect } from 'react';
import './GalleryComp.css';
import Image from 'next/image';

// Define interfaces for our data types
interface GalleryItem {
  id: number;
  type: 'image' | 'video';
  url: string;
  thumbnail: string;
  title: string;
  description?: string;
}

interface GalleryComponentProps {
  items: GalleryItem[];
  title?: string;
  subtitle?: string;
}

const GalleryComponent: React.FC<GalleryComponentProps> = ({ 
  items, 
  title = "Galería Fotográfica", 
  subtitle = "Muestra de algunos trabajos realizados" 
}) => {
  const [filter, setFilter] = useState<'all' | 'images' | 'videos'>('all');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  // Filter items based on the current filter
  const filteredItems = items.filter(item => {
    if (filter === 'all') return true;
    if (filter === 'images') return item.type === 'image';
    if (filter === 'videos') return item.type === 'video';
    return true;
  });

  // Handle item click to show the modal
  const handleItemClick = (item: GalleryItem) => {
    setSelectedItem(item);
  };

  // Close the modal when clicking outside
  const closeModal = () => {
    setSelectedItem(null);
  };

  // Close modal on escape key
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleEsc);
    
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  return (
    <div className="gallery-container">
      <div className="gallery-header">
        <h2>{title}</h2>
        <p>{subtitle}</p>
        <div className="gallery-divider">
          <span className="gallery-icon">📷</span>
        </div>
      </div>

      <div className="gallery-filters">
        <button 
          className={`gallery-filter-btn ${filter === 'all' ? 'active' : ''}`} 
          onClick={() => setFilter('all')}
        >
          Todos los proyectos
        </button>
        <button 
          className={`gallery-filter-btn ${filter === 'images' ? 'active' : ''}`} 
          onClick={() => setFilter('images')}
        >
          Imágenes
        </button>
        <button 
          className={`gallery-filter-btn ${filter === 'videos' ? 'active' : ''}`} 
          onClick={() => setFilter('videos')}
        >
          Videos
        </button>
       
      </div>

      <div className="gallery-grid">
        {filteredItems.map((item) => (
          <div 
            key={item.id} 
            className="gallery-item"
            onClick={() => handleItemClick(item)}
          >
            <div className="gallery-item-wrapper">
              {/* Aquí está la solución: usar el mismo enfoque para ambos tipos */}
              <div className={`thumbnail-container `}>
                <img 
                  src={item.thumbnail} 
                  alt={item.title} 
                  className="thumbnail-image"
                />
                {item.type === 'video' && (
                  <div className="play-button">▶</div>
                )}
              </div>
              <div className="gallery-item-overlay">
                <h3>{item.title}</h3>
                {item.description && <p>{item.description}</p>}
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedItem && (
        <div className="gallery-modal" onClick={closeModal}>
          <div className="gallery-modal-content" onClick={e => e.stopPropagation()}>
            <button className="gallery-modal-close" onClick={closeModal}>×</button>
            <h3>{selectedItem.title}</h3>
            {selectedItem.type === 'image' ? (
              <img src={selectedItem.url} alt={selectedItem.title} />
            ) : (
              <video controls>
                <source src={selectedItem.url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
            {selectedItem.description && <p>{selectedItem.description}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryComponent;