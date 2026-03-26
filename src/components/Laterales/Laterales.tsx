import { useState, useEffect, useCallback } from "react";
import "./Laterales.css";
import { availableSizesByCategory } from "@/data/gazeboImages";
import { supabase } from "@/supabase/supabase";

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
  stock: boolean;
};
type ComboProducto = {
  size: string;
  stock: boolean;
};
interface StockProducto {
  id: string;
  producto_id: string;
  tipo_item:
    | "producto_base"
    | "lateral liso"
    | "lateral con ventana"
    | "lateral con cierre"
    | "combo";
  hay_stock: boolean;
}

interface CategoriaProducto {
  id: string;
  nombre_categoria: "HEX40" | "HEX50";
  nombre_producto: "3x4.5" | "3x3" | "3x6" | "hexagonal";
}
interface StockProductoConNombre extends StockProducto {
  nombre_producto?: string;
}

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
  HEXAGONAL: {
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

// Componente para la selección de laterales
const LateralesSelector: React.FC<{
  selectedSize: string;
  resetTrigger: string;
  addToPrice: (price: number) => void;
  addSidesToCart: (sides: string, price: number) => void;
}> = ({ selectedSize, resetTrigger, addToPrice, addSidesToCart }) => {
  const [selectedOption, setSelectedOption] = useState<
    "combo" | "individual" | "none"
  >("none");
  const [selectedIndividuals, setSelectedIndividuals] = useState({
    liso: 0,
    ventana: 0,
    cierre: 0,
  });
  const [lateralesIndividuales, setLateralesIndividuales] = useState<
    IndividualLateral[]
  >([
    { size: "3x3", type: "liso", price: 90, stock: true },
    { size: "3x3", type: "ventana", price: 90, stock: true },
    { size: "3x3", type: "cierre", price: 90, stock: true },
    { size: "3x4.5", type: "liso", price: 115, stock: true },
    { size: "3x4.5", type: "ventana", price: 115, stock: true },
    { size: "3x4.5", type: "cierre", price: 115, stock: true },
    { size: "3x6", type: "ventana", price: 90, stock: true },
    { size: "3x6", type: "liso", price: 90, stock: true },
    { size: "3x6", type: "cierre", price: 90, stock: true },
    { size: "Hexagonal", type: "ventana", price: 90, stock: true },
    { size: "Hexagonal", type: "liso", price: 90, stock: true },
    { size: "Hexagonal", type: "cierre", price: 90, stock: true },
  ]);
  const [combosStock, setCombosStock] = useState<ComboProducto[]>([
    { size: "3x3", stock: true },
    { size: "3x4.5", stock: true },
    { size: "3x6", stock: true },
    { size: "Hexagonal", stock: true },
  ]);
  const [selectedCategory, setSelectedCategory] = useState<string>("HEX 40");
  const [stockStatusMap, setStockStatusMap] = useState<Map<string, boolean>>(
    new Map()
  );
  const [individualLateralStockMap, setIndividualLateralStockMap] = useState<
    Map<string, boolean> // La clave será "3x3-liso", "3x3-ventana", etc.
  >(new Map());
  const validSizes = availableSizesByCategory[selectedCategory] || [];
  const [stockProductos, setStockProductos] = useState<StockProducto[]>([]);
  const [categoriasProductos, setCategoriasProductos] = useState<
    CategoriaProducto[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const normalizeTipoItem = (tipoItem: string): string => {
    if (tipoItem.includes("liso")) return "liso";
    if (tipoItem.includes("ventana")) return "ventana";
    if (tipoItem.includes("cierre")) return "cierre";
    // Puedes añadir más casos si tienes otros tipos en el futuro
    return tipoItem; // Devuelve el original si no hay coincidencia
  };
  const getStockLaterales = useCallback((): StockProductoConNombre[] => {
    const categoriasMap = new Map<string, CategoriaProducto>();
    categoriasProductos.forEach((cat) => {
      categoriasMap.set(cat.id, cat);
    });

    const stockFiltradoConNombre: StockProductoConNombre[] = stockProductos
      .filter((stockItem) => {
        const categoriaRelacionada = categoriasMap.get(stockItem.producto_id);
        return (
          stockItem.tipo_item !== "producto_base" &&
          categoriaRelacionada &&
          categoriaRelacionada.nombre_categoria === "HEX40"
        );
      })
      .map((stockItem) => {
        const categoriaRelacionada = categoriasMap.get(stockItem.producto_id)!;
        return {
          ...stockItem,
          nombre_producto: categoriaRelacionada.nombre_producto,
        };
      });

    return stockFiltradoConNombre;
  }, [stockProductos, categoriasProductos]);
  useEffect(() => {
    if (!loading && !error && selectedCategory === "HEX 40") {
      const stockData = getStockLaterales(); // Esto ya filtra por nombre_categoria === "HEX40"
      const newStockStatusMap = new Map<string, boolean>();
      const stockDataMap = new Map<string, Map<string, boolean>>();

      // Variables para recolectar el stock de combos
      const updatedCombosStockMap = new Map<string, boolean>();

      stockData.forEach((item) => {
        // Lógica existente para laterales individuales
        const normalizedTipoItem = normalizeTipoItem(item.tipo_item);
        if (item.nombre_producto && normalizedTipoItem) {
          if (!stockDataMap.has(item.nombre_producto)) {
            stockDataMap.set(item.nombre_producto, new Map<string, boolean>());
          }
          stockDataMap
            .get(item.nombre_producto)
            ?.set(normalizedTipoItem, item.hay_stock);
        }

        // Lógica para el stock general del producto (si aplica)
        if (item.nombre_producto && validSizes.includes(item.nombre_producto)) {
          newStockStatusMap.set(item.nombre_producto, item.hay_stock);
        }

        // ***** NUEVA LÓGICA PARA ACTUALIZAR COMBOS *****
        // Verificamos si es un item de tipo "combo" Y si su nombre_producto
        // coincide con un tamaño que manejamos para combos.
        if (item.tipo_item === "combo" && item.nombre_producto) {
          // Aquí, 'item.nombre_producto' (ej. "3x3", "3x6") es el 'size' del combo
          updatedCombosStockMap.set(item.nombre_producto, item.hay_stock);
        }
      });

      setStockStatusMap(newStockStatusMap);

      // Actualizar lateralesIndividuales
      setLateralesIndividuales((prevLaterales) => {
        return prevLaterales.map((lateral) => {
          const stockInfoForSize = stockDataMap.get(lateral.size);
          if (stockInfoForSize) {
            const stockValue = stockInfoForSize.get(lateral.type);
            if (stockValue !== undefined) {
              return { ...lateral, stock: stockValue };
            }
          }
          return lateral;
        });
      });

      // ***** APLICAR LA ACTUALIZACIÓN A COMBOSSTOCK *****
      setCombosStock((prevCombos) => {
        return prevCombos.map((combo) => {
          // Si encontramos una entrada para este tamaño de combo en el mapa de stock
          if (updatedCombosStockMap.has(combo.size)) {
            return { ...combo, stock: updatedCombosStockMap.get(combo.size)! };
          }
          return combo; // Si no hay información de stock para este combo, mantenemos su estado actual
        });
      });
      // ************************************************
    } else if (selectedCategory !== "HEX 40") {
      setStockStatusMap(new Map());
      // Opcional: Si cambias de categoría y quieres resetear el stock de laterales individuales/combos
      // setLateralesIndividuales(valorInicialDeLateralesIndividuales);
      // setCombosStock(valorInicialDeCombosStock); // Podrías tener una constante con los valores iniciales
    }
  }, [loading, error, getStockLaterales, selectedCategory, validSizes]);
  useEffect(() => {
    const fetchSupabaseData = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data: stockData, error: stockError } = await supabase
          .from("stock_productos")
          .select("*");

        if (stockError) {
          throw stockError;
        }
        setStockProductos(stockData as StockProducto[]);

        const { data: categoriasData, error: categoriasError } = await supabase
          .from("categorias_productos")
          .select("*");

        if (categoriasError) {
          throw categoriasError;
        }
        setCategoriasProductos(categoriasData as CategoriaProducto[]);
      } catch (err: any) {
        setError(err.message);
        console.error("Error fetching data from Supabase:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSupabaseData();
  }, []);
  useEffect(() => {
    setSelectedOption("none");
    setSelectedIndividuals({ liso: 0, ventana: 0, cierre: 0 });
  }, [resetTrigger]);

  const normalizedSize =
    selectedSize.toLowerCase() === "hexagonal" ? "HEXAGONAL" : selectedSize;

  const combo = lateralesCombos[normalizedSize];
  const currentComboStock = combosStock.find(
    (cs) => cs.size.toLocaleUpperCase() === combo.size
  );

  const isComboDisabled = !currentComboStock?.stock;
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
      } else if (lateral.type === "cierre") {
        total += lateral.price * selectedIndividuals.cierre;
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
      const sideSummary = `Laterales individuales: ${selectedIndividuals.liso} lisos, ${selectedIndividuals.ventana} con ventana, ${selectedIndividuals.cierre} con cierre`;
      addSidesToCart(sideSummary, totalIndividual);
    }
  }, [
    selectedIndividuals,
    selectedOption,
    addToPrice,
    addSidesToCart,
    availableIndividuals,
  ]);

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
  const handleIndividualChange = (
    type: "liso" | "ventana" | "cierre",
    quantity: number
  ) => {
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
            disabled={isComboDisabled}
          />
          <label
            htmlFor="option-combo"
            className={isComboDisabled ? "disabled-option" : ""}
          >
            {" "}
            {combo.description} : ${combo.price}
            {isComboDisabled && (
              <span className="no-stock-msg"> (Sin stock)</span>
            )}{" "}
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
                {availableIndividuals.some((l) => l.type === "liso") && (
                  <div className="quantity-selector">
                    <label>Lateral liso:</label>
                    <div className="quantity-controls">
                      {(() => {
                        const lisoLateral = availableIndividuals.find(
                          (l) => l.type === "liso"
                        );
                        const isLisoDisabled = !lisoLateral?.stock;

                        return (
                          <>
                            <button
                              onClick={() =>
                                handleIndividualChange(
                                  "liso",
                                  selectedIndividuals.liso - 1
                                )
                              }
                              className="size-option"
                              disabled={
                                isLisoDisabled || selectedIndividuals.liso <= 0
                              }
                            >
                              -
                            </button>
                            <input
                              type="number"
                              value={selectedIndividuals.liso}
                              onChange={(e) =>
                                handleIndividualChange(
                                  "liso",
                                  parseInt(e.target.value) || 0
                                )
                              }
                              min="0"
                              className="quantity-input"
                              disabled={isLisoDisabled} // Deshabilita el input si no hay stock
                            />
                            <button
                              onClick={() =>
                                handleIndividualChange(
                                  "liso",
                                  selectedIndividuals.liso + 1
                                )
                              }
                              className="size-option"
                              disabled={isLisoDisabled} // Deshabilita si no hay stock
                            >
                              +
                            </button>
                            <span className="price">
                              ${lisoLateral?.price || 0} c/u
                              {isLisoDisabled && (
                                <span className="no-stock-msg">
                                  {" "}
                                  (Sin stock)
                                </span>
                              )}
                            </span>
                          </>
                        );
                      })()}
                    </div>
                  </div>
                )}

                {/* Lateral con ventana */}
                {availableIndividuals.some((l) => l.type === "ventana") && (
                  <div className="quantity-selector">
                    <label>Lateral con ventana:</label>
                    <div className="quantity-controls">
                      {(() => {
                        const ventanaLateral = availableIndividuals.find(
                          (l) => l.type === "ventana"
                        );
                        const isVentanaDisabled = !ventanaLateral?.stock;

                        return (
                          <>
                            <button
                              onClick={() =>
                                handleIndividualChange(
                                  "ventana",
                                  selectedIndividuals.ventana - 1
                                )
                              }
                              className="size-option"
                              disabled={
                                isVentanaDisabled ||
                                selectedIndividuals.ventana <= 0
                              }
                            >
                              -
                            </button>
                            <input
                              type="number"
                              value={selectedIndividuals.ventana}
                              onChange={(e) =>
                                handleIndividualChange(
                                  "ventana",
                                  parseInt(e.target.value) || 0
                                )
                              }
                              min="0"
                              className="quantity-input"
                              disabled={isVentanaDisabled}
                            />
                            <button
                              onClick={() =>
                                handleIndividualChange(
                                  "ventana",
                                  selectedIndividuals.ventana + 1
                                )
                              }
                              className="size-option"
                              disabled={isVentanaDisabled}
                            >
                              +
                            </button>
                            <span className="price">
                              ${ventanaLateral?.price || 0} c/u
                              {isVentanaDisabled && (
                                <span className="no-stock-msg">
                                  {" "}
                                  (Sin stock)
                                </span>
                              )}
                            </span>
                          </>
                        );
                      })()}
                    </div>
                  </div>
                )}

                {/* Lateral con cierre */}
                {availableIndividuals.some((l) => l.type === "cierre") && (
                  <div className="quantity-selector">
                    <label>Lateral con cierre:</label>
                    <div className="quantity-controls">
                      {(() => {
                        const cierreLateral = availableIndividuals.find(
                          (l) => l.type === "cierre"
                        );
                        const isCierreDisabled = !cierreLateral?.stock;

                        return (
                          <>
                            <button
                              onClick={() =>
                                handleIndividualChange(
                                  "cierre",
                                  selectedIndividuals.cierre - 1
                                )
                              }
                              className="size-option"
                              disabled={
                                isCierreDisabled ||
                                selectedIndividuals.cierre <= 0
                              }
                            >
                              -
                            </button>
                            <input
                              type="number"
                              value={selectedIndividuals.cierre}
                              onChange={(e) =>
                                handleIndividualChange(
                                  "cierre",
                                  parseInt(e.target.value) || 0
                                )
                              }
                              min="0"
                              className="quantity-input"
                              disabled={isCierreDisabled}
                            />
                            <button
                              onClick={() =>
                                handleIndividualChange(
                                  "cierre",
                                  selectedIndividuals.cierre + 1
                                )
                              }
                              className="size-option"
                              disabled={isCierreDisabled}
                            >
                              +
                            </button>
                            <span className="price">
                              ${cierreLateral?.price || 0} c/u
                              {isCierreDisabled && (
                                <span className="no-stock-msg">
                                  {" "}
                                  (Sin stock)
                                </span>
                              )}
                            </span>
                          </>
                        );
                      })()}
                    </div>
                  </div>
                )}

                <div className="total-price">
                  <p>Total laterales: ${calculateIndividualTotal()}</p>
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
