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
            catalogButtonText="Hex 40"
            contactButtonText="Hex 50"
            catalogLink="/catalogo"
            contactLink="/contacto"
          />
          <HeroSection
            title="Gazebos Portátiles Premium"
            subtitle="Soluciones versátiles para exteriores que combinan funcionalidad y estilo."
            ctaText="Descubrir más modelos"
            ctaAction={() => console.log("CTA Clicked")}
          />
        </div>

        <Feature />
        <ProductsGrid title="Nuestros Productos" products={mockProducts} />
        <AboutUs />
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
