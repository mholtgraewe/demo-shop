import { createContext, useContext, useState, useMemo, useEffect } from 'react';
import axios from 'axios';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const updateItem = async (productId, quantity) => {
    setIsLoading(true);
    const { data: cart } = await axios.post(
      `/api/cart/update-item`,
      { productId, quantity },
    );
    setItems(cart.items);
    setIsLoading(false);
  };

  const addItem = (productId, increment = 1) => {
    const item = items.find(item => item.productId === productId);
    const newQuantity = (item?.quantity ?? 0) + increment;
    return updateItem(productId, newQuantity);
  };

  const removeItem = (productId, decrement = 1) => {
    return addItem(productId, -decrement);
  };

  const value = useMemo(() => ({
    items,
    isLoading,
    addItem,
    removeItem,
    updateItem,
  }), [items, isLoading]);

  useEffect(() => {
    const fetchItems = async () => {
      setIsLoading(true);
      const { data: cart} = await axios.get('/api/cart');
      setItems(cart.items);
      setIsLoading(false);
    };
    fetchItems();
  }, []);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCartContext() {
  return useContext(CartContext);
}