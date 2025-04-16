export const getPriceBySize = (size: string): number => {
    switch (size) {
      case "3x3":
        return 430;
      case "3x4.5":
        return 564;
      case "3x6":
        return 764;
      case "Hexagonal":
        return 1650;
      default:
        return 430;
    }
  }