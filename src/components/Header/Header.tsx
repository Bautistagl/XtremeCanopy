import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import CartButton from '../Cart/CartButton'; 
import "./Header.css"; // Import your CSS file for styling

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Añade estado de carga

  // Check if window is defined (to avoid SSR issues)
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setIsMenuOpen(false);
      }
    };

    // Set initial value
    handleResize();
    setIsLoading(false); // Marcar como cargado

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // No mostrar nada mientras carga para evitar el parpadeo
  if (isLoading) return null;

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo-menu-container">
          <Link href="/" className="logo">
            <Image
              src="/images/blackLogo.jpeg"
              alt="CarpaPro logo"
              width={150}
              height={40}
            />
          </Link>
          {isMobile && (
            <button
              className="hamburger-button"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <span
                className={`hamburger-icon ${isMenuOpen ? "open" : ""}`}
              ></span>
            </button>
          )}
        </div>

        <nav
          className={`nav-menu ${isMobile ? "mobile" : ""} ${
            isMenuOpen ? "open" : ""
          }`}
        >
          <ul>
            <li>
              <Link href="/" onClick={() => isMobile && setIsMenuOpen(false)}>
                Inicio
              </Link>
            </li>
            <li>
              <Link
                href="/Hex40"
                scroll={false}
                onClick={() => isMobile && setIsMenuOpen(false)}
              >
                GAZEBO LITE SERIES HEX 40
              </Link>
            </li>
            <li>
              <Link
                href="/Hex50"
                scroll={false}
                onClick={() => isMobile && setIsMenuOpen(false)}
              >
                GAZEBO PRO SERIES HEX 50
              </Link>
            </li>
            <li>
              <Link
                href="/comparador"
                scroll={false}
                onClick={() => isMobile && setIsMenuOpen(false)}
              >
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
  );
};

export default Header;