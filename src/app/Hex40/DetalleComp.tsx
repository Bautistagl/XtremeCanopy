"use client"

import type React from "react"
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/Cart/CartContext";
import { formatProductForCart } from "@/components/Cart/addToCartHelper";
import QuotationPopup from "@/components/ContactPopUp/ContactPopUp";
import Footer from "@/components/Footer/Footer";
import CartButton from "@/components/Cart/CartButton";
import "./Detalle.css";
import Header from "@/components/Header/Header";
interface SizeOption {
  size: string;
  height: number;
  width: number;
  depth: number;
  weight: number;
}

interface ColorOption {
  name: string;
  value: string;
}

const ProductDetail: React.FC = () => {
  const [selectedSize, setSelectedSize] = useState<string>("3x3");
  const [selectedColor, setSelectedColor] = useState<string>("negro");
  const [mainImage, setMainImage] = useState<any>("/images/gaze.jpg");
  const [quantity, setQuantity] = useState<number>(1);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("caracteristicas");
  const { addItem } = useCart();

  const thumbnailImages = [
    { src: "/images/gaze.jpg", alt: "Gazebo vista frontal" },
    { src: "/images/3x3.png", alt: "Gazebo vista 3x3" },
    { src: "/images/3x4.5.png", alt: "Gazebo vista 3x4.5" },
    { src: "/images/3x6.png", alt: "Gazebo vista 3x6" },
    { src: "/images/hexagonal.png", alt: "Gazebo vista hexagonal" },
  ];

  const sizes: SizeOption[] = [
    { size: "3x3", height: 160, width: 24, depth: 24, weight: 23 },
    { size: "3x4.5", height: 160, width: 33, depth: 24, weight: 29 },
    { size: "3x6", height: 160, width: 43, depth: 25, weight: 41 },
    { size: "Hexagonal", height: 162, width: 55, depth: 45, weight: 79 },
  ];

  const colors: ColorOption[] = [
    { name: "Negro", value: "black" },
    { name: "Blanco", value: "white" },
    { name: "Rojo", value: "red" },
    { name: "Azul", value: "blue" },
    { name: "Naranja", value: "orange" },
    { name: "Verde", value: "green" },
  ];

  const handleSizeChange = (size: string) => {
    setSelectedSize(size);
  };

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
  };

  const handleThumbnailClick = (image: any) => {
    setMainImage(image);
  };

  const handleAddToCart = () => {
    const selectedColorName =
      colors.find((c) => c.value === selectedColor)?.name || selectedColor;

    let sizeSpecificImage = "";
    switch (selectedSize) {
      case "3x3":
        sizeSpecificImage = "/images/3x3tmb.png";
        break;
      case "3x4.5":
        sizeSpecificImage = "/images/3x4.5tmb.png";
        break;
      case "3x6":
        sizeSpecificImage = "/images/3x6tmb.png";
        break;
      case "Hexagonal":
        sizeSpecificImage = "/images/hexatmb.png";
    }

    const productToAdd = formatProductForCart(
      "Gazebo Aluminio HEX 40",
      getPriceBySize(selectedSize),
      quantity,
      selectedSize,
      selectedColorName,
      sizeSpecificImage
    );

    addItem(productToAdd);

    alert(`Producto agregado al carrito:
       - ${productToAdd.name}
       - Tamaño: ${productToAdd.size}
       - Color: ${productToAdd.color}
       - Cantidad: ${productToAdd.quantity}`);
  };

  const getPriceBySize = (size: string): number => {
    switch (size) {
      case "3x3":
        return 25000;
      case "3x4.5":
        return 32000;
      case "3x6":
        return 39000;
      default:
        return 25000;
    }
  };

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="product-container">
      <Header />

      <div className="breadcrumb">
        <Link href="/">Inicio</Link> &gt; <span>Gazebo Aluminio HEX 40</span>
      </div>

      <main className="product-detail">
        <div className="product-gallery">
          <div className="main-image">
            <Image
              height={400}
              width={400}
              src={mainImage}
              alt="Gazebo Aluminio HEX 40"
            />
          </div>
          <div className="thumbnail-gallery">
            {thumbnailImages.map((img, index) => (
              <div
                key={index}
                className={`thumbnail ${mainImage === img.src ? "active" : ""}`}
                onClick={() => handleThumbnailClick(img.src)}
              >
                <Image height={80} width={80} src={img.src} alt={img.alt} />
              </div>
            ))}
          </div>
        </div>

        <div className="product-info">
          <div className="product-tag">Destacado</div>
          <h1 className="product-title">Gazebo Aluminio HEX 40</h1>
          <div className="rating">
            <span className="stars">★★★★☆</span>
          </div>

          <p className="product-description">
            Ideal para uso personal o profesional, perfecto para fiestas,
            eventos corporativos, reuniones al aire libre y más. Su peso
            optimizado y sistema de plegado, facilitan el transporte y
            almacenamiento sin complicaciones.
          </p>

          <div className="product-options">
            <div className="size-selector">
              <h3>Tamaños disponibles:</h3>
              <div className="size-options">
                {sizes.map((size) => (
                  <button
                    key={size.size}
                    className={`size-option ${
                      selectedSize === size.size ? "active" : ""
                    }`}
                    onClick={() => handleSizeChange(size.size)}
                  >
                    {size.size}
                  </button>
                ))}
              </div>
            </div>

            <div className="color-selector">
              <h3>Colores disponibles:</h3>
              <div className="color-options">
                {colors.map((color) => (
                  <button
                    key={color.value}
                    className={`color-option ${
                      selectedColor === color.value ? "active" : ""
                    }`}
                    style={{ backgroundColor: color.value }}
                    onClick={() => handleColorChange(color.value)}
                    title={color.name}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="quantity-selector">
            <h3>Cantidad:</h3>
            <div className="quantity-controls">
              <button
                className="size-option"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                -
              </button>
              <input
                type="number"
                className="quantity-input"
                value={quantity}
                onChange={(e) =>
                  setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                }
                min="1"
              />
              <button
                className="size-option"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>
          </div>

          <div className="product-actions">
            <button
              className="btn-secondary"
              onClick={() => (window.location.href = "#product-specs")}
            >
              Ver más detalles
            </button>
            <button className="btn-secondary" onClick={handleOpenPopup}>
              Solicitar cotización
            </button>
            <button className="btn-primary" onClick={handleAddToCart}>
              Agregar al carrito
            </button>
          </div>
        </div>
      </main>

      <section id="product-specs" className="product-specs-tabs">
        <div className="tabs-header">
          <button
            className={`tab-button ${
              activeTab === "caracteristicas" ? "active" : ""
            }`}
            onClick={() => handleTabChange("caracteristicas")}
          >
            Características
          </button>
          <button
            className={`tab-button ${
              activeTab === "beneficios" ? "active" : ""
            }`}
            onClick={() => handleTabChange("beneficios")}
          >
            Beneficios
          </button>
          <button
            className={`tab-button ${
              activeTab === "especificaciones" ? "active" : ""
            }`}
            onClick={() => handleTabChange("especificaciones")}
          >
            Especificaciones técnicas
          </button>
        </div>

        <div className="tabs-content">
          {activeTab === "caracteristicas" && (
            <div className="specs-container">
              <div className="spec-item">
                <h3>Material de la estructura:</h3>
                <p>
                  Aluminio de gama media, lo que le otorga ligereza y en un todo
                  para mayor maniobrabilidad.
                </p>
              </div>
              <div className="spec-item">
                <h3>Piezas de unión:</h3>
                <p>
                  Fabricadas con nylon de alta densidad, proporcionando una
                  mayor durabilidad y resistencia al desgaste.
                </p>
              </div>
              <div className="spec-item">
                <h3>Techo:</h3>
                <p>
                  Confeccionado con lona de poliéster 100% impermeable,
                  recubierta de PVC para una mayor protección contra la humedad
                  y el viento.
                </p>
              </div>
              <div className="spec-item">
                <h3>Pies de fijación:</h3>
                <p>
                  Pie de aluminio hexagonal (45 mm de diámetro y 2 mm de
                  espesor) que asegura una fijación sólida al suelo, evitando
                  que el gazebo se mueva. Sistema de ajuste: Incluye un sistema
                  de botón para regular la altura y plegar el gazebo fácilmente,
                  brindando comodidad al usuario.
                </p>
              </div>
            </div>
          )}

          {activeTab === "beneficios" && (
            <div className="benefits-container">
              <div className="benefit-item">
                <div className="benefit-icon">
                  <span className="icon-structure"></span>
                </div>
                <h3>Estructura ligera y resistente</h3>
                <p>
                  Fabricado en aluminio anodizado color plata, combina
                  durabilidad y facilidad de transporte.
                </p>
              </div>
              <div className="benefit-item">
                <div className="benefit-icon">
                  <span className="icon-assembly"></span>
                </div>
                <h3>Fácil de montar y desmontar</h3>
                <p>
                  Diseño plegable que permite una instalación rápida sin
                  herramientas.
                </p>
              </div>
              <div className="benefit-item">
                <div className="benefit-icon">
                  <span className="icon-versatility"></span>
                </div>
                <h3>Versatilidad para cualquier evento</h3>
                <p>
                  Ideal para uso ocasional o profesional, perfecto para ferias,
                  eventos corporativos, reuniones al aire libre y más.
                </p>
              </div>
              <div className="benefit-item">
                <div className="benefit-icon">
                  <span className="icon-quality"></span>
                </div>
                <h3>Alta presencia visual</h3>
                <p>
                  Su diseño elegante y materiales de calidad garantizan una
                  imagen profesional y atractiva.
                </p>
              </div>
            </div>
          )}

          {activeTab === "especificaciones" && (
            <div>
              <div className="table-container">
                <table className="specs-table">
                  <thead>
                    <tr>
                      <th>Medidas</th>
                      <th>Alto (cm)</th>
                      <th>Ancho (cm)</th>
                      <th>Profundidad (cm)</th>
                      <th>Peso (kg)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sizes.map((size) => (
                      <tr
                        key={size.size}
                        className={
                          selectedSize === size.size ? "highlighted" : ""
                        }
                      >
                        <td>{size.size}</td>
                        <td>{size.height}</td>
                        <td>{size.width}</td>
                        <td>{size.depth}</td>
                        <td>{size.weight}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="material-info">
                <p>
                  <strong>Material de la estructura:</strong> Aluminio anodizado
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="use-cases">
        <h2>Ideal para uso en playa y carreras Dakar</h2>
        <div className="use-cases-grid">
          <div className="use-case-card">
            <div className="use-case-image">
              <Image
                src="/images/gaze.jpg"
                alt="Gazebo en playa"
                width={400}
                height={300}
              />
            </div>
            <div className="use-case-content">
              <h3>Perfecto para días de playa</h3>
              <p>
                Protección UV e impermeable, ideal para disfrutar de la playa
                con sombra y comodidad.
              </p>
            </div>
          </div>
          <div className="use-case-card">
            <div className="use-case-image">
              <Image
                src="/images/gaze.jpg"
                alt="Gazebo en carreras"
                width={400}
                height={300}
              />
            </div>
            <div className="use-case-content">
              <h3>Resistente para carreras Dakar</h3>
              <p>
                Estructura reforzada que soporta condiciones extremas, perfecto
                para equipos de competición.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <QuotationPopup
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
        productName={"Gazebo Aluminio HEX 40"}
        selectedSize={selectedSize}
        selectedColor={selectedColor}
      />
    </div>
  );
};

export default ProductDetail;