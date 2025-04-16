export interface SizeOption {
    size: string;
    height: number;
    width: number;
    depth: number;
    weight: number;
    weight2: number;
  }
  
  export const sizes: SizeOption[] = [
    { size: "3x3", height: 160, width: 24, depth: 24, weight: 23, weight2: 43 },
    {
      size: "3x4.5",
      height: 160,
      width: 33,
      depth: 24,
      weight: 29,
      weight2: 55,
    },
    { size: "3x6", height: 160, width: 43, depth: 25, weight: 41, weight2: 73 },
    {
      size: "Hexagonal",
      height: 162,
      width: 55,
      depth: 45,
      weight: 79,
      weight2: 112,
    },
  ];

  export const sizes50: SizeOption[] = [
    { size: "3x3", height: 160, width: 32, depth: 32, weight: 32, weight2: 54 },
    {
      size: "3x4.5",
      height: 160,
      width: 42,
      depth: 32,
      weight: 45,
      weight2: 71,
    },
    { size: "3x6", height: 160, width: 55, depth: 33, weight: 65, weight2: 94 },
 
  ];