import { createContext, useContext, useState, useMemo } from 'react';

const UiContext = createContext();

export function UiProvider({ children }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () =>  setIsDrawerOpen(!isDrawerOpen);
  const openDrawer = () =>  setIsDrawerOpen(true);
  const closeDrawer = () =>  setIsDrawerOpen(false);

  const value = useMemo(() => ({
    isDrawerOpen,
    toggleDrawer,
    openDrawer,
    closeDrawer,
  }), [isDrawerOpen]);

  return (
    <UiContext.Provider value={value}>
      {children}
    </UiContext.Provider>
  );
}

export function useUiContext() {
  return useContext(UiContext);
}