// components/Footer.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import './Footer.css'; 


const Footer: React.FC = () => {
  return (
    <footer className="xtreme-footer">
      <div className="footer-container">
        <div className="footer-column company-info">
          <Image
            src="/images/whiteLogo.jpeg"
            alt="Xtreme Logo"
            width={150}
            height={60}
            className="footer-logo"
          />
          <p className="company-description">
            Especialistas en gazebos de aluminio de alta calidad para eventos,
            ferias y uso profesional.
          </p>
          <div className="social-media">
            <Link
              href="https://facebook.com/XtremeCanopy"
              aria-label="Facebook"
            >
              <Image
                src="/images/fb.png"
                alt="Instagram"
                width={20}
                height={20}
              />
            </Link>
            <Link
              href="https://instagram.com/xtremecanopy"
              aria-label="Instagram"
            >
              <Image
                src="/images/ig.png"
                alt="Instagram"
                width={20}
                height={20}
              />
            </Link>
          </div>
        </div>

        <div className="footer-column">
          <h3>Productos</h3>
          <ul className="footer-links">
            <li>
              <Link href="/Hex40">Gazebos Aluminio HEX 40</Link>
            </li>
            <li>
              <Link href="/Hex50">Gazebos Aluminio HEX 50</Link>
            </li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>Contacto</h3>
          <ul className="contact-info">
            <li>
              <i className="fa fa-map-marker"></i>
              Dirección: Calle Principal #123, Ciudad
            </li>
            <li>
              <Link
                href="wa.me/message/FG66CJRMFEXMD1"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa fa-phone"></i>
                Teléfono: +34 9 2235 5847
              </Link>
            </li>
            <li>
              <i className="fa fa-envelope"></i>
              Email:{" "}
              <Link href="mailto:contacto@xtreme.com">contacto@xtreme.com</Link>
            </li>
            <li>
              <i className="fa fa-clock-o"></i>
              Horario: Lun-Vie: 9:00-18:00
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="copyright">
          © {new Date().getFullYear()} Xtreme Canopy. Todos los derechos
          reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;