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
import "./Detalle.css";
import Header from "@/components/Header/Header";
interface SizeOption {
  size: string;
  height: number;
  width: number;
  depth: number;
  weight: number;
  weight2: number;
}

interface ColorOption {
  name: string;
  value: string;
}

// Nuevas interfaces para tipar correctamente las imágenes
interface ThumbnailImage {
  src: string;
  alt: string;
}

interface ColorImages {
  main: string;
  thumbnails: ThumbnailImage[];
}

interface SizeImages {
  [color: string]: ColorImages;
}

interface GazeboImages {
  [size: string]: SizeImages;
}

const ProductDetail: React.FC = () => {
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
  useEffect(() => {
    setCurrentPrice(getPriceBySize(selectedSize));
  }, [selectedSize]);
  // Definición de imágenes por tamaño y color
  const imagesBySize: GazeboImages = {
    "3x3": {
      black: {
        main: "/images/medidas/3x3Negro.png",
        thumbnails: [
          {
            src: "/images/3x3tmbNegro.jpeg",
            alt: "Gazebo 3x3 Negro - Vista 1",
          },
          {
            src: "/images/medidas/3x3Negro.png",
            alt: "Gazebo 3x3 Negro - Vista 1",
          },
          {
            src: "/images/info/3x3Info.png",
            alt: "Gazebo 3x3 Negro - Vista 1",
          },
          {
            src: "/images/info/Hex40Info.png",
            alt: "Gazebo 3x3 Negro - Vista 1",
          },
        ],
      },
      white: {
        main: "/images/medidas/3x3Blanco.png",
        thumbnails: [
          {
            src: "/images/medidas/3x3Blanco.png",
            alt: "Gazebo 3x3 Blanco - Vista 1",
          },
          {
            src: "/images/info/3x3Info.png",
            alt: "Gazebo 3x3 Negro - Vista 1",
          },
          {
            src: "/images/info/Hex40Info.png",
            alt: "Gazebo 3x3 Negro - Vista 1",
          },
        ],
      },
      red: {
        main: "/images/medidas/3x3Rojo.png",
        thumbnails: [
          {
            src: "/images/medidas/3x3Rojo.png",
            alt: "Gazebo 3x3 Rojo - Vista 1",
          },
          {
            src: "/images/info/3x3Info.png",
            alt: "Gazebo 3x3 Negro - Vista 1",
          },
          {
            src: "/images/info/Hex40Info.png",
            alt: "Gazebo 3x3 Negro - Vista 1",
          },
        ],
      },
      blue: {
        main: "/images/medidas/3x3Azul.png",
        thumbnails: [
          {
            src: "/images/medidas/3x3Azul.png",
            alt: "Gazebo 3x3 Azul - Vista 1",
          },
          {
            src: "/images/info/3x3Info.png",
            alt: "Gazebo 3x3 Negro - Vista 1",
          },
          {
            src: "/images/info/Hex40Info.png",
            alt: "Gazebo 3x3 Negro - Vista 1",
          },
        ],
      },
      "rgb(255, 110, 0)": {
        main: "/images/medidas/3x3Naranja.png",
        thumbnails: [
          {
            src: "/images/medidas/3x3Naranja.png",
            alt: "Gazebo 3x3 Naranja - Vista 1",
          },
          {
            src: "/images/info/3x3Info.png",
            alt: "Gazebo 3x3 Negro - Vista 1",
          },
          {
            src: "/images/info/Hex40Info.png",
            alt: "Gazebo 3x3 Negro - Vista 1",
          },
        ],
      },
      green: {
        main: "/images/medidas/3x3Verde.png",
        thumbnails: [
          {
            src: "/images/medidas/3x3Verde.png",
            alt: "Gazebo 3x3 Verde - Vista 1",
          },
          {
            src: "/images/info/3x3Info.png",
            alt: "Gazebo 3x3 Negro - Vista 1",
          },
          {
            src: "/images/info/Hex40Info.png",
            alt: "Gazebo 3x3 Negro - Vista 1",
          },
        ],
      },
    },
    "3x4.5": {
      black: {
        main: "/images/medidas/3x4.5Negro.png",
        thumbnails: [
          {
            src: "/images/medidas/3x4.5Negro.png",
            alt: "Gazebo 3x4.5 Negro - Vista 1",
          },
          {
            src: "/images/info/3x4.5Info.png",
            alt: "Gazebo 3x3 Negro - Vista 1",
          },
          {
            src: "/images/info/Hex40Info.png",
            alt: "Gazebo 3x3 Negro - Vista 1",
          },
        ],
      },
      white: {
        main: "/images/medidas/3x4.5Blanco.png",
        thumbnails: [
          {
            src: "/images/medidas/3x4.5Blanco.png",
            alt: "Gazebo 3x4.5 Blanco - Vista 1",
          },
          {
            src: "/images/info/3x4.5Info.png",
            alt: "Gazebo 3x3 Negro - Vista 1",
          },
          {
            src: "/images/info/Hex40Info.png",
            alt: "Gazebo 3x3 Negro - Vista 1",
          },
        ],
      },
      red: {
        main: "/images/medidas/3x4.5Rojo.png",
        thumbnails: [
          {
            src: "/images/medidas/3x4.5Rojo.png",
            alt: "Gazebo 3x4.5 Rojo - Vista 1",
          },
          {
            src: "/images/info/3x4.5Info.png",
            alt: "Gazebo 3x3 Negro - Vista 1",
          },
          {
            src: "/images/info/Hex40Info.png",
            alt: "Gazebo 3x3 Negro - Vista 1",
          },
        ],
      },
      blue: {
        main: "/images/medidas/3x4.5Azul.png",
        thumbnails: [
          {
            src: "/images/medidas/3x4.5Azul.png",
            alt: "Gazebo 3x4.5 Azul - Vista 1",
          },
          {
            src: "/images/info/3x4.5Info.png",
            alt: "Gazebo 3x3 Negro - Vista 1",
          },
          {
            src: "/images/info/Hex40Info.png",
            alt: "Gazebo 3x3 Negro - Vista 1",
          },
        ],
      },
      "rgb(255, 110, 0)": {
        main: "/images/medidas/3x4.5Naranja.png",
        thumbnails: [
          {
            src: "/images/medidas/3x4.5Naranja.png",
            alt: "Gazebo 3x4.5 Naranja - Vista 1",
          },
          {
            src: "/images/info/3x4.5Info.png",
            alt: "Gazebo 3x3 Negro - Vista 1",
          },
          {
            src: "/images/info/Hex40Info.png",
            alt: "Gazebo 3x3 Negro - Vista 1",
          },
        ],
      },
      green: {
        main: "/images/medidas/3x4.5Verde.png",
        thumbnails: [
          {
            src: "/images/medidas/3x4.5Verde.png",
            alt: "Gazebo 3x4.5 Verde - Vista 1",
          },
          {
            src: "/images/info/3x4.5Info.png",
            alt: "Gazebo 3x3 Negro - Vista 1",
          },
          {
            src: "/images/info/Hex40Info.png",
            alt: "Gazebo 3x3 Negro - Vista 1",
          },
        ],
      },
    },
    "3x6": {
      black: {
        main: "/images/medidas/3x6Negro.png",
        thumbnails: [
          {
            src: "/images/medidas/3x6Negro.png",
            alt: "Gazebo 3x6 Negro - Vista 1",
          },
          {
            src: "/images/info/3x6Info.png",
            alt: "Gazebo 3x3 Negro - Vista 1",
          },
          {
            src: "/images/info/Hex40Info.png",
            alt: "Gazebo 3x3 Negro - Vista 1",
          },
        ],
      },
      white: {
        main: "/images/medidas/3x6Blanco.png",
        thumbnails: [
          {
            src: "/images/medidas/3x6Blanco.png",
            alt: "Gazebo 3x6 Blanco - Vista 1",
          },
          {
            src: "/images/info/3x6Info.png",
            alt: "Gazebo 3x3 Negro - Vista 1",
          },
          {
            src: "/images/info/Hex40Info.png",
            alt: "Gazebo 3x3 Negro - Vista 1",
          },
        ],
      },
      red: {
        main: "/images/medidas/3x6Rojo.png",
        thumbnails: [
          {
            src: "/images/gaze.jpg",
            alt: "Gazebo 3x6 Rojo - Vista 1",
          },
          {
            src: "/images/3x6tmbRojo.JPG",
            alt: "Gazebo 3x6 Rojo - Vista 1",
          },
          {
            src: "/images/medidas/3x6Rojo.png",
            alt: "Gazebo 3x6 Rojo - Vista 1",
          },
          {
            src: "/images/info/3x6Info.png",
            alt: "Gazebo 3x3 Negro - Vista 1",
          },
          {
            src: "/images/info/Hex40Info.png",
            alt: "Gazebo 3x3 Negro - Vista 1",
          },
        ],
      },
      blue: {
        main: "/images/medidas/3x6Azul.png",
        thumbnails: [
          {
            src: "/images/medidas/3x6Azul.png",
            alt: "Gazebo 3x6 Azul - Vista 1",
          },
          {
            src: "/images/info/3x6Info.png",
            alt: "Gazebo 3x3 Negro - Vista 1",
          },
          {
            src: "/images/info/Hex40Info.png",
            alt: "Gazebo 3x3 Negro - Vista 1",
          },
        ],
      },
      "rgb(255, 110, 0)": {
        main: "/images/medidas/3x6Naranja.png",
        thumbnails: [
          {
            src: "/images/medidas/3x6Naranja.png",
            alt: "Gazebo 3x6 Naranja - Vista 1",
          },
          {
            src: "/images/info/3x6Info.png",
            alt: "Gazebo 3x3 Negro - Vista 1",
          },
          {
            src: "/images/info/Hex40Info.png",
            alt: "Gazebo 3x3 Negro - Vista 1",
          },
        ],
      },
      green: {
        main: "/images/medidas/3x6Verde.png",
        thumbnails: [
          {
            src: "/images/medidas/3x6Verde.png",
            alt: "Gazebo 3x6 Verde - Vista 1",
          },
          {
            src: "/images/info/3x6Info.png",
            alt: "Gazebo 3x3 Negro - Vista 1",
          },
          {
            src: "/images/info/Hex40Info.png",
            alt: "Gazebo 3x3 Negro - Vista 1",
          },
        ],
      },
    },
    Hexagonal: {
      black: {
        main: "/images/medidas/HexaNegro.png",
        thumbnails: [
          {
            src: "/images/medidas/HexaNegro.png",
            alt: "Gazebo Hexagonal Azul - Vista 1",
          },
          {
            src: "/images/info/HexaInfo.png",
            alt: "Gazebo 3x3 Negro - Vista 1",
          },
        ],
      },
      white: {
        main: "/images/medidas/HexaBlanca.jpg",
        thumbnails: [
          {
            src: "/images/HexatmbBlanca.jpeg",
            alt: "Gazebo Hexagonal Blanco - Vista 1",
          },
          {
            src: "/images/medidas/HexaBlanca.jpg",
            alt: "Gazebo Hexagonal Azul - Vista 1",
          },
          {
            src: "/images/info/HexaInfo.png",
            alt: "Gazebo 3x3 Negro - Vista 1",
          },
        ],
      },
      // Agregar aquí el resto de colores para Hexagonal...
      red: {
        main: "/images/medidas/3x6Rojo.png",
        thumbnails: [
          // {
          //   src: "/images/medidas/gazebos/hexagonal/red/1.jpg",
          //   alt: "Gazebo Hexagonal Rojo - Vista 1",
          // },
          {
            src: "/images/info/HexaInfo.png",
            alt: "Gazebo 3x3 Negro - Vista 1",
          },
        ],
      },
      blue: {
        main: "/images/medidas/HexaAzul.png",
        thumbnails: [
          {
            src: "/images/medidas/HexaAzul.png",
            alt: "Gazebo Hexagonal Azul - Vista 1",
          },
          {
            src: "/images/info/HexaInfo.png",
            alt: "Gazebo 3x3 Negro - Vista 1",
          },
        ],
      },
      "rgb(255, 110, 0)": {
        main: "/images/medidas/3x6Naranja.png",
        thumbnails: [
          // {
          //   src: "/images/medidas/gazebos/hexagonal/orange/1.jpg",
          //   alt: "Gazebo Hexagonal Naranja - Vista 1",
          // },
          {
            src: "/images/info/HexaInfo.png",
            alt: "Gazebo 3x3 Negro - Vista 1",
          },
        ],
      },
      green: {
        main: "/images/medidas/3x6Verde.png",
        thumbnails: [
          // {
          //   src: "/images/medidas/gazebos/hexagonal/green/1.jpg",
          //   alt: "Gazebo Hexagonal Verde - Vista 1",
          // },
          {
            src: "/images/info/HexaInfo.png",
            alt: "Gazebo 3x3 Negro - Vista 1",
          },
        ],
      },
    },
  };

  const sizes: SizeOption[] = [
    { size: "3x3", height: 160, width: 24, depth: 24, weight: 23, weight2: 43 },
    {
      size: "3x4.5",
      height: 160,
      width: 33,
      depth: 24,
      weight: 29,
      weight2: 55,
    },
    { size: "3x6", height: 160, width: 43, depth: 25, weight: 41, weight2: 73 },
    {
      size: "Hexagonal",
      height: 162,
      width: 55,
      depth: 45,
      weight: 79,
      weight2: 112,
    },
  ];

  const colors: ColorOption[] = [
    { name: "Negro", value: "black" },
    { name: "Blanco", value: "white" },
    { name: "Rojo", value: "red" },
    { name: "Azul", value: "blue" },
    { name: "Naranja", value: "rgb(255, 110, 0)" },
    { name: "Verde", value: "green" },
  ];

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
    // Las imágenes se actualizarán en el useEffect
  };

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    // Las imágenes se actualizarán en el useEffect
  };

  const handleThumbnailClick = (image: string) => {
    setMainImage(image);
  };

  const handleAddToCart = () => {
    const selectedColorName =
      colors.find((c) => c.value === selectedColor)?.name || selectedColor;

    // Usar la imagen principal actual para el carrito
    const productImage = mainImage;

    const productToAdd = formatProductForCart(
      "Gazebo Aluminio HEX 40",
      getPriceBySize(selectedSize),
      quantity,
      selectedSize,
      selectedColorName,
      productImage
    );

    addItem(productToAdd);
    Swal.fire({
      title: "Agregado con exito!",
      html: `<br>
       <strong>${productToAdd.name}</strong><br>
       Tamaño: <strong>${productToAdd.size} </strong><br>
       Color: <strong>${productToAdd.color}</strong><br>
      -Cantidad:<strong>${productToAdd.quantity}</strong> `,
      icon: "success",
    });
    // alert(`Producto agregado al carrito:
    //    - ${productToAdd.name}
    //    - Tamaño: ${productToAdd.size}
    //    - Color: ${productToAdd.color}
    //    - Cantidad: ${productToAdd.quantity}`);
  };

  const getPriceBySize = (size: string): number => {
    switch (size) {
      case "3x3":
        return 100;
      case "3x4.5":
        return 200;
      case "3x6":
        return 300;
      case "Hexagonal":
        return 400;
      default:
        return 500;
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
  const [currentPrice, setCurrentPrice] = useState<number>(
    getPriceBySize("3x3")
  );
  return (
    <div className="product-container">
      <Header />

      <div className="breadcrumb">
        <Link href="/">Inicio</Link> &gt; <span>Gazebo Lite Series HEX 40</span>
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
          <h1 className="product-title">Gazebo Lite Series HEX 40</h1>
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

            {/* <div className="color-selector">
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
            </div> */}

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
          </div>
          <div className="product-price">
            <h2>Precio: U$D{currentPrice.toLocaleString()}</h2>
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
        {/* El resto del componente se mantiene igual */}
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
      />
    </div>
  );
};

export default ProductDetail;