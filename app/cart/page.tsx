"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type CartProduct = {
  _id: string;
  name: string;
  price: number;
  image: string;
  stock: number;
  category?: string;
  description?: string;
};

type CartItem = {
  product: CartProduct | string;
  quantity: number;
  _id?: string;
};

type Cart = {
  _id: string;
  user: string;
  items: CartItem[];
};

type CartContextType = {
  cart: Cart | null;
  items: CartItem[];
  loading: boolean;
  error: string | null;

  addToCart: (productId: string, quantity?: number) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  refreshCart: () => Promise<void>;

  totalItems: number;
  totalPrice: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export default function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /*
   * =========================
   * GET CART
   * =========================
   */

  const refreshCart = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${API_URL}/api/cart`, {
        method: "GET",
        credentials: "include",
      });

      // No cart yet
      if (response.status === 404) {
        setCart(null);
        return;
      }

      if (!response.ok) {
        const message = await response.text();

        throw new Error(message || "Impossible de récupérer le panier");
      }

      const data: Cart = await response.json();

      console.log("CART FROM SERVER:", data);

      setCart(data);
    } catch (err) {
      console.error("Cart fetch error:", err);

      setError(err instanceof Error ? err.message : "Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  }, []);

  /*
   * =========================
   * LOAD CART ON MOUNT
   * =========================
   */

  /*
   * =========================
   * ADD TO CART
   * =========================
   */

  const addToCart = async (productId: string, quantity = 1) => {
    try {
      if (!productId) {
        throw new Error("Product ID is required");
      }

      if (!Number.isInteger(quantity) || quantity <= 0) {
        throw new Error("Quantity must be a positive integer");
      }

      setLoading(true);
      setError(null);

      console.log("CART REQUEST:", {
        productId,
        quantity,
        typeOfProductId: typeof productId,
        typeOfQuantity: typeof quantity,
      });

      const response = await fetch(`${API_URL}/api/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          productId,
          quantity,
        }),
      });

      if (!response.ok) {
        const message = await response.text();

        throw new Error(message || "Impossible d'ajouter le produit au panier");
      }

      await response.json();

      console.log("Produit ajouté au panier");

      /*
       * Important:
       * Le POST retourne le produit comme ObjectId.
       * On refait donc GET /api/cart afin d'obtenir
       * items.product avec populate().
       */
      await refreshCart();
    } catch (err) {
      console.error("Add to cart error:", err);

      const message =
        err instanceof Error
          ? err.message
          : "Impossible d'ajouter le produit au panier";

      setError(message);

      throw err;
    } finally {
      setLoading(false);
    }
  };

  /*
   * =========================
   * UPDATE QUANTITY
   * =========================
   */

  const updateQuantity = async (productId: string, quantity: number) => {
    try {
      if (!productId) {
        throw new Error("Product ID is required");
      }

      if (!Number.isInteger(quantity) || quantity <= 0) {
        await removeFromCart(productId);
        return;
      }

      setLoading(true);
      setError(null);

      const response = await fetch(`${API_URL}/api/cart/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          quantity,
        }),
      });

      if (!response.ok) {
        const message = await response.text();

        throw new Error(message || "Impossible de modifier la quantité");
      }

      await response.json();

      /*
       * Re-fetch pour récupérer les produits avec populate()
       */
      await refreshCart();
    } catch (err) {
      console.error("Update cart error:", err);

      const message =
        err instanceof Error
          ? err.message
          : "Impossible de modifier la quantité";

      setError(message);

      throw err;
    } finally {
      setLoading(false);
    }
  };

  /*
   * =========================
   * REMOVE FROM CART
   * =========================
   */

  const removeFromCart = async (productId: string) => {
    try {
      if (!productId) {
        throw new Error("Product ID is required");
      }

      setLoading(true);
      setError(null);

      const response = await fetch(`${API_URL}/api/cart/${productId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) {
        const message = await response.text();

        throw new Error(message || "Impossible de supprimer le produit");
      }

      await response.text();

      /*
       * Refresh après suppression
       */
      await refreshCart();
    } catch (err) {
      console.error("Remove cart item error:", err);

      const message =
        err instanceof Error
          ? err.message
          : "Impossible de supprimer le produit";

      setError(message);

      throw err;
    } finally {
      setLoading(false);
    }
  };

  /*
   * =========================
   * CLEAR CART
   * =========================
   */

  const clearCart = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${API_URL}/api/cart/clear`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) {
        const message = await response.text();

        throw new Error(message || "Impossible de vider le panier");
      }

      const data = await response.json();

      setCart(data.cart);
    } catch (err) {
      console.error("Clear cart error:", err);

      const message =
        err instanceof Error ? err.message : "Impossible de vider le panier";

      setError(message);

      throw err;
    } finally {
      setLoading(false);
    }
  };

  /*
   * =========================
   * TOTAL ITEMS
   * =========================
   */

  const totalItems =
    cart?.items.reduce((total, item) => total + item.quantity, 0) ?? 0;

  /*
   * =========================
   * TOTAL PRICE
   * =========================
   */

  const totalPrice =
    cart?.items.reduce((total, item) => {
      if (typeof item.product === "string") {
        return total;
      }

      return total + item.product.price * item.quantity;
    }, 0) ?? 0;

  /*
   * =========================
   * PROVIDER
   * =========================
   */

  return (
    <CartContext.Provider
      value={{
        cart,
        items: cart?.items ?? [],
        loading,
        error,

        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        refreshCart,

        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

/*
 * =========================
 * USE CART HOOK
 * =========================
 */

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside a CartProvider");
  }

  return context;
}
