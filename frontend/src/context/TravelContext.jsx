import { createContext, useContext, useState, useCallback } from 'react';

// Création du contexte
const TravelContext = createContext();

// Hook personnalisé pour utiliser le contexte
export const useTravel = () => {
  const context = useContext(TravelContext);
  if (!context) {
    throw new Error("useTravel doit être utilisé dans un TravelProvider");
  }
  return context;
};

export const TravelProvider = ({ children }) => {
  // États pour la recherche de voyage
  const [destination, setDestination] = useState("");
  const [villeDepart, setVilleDepart] = useState("");
  const [dateDepart, setDateDepart] = useState("");
  const [dateRetour, setDateRetour] = useState("");
  const [voyageurs, setVoyageurs] = useState(1);
  const [enfants, setEnfants] = useState(0);
  const [allerRetour, setAllerRetour] = useState(true);

  // États pour les filtres d'hébergement
  const [hebergementType, setHebergementType] = useState("");
  const [etoiles, setEtoiles] = useState("");
  const [budgetMax, setBudgetMax] = useState(200);

  // États pour le tri et les préférences
  const [triPar, setTriPar] = useState("prix"); // 'prix', 'duree', 'score'
  const [preferences, setPreferences] = useState({
    volsDirects: false,
    compagniesPreferees: [],
    classeVoyage: "ECONOMY"
  });

  // État pour les erreurs
  const [errors, setErrors] = useState({});

  // Validation des données de vol
  const validateFlightSearch = useCallback(() => {
    const newErrors = {};

    if (!villeDepart) newErrors.villeDepart = "Ville de départ requise";
    if (!destination) newErrors.destination = "Destination requise";
    if (!dateDepart) newErrors.dateDepart = "Date de départ requise";
    if (allerRetour && !dateRetour) newErrors.dateRetour = "Date de retour requise";

    if (voyageurs < 1) newErrors.voyageurs = "Au moins 1 voyageur requis";
    if (enfants < 0) newErrors.enfants = "Nombre d'enfants invalide";

    // Validation des dates
    const departDate = new Date(dateDepart);
    const retourDate = new Date(dateRetour);
    const aujourdhui = new Date();

    if (departDate < aujourdhui) {
      newErrors.dateDepart = "La date de départ doit être future";
    }

    if (allerRetour && retourDate <= departDate) {
      newErrors.dateRetour = "La date de retour doit être après la date de départ";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [villeDepart, destination, dateDepart, dateRetour, allerRetour, voyageurs, enfants]);

  // Reset du formulaire
  const resetForm = useCallback(() => {
    setDestination("");
    setVilleDepart("");
    setDateDepart("");
    setDateRetour("");
    setVoyageurs(1);
    setEnfants(0);
    setAllerRetour(true);
    setHebergementType("");
    setEtoiles("");
    setBudgetMax(200);
    setTriPar("prix");
    setPreferences({
      volsDirects: false,
      compagniesPreferees: [],
      classeVoyage: "ECONOMY"
    });
    setErrors({});
  }, []);

  // Mise à jour des préférences
  const updatePreferences = useCallback((newPreferences) => {
    setPreferences(prev => ({ ...prev, ...newPreferences }));
  }, []);

  // Construction de l'objet de recherche
  const buildSearchParams = useCallback(() => {
    if (!validateFlightSearch()) return null;

    return {
      origin: villeDepart,
      destination,
      departureDate: dateDepart,
      returnDate: allerRetour ? dateRetour : null,
      adults: voyageurs,
      children: enfants,
      ...preferences,
      sortBy: triPar,
      maxPrice: budgetMax,
      accommodationType: hebergementType,
      stars: etoiles
    };
  }, [
    villeDepart, destination, dateDepart, dateRetour,
    voyageurs, enfants, allerRetour, preferences,
    triPar, budgetMax, hebergementType, etoiles,
    validateFlightSearch
  ]);

  const value = {
    // États de recherche
    destination,
    setDestination,
    villeDepart,
    setVilleDepart,
    dateDepart,
    setDateDepart,
    dateRetour,
    setDateRetour,
    voyageurs,
    setVoyageurs,
    enfants,
    setEnfants,
    allerRetour,
    setAllerRetour,

    // États des filtres d'hébergement
    hebergementType,
    setHebergementType,
    etoiles,
    setEtoiles,
    budgetMax,
    setBudgetMax,

    // États de tri et préférences
    triPar,
    setTriPar,
    preferences,
    updatePreferences,

    // Erreurs
    errors,
    setErrors,

    // Fonctions utilitaires
    validateFlightSearch,
    resetForm,
    buildSearchParams
  };

  return (
    <TravelContext.Provider value={value}>
      {children}
    </TravelContext.Provider>
  );
};

export default TravelProvider;