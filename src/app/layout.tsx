import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/components/Cart/CartContext";

export const metadata: Metadata = {
  title: "Carpas plegables hexagonales resistentes BigFoot Ultra - CarpaPro®",
  description: "Carpa plegable con estructura de pie hexagonal de 50 mm. Fabricada con componentes de alta calidad, perfecta para todo tipo de eventos y mercadillos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <CartProvider>
        {children}
        </CartProvider>
      </body>
    </html>
  );
}
