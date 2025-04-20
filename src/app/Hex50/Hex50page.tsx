"use client"

import type React from "react"
import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/Cart/CartContext";
import { formatProductForCart } from "@/components/Cart/addToCartHelper";
import QuotationPopup from "@/components/ContactPopUp/ContactPopUp";
import Footer from "@/components/Footer/Footer";
import CartButton from "@/components/Cart/CartButton";
import "../Hex40/Detalle.css";
import Header from "@/components/Header/Header";

// Importar datos desde archivos separados
import { imagesBySize, ThumbnailImage } from "@/data/gazeboImages";
import { sizes50 } from "@/data/gazeboSizes";
import { colors } from "@/data/gazeboColors";
import { getPriceBySize50 } from "@/utils/pricing50";

// Importar el componente de laterales
import LateralesSelector from "@/components/Laterales/Laterales";

const Hex50Screen: React.FC = () => {
  const [selectedSize, setSelectedSize] = useState<string>("3x3");
  const [selectedColor, setSelectedColor] = useState<string>("black");
  const [mainImage, setMainImage] = useState<string>(
    "/images/gazebos/3x3/black/main.jpg"
  );
  const [thumbnailImages, setThumbnailImages] = useState<
    { src: string; alt: string }[]
  >([]);
  const [quantity, setQuantity] = useState<number>(1);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("caracteristicas");
  const { addItem } = useCart();
  const [currentPrice, setCurrentPrice] = useState<number>(
    getPriceBySize50("3x3")
  );

  // Nuevo estado para manejar los laterales
  const [additionalPrice, setAdditionalPrice] = useState<number>(0);
  const [selectedSides, setSelectedSides] = useState<string>("");

  // Actualizar el precio total cuando cambia el tamaño o se agregan laterales
  useEffect(() => {
    setCurrentPrice(getPriceBySize50(selectedSize) + additionalPrice);
  }, [selectedSize, additionalPrice]);

  // Función para actualizar las imágenes según tamaño y color
  const updateImages = () => {
    // Verificamos que el tamaño seleccionado exista en nuestro objeto
    if (selectedSize in imagesBySize) {
      const sizeImages = imagesBySize[selectedSize];
      // Verificamos que el color seleccionado exista para ese tamaño
      if (selectedColor in sizeImages) {
        setMainImage(sizeImages[selectedColor].main);
        setThumbnailImages(sizeImages[selectedColor].thumbnails);
      }
    }
  };

  // Actualizar imágenes cuando cambia el tamaño o color
  useEffect(() => {
    updateImages();
  }, [selectedSize, selectedColor]);

  const handleSizeChange = (size: string) => {
    setSelectedSize(size);

    setAdditionalPrice(0);
    setSelectedSides("");
  };

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
  };

  const handleThumbnailClick = (image: string) => {
    setMainImage(image);
  };

  // Función para manejar la adición de precio por laterales
  const handleAddToPrice = (price: number) => {
    setAdditionalPrice(price);
  };

  // Función para manejar la selección de laterales
  const handleAddSidesToCart = (sides: string, price: number) => {
    setSelectedSides(sides);
    setAdditionalPrice(price);
  };

  const handleAddToCart = () => {
    const selectedColorName =
      colors.find((c) => c.value === selectedColor)?.name || selectedColor;

    // Usar la imagen principal actual para el carrito
    const productImage = mainImage;

    // Crear un objeto de producto base
    const baseProduct = {
      name: "Gazebo Aluminio HEX 50",
      price: getPriceBySize50(selectedSize),
      quantity: quantity,
      size: selectedSize,
      color: selectedColorName,
      image: productImage,
      sides: selectedSides,
      additionalPrice: additionalPrice,
    };

    const productToAdd = formatProductForCart(
      baseProduct.name,
      baseProduct.price + baseProduct.additionalPrice,
      baseProduct.quantity,
      baseProduct.size,
      baseProduct.color,
      baseProduct.image,
      baseProduct.sides
    );

    addItem(productToAdd);

    // Construir el mensaje de confirmación
    let confirmationMessage = `<br>
       <strong>${productToAdd.name}</strong><br>
       Tamaño: <strong>${productToAdd.size} </strong><br>
       Color: <strong>${productToAdd.color}</strong><br>
       Cantidad: <strong>${productToAdd.quantity}</strong>`;

    // Agregar información de laterales si están seleccionados
    if (selectedSides) {
      confirmationMessage += `<br>Laterales: <strong>${selectedSides}</strong>`;
    }

    Swal.fire({
      title: "Agregado con éxito!",
      html: confirmationMessage,
      icon: "success",
    });
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

  // Generar miniaturas de colores disponibles para el tamaño seleccionado
  const getColorThumbnails = () => {
    const colorThumbnails: Array<{
      color: string;
      name: string;
      image: string;
    }> = [];

    // Verificamos que el tamaño seleccionado exista en nuestro objeto
    if (selectedSize in imagesBySize) {
      const sizeImages = imagesBySize[selectedSize];

      for (const color of colors) {
        // Verificamos que el color exista para ese tamaño
        if (color.value in sizeImages) {
          colorThumbnails.push({
            color: color.value,
            name: color.name,
            image: sizeImages[color.value].main,
          });
        }
      }
    }

    return colorThumbnails;
  };

  return (
    <div className="product-container">
      <Header />

      <div className="breadcrumb">
        <Link href="/">Inicio</Link> &gt; <span>Gazebo Lite Series HEX 50</span>
      </div>

      <main className="product-detail">
        <div className="product-gallery">
          <div className="main-image">
            <Image
              height={400}
              width={400}
              src={mainImage}
              alt={`Gazebo Aluminio HEX 40 ${selectedSize} ${selectedColor}`}
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
          <h1 className="product-title">Gazebo Lite Series HEX 50</h1>
          <div className="rating">
            <span className="stars">★★★★☆</span>
          </div>

          <p className="product-description">
            Ideal para uso personal o profesional, perfecto para fiestas,
            eventos corporativos, reuniones al aire libre y más. Su peso
            optimizado y sistema de plegado, facilitan el transporte y
            almacenamiento sin complicaciones.
          </p>
          <span className="product-detail2">
            Todos los gazebos incluyen una funda para transportar.{" "}
          </span>
          <div className="product-options">
            <div className="size-selector">
              <h3>Tamaños disponibles:</h3>
              <div className="size-options">
                {sizes50.map((size) => (
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

            {/* Agregar vista previa de colores con miniaturas */}
            <div className="color-preview">
              <h3>Colores disponibles:</h3>
              <div className="color-preview-gallery">
                {getColorThumbnails().map((item, index) => (
                  <div
                    key={index}
                    className={`color-preview-item ${
                      selectedColor === item.color ? "active" : ""
                    }`}
                    onClick={() => handleColorChange(item.color)}
                  >
                    <Image
                      height={60}
                      width={60}
                      src={item.image}
                      alt={`Gazebo ${selectedSize} ${item.name}`}
                    />
                    <span>{item.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Agregar el componente de selección de laterales */}
            <div className="laterales-section">
              <LateralesSelector
                selectedSize={selectedSize}
                addToPrice={handleAddToPrice}
                addSidesToCart={handleAddSidesToCart}
              />
            </div>
          </div>
          <div className="product-price">
            <h3>Precio: U$D{currentPrice.toLocaleString()}</h3>
            {additionalPrice > 0 && (
              <p className="price-breakdown">
                Base: U$D{getPriceBySize50(selectedSize).toLocaleString()} +
                Laterales: U$D{additionalPrice.toLocaleString()}
              </p>
            )}
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
              <div className="material-info">
                <p>
                  <strong>
                    Las dimensiones y los pesos corresponden al packaging de los
                    gazebos.
                  </strong>
                </p>
              </div>
              <div className="table-container">
                <table className="specs-table">
                  <thead>
                    <tr>
                      <th>Medidas</th>
                      <th>Alto (cm)</th>
                      <th>Ancho (cm)</th>
                      <th>Profundidad (cm)</th>
                      <th>Peso (kg)</th>
                      <th>Peso con laterales(kg)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sizes50.map((size) => (
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
                        <td>{size.weight2}</td>
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

      <Footer />

      <QuotationPopup
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
        productName={"Gazebo Aluminio HEX 40"}
        selectedSize={selectedSize}
        selectedColor={selectedColor}
        selectedSides={selectedSides} // Agregamos los laterales a la cotización
      />
    </div>
  );
};

export default Hex50Screen;