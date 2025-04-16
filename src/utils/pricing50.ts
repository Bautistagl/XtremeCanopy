export const getPriceBySize50 = (size: string): number => {
    switch (size) {
      case "3x3":
        return 670;
      case "3x4.5":
        return 890;
      case "3x6":
        return 1180;
      default:
        return 670;
    }
  }