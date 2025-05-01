import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();
import querystring from 'querystring';


const AMADEUS_BASE_URL = 'https://test.api.amadeus.com/v1';
const AMADEUS_AUTH_URL = `${AMADEUS_BASE_URL}/security/oauth2/token`;
const AMADEUS_FLIGHTS_URL = 'https://test.api.amadeus.com/v2/shopping/flight-offers';
const AMADEUS_LOCATIONS_URL = `${AMADEUS_BASE_URL}/reference-data/locations`;

let accessToken = null;
let tokenExpiration = null;

async function getAccessToken() {
  // Vérifier si le token existe et est encore valide
  if (accessToken && tokenExpiration && Date.now() < tokenExpiration) {
    return accessToken;
  }


  const response = await axios.post(
    AMADEUS_AUTH_URL,
    querystring.stringify({
      grant_type: 'client_credentials',
      client_id: process.env.AMADEUS_CLIENT_ID,
      client_secret: process.env.AMADEUS_CLIENT_SECRET,
    }),
    {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }
  );

  accessToken = response.data.access_token;
  tokenExpiration = Date.now() + (response.data.expires_in * 1000);
  return accessToken;
}

export async function searchAirports(cityName) {
  const token = await getAccessToken();

  const response = await axios.get(AMADEUS_LOCATIONS_URL, {
    headers: { Authorization: `Bearer ${token}` },
    params: {
      subType: 'AIRPORT',
      keyword: cityName,
      'page[limit]': 5,
      sort: 'analytics.travelers.score'
    }
  });

  return response.data.data.map(airport => ({
    iataCode: airport.iataCode,
    name: airport.name,
    cityName: airport.address.cityName,
    countryName: airport.address.countryName
  }));
}

export async function searchFlights({ origin, destination, date, returnDate, adults = 1, children = 0 }) {
  try {
    const token = await getAccessToken();

    // Validation des paramètres obligatoires
    if (!origin || !destination || !date) {
      throw new Error('Paramètres manquants: origin, destination et date sont requis');
    }

    // Construction des paramètres de recherche
    const params = {
      originLocationCode: origin,
      destinationLocationCode: destination,
      departureDate: date,
      adults: parseInt(adults),
      currencyCode: 'EUR',
      max: 20
    };

    // Ajout des paramètres optionnels
    if (returnDate) {
      params.returnDate = returnDate;
    }

    if (children > 0) {
      params.children = parseInt(children);
    }

    // Appel API avec gestion des erreurs
    const response = await axios.get(AMADEUS_FLIGHTS_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      params
    });

    // Vérification et transformation des données
    if (!response.data || !response.data.data) {
      throw new Error('Format de réponse invalide');
    }

    // Transformation des données pour le front
    return response.data.data.map(flight => ({
      id: flight.id,
      price: flight.price,
      carrierCode: flight.validatingAirlineCodes[0],
      itineraries: flight.itineraries.map(itinerary => ({
        duration: itinerary.duration,
        segments: itinerary.segments.map(segment => ({
          departure: {
            iataCode: segment.departure.iataCode,
            at: segment.departure.at
          },
          arrival: {
            iataCode: segment.arrival.iataCode,
            at: segment.arrival.at
          },
          carrierCode: segment.carrierCode,
          number: segment.number
        }))
      }))
    }));

  } catch (error) {
    console.error('Erreur recherche vols:', error);
    throw new Error(error.response?.data?.errors?.[0]?.detail || error.message);
  }
}

// Cache pour les codes IATA
const airportCache = new Map();

export async function getCityAirport(cityName) {
  try {
    // Vérifier le cache
    if (airportCache.has(cityName.toLowerCase())) {
      return airportCache.get(cityName.toLowerCase());
    }

    const airports = await searchAirports(cityName);

    if (!airports || airports.length === 0) {
      throw new Error(`Aucun aéroport trouvé pour ${cityName}`);
    }

    const bestAirport = airports[0];
    airportCache.set(cityName.toLowerCase(), bestAirport);

    return bestAirport;
  } catch (error) {
    console.error(`Erreur lors de la recherche d'aéroport pour ${cityName}:`, error);
    throw error;
  }
}