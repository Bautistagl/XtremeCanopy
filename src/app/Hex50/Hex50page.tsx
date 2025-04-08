"use client"

import type React from "react"
import { useState } from "react"
import "../Hex40/Detalle.css";
import Image from "next/image";
import Link from "next/link";
import QuotationPopup from "@/components/ContactPopUp/ContactPopUp";
import { useCart } from "@/components/Cart/CartContext";
import { formatProductForCart } from "@/components/Cart/addToCartHelper";
import Footer from "@/components/Footer/Footer";
import CartButton from "@/components/Cart/CartButton";

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

const Hex50Screen: React.FC = () => {
  const [selectedSize, setSelectedSize] = useState<string>("3x3");
  const [selectedColor, setSelectedColor] = useState<string>("negro");
  const [mainImage, setMainImage] = useState<any>("/images/gaze4.jpg");
  const [quantity, setQuantity] = useState<number>(1);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { addItem } = useCart(); // Usar el hook del contexto del carrito

  const thumbnailImages = [
    { src: "/images/gaze4.jpg", alt: "Gazebo vista frontal" },
    { src: "/images/3x3.png", alt: "Gazebo vista 3x3" },
    { src: "/images/3x4.5.png", alt: "Gazebo vista 3x4.5" },
    { src: "/images/3x6.png", alt: "Gazebo vista 3x6" },
  ];

  const sizes: SizeOption[] = [
    { size: "3x3", height: 180, width: 24, depth: 24, weight: 22 },
    { size: "3x4.5", height: 180, width: 33, depth: 24, weight: 29 },
    { size: "3x6", height: 180, width: 43, depth: 25, weight: 41 },
  ];

  const colors: ColorOption[] = [
    { name: "Negro", value: "negro" },
    { name: "Blanco", value: "blanco" },
    { name: "Rojo", value: "rojo" },
    { name: "Azul", value: "azul" },
    { name: "Naranja", value: "naranja" },
    { name: "Verde", value: "verde" },
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
    // Obtener el nombre del color seleccionado
    const selectedColorName =
      colors.find((c) => c.value === selectedColor)?.name || selectedColor;

    // Asignar imagen según el tamaño seleccionado
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
      default:
        sizeSpecificImage = "/images/3x3tmb.png";
    }

    // Formatear el producto para el carrito
    const productToAdd = formatProductForCart(
      "Gazebo Aluminio HEX 50",
      getPriceBySize(selectedSize),
      quantity,
      selectedSize,
      selectedColorName,
      sizeSpecificImage // Usamos la imagen específica
    );

    // Añadir el producto al carrito
    addItem(productToAdd);

    // Mostrar confirmación
    alert(`Producto agregado al carrito:
      - ${productToAdd.name}
      - Tamaño: ${productToAdd.size}
      - Color: ${productToAdd.color}
      - Cantidad: ${productToAdd.quantity}`);
  };

  // Función para obtener precio según tamaño
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

  const selectedSizeData = sizes.find((s) => s.size === selectedSize);

  return (
    <div className="product-container">
      <header>
        <div className="container header-container">
          <Link href="/" className="logo">
            <Image
              src="/images/blackLogo.jpeg"
              alt="CarpaPro logo"
              width={150}
              height={40}
            />
          </Link>
          <nav>
            <ul>
              <li>
                <Link href="/">Inicio</Link>
              </li>
              <li>
                <Link href="/Hex40" scroll={false}>
                  Hex 40
                </Link>
              </li>
              <li>
                <Link href="#" scroll={false}>
                  Hex 50
                </Link>
              </li>
              <li>
                <Link href="/comparador" scroll={false}>
                  Comparador
                </Link>
              </li>
              <li>
                <CartButton />
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <div className="breadcrumb">
        <Link href="#">Inicio</Link> &gt; <span>Gazebo Aluminio HEX 50</span>
      </div>

      <main className="product-detail">
        <div className="product-gallery">
          <div className="main-image">
            <Image
              height={200}
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
                <Image height={250} width={250} src={img.src} alt={img.alt} />
              </div>
            ))}
          </div>
        </div>

        <div className="product-info">
          <h1 className="product-title">Gazebo Aluminio HEX 50</h1>

          <p className="product-description">
            Ideal para uso ocasional o profesional, perfecto para ferias,
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
            <button className="btn-primary">Ver más detalles</button>
            <button className="btn-secondary" onClick={handleOpenPopup}>
              Solicitar cotización
            </button>
            <button className="btn-primary" onClick={handleAddToCart}>
              Agregar al carrito
            </button>
          </div>
        </div>
      </main>

      <section className="product-specs">
        <h2>Características</h2>
        <div className="specs-container">
          <div className="specs-column">
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
                Fabricadas con nylon de alta densidad, proporcionando una mayor
                durabilidad y resistencia al desgaste.
              </p>
            </div>
            <div className="spec-item">
              <h3>Techo:</h3>
              <p>
                Confeccionado con lona de poliéster 100% impermeable, recubierta
                de PVC para una mayor protección contra la humedad y el viento.
              </p>
            </div>
          </div>
          <div className="specs-column">
            <div className="spec-item">
              <h3>Pies de fijación:</h3>
              <p>
                Pie de aluminio hexagonal (45 mm de diámetro y 2 mm de espesor)
                que asegura una fijación sólida al suelo, evitando que el gazebo
                se mueva. Sistema de ajuste: Incluye un sistema de botón para
                regular la altura y plegar el gazebo fácilmente, brindando
                comodidad al usuario.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="product-benefits">
        <h2>Beneficios</h2>
        <div className="benefits-container">
          <div className="benefit-item">
            <div className="benefit-icon">
              <span className="icon-structure"></span>
            </div>
            <h3>Estructura ligera y resistente</h3>
            <p>
              Fabricado en aluminio anodizado color plata, combina durabilidad y
              facilidad de transporte.
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
              Su diseño elegante y materiales de calidad garantizan una imagen
              profesional y atractiva.
            </p>
          </div>
        </div>
      </section>

      <section className="technical-specs">
        <h2>Especificaciones técnicas</h2>
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
                  className={selectedSize === size.size ? "highlighted" : ""}
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
      </section>
      <QuotationPopup
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
        productName={"Gazebo Aluminio HEX 50"}
        selectedSize={selectedSize}
        selectedColor={selectedColor}
      />
      <Footer />
    </div>
  );
};

export default Hex50Screen