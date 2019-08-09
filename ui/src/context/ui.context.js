import React, { useState, createContext } from "react";

export const UIContext = createContext();

const default_context = {
  menuOpen: false
};

export const UIProvider = ({ children }) => {
  const [ui, setUi] = useState(default_context);

  const providerValue = {
    ui: ui,
    setUi: setUi
  };

  return (
    <UIContext.Provider value={providerValue}>
      {children}
    </UIContext.Provider>
  );
};
