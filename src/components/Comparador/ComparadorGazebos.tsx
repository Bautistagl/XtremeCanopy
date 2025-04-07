// components/ComparadorGazebos.tsx
import React, { useState } from 'react';
import styles from './ComparadorGazebos.module.css';
import Image from 'next/image';
import Link from 'next/link';

import "../../app/Hex40/Detalle.css"

interface ModeloGazebo {
  id: string;
  nombre: string;
  categoria: string;
  tamanos: string[];
  perfilPies: string;
  techo: string;
  tratamiento: string;
  piezasUnion: string;
  peso: number[];
  medidasDisponibles: string[];
  resistencia: number;
  ajuste: string;
  lonaPVC: boolean;
  colores: string[];
  aperturaCierre: number;
  usoRecomendado: string;
  usoModular: boolean;
  panelesLaterales: string;
  confeccion: boolean;
  garantia: boolean;
  envioGratis: boolean;
}

const ComparadorGazebos: React.FC = () => {
  const [modelosSeleccionados, setModelosSeleccionados] = useState<string[]>(['hex40', 'hex60']);

  const modelos: ModeloGazebo[] = [

    {
      id: 'hex40',
      nombre: 'HEX 40',
      categoria: 'Ligera y básica',
      tamanos: ['3x3', '3x4.5', '3x6', 'Hexagonal'],
      perfilPies: '45 x 2 mm ',
      techo: 'Poliéster 100% impermeable, recubierta de PVC',
      tratamiento: 'Aluminio gama media',
      piezasUnion: 'Nylon alta densidad',
      peso: [23, 29, 41, 79],
      medidasDisponibles: ['3x3', '3x4.5', '3x6', 'Hexagonal'],
      resistencia: 3,
      ajuste: 'Sistema de botón para regular la altura',
      lonaPVC: true,
      colores: ['blanco', 'negro', 'rojo', 'azul', 'amarillo', 'verde'],
      aperturaCierre: 30,
      usoRecomendado: 'Uso esporádico no profesional',
      usoModular: true,
      panelesLaterales: 'Paredes: 2, 3 y 4 m',
      confeccion: true,
      garantia: true,
      envioGratis: true,

    },
    {
      id: 'light',
      nombre: 'HEX 50',
      categoria: 'Resistente',
      tamanos: ['3x3', '3x4.5', '3x6'],
      perfilPies: '58 x 2 mm',
      techo: 'Poliéster 100% impermeable, recubierta de PVC',
      tratamiento: 'Aluminio de gama alta',
      piezasUnion: 'Nylon alta densidad, reforzadas con piezas de extrusión de aluminio',
      peso: [32, 45, 62],
      medidasDisponibles: ['3x3', '3x4.5', '3x6'],
      resistencia: 5,
      ajuste: 'Sistema de anillo para regular altura ',
      lonaPVC: true,
      colores: ['blanco', 'negro', 'rojo', 'azul', 'amarillo', 'verde'],
      aperturaCierre: 30,
      usoRecomendado: 'Uso ocasional o profesional',
      usoModular: true,
      panelesLaterales: 'Paredes: 2, 3 y 4 m',
      confeccion: true,
      garantia: true,
      envioGratis: true,
    }
  ];

  const toggleModeloSeleccionado = (id: string) => {
    if (modelosSeleccionados.includes(id)) {
      setModelosSeleccionados(modelosSeleccionados.filter(modelo => modelo !== id));
    } else {
      setModelosSeleccionados([...modelosSeleccionados, id]);
    }
  };

  const renderResistencia = (nivel: number) => {
    const maxEstrellas = 5;
    return (
      <div className={styles.resistenciaContainer}>
        {Array.from({ length: maxEstrellas }).map((_, index) => (
          <span 
            key={index} 
            className={`${styles.estrella} ${index < nivel ? styles.estrellaActiva : ''}`}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  const renderPopularidad = (nivel: number) => {
    const maxPuntos = 5;
    return (
      <div className={styles.popularidadContainer}>
        {Array.from({ length: maxPuntos }).map((_, index) => (
          <span 
            key={index} 
            className={`${styles.punto} ${index < nivel ? styles.puntoActivo : ''}`}
          >
            •
          </span>
        ))}
      </div>
    );
  };

  const renderColores = (colores: string[]) => {
    return (
      <div className={styles.coloresContainer}>
        {colores.map(color => (
          <span 
            key={color} 
            className={styles.colorCirculo}
            style={{ 
              backgroundColor: color === 'blanco' ? '#FFFFFF' : 
                              color === 'negro' ? '#000000' : 
                              color === 'rojo' ? '#FF0000' : 
                              color === 'azul' ? '#0088FF' : 
                              color === 'amarillo' ? '#FFCC00' : 
                              color === 'verde' ? '#00AA44' : '#CCCCCC',
              border: color === 'blanco' ? '1px solid #DDDDDD' : 'none'
            }}
          ></span>
        ))}
      </div>
    );
  };

  return (
    <div className={styles.comparadorContainer}>
      <header className="header">
        <Link href="/">
          <div className="logo">
            <Image
              height={100}
              width={150}
              src="/images/blackLogo.jpeg"
              alt="Xtreme Logo"
            />
          </div>
        </Link>
        <nav className="navigation">
          <ul>
            <li>
              <Link href="/">Inicio</Link>
            </li>
            <li>
              <Link href="#">Información</Link>
            </li>
            <li>
              <Link href="#">Productos</Link>
            </li>
            <li>
              <Link href="#">Contacto</Link>
            </li>
          </ul>
        </nav>
      </header>
      <div className={styles.header}>
        <h1 className={styles.title}>COMPARADOR DE GAZEBOS PLEGABLES</h1>
        <p className={styles.subtitle}>
          ¿Dudas entre más de un modelo de gazebo?
        </p>
        <p className={styles.description}>
          Ahorra tiempo con el comparador que te ayudará a decidir
        </p>
      </div>

      <div className={styles.selectorModelos}>
        {modelos.map((modelo) => (
          <div
            key={modelo.id}
            className={`${styles.selectorModelo} ${
              modelosSeleccionados.includes(modelo.id)
                ? styles.modeloSeleccionado
                : ""
            }`}
            onClick={() => toggleModeloSeleccionado(modelo.id)}
          >
            <div className={styles.categoriaModelo}>{modelo.categoria}</div>
            <div className={styles.nombreModelo}>{modelo.nombre}</div>
            <button
              className={`${styles.botonSeleccionar} ${
                modelosSeleccionados.includes(modelo.id)
                  ? styles.botonSeleccionado
                  : ""
              }`}
            >
              {modelosSeleccionados.includes(modelo.id)
                ? "SELECCIONADO"
                : "COMPARAR"}
            </button>
          </div>
        ))}
      </div>

      <div className={styles.tablaComparativa}>
        <table className={styles.tabla}>
          <thead>
            <tr>
              <th className={styles.caracteristicaHeader}>Características</th>
              {modelos
                .filter((modelo) => modelosSeleccionados.includes(modelo.id))
                .map((modelo) => (
                  <th key={modelo.id} className={styles.modeloHeader}>
                    <div className={styles.modeloHeaderContent}>
                      <div className={styles.modeloCategoria}>
                        {modelo.categoria}
                      </div>
                      <div className={styles.modeloNombre}>{modelo.nombre}</div>
                    </div>
                  </th>
                ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className={styles.caracteristicaName}>Pies de fijación</td>
              {modelos
                .filter((modelo) => modelosSeleccionados.includes(modelo.id))
                .map((modelo) => (
                  <td key={modelo.id} className={styles.modeloData}>
                    {modelo.perfilPies}
                  </td>
                ))}
            </tr>
            <tr>
              <td className={styles.caracteristicaName}>Techo</td>
              {modelos
                .filter((modelo) => modelosSeleccionados.includes(modelo.id))
                .map((modelo) => (
                  <td key={modelo.id} className={styles.modeloData}>
                    {modelo.techo}
                  </td>
                ))}
            </tr>
            <tr>
              <td className={styles.caracteristicaName}>
                Tratamiento superficie color
              </td>
              {modelos
                .filter((modelo) => modelosSeleccionados.includes(modelo.id))
                .map((modelo) => (
                  <td key={modelo.id} className={styles.modeloData}>
                    {modelo.tratamiento}
                  </td>
                ))}
            </tr>
            <tr>
              <td className={styles.caracteristicaName}>Piezas de unión</td>
              {modelos
                .filter((modelo) => modelosSeleccionados.includes(modelo.id))
                .map((modelo) => (
                  <td key={modelo.id} className={styles.modeloData}>
                    {modelo.piezasUnion}
                  </td>
                ))}
            </tr>
            <tr>
              <td className={styles.caracteristicaName}>Sistema de ajuste</td>
              {modelos
                .filter((modelo) => modelosSeleccionados.includes(modelo.id))
                .map((modelo) => (
                  <td key={modelo.id} className={styles.modeloData}>
                    {modelo.ajuste}
                  </td>
                ))}
            </tr>
            <tr>
              <td className={styles.caracteristicaName}>Peso </td>
              {modelos
                .filter((modelo) => modelosSeleccionados.includes(modelo.id))
                .map((modelo, index) => (
                  <td key={modelo.id} className={styles.modeloData}>
                    <div className={styles.pesoContainer}>
                      {modelo.peso.map((p, i) => (
                        <div key={i} className={styles.pesoItem}>
                          <span className={styles.pesoValor}>{p} kg</span>
                          <span className={styles.pesoTamano}>
                            ({modelo.tamanos[i]})
                          </span>
                        </div>
                      ))}
                    </div>
                  </td>
                ))}
            </tr>
            <tr>
              <td className={styles.caracteristicaName}>Medidas disponibles</td>
              {modelos
                .filter((modelo) => modelosSeleccionados.includes(modelo.id))
                .map((modelo) => (
                  <td key={modelo.id} className={styles.modeloData}>
                    {modelo.medidasDisponibles.join(", ")}
                  </td>
                ))}
            </tr>
            <tr>
              <td className={styles.caracteristicaName}>Resistencia</td>
              {modelos
                .filter((modelo) => modelosSeleccionados.includes(modelo.id))
                .map((modelo) => (
                  <td key={modelo.id} className={styles.modeloData}>
                    {renderResistencia(modelo.resistencia)}
                  </td>
                ))}
            </tr>
            <tr>
              <td className={styles.caracteristicaName}>
                Lona con revestimiento PVC
              </td>
              {modelos
                .filter((modelo) => modelosSeleccionados.includes(modelo.id))
                .map((modelo) => (
                  <td key={modelo.id} className={styles.modeloData}>
                    {modelo.lonaPVC ? "✓" : "✗"}
                  </td>
                ))}
            </tr>
            <tr>
              <td className={styles.caracteristicaName}>Colores</td>
              {modelos
                .filter((modelo) => modelosSeleccionados.includes(modelo.id))
                .map((modelo) => (
                  <td key={modelo.id} className={styles.modeloData}>
                    {renderColores(modelo.colores)}
                  </td>
                ))}
            </tr>
            <tr>
              <td className={styles.caracteristicaName}>Uso recomendado</td>
              {modelos
                .filter((modelo) => modelosSeleccionados.includes(modelo.id))
                .map((modelo) => (
                  <td key={modelo.id} className={styles.modeloData}>
                    {modelo.usoRecomendado}
                  </td>
                ))}
            </tr>

            <tr>
              <td className={styles.caracteristicaName}>
                Confección con altos estándares
              </td>
              {modelos
                .filter((modelo) => modelosSeleccionados.includes(modelo.id))
                .map((modelo) => (
                  <td key={modelo.id} className={styles.modeloData}>
                    {modelo.confeccion ? "✓" : "✗"}
                  </td>
                ))}
            </tr>
            <tr>
              <td className={styles.caracteristicaName}>
                Garantía y servicio post-venta
              </td>
              {modelos
                .filter((modelo) => modelosSeleccionados.includes(modelo.id))
                .map((modelo) => (
                  <td key={modelo.id} className={styles.modeloData}>
                    {modelo.garantia ? "✓" : "✗"}
                  </td>
                ))}
            </tr>
            <tr>
              <td className={styles.caracteristicaName}>
                Envío incluido gratis
              </td>
              {modelos
                .filter((modelo) => modelosSeleccionados.includes(modelo.id))
                .map((modelo) => (
                  <td key={modelo.id} className={styles.modeloData}>
                    {modelo.envioGratis ? "✓" : "✗"}
                  </td>
                ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComparadorGazebos;