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

export async function searchFlights({ origin, destination, date, returnDate, adults = 1, children = 0, travelClass, currency = 'EUR' }) {
  try {
    const token = await getAccessToken();

    if (!origin || !destination || !date) {
      throw new Error('Paramètres manquants: origin, destination et date sont requis');
    }

    const params = {
      originLocationCode: origin,
      destinationLocationCode: destination,
      departureDate: date,
      adults: parseInt(adults),
      currencyCode: currency,
      max: 20
    };

    if (returnDate) params.returnDate = returnDate;
    if (children > 0) params.children = parseInt(children);
    if (travelClass) params.travelClass = travelClass;

    const response = await axios.get(AMADEUS_FLIGHTS_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      params
    });

    if (!response.data || !response.data.data) {
      throw new Error('Format de réponse invalide');
    }

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

const airportCache = new Map();

export async function getCityAirport(cityName) {
  try {
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


const AMADEUS_HOTELS_URL = `${AMADEUS_BASE_URL}/shopping/hotel-offers`;

export async function searchHotels({ cityCode, checkInDate, checkOutDate, adults = 1, rooms = 1 }) {
  try {
    const token = await getAccessToken();

    const response = await axios.get(AMADEUS_HOTELS_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      params: {
        cityCode,
        checkInDate,
        checkOutDate,
        adults,
        roomQuantity: rooms,
        bestRateOnly: true,
        radius: 30,
        radiusUnit: 'KM'
      }
    });

    if (!response.data || !response.data.data) {
      throw new Error('Réponse invalide pour les offres d’hôtel');
    }

    return response.data.data.map(offer => ({
      hotelName: offer.hotel.name,
      address: offer.hotel.address.lines.join(', '),
      city: offer.hotel.address.cityName,
      price: offer.offers[0]?.price.total,
      currency: offer.offers[0]?.price.currency,
      checkInDate: offer.offers[0]?.checkInDate,
      checkOutDate: offer.offers[0]?.checkOutDate
    }));
  } catch (error) {
    console.error('Erreur recherche hôtels:', error);
    throw new Error(error.response?.data?.errors?.[0]?.detail || error.message);
  }
}
