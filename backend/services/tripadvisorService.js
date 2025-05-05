import axios from 'axios'
import dotenv from 'dotenv'
dotenv.config()

const TA_HOST = 'travel-advisor.p.rapidapi.com'
const TA_KEY  = process.env.RAPIDAPI_KEY
const locationCache = new Map()

async function getLocationData(city) {
  const key = city.toLowerCase()
  if (locationCache.has(key)) return locationCache.get(key)

  const resp = await axios.get(`https://${TA_HOST}/locations/search`, {
    headers: {
      'X-RapidAPI-Host': TA_HOST,
      'X-RapidAPI-Key':  TA_KEY
    },
    params: {
      query:  city,
      limit:  1,
      locale: 'fr_FR'
    }
  })

  const [loc] = resp.data.data
  if (!loc) throw new Error(`Aucun identifiant TripAdvisor trouvé pour "${city}"`)

  const { location_id, latitude, longitude } = loc.result_object
  const data = { location_id, latitude, longitude }
  locationCache.set(key, data)
  return data
}

/**
 * Recherche d'hôtels via TripAdvisor
 * @param {{ city: string, checkInDate: string, checkOutDate: string, adults?: number, rooms?: number }} options
 * @returns {Promise<Array>} Liste d'hôtels normalisés
 */
export async function searchHotelsTripAdvisor({ city, checkInDate, checkOutDate, adults = 1, rooms = 1 }) {
  // 1) Récupère latitude et longitude via getLocationData
  const { latitude, longitude } = await getLocationData(city)

  // 2) Appel à l'endpoint list-by-latlng
  const resp = await axios.get(`https://${TA_HOST}/hotels/list-by-latlng`, {
    headers: {
      'X-RapidAPI-Host': TA_HOST,
      'X-RapidAPI-Key':  TA_KEY
    },
    params: {
      latitude,
      longitude,
      limit:         20,
      offset:        0,
      checkin_date:  checkInDate,   // ex. "2025-06-01"
      checkout_date: checkOutDate,  // ex. "2025-06-05"
      adults,
      rooms,
      currency:      'EUR',
      sort:          'PRICE',
      locale:        'fr_FR'
    }
  })

  console.log('TripAdvisor hotels raw response:', JSON.stringify(resp.data, null, 2))

  const hotelsRaw = Array.isArray(resp.data.data) ? resp.data.data : []
  return hotelsRaw.map(h => {
    // Extraire prix minimal et maximal depuis h.price (string e.g. "€113 - €280")
    const [minPrice = '—', maxPrice = '—'] = (h.price || '').split('-').map(p => p.trim())
    // Niveau de prix (€, €€, etc.)
    const priceLevel = h.price_level || ''
    // URL détaillée TripAdvisor
    const website = h.business_listings?.mobile_contacts?.find(c => c.type === 'url')?.value
                  || `https://www.tripadvisor.com/Hotel_Review-g${h.ranking_geo_id}-d${h.location_id}`

    return {
      hotel_name:    h.name,
      address:       h.location_string,
      min_price:     minPrice,
      max_price:     maxPrice,
      price_level:   priceLevel,
      currency:      '',  // TripAdvisor renvoie prix déjà formaté
      main_photo:    h.photo?.images?.medium?.url,
      rating:        h.rating,
      num_reviews:   h.num_reviews,
      hotel_class:   h.hotel_class,
      ranking:       h.ranking,
      distance:      h.distance,
      neighborhoods: h.neighborhood_info?.map(n => n.name) || [],
      url:           website
    }
  })
}
