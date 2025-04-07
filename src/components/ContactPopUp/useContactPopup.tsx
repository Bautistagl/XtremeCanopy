// useQuotationPopup.ts
import { useState, useCallback } from 'react';

interface UseQuotationPopupReturn {
  isPopupOpen: boolean;
  selectedSize: string;
  selectedColor: string;
  setSelectedSize: (size: string) => void;
  setSelectedColor: (color: string) => void;
  openPopup: () => void;
  closePopup: () => void;
}

export const useQuotationPopup = (): UseQuotationPopupReturn => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');

  const openPopup = useCallback(() => {
    setIsPopupOpen(true);
  }, []);

  const closePopup = useCallback(() => {
    setIsPopupOpen(false);
    // Opcionalmente, puedes decidir si quieres resetear los valores seleccionados
    // cuando se cierra el popup o mantenerlos para la próxima vez
    // setSelectedSize('');
    // setSelectedColor('');
  }, []);

  return {
    isPopupOpen,
    selectedSize,
    selectedColor,
    setSelectedSize,
    setSelectedColor,
    openPopup,
    closePopup
  };
};

export default useQuotationPopup;