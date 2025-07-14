

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

export interface CategoryImages {
  [size: string]: SizeImages;
}

export interface GazeboImagesByCategory {
  [category: string]: CategoryImages;
}

// Lista base de tamaños y colores
export const sizes = ["3x3", "3x4.5", "3x6", "Hexagonal"];
export const colors = ["black", "white", "red", "blue", "green", "orange"];
export const availableSizesByCategory: { [category: string]: string[] } = {
  "HEX 40": ["3x3", "3x4.5", "3x6", "Hexagonal"],
  "HEX 50": ["3x3", "3x4.5", "3x6"],
};

export const availableColorsByCategorySize: {
  [category: string]: { [size: string]: string[] };
} = {
  "HEX 40": {
    Hexagonal: colors,
    "3x3": colors,
    "3x4.5": colors,
    "3x6": colors,
  },
  "HEX 50": {
    "3x3": colors,
    "3x4.5": colors,
    "3x6": colors,
  },
};

// Utilidad para normalizar el nombre del color en una ruta
const normalizeColorName = (color: string) =>
  color.replace(/\s+/g, "").replace(/[^\w]/g, "").toLowerCase();

// Generador de estructura de imágenes por categoría
function generateCategoryImages(category: "HEX 40" | "HEX 50"): CategoryImages {
  const images: CategoryImages = {};

  for (const size of sizes) {
    images[size] = {};

    for (const color of colors) {
      const colorKey = color;
      const normalizedColor = normalizeColorName(color);

      // Caso especial: HEX 40 / Hexagonal
      const isHex40Hexagonal = category === "HEX 40" && size === "Hexagonal";

      images[size][colorKey] = isHex40Hexagonal
        ? {
            main:
              normalizedColor === "blue" ||
              normalizedColor === "black" ||
              normalizedColor === "white"
                ? `/images/colores/${size}/${normalizedColor}/main.png`
                : "/images/placeh.svg",
            thumbnails: [
              {
                src: `/images/info/${category}/1.png`,
                alt: `Información estructura ${category}`,
              },
              {
                src: `/images/info/${category}/2.png`,
                alt: `Información estructura ${category}`,
              },
              {
                src: `/images/info/${category}/3.png`,
                alt: `Información estructura ${category}`,
              },
              {
                src: `/images/info/${category}/4.png`,
                alt: `Información estructura ${category}`,
              },
            ], // sin thumbnails
          }
        : {
            main: `/images/colores/${size}/${normalizedColor}/main.png`,
            thumbnails: [
              {
                src: `/images/colores/${size}/${normalizedColor}/main.png`,
                alt: `Gazebo ${size} ${normalizedColor} - Vista 1`,
              },
              {
                src: `/images/info/${category}/1.png`,
                alt: `Información estructura ${category}`,
              },
              {
                src: `/images/info/${category}/2.png`,
                alt: `Información estructura ${category}`,
              },
              {
                src: `/images/info/${category}/3.png`,
                alt: `Información estructura ${category}`,
              },
              {
                src: `/images/info/${category}/4.png`,
                alt: `Información estructura ${category}`,
              },
            ],
          };
    }
  }

  return images;
}


// Estructura completa de imágenes por categoría
export const imagesByCategory: GazeboImagesByCategory = {
  "HEX 40": generateCategoryImages("HEX 40"),
  "HEX 50": generateCategoryImages("HEX 50"),
};
