'use client'
import ProductCard from '@/components/Card/Card';
import HeroSection from '@/components/Hero/HeroSection';
import Image from 'next/image';
import Link from 'next/link';



import { Feature } from "@/components/Feature/Feature";
import { AboutUs } from "@/components/AboutUs/AboutUs";
import { Contact } from "@/components/Contact/Contact";
import CartButton from "@/components/Cart/CartButton";
import Footer from "@/components/Footer/Footer";
import MainHeroSection from "@/components/Hero/MainHero";
import ProductsGrid, { Product } from "@/components/Gallery/Gallery";
import Header from "@/components/Header/Header";
import GalleryComponent from "@/components/NewGallery/GalleryComp";

const mockProducts: Product[] = [
  {
    id: "1",
    name: "Hex 40",
    imageUrl: "/images/picLand.jpg",
    price: 29.99,
    slug: "Hex50",
    subtitle: "3x3 Verde",
  },
  {
    id: "2",
    name: "Hex 40",
    imageUrl: "/images/picLand2.jpg",
    price: 39.99,
    slug: "Hex 50",
    subtitle: "3x3 Naranja",
  },
  {
    id: "3",
    name: "Hex 50",
    imageUrl: "/images/picLand3.JPG",
    price: 49.99,
    slug: "Hex50",
    subtitle: "3x4.5 Azul",
  },
  {
    id: "4",
    name: "Hex 50",
    imageUrl: "/images/picLand4.JPG",
    price: 59.99,
    slug: "Hex50",
    subtitle: "3x4.5 Azul",
  },
  {
    id: "5",
    name: "Hex 40",
    imageUrl: "/images/gaze6.jpg",
    price: 69.99,
    slug: "Hex40",
    subtitle: "Hexagonal Blanco",
  },
  {
    id: "6",
    name: "Hex 40",
    imageUrl: "/images/gaze2.jpg",
    price: 79.99,
    slug: "Hex40",
    subtitle: "Hexagonal Negro",
  },
];
const galleryItems = [
  {
    id: 1,
    type: "image" as const,
    url: "/images/detalles5.jpeg",
    thumbnail: "/images/detalles5.jpeg",
    title: "Gazebo Pro Series 3x3 Hex 50",
    description: "",
  },
  {
    id: 2,
    type: "image" as const,
    url: "/images/3x4.5tmbAzul.JPG",
    thumbnail: "/images/3x4.5tmbAzul.JPG",
    title: "Gazebo 3x4.5 Pro Series Hex 50 ",
    description: "",
  },
  {
    id: 3,
    type: "video" as const,
    url: "/videos/video_vertical_optimizado.mp4",
    thumbnail: "/images/3x4.5tmbAzul.JPG",
    title: "Interior 3x4.5 Hex 50",
    description: "",
  },
  {
    id: 4,
    type: "image" as const,
    url: "/images/fotoMision.jpg",
    thumbnail: "/images/fotoMision.jpg",
    title: "Gazebo Hexagonal Hex 40",
    description: "",
  },
  {
    id: 5,
    type: "image" as const,
    url: "/images/detalles4.jpg",
    thumbnail: "/images/detalles4.jpg",
    title: "Gazebo 3x6 Lite Series ",
    description: "",
  },
  {
    id: 7,
    type: "image" as const,
    url: "/images/3x6tmbBlanco.jpeg",
    thumbnail: "/images/3x6tmbBlanco.jpeg",
    title: "Gazebo 3x6 Lite Series ",
    description: "",
  },
  {
    id: 6,
    type: "video" as const,
    url: "/videos/detalles.mp4",
    thumbnail: "/images/detalletmb.JPG",
    title: "Detalles",
    description: "",
  },
  {
    id: 8,
    type: "video" as const,
    url: "/videos/detalles3.mp4",
    thumbnail: "/images/detalles3tmb.JPG",
    title: "Detalles",
    description: "",
  },
  {
    id: 9,
    type: "video" as const,
    url: "/videos/detalles2.mp4",
    thumbnail: "/images/detalles2tmb.JPG",
    title: "Detalles",
    description: "",
  },
  {
    id: 10,
    type: "video" as const,
    url: "/videos/detalles4.mp4",
    thumbnail: "/images/detalles4tmb.png",
    title: "Detalles",
    description: "",
  },
  {
    id: 11,
    type: "video" as const,
    url: "/videos/detalles5.mp4",
    thumbnail: "/images/detalles5tmb.png",
    title: "Detalles",
    description: "",
  },
  {
    id: 12,
    type: "video" as const,
    url: "/videos/detalles6.mp4",
    thumbnail: "/images/detalles6tmb.png",
    title: "Detalles",
    description: "",
  },
  {
    id: 13,
    type: "video" as const,
    url: "/videos/detalles7.mp4",
    thumbnail: "/images/detalles7tmb.png",
    title: "Detalles",
    description: "",
  },
  {
    id: 14,
    type: "video" as const,
    url: "/videos/detalles8.mp4",
    thumbnail: "/images/detalles8tmb.png",
    title: "Detalles",
    description: "",
  },
  {
    id: 15,
    type: "video" as const,
    url: "/videos/galeria10.mp4",
    thumbnail: "/images/galeria10tmb.png",
    title: "Detalles",
    description: "",
  },
  {
    id: 16,
    type: "image" as const,
    url: "/images/fotogaleria1.jpg",
    thumbnail: "/images/fotogaleria1.JPG",
    title: "",
    description: "",
  },
  {
    id: 17,
    type: "image" as const,
    url: "/images/fotogaleria2.JPG",
    thumbnail: "/images/fotogaleria2.JPG",
    title: "",
    description: "",
  },
  {
    id: 18,
    type: "image" as const,
    url: "/images/fotogaleria3.JPG",
    thumbnail: "/images/fotogaleria3.JPG",
    title: "",
    description: "",
  },
  {
    id: 19,
    type: "image" as const,
    url: "/images/fotogaleria4.JPG",
    thumbnail: "/images/fotogaleria4.JPG",
    title: "",
    description: "",
  },
  {
    id: 20,
    type: "image" as const,
    url: "/images/fotogaleria5.JPG",
    thumbnail: "/images/fotogaleria5.JPG",
    title: "",
    description: "",
  },
  {
    id: 21,
    type: "image" as const,
    url: "/images/fotogaleria6.JPG",
    thumbnail: "/images/fotogaleria6.JPG",
    title: "",
    description: "",
  },
  {
    id: 22,
    type: "image" as const,
    url: "/images/fotogaleria7.JPG",
    thumbnail: "/images/fotogaleria7.JPG",
    title: "",
    description: "",
  },
  {
    id: 23,
    type: "image" as const,
    url: "/images/fotogaleria8.JPG",
    thumbnail: "/images/fotogaleria8.JPG",
    title: "",
    description: "",
  },
  {
    id: 24,
    type: "image" as const,
    url: "/images/fotogaleria10.JPG",
    thumbnail: "/images/fotogaleria10.JPG",
    title: "",
    description: "",
  },
  {
    id: 25,
    type: "image" as const,
    url: "/images/fotogaleria11.JPG",
    thumbnail: "/images/fotogaleria11.JPG",
    title: "",
    description: "",
  },
];

export default function Home() {
  return (
    <div>
      <Header />

      <main>
        <div className="background-gradient">
          <MainHeroSection
            title="Gazebos Portátiles Premium"
            subtitle="Soluciones versátiles para exteriores que combinan funcionalidad y estilo."
            catalogButtonText="GAZEBO LITE SERIES HEX 40"
            contactButtonText="GAZEBO PRO SERIES HEX 50"
            catalogLink="/catalogo"
            contactLink="/contacto"
          />
          <section className="size-banners-section">
            <div className="size-banners-group">
              <div className="size-banners-group-header">
                <span className="size-banners-series-tag">Lite Series</span>
                <h2 className="size-banners-group-title">Gazebo HEX 40</h2>
              </div>
              <div className="size-banners-grid">
                {[
                  {
                    size: "3x3",
                    param: "3x3",
                    img: "/images/colores/3x3/black/main.png",
                  },
                  {
                    size: "3x4.5",
                    param: "3x4.5",
                    img: "/images/colores/3x4.5/black/main.png",
                  },
                  {
                    size: "3x6",
                    param: "3x6",
                    img: "/images/colores/3x6/black/main.png",
                  },
                  {
                    size: "6 Lados",
                    param: "Hexagonal",
                    img: "/images/colores/Hexagonal/black/main.png",
                  },
                ].map(({ size, param, img }) => (
                  <Link
                    key={size}
                    href={`/Hex40?size=${param}`}
                    className="size-banner"
                  >
                    <Image
                      src={img}
                      alt={`Gazebo HEX 40 ${size}`}
                      fill
                      className="size-banner-img"
                    />
                    <div className="size-banner-overlay" />
                    <span className="size-banner-label">{size}</span>
                    <span className="size-banner-cta">Ver modelo →</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="size-banners-group">
              <div className="size-banners-group-header">
                <span className="size-banners-series-tag pro">Pro Series</span>
                <h2 className="size-banners-group-title">Gazebo HEX 50</h2>
              </div>
              <div className="size-banners-grid three-col">
                {[
                  { size: "3x3", img: "/images/colores/3x3/black/main.png" },
                  {
                    size: "3x4.5",
                    img: "/images/colores/3x4.5/black/main.png",
                  },
                  { size: "3x6", img: "/images/colores/3x6/black/main.png" },
                ].map(({ size, img }) => (
                  <Link
                    key={size}
                    href={`/Hex50?size=${size}`}
                    className="size-banner"
                  >
                    <Image
                      src={img}
                      alt={`Gazebo HEX 50 ${size}`}
                      fill
                      className="size-banner-img"
                    />
                    <div className="size-banner-overlay" />
                    <span className="size-banner-label">{size}</span>
                    <span className="size-banner-cta">Ver modelo →</span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
          <HeroSection
            title="Gazebos Portátiles Premium"
            subtitle="Soluciones versátiles para exteriores que combinan funcionalidad y estilo."
            ctaText="Descubrir más modelos"
            ctaAction={() => console.log("CTA Clicked")}
          />
        </div>

        <Feature />
        {/* <ProductsGrid title="Nuestros Productos" products={mockProducts} /> */}
        {/* <AboutUs /> */}
        <GalleryComponent
          items={galleryItems}
          subtitle="Muestra de algunos trabajos realizados"
        />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
