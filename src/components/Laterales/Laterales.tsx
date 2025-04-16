import { useState, useEffect } from "react";
import './Laterales.css'; 

type LateralCombo = {
  size: string;
  price: number;
  description: string;
  includes: string[];
};

type IndividualLateral = {
  size: string;
  type: "liso" | "ventana" | "cierre";
  price: number;
};

const lateralesCombos: Record<string, LateralCombo> = {
  "3x3": {
    size: "3X3",
    price: 340,
    description: "Combo Full Protección",
    includes: [
      "1 lateral liso",
      "2 laterales con ventana",
      "1 lateral con cierre para entrar o/salir",
    ],
  },
  "3x4.5": {
    size: "3X4.5",
    price: 440,
    description: "Combo Full Protección",
    includes: [
      "1 lateral liso",
      "2 laterales con ventana",
      "1 lateral con cierre para entrar o/salir",
    ],
  },
  "3x6": {
    size: "3X6",
    price: 525,
    description: "Combo Full Protección",
    includes: [
      "1 lateral liso",
      "4 laterales con ventana",
      "1 lateral con cierre para entrar o/salir",
    ],
  },
  "HEXAGONAL": {
    size: "HEXAGONAL",
    price: 510,
    description: "Combo Full Protección",
    includes: [
      "2 laterales lisos",
      "3 laterales con ventana",
      "1 lateral con cierre para entrar o/salir",
    ],
  },
};


const lateralesIndividuales: IndividualLateral[] = [
  { size: "3x3", type: "liso", price: 90 },
  { size: "3x3", type: "ventana", price: 90 },
  { size: "3x4.5", type: "liso", price: 115 },
  { size: "3x4.5", type: "ventana", price: 115 },

 
];

// Componente para la selección de laterales
const LateralesSelector: React.FC<{
  selectedSize: string;
  addToPrice: (price: number) => void;
  addSidesToCart: (sides: string, price: number) => void;
}> = ({ selectedSize, addToPrice, addSidesToCart }) => {
  const [selectedOption, setSelectedOption] = useState<"combo" | "individual" | "none">("none");
  const [selectedIndividuals, setSelectedIndividuals] = useState<{
    liso: number;
    ventana: number;
    cierre: number;
  }>({
    liso: 0,
    ventana: 0,
    cierre: 0,
  });

  
  const normalizedSize = selectedSize.toLowerCase() === "hexagonal" 
    ? "HEXAGONAL" 
    : selectedSize;

  // Obtener el combo correspondiente al tamaño seleccionado
  const combo = lateralesCombos[normalizedSize];

  // Filtrar laterales individuales para el tamaño seleccionado
  const availableIndividuals = lateralesIndividuales.filter(
    (lateral) => lateral.size === selectedSize
  );

  // Verificar si hay laterales individuales disponibles
  const hasIndividualOptions = availableIndividuals.length > 0;

  // Calcular el precio total de laterales individuales
  const calculateIndividualTotal = () => {
    let total = 0;
    for (const lateral of availableIndividuals) {
      if (lateral.type === "liso") {
        total += lateral.price * selectedIndividuals.liso;
      } else if (lateral.type === "ventana") {
        total += lateral.price * selectedIndividuals.ventana;
      }
    }
    return total;
  };

  // Añadir un useEffect que se ejecute cuando cambien los laterales individuales
  useEffect(() => {
    // Solo ejecutar si se ha seleccionado la opción "individual"
    if (selectedOption === "individual") {
      const totalIndividual = calculateIndividualTotal();
      addToPrice(totalIndividual);
      
      const sideSummary = `Laterales individuales: ${selectedIndividuals.liso} lisos, ${selectedIndividuals.ventana} con ventana`;
      addSidesToCart(sideSummary, totalIndividual);
    }
  }, [selectedIndividuals, selectedOption, addToPrice, addSidesToCart, availableIndividuals]);

  // Manejar el cambio de opción
  const handleOptionChange = (option: "combo" | "individual" | "none") => {
    setSelectedOption(option);
    
    // Resetear los laterales individuales cuando cambiamos de opción
    if (option !== "individual") {
      setSelectedIndividuals({ liso: 0, ventana: 0, cierre: 0 });
    }
    
    // Agregar el precio del combo al precio total si se selecciona combo
    if (option === "combo" && combo) {
      addToPrice(combo.price);
      addSidesToCart(`Combo Full Protección ${combo.size}`, combo.price);
    } else if (option === "none") {
      // Si no se selecciona ninguna opción, eliminamos cualquier precio adicional
      addToPrice(0);
      addSidesToCart("", 0); // Limpiar el resumen de laterales
    }
    // No es necesario hacer nada para "individual" ya que el useEffect se encargará
  };

  // Simplificar handleIndividualChange para que solo actualice el estado
  const handleIndividualChange = (type: "liso" | "ventana" | "cierre", quantity: number) => {
    setSelectedIndividuals((prev) => ({
      ...prev,
      [type]: Math.max(0, quantity),
    }));
    // No hacer nada más aquí, el useEffect se encargará de actualizar el carrito
  };

  // Si no hay combo disponible para el tamaño seleccionado, mostrar mensaje
  if (!combo) {
    return (
      <div className="laterales-selector">
        <h3>Laterales no disponibles para este tamaño</h3>
      </div>
    );
  }

  return (
    <div className="laterales-selector">
      <h3>Agregar laterales:</h3>
      
      <div className="options-container">
        <div className="option">
          <input
            type="radio"
            id="option-none"
            name="laterales-option"
            checked={selectedOption === "none"}
            onChange={() => handleOptionChange("none")}
          />
          <label htmlFor="option-none">Sin laterales</label>
        </div>
        
        <div className="option">
          <input
            type="radio"
            id="option-combo"
            name="laterales-option"
            checked={selectedOption === "combo"}
            onChange={() => handleOptionChange("combo")}
          />
          <label htmlFor="option-combo">
            {combo.description} : U$D {combo.price}
          </label>
          
          {selectedOption === "combo" && (
            <div className="combo-details">
              <p>Incluye:</p>
              <ul>
                {combo.includes.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        
        
        {hasIndividualOptions && (
          <div className="option">
            <input
              type="radio"
              id="option-individual"
              name="laterales-option"
              checked={selectedOption === "individual"}
              onChange={() => handleOptionChange("individual")}
            />
            <label htmlFor="option-individual">Laterales individuales</label>
            
            {selectedOption === "individual" && (
              <div className="individual-options">
                {availableIndividuals.some(l => l.type === "liso") && (
                  <div className="quantity-selector">
                    <label>Lateral liso:</label>
                    <div className="quantity-controls">
                      <button
                        onClick={() => handleIndividualChange("liso", selectedIndividuals.liso - 1)}
                        className="size-option"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        value={selectedIndividuals.liso}
                        onChange={(e) => handleIndividualChange("liso", parseInt(e.target.value) || 0)}
                        min="0"
                        className="quantity-input"
                      />
                      <button
                        onClick={() => handleIndividualChange("liso", selectedIndividuals.liso + 1)}
                        className="size-option"
                      >
                        +
                      </button>
                      <span className="price">
                        U$D {availableIndividuals.find(l => l.type === "liso")?.price || 0} c/u
                      </span>
                    </div>
                  </div>
                )}
                
                {availableIndividuals.some(l => l.type === "ventana") && (
                  <div className="quantity-selector">
                    <label>Lateral con ventana:</label>
                    <div className="quantity-controls">
                      <button
                        onClick={() => handleIndividualChange("ventana", selectedIndividuals.ventana - 1)}
                        className="size-option"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        value={selectedIndividuals.ventana}
                        onChange={(e) => handleIndividualChange("ventana", parseInt(e.target.value) || 0)}
                        min="0"
                        className="quantity-input"
                      />
                      <button
                        onClick={() => handleIndividualChange("ventana", selectedIndividuals.ventana + 1)}
                        className="size-option"
                      >
                        +
                      </button>
                      <span className="price">
                        U$D {availableIndividuals.find(l => l.type === "ventana")?.price || 0} c/u
                      </span>
                    </div>
                  </div>
                )}
                
              
                
                <div className="total-price">
                  <p>Total laterales: U$D {calculateIndividualTotal()}</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LateralesSelector;