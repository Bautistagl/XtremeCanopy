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
    title: "HEX 50",
    desc: "Driven, innovative, visionary",
    url: "/images/picLand.jpg",
    span: "md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2",
  },
  {
    id: 2,
    type: "image",
    title: "HEX 50",
    desc: "Adorable loyal companion.",
    url: "/images/picLand3.JPG",
    span: "md:col-span-2 md:row-span-2 col-span-1 sm:col-span-2 sm:row-span-2",
  },
  {
    id: 3,
    type: "image",
    title: "HEX 40",
    desc: "Mystical forest trail",
    url: "/images/picLand2.jpg",
    span: "md:col-span-1 md:row-span-3 sm:col-span-2 sm:row-span-2 ",
  },
  {
    id: 4,
    type: "image",
    title: "HEX 50",
    desc: "Autumn scenery",
    url: "/images/picLand4.JPG",
    span: "md:col-span-2 md:row-span-2 sm:col-span-1 sm:row-span-2 ",
  },
  {
    id: 5,
    type: "image",
    title: "HEX 40",
    desc: "Vibrant feathered charm",
    url: "/images/picLand5.JPG",
    span: "md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2 ",
  },
  {
    id: 6,
    type: "image",
    title: "HEX 50",
    desc: "Sunny tropical beach",
    url: "/images/picLand6.JPG",
    span: "md:col-span-2 md:row-span-2 sm:col-span-1 sm:row-span-2 ",
  },
  {
    id: 7,
    type: "image",
    title: "HEX 40",
    desc: "Peaceful Shiva sanctuary.",
    url: "/images/picLand3.JPG",
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
                <Link href="/Hex40" scroll={false}>
                  Hex 40
                </Link>
              </li>
              <li>
                <Link href="/Hex50" scroll={false}>
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
          title=""
          description=""
        />
        <AboutUs />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
