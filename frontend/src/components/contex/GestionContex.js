import React, { createContext, useState } from 'react';

// Crear el contexto
export const GestionContext = createContext();

// Proveedor del contexto
export const GestionProvider = ({ children }) => {
  const [selectedGestion, setSelectedGestion] = useState(''); // Estado global para la gestión

  return (
    <GestionContext.Provider value={{ selectedGestion, setSelectedGestion }}>
      {children}
    </GestionContext.Provider>
  );
};
