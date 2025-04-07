'use client'
import ProductCard from '@/components/Card/Card';
import HeroSection from '@/components/Hero/HeroSection';
import Image from 'next/image';
import Link from 'next/link';



import { Feature } from "@/components/Feature/Feature";
import { AboutUs } from "@/components/AboutUs/AboutUs";
import { Contact } from "@/components/Contact/Contact";
import InteractiveBentoGallery from "@/components/Gallery/Gallery";
import CartButton from "@/components/Cart/CartButton";
import Footer from "@/components/Footer/Footer";

const mediaItems = [
  {
    id: 1,
    type: "image",
    title: "Anurag Mishra",
    desc: "Driven, innovative, visionary",
    url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    span: "md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2",
  },
  {
    id: 2,
    type: "video",
    title: "Dog Puppy",
    desc: "Adorable loyal companion.",
    url: "https://cdn.pixabay.com/video/2024/07/24/222837_large.mp4",
    span: "md:col-span-2 md:row-span-2 col-span-1 sm:col-span-2 sm:row-span-2",
  },
  {
    id: 3,
    type: "image",
    title: "Forest Path",
    desc: "Mystical forest trail",
    url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
    span: "md:col-span-1 md:row-span-3 sm:col-span-2 sm:row-span-2 ",
  },
  {
    id: 4,
    type: "image",
    title: "Falling Leaves",
    desc: "Autumn scenery",
    url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    span: "md:col-span-2 md:row-span-2 sm:col-span-1 sm:row-span-2 ",
  },
  {
    id: 5,
    type: "video",
    title: "Bird Parrot",
    desc: "Vibrant feathered charm",
    url: "https://cdn.pixabay.com/video/2020/07/30/46026-447087782_large.mp4",
    span: "md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2 ",
  },
  {
    id: 6,
    type: "image",
    title: "Beach Paradise",
    desc: "Sunny tropical beach",
    url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    span: "md:col-span-2 md:row-span-2 sm:col-span-1 sm:row-span-2 ",
  },
  {
    id: 7,
    type: "video",
    title: "Shiva Temple",
    desc: "Peaceful Shiva sanctuary.",
    url: "https://cdn.pixabay.com/video/2020/05/25/40130-424930032_large.mp4",
    span: "md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2 ",
  },
];

export default function Home() {
  return (
    <div>
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
                <Link href="#" scroll={false}>
                  Información
                </Link>
              </li>
              <li>
                <Link href="#" scroll={false}>
                  Productos
                </Link>
              </li>
              <li>
                <Link href="#" scroll={false}>
                  Contacto
                </Link>
              </li>
              <li>
                <CartButton />
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main>
        <HeroSection
          title="Gazebos Portátiles Premium"
          subtitle="Soluciones versátiles para exteriores que combinan funcionalidad y estilo."
          ctaText="Ver mas variedades"
          ctaAction={() => console.log("CTA Clicked")}
        />

        <Feature />
        <InteractiveBentoGallery
          mediaItems={mediaItems}
          title="Gallery Shots Collection"
          description="Drag and explore our curated collection of shots"
        />
        <AboutUs />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
