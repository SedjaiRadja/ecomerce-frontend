"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type CartProduct = {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
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

      // User has no cart yet
      if (response.status === 401 || response.status === 404) {
        setCart(null);
        setError(null);
        return;
      }

      if (!response.ok) {
        throw new Error("Impossible de récupérer le panier");
      }

      const data: Cart = await response.json();

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
   * LOAD CART
   * =========================
   */

  useEffect(() => {
    let cancelled = false;

    const loadCart = async () => {
      try {
        const response = await fetch(`${API_URL}/api/cart`, {
          method: "GET",
          credentials: "include",
        });

        if (cancelled) return;

        if (response.status === 404) {
          setCart(null);
          return;
        }

        if (!response.ok) {
          throw new Error("Impossible de récupérer le panier");
        }

        const data: Cart = await response.json();

        if (!cancelled) {
          setCart(data);
        }
      } catch (err) {
        if (cancelled) return;

        console.error("Cart fetch error:", err);

        setError(
          err instanceof Error ? err.message : "Une erreur est survenue",
        );
      }
    };

    loadCart();

    return () => {
      cancelled = true;
    };
  }, []);

  /*
   * =========================
   * ADD TO CART
   * =========================
   */

  const addToCart = async (productId: string, quantity = 1) => {
    try {
      setLoading(true);
      setError(null);
      console.log("CART REQUEST:", {
        productId,
        quantity,
        typeOfProductId: typeof productId,
        typeOfQuantity: typeof quantity,
      });
      console.log("FINAL CART REQUEST:", {
  productId,
  quantity,
  productIdType: typeof productId,
  quantityType: typeof quantity,
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
      const data = await response.json();
      console.log("CART AFTER ADD:", data.cart);

      setCart(data.cart);
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
      if (quantity <= 0) {
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

      const data = await response.json();

      setCart(data.cart);
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

      // Refresh cart after deleting
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
