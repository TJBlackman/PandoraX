import React, { useState, createContext } from "react";

export const UIContext = createContext();

const default_context = {
  menuIsOpen: false
};

export const UIProvider = ({ children }) => {
  const [ui, setUI] = useState(default_context);

  const toggle_menu = () => setUI({
    ...ui, 
    menuIsOpen: !ui.menuIsOpen
  });

  const providerValue = {
    ui,
    toggle_menu: toggle_menu,
    setUI
  };

  return (
    <UIContext.Provider value={providerValue}>
      {children}
    </UIContext.Provider>
  );
};
