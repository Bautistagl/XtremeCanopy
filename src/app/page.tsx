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

const mockProducts: Product[] = [
  {
    id: "1",
    name: "Hex 40",
    imageUrl: "/images/picLand.jpg",
    price: 29.99,
    slug: "Hex40",
    subtitle: "3x3 Verde",
  },
  {
    id: "2",
    name: "Hex 40",
    imageUrl: "/images/picLand2.jpg",
    price: 39.99,
    slug: "Hex40",
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
            ctaText="Ver mas variedades"
            ctaAction={() => console.log("CTA Clicked")}
          />
        </div>

        <Feature />
        <ProductsGrid title="Nuestros Productos" products={mockProducts} />
        <AboutUs />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
