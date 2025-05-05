import axios from 'axios';

export const hotelService = {
  rechercheHôtels: async ({ city, checkInDate, checkOutDate, adults = 1, rooms = 1 }) => {
    const resp = await axios.post('/api/hotels', {
      city, checkInDate, checkOutDate, adults, rooms
    });
    return resp.data; // { hotels: [...], source: 'tripadvisor'|'amadeus' }
  }
};
