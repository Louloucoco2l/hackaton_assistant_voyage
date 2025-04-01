import { createContext, useState, useContext } from 'react';

// Créer le contexte
const DestinationContext = createContext({
  selectedDestination: '',
  setSelectedDestination: () => {},
  departureDate: '',
  setDepartureDate: () => {},
  returnDate: '',
  setReturnDate: () => {}
});
// Hook personnalisé pour utiliser le contexte
export const useDestination = () => useContext(DestinationContext);

// Fournisseur du contexte
export const DestinationProvider = ({ children }) => {
  const [selectedDestination, setSelectedDestination] = useState('Paris');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');

  // Valeur à partager dans le contexte
  const value = {
    selectedDestination,
    setSelectedDestination,
    departureDate,
    setDepartureDate,
    returnDate,
    setReturnDate
  };

  return (
    <DestinationContext.Provider value={value}>
      {children}
    </DestinationContext.Provider>
  );
};