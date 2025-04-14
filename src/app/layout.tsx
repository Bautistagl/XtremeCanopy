import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/components/Cart/CartContext";

export const metadata: Metadata = {
  title: "Xtreme Canopy - Gazebos Premium",
  description:
    "Soluciones versátiles para exteriores que combinan funcionalidad y estilo.",

  openGraph: {
    title: "Xtreme Canopy - Gazebos Premium",
    description:
      "Soluciones versátiles para exteriores que combinan funcionalidad y estilo.",
    images: [
      {
        url: "/images/whiteLogo.jpeg",
        width: 1200,
        height: 630,
        alt: "Xtreme Canopy - Gazebos Premium",
      },
    ],
    siteName: "Xtreme Canopy",
    locale: "es_ES",
    type: "website",
  },

  icons: {
    icon: "/images/favicon.ico",
  },

  keywords:
    "carpas plegables, carpas hexagonales, carpas para eventos, carpas profesionales, carpapro",
  authors: [{ name: "Xtreme Canopy" }],
  creator: "Xtreme Canopy",
  publisher: "Xtreme Canopy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}