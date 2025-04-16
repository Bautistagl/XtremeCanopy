// Interfaces para tipar correctamente las imágenes
export interface ThumbnailImage {
    src: string;
    alt: string;
  }
  
  export interface ColorImages {
    main: string;
    thumbnails: ThumbnailImage[];
  }
  
  export interface SizeImages {
    [color: string]: ColorImages;
  }
  
  export interface GazeboImages {
    [size: string]: SizeImages;
  }
  
  // Definición de imágenes por tamaño y color
  export const imagesBySize: GazeboImages = {
    "3x3": {
      black: {
        main: "/images/medidas/3x3Negro.png",
        thumbnails: [
          {
            src: "/images/3x3tmbNegro.jpeg",
            alt: "Gazebo 3x3 Negro - Vista 1",
          },
          {
            src: "/images/medidas/3x3Negro.png",
            alt: "Gazebo 3x3 Negro - Vista 1",
          },
          {
            src: "/images/info/3x3Info.png",
            alt: "Gazebo 3x3 Negro - Vista 1",
          },
          {
            src: "/images/info/Hex40Info.png",
            alt: "Gazebo 3x3 Negro - Vista 1",
          },
        ],
      },
      white: {
        main: "/images/medidas/3x3Blanco.png",
        thumbnails: [
          {
            src: "/images/medidas/3x3Blanco.png",
            alt: "Gazebo 3x3 Blanco - Vista 1",
          },
          {
            src: "/images/info/3x3Info.png",
            alt: "Gazebo 3x3 Negro - Vista 1",
          },
          {
            src: "/images/info/Hex40Info.png",
            alt: "Gazebo 3x3 Negro - Vista 1",
          },
        ],
      },
      red: {
        main: "/images/medidas/3x3Rojo.png",
        thumbnails: [
          {
            src: "/images/medidas/3x3Rojo.png",
            alt: "Gazebo 3x3 Rojo - Vista 1",
          },
          {
            src: "/images/info/3x3Info.png",
            alt: "Gazebo 3x3 Negro - Vista 1",
          },
          {
            src: "/images/info/Hex40Info.png",
            alt: "Gazebo 3x3 Negro - Vista 1",
          },
        ],
      },
      blue: {
        main: "/images/medidas/3x3Azul.png",
        thumbnails: [
          {
            src: "/images/medidas/3x3Azul.png",
            alt: "Gazebo 3x3 Azul - Vista 1",
          },
          {
            src: "/images/info/3x3Info.png",
            alt: "Gazebo 3x3 Negro - Vista 1",
          },
          {
            src: "/images/info/Hex40Info.png",
            alt: "Gazebo 3x3 Negro - Vista 1",
          },
        ],
      },
      "rgb(255, 110, 0)": {
        main: "/images/medidas/3x3Naranja.png",
        thumbnails: [
          {
            src: "/images/medidas/3x3Naranja.png",
            alt: "Gazebo 3x3 Naranja - Vista 1",
          },
          {
            src: "/images/info/3x3Info.png",
            alt: "Gazebo 3x3 Negro - Vista 1",
          },
          {
            src: "/images/info/Hex40Info.png",
            alt: "Gazebo 3x3 Negro - Vista 1",
          },
        ],
      },
      green: {
        main: "/images/medidas/3x3Verde.png",
        thumbnails: [
          {
            src: "/images/medidas/3x3Verde.png",
            alt: "Gazebo 3x3 Verde - Vista 1",
          },
          {
            src: "/images/info/3x3Info.png",
            alt: "Gazebo 3x3 Negro - Vista 1",
          },
          {
            src: "/images/info/Hex40Info.png",
            alt: "Gazebo 3x3 Negro - Vista 1",
          },
        ],
      },
    },
    "3x4.5": {
      black: {
        main: "/images/medidas/3x4.5Negro.png",
        thumbnails: [
          {
            src: "/images/medidas/3x4.5Negro.png",
            alt: "Gazebo 3x4.5 Negro - Vista 1",
          },
          {
            src: "/images/info/3x4.5Info.png",
            alt: "Gazebo 3x3 Negro - Vista 1",
          },
          {
            src: "/images/info/Hex40Info.png",
            alt: "Gazebo 3x3 Negro - Vista 1",
          },
        ],
      },
      white: {
        main: "/images/medidas/3x4.5Blanco.png",
        thumbnails: [
          {
            src: "/images/medidas/3x4.5Blanco.png",
            alt: "Gazebo 3x4.5 Blanco - Vista 1",
          },
          {
            src: "/images/info/3x4.5Info.png",
            alt: "Gazebo 3x3 Negro - Vista 1",
          },
          {
            src: "/images/info/Hex40Info.png",
            alt: "Gazebo 3x3 Negro - Vista 1",
          },
        ],
      },
      red: {
        main: "/images/medidas/3x4.5Rojo.png",
        thumbnails: [
          {
            src: "/images/medidas/3x4.5Rojo.png",
            alt: "Gazebo 3x4.5 Rojo - Vista 1",
          },
          {
            src: "/images/info/3x4.5Info.png",
            alt: "Gazebo 3x3 Negro - Vista 1",
          },
          {
            src: "/images/info/Hex40Info.png",
            alt: "Gazebo 3x3 Negro - Vista 1",
          },
        ],
      },
      blue: {
        main: "/images/medidas/3x4.5Azul.png",
        thumbnails: [
          {
            src: "/images/medidas/3x4.5Azul.png",
            alt: "Gazebo 3x4.5 Azul - Vista 1",
          },
          {
            src: "/images/info/3x4.5Info.png",
            alt: "Gazebo 3x3 Negro - Vista 1",
          },
          {
            src: "/images/info/Hex40Info.png",
            alt: "Gazebo 3x3 Negro - Vista 1",
          },
        ],
      },
      "rgb(255, 110, 0)": {
        main: "/images/medidas/3x4.5Naranja.png",
        thumbnails: [
          {
            src: "/images/medidas/3x4.5Naranja.png",
            alt: "Gazebo 3x4.5 Naranja - Vista 1",
          },
          {
            src: "/images/info/3x4.5Info.png",
            alt: "Gazebo 3x3 Negro - Vista 1",
          },
          {
            src: "/images/info/Hex40Info.png",
            alt: "Gazebo 3x3 Negro - Vista 1",
          },
        ],
      },
      green: {
        main: "/images/medidas/3x4.5Verde.png",
        thumbnails: [
          {
            src: "/images/medidas/3x4.5Verde.png",
            alt: "Gazebo 3x4.5 Verde - Vista 1",
          },
          {
            src: "/images/info/3x4.5Info.png",
            alt: "Gazebo 3x3 Negro - Vista 1",
          },
          {
            src: "/images/info/Hex40Info.png",
            alt: "Gazebo 3x3 Negro - Vista 1",
          },
        ],
      },
    },
    "3x6": {
      black: {
        main: "/images/medidas/3x6Negro.png",
        thumbnails: [
          {
            src: "/images/medidas/3x6Negro.png",
            alt: "Gazebo 3x6 Negro - Vista 1",
          },
          {
            src: "/images/info/3x6Info.png",
            alt: "Gazebo 3x3 Negro - Vista 1",
          },
          {
            src: "/images/info/Hex40Info.png",
            alt: "Gazebo 3x3 Negro - Vista 1",
          },
        ],
      },
      white: {
        main: "/images/medidas/3x6Blanco.png",
        thumbnails: [
          {
            src: "/images/medidas/3x6Blanco.png",
            alt: "Gazebo 3x6 Blanco - Vista 1",
          },
          {
            src: "/images/info/3x6Info.png",
            alt: "Gazebo 3x3 Negro - Vista 1",
          },
          {
            src: "/images/info/Hex40Info.png",
            alt: "Gazebo 3x3 Negro - Vista 1",
          },
        ],
      },
      red: {
        main: "/images/medidas/3x6Rojo.png",
        thumbnails: [
          {
            src: "/images/gaze.jpg",
            alt: "Gazebo 3x6 Rojo - Vista 1",
          },
          {
            src: "/images/3x6tmbRojo.JPG",
            alt: "Gazebo 3x6 Rojo - Vista 1",
          },
          {
            src: "/images/medidas/3x6Rojo.png",
            alt: "Gazebo 3x6 Rojo - Vista 1",
          },
          {
            src: "/images/info/3x6Info.png",
            alt: "Gazebo 3x3 Negro - Vista 1",
          },
          {
            src: "/images/info/Hex40Info.png",
            alt: "Gazebo 3x3 Negro - Vista 1",
          },
        ],
      },
      blue: {
        main: "/images/medidas/3x6Azul.png",
        thumbnails: [
          {
            src: "/images/medidas/3x6Azul.png",
            alt: "Gazebo 3x6 Azul - Vista 1",
          },
          {
            src: "/images/info/3x6Info.png",
            alt: "Gazebo 3x3 Negro - Vista 1",
          },
          {
            src: "/images/info/Hex40Info.png",
            alt: "Gazebo 3x3 Negro - Vista 1",
          },
        ],
      },
      "rgb(255, 110, 0)": {
        main: "/images/medidas/3x6Naranja.png",
        thumbnails: [
          {
            src: "/images/medidas/3x6Naranja.png",
            alt: "Gazebo 3x6 Naranja - Vista 1",
          },
          {
            src: "/images/info/3x6Info.png",
            alt: "Gazebo 3x3 Negro - Vista 1",
          },
          {
            src: "/images/info/Hex40Info.png",
            alt: "Gazebo 3x3 Negro - Vista 1",
          },
        ],
      },
      green: {
        main: "/images/medidas/3x6Verde.png",
        thumbnails: [
          {
            src: "/images/medidas/3x6Verde.png",
            alt: "Gazebo 3x6 Verde - Vista 1",
          },
          {
            src: "/images/info/3x6Info.png",
            alt: "Gazebo 3x3 Negro - Vista 1",
          },
          {
            src: "/images/info/Hex40Info.png",
            alt: "Gazebo 3x3 Negro - Vista 1",
          },
        ],
      },
    },
    Hexagonal: {
      black: {
        main: "/images/medidas/HexaNegro.png",
        thumbnails: [
          {
            src: "/images/medidas/HexaNegro.png",
            alt: "Gazebo Hexagonal Azul - Vista 1",
          },
          {
            src: "/images/info/HexaInfo.png",
            alt: "Gazebo 3x3 Negro - Vista 1",
          },
        ],
      },
      white: {
        main: "/images/medidas/HexaBlanca.jpg",
        thumbnails: [
          {
            src: "/images/HexatmbBlanca.jpeg",
            alt: "Gazebo Hexagonal Blanco - Vista 1",
          },
          {
            src: "/images/medidas/HexaBlanca.jpg",
            alt: "Gazebo Hexagonal Azul - Vista 1",
          },
          {
            src: "/images/info/HexaInfo.png",
            alt: "Gazebo 3x3 Negro - Vista 1",
          },
        ],
      },
      red: {
        main: "/images/medidas/3x6Rojo.png",
        thumbnails: [
          // {
          //   src: "/images/medidas/gazebos/hexagonal/red/1.jpg",
          //   alt: "Gazebo Hexagonal Rojo - Vista 1",
          // },
          {
            src: "/images/info/HexaInfo.png",
            alt: "Gazebo 3x3 Negro - Vista 1",
          },
        ],
      },
      blue: {
        main: "/images/medidas/HexaAzul.png",
        thumbnails: [
          {
            src: "/images/medidas/HexaAzul.png",
            alt: "Gazebo Hexagonal Azul - Vista 1",
          },
          {
            src: "/images/info/HexaInfo.png",
            alt: "Gazebo 3x3 Negro - Vista 1",
          },
        ],
      },
      "rgb(255, 110, 0)": {
        main: "/images/medidas/3x6Naranja.png",
        thumbnails: [
          // {
          //   src: "/images/medidas/gazebos/hexagonal/orange/1.jpg",
          //   alt: "Gazebo Hexagonal Naranja - Vista 1",
          // },
          {
            src: "/images/info/HexaInfo.png",
            alt: "Gazebo 3x3 Negro - Vista 1",
          },
        ],
      },
      green: {
        main: "/images/medidas/3x6Verde.png",
        thumbnails: [
          // {
          //   src: "/images/medidas/gazebos/hexagonal/green/1.jpg",
          //   alt: "Gazebo Hexagonal Verde - Vista 1",
          // },
          {
            src: "/images/info/HexaInfo.png",
            alt: "Gazebo 3x3 Negro - Vista 1",
          },
        ],
      },
    },
  };