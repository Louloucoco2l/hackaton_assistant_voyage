import React, { createContext, useState, useContext } from 'react';

// Création du contexte avec des valeurs par défaut
const DestinationContext = createContext({
  selectedDestination: '',
  setSelectedDestination: () => {},
  departureDate: '',
  setDepartureDate: () => {},
  returnDate: '',
  setReturnDate: () => {}
});

// Hook personnalisé pour utiliser le contexte
function useDestination() {
  const context = useContext(DestinationContext);
  if (!context) {
    throw new Error('useDestination doit être utilisé à l\'intérieur d\'un DestinationProvider');
  }
  return context;
}

// Provider du contexte
function DestinationProvider({ children }) {
  const [selectedDestination, setSelectedDestination] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');

  // Création de l'objet de contexte avec les valeurs d'état actuelles
  const contextValue = {
    selectedDestination,
    setSelectedDestination,
    departureDate,
    setDepartureDate,
    returnDate,
    setReturnDate
  };

  return (
    <DestinationContext.Provider value={contextValue}>
      {children}
    </DestinationContext.Provider>
  );
}

export { DestinationContext, DestinationProvider, useDestination };
