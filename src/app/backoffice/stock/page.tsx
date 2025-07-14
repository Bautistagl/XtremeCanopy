"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { supabase } from "@/supabase/supabase" // Ensure this path is correct based on your project structure
import styles from "./StockDashboard.module.css" // Import the CSS module

// --- Interfaces for Supabase Data ---
interface CategoriaProducto {
  id: string // UUID from Supabase
  nombre_categoria: string
  nombre_producto: string
}

interface StockItem {
  id: string // UUID from Supabase
  producto_id: string // Foreign key to CategoriaProducto
  tipo_item: string // 'producto_base', 'lateral liso', etc.
  hay_stock: boolean
}

// --- Combined Product Interface for the UI ---
interface ProductDisplay {
  id: string // UUID of the main product from categorias_productos
  category: string // nombre_categoria
  name: string // nombre_producto
  stockStatus: {
    producto_base: boolean // Is the main product in stock?
    'lateral liso': boolean
    'lateral con ventana': boolean
    'lateral con cierre': boolean
    combo: boolean
  }
}

// --- Interface for Individual Cards to Display ---
interface DisplayCard {
  id: string; // Unique ID for this specific card (e.g., productID_itemType)
  originalProductId: string; // Reference to the original product's ID
  name: string; // Display name for the card (e.g., "3x3 Lateral con cierre")
  category: string; // Category of the original product (e.g., "HEX40")
  itemType: keyof ProductDisplay['stockStatus']; // The specific stock item this card represents
  stockStatus: boolean; // The stock status of this specific item
}

export default function StockDashboard() {
  const [products, setProducts] = useState<ProductDisplay[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState<"all" | "inStock" | "outOfStock">("all")

  // Function to fetch data from Supabase
  const fetchProducts = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      // Fetch categorias_productos
      const { data: categorias, error: categoriasError } = await supabase
        .from<CategoriaProducto>("categorias_productos")
        .select("*")
      if (categoriasError) throw categoriasError

      // Fetch stock_productos
      const { data: stockItems, error: stockError } = await supabase
        .from<StockItem>("stock_productos")
        .select("*")
      if (stockError) throw stockError

      // Process and combine data for display
      const combinedProducts: ProductDisplay[] = categorias.map((catProd) => {
        const productStock: ProductDisplay['stockStatus'] = {
          producto_base: false,
          'lateral liso': false,
          'lateral con ventana': false,
          'lateral con cierre': false,
          combo: false,
        }

        stockItems.forEach((stockItem) => {
          if (stockItem.producto_id === catProd.id) {
            // Type assertion to ensure tipo_item is a valid key
            productStock[stockItem.tipo_item as keyof ProductDisplay['stockStatus']] = stockItem.hay_stock
          }
        })

        return {
          id: catProd.id,
          category: catProd.nombre_categoria,
          name: catProd.nombre_producto,
          stockStatus: productStock,
        }
      })

      setProducts(combinedProducts)
    } catch (err: any) {
      console.error("Error fetching products:", err.message)
      setError("Failed to load product data. Please try again.")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  // Function to toggle stock status for a specific item (producto_base or lateral)
  const toggleStock = async (originalProductId: string, itemType: keyof ProductDisplay['stockStatus']) => {
    // Find the current stock status for the specific item
    const currentProduct = products.find(p => p.id === originalProductId);
    if (!currentProduct) return;

    const currentHayStock = currentProduct.stockStatus[itemType];
    const newHayStock = !currentHayStock;

    // Optimistic update
    setProducts(prevProducts =>
      prevProducts.map(p =>
        p.id === originalProductId
          ? {
              ...p,
              stockStatus: {
                ...p.stockStatus,
                [itemType]: newHayStock,
              },
            }
          : p
      )
    );

    // Update in Supabase
    try {
      // Find the specific stock_productos entry by product_id and tipo_item
      const { data, error } = await supabase
        .from<StockItem>('stock_productos')
        .update({ hay_stock: newHayStock })
        .eq('producto_id', originalProductId)
        .eq('tipo_item', itemType);

      if (error) {
        throw error;
      }
      // If successful, no need to revert, optimistic update already happened
    } catch (err: any) {
      console.error(`Error updating stock for ${itemType} of product ${originalProductId}:`, err.message);
      setError(`Failed to update stock for ${itemType}.`);
      // Revert optimistic update if there was an error
      setProducts(prevProducts =>
        prevProducts.map(p =>
          p.id === originalProductId
            ? {
                ...p,
                stockStatus: {
                  ...p.stockStatus,
                  [itemType]: currentHayStock, // Revert to previous state
                },
              }
            : p
        )
      );
    }
  };

  // --- Process products into displayable cards ---
  const processedProductsForDisplay = useMemo(() => {
    const displayCards: DisplayCard[] = [];

    products.forEach(product => {
      // Add the "producto_base" as a card
      displayCards.push({
        id: product.id + '_base',
        originalProductId: product.id,
        name: product.name,
        category: product.category,
        itemType: 'producto_base',
        stockStatus: product.stockStatus.producto_base,
      });

      // For HEX40 products, also add individual cards for combo and laterals
      if (product.category === 'HEX40') {
        Object.entries(product.stockStatus).forEach(([itemType, inStock]) => {
          if (itemType !== 'producto_base') { // Skip producto_base as it's already added
            let displayName = itemType.replace(/_/g, ' '); // Replace underscores for display

            // Capitalize first letter of each word in itemType for display
            displayName = displayName.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

            displayCards.push({
              id: `${product.id}_${itemType}`, // Unique ID for this specific lateral/combo card
              originalProductId: product.id,
              name: `${product.name} - ${displayName}`, // e.g., "3x4.5 - Lateral Con Cierre"
              category: product.category,
              itemType: itemType as keyof ProductDisplay['stockStatus'],
              stockStatus: inStock as boolean,
            });
          }
        });
      }
    });
    return displayCards;
  }, [products]);


  // Filter the processed cards for display based on the 'stockStatus' of each card
  const filteredDisplayCards = processedProductsForDisplay.filter((card) => {
    if (filter === "inStock") return card.stockStatus;
    if (filter === "outOfStock") return !card.stockStatus;
    return true;
  });

  // Calculate counts based on the 'producto_base' status of original products
  const inStockCount = products.filter((p) => p.stockStatus.producto_base).length
  const outOfStockCount = products.filter((p) => !p.stockStatus.producto_base).length
  const totalProductsCount = products.length; // Total unique products

  if (loading) {
    return <div className={styles.dashboard}>Cargando datos de stock...</div>
  }

  if (error) {
    return <div className={styles.dashboard} style={{ color: 'red' }}>Error: {error}</div>
  }

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <div className={styles["header-content"]}>
          <div className={styles.logo}>
            <h1>XTREME</h1>
            <span>Stock Management</span>
          </div>


        </div>
      </header>

      <main className={styles.main}>

        <div className={styles.filters}>
          <button
            className={`${styles["filter-btn"]} ${
              filter === "all" ? styles.active : ""
            }`}
            onClick={() => setFilter("all")}
          >
            Todos los Items
          </button>
          <button
            className={`${styles["filter-btn"]} ${
              filter === "inStock" ? styles.active : ""
            }`}
            onClick={() => setFilter("inStock")}
          >
            Items En Stock
          </button>
          <button
            className={`${styles["filter-btn"]} ${
              filter === "outOfStock" ? styles.active : ""
            }`}
            onClick={() => setFilter("outOfStock")}
          >
            Items Agotados
          </button>
        </div>

        <div className={styles["products-grid"]}>
          {filteredDisplayCards.map((card) => (
            <div key={card.id} className={styles["product-card"]}>
              <div className={styles["product-info"]}>
                <span className={styles["product-category"]}>
                  {card.category}
                </span>
                <h3 className={styles["product-name"]}>{card.name}</h3>
              </div>

              <div className={styles["product-stock-actions"]}>
                <div
                  className={`${styles["stock-status-pill"]} ${
                    card.stockStatus
                      ? styles["in-stock"]
                      : styles["out-of-stock"]
                  }`}
                >
                  <span>
                    {card.stockStatus ? "En Stock" : "Agotado"}
                  </span>
                </div>
                <button
                  className={`${styles["stock-toggle-btn"]} ${
                    card.stockStatus
                      ? styles["remove-stock"]
                      : styles["add-stock"]
                  }`}
                  onClick={() => toggleStock(card.originalProductId, card.itemType)}
                >
                  {card.stockStatus
                    ? "Marcar Agotado"
                    : "Marcar En Stock"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}