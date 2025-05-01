import axios from 'axios';

export const flightService = {
    searchFlights: async ({ origin, destination, date }) => {
      console.log("📡 Envoi vers backend :", { origin, destination, date }); // 🔍 debug
      const response = await axios.post('http://localhost:5000/api/flights', {
        origin,
        destination,
        date,
      });
      return response.data.flights;
    },
  };
  