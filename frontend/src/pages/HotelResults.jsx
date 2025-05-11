import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { hotelService } from '../services/hotelService';

export default function HotelResults() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const city         = searchParams.get('city') || '';
  const checkInDate  = searchParams.get('checkInDate') || '';
  const checkOutDate = searchParams.get('checkOutDate') || '';
  const adults       = Number(searchParams.get('adults')) || 1;
  const rooms        = Number(searchParams.get('rooms'))  || 1;

  const [hotels, setHotels]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  // pour résumé des meilleures offres
  const [cheapest, setCheapest] = useState(null);
  const [bestRated, setBestRated] = useState(null);

  useEffect(() => {
    async function fetchHotels() {
      try {
        const { hotels: list } = await hotelService.rechercheHotels({ city, checkInDate, checkOutDate, adults, rooms });
        setHotels(list);
        // calcul des meilleures offres
        if (list.length) {
          setCheapest(list.reduce((a,b) => parseFloat(a.min_price) < parseFloat(b.min_price) ? a : b));
          setBestRated(list.reduce((a,b) => parseFloat(a.rating) > parseFloat(b.rating) ? a : b));
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    if (city && checkInDate && checkOutDate) fetchHotels();
  }, [city, checkInDate, checkOutDate, adults, rooms]);

  if (loading) return <p className="text-center mt-5">Chargement des hôtels…</p>;
  if (error)   return <div className="alert alert-danger text-center mt-5">{error}</div>;
  if (!hotels.length) return <p className="text-center mt-5">Aucun hôtel trouvé.</p>;

  return (
    <div className="container my-5">
      <h2 className="mb-4">Hôtels disponibles à {city}</h2>

      {/* Résumé meilleures offres */}
      <div className="row mb-4 text-center">
        {[
          { label: 'Le moins cher', item: cheapest, btnClass: 'success' },
          { label: 'Le mieux noté',  item: bestRated, btnClass: 'primary' }
        ].map(({ label, item, btnClass }, i) => (
          <div className="col-md-6" key={i}>
            <div className="p-3 border rounded shadow-sm">
              <div className="text-muted mb-1">{label}</div>
              {item ? (
                <>
                  <div className={`fs-4 fw-bold text-${btnClass}`}>{item.min_price} {item.price_level}</div>
                  <small className="text-muted">Note : {item.rating} ⭐</small>
                </>
              ) : '--'}
            </div>
          </div>
        ))}
      </div>

      <div className="row">
        {/* Liste hôtels */}
        <div className="col-lg-9">
          <div className="list-group">
            {hotels.map((h, i) => (
              <div className="list-group-item mb-3 p-3 border rounded" key={i}>
                <div className="row align-items-center">

                  {/* Image */}
                  <div className="col-md-3 mb-2 mb-md-0">
                    <img src={h.main_photo} alt={h.hotel_name} className="img-fluid rounded" />
                  </div>

                  {/* Détails */}
                  <div className="col-md-6">
                    <h5 className="mb-1">
                      <a href={`${h.url}?ref=TravelSmart`} target="_blank" rel="noreferrer" className="text-decoration-none">
                        {h.hotel_name}
                      </a>
                    </h5>
                    <p className="text-muted mb-1">{h.address}</p>
                    <p className="mb-1">Note : <strong>{h.rating}</strong> ⭐ ({h.num_reviews} avis)</p>
                    {h.distance && <p className="mb-1">{parseFloat(h.distance).toFixed(2)} km du centre</p>}
                    {h.neighborhoods?.length > 0 && <p className="mb-1">Quartiers : {h.neighborhoods.join(', ')}</p>}
                  </div>

                  {/* Prix et bouton */}
                  <div className="col-md-3 text-md-end">
                    <div className="fs-3 fw-bold mb-1">{h.min_price} - {h.max_price}</div>
                    <small className="text-muted d-block mb-2">{h.price_level}</small>
                    <a
                      href={`${h.url}?ref=TravelSmart`}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-outline-primary w-100"
                    >
                      Voir disponibilités
                    </a>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar publicités */}
        {/* Colonne pubs */}
        <div className="col-lg-3">
          <div className="card mb-3">
            <img src="https://i.pinimg.com/736x/6c/ea/92/6cea92ddf62da7b660b3357dd24de469--hotel-motel-print-ads.jpg"
                 className="card-img-top" alt="pub hôtel" />
            <div className="card-body text-center">
              <h6 className="card-title">Trouvez votre hôtel</h6>
              <p className="card-text small">Comparez Booking, Expedia,…</p>
              <a href="#" className="btn btn-sm btn-primary">Découvrir</a>
            </div>
          </div>
          <div className="card mb-3">
            <img src="data:image/jpeg;base64,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"
                 className="card-img-top" alt="pub voiture" />
            <div className="card-body text-center">
              <h6 className="card-title">Louez une voiture</h6>
              <p className="card-text small">À partir de 20€/jour</p>
              <a href="#" className="btn btn-sm btn-outline-primary">Réserver</a>
            </div>
          </div>
          <div className="card mb-3">
            <img src="https://th.bing.com/th/id/R.78a70a98766085ad7e6d844a439d6db0?rik=1DLiyizlyBUz4Q&riu=http%3a%2f%2fwww.paysdecorps.fr%2fwp-content%2fuploads%2f2017%2f03%2fassurance-voyage.jpg&ehk=9Xuw%2b6Iq8RGH3030YHgiZKwJMvsJLsO9gqO0LsJm3LA%3d&risl=&pid=ImgRaw&r=0"
                 className="card-img-top" alt="pub assurance" />
            <div className="card-body text-center">
              <h6 className="card-title">Assurance Voyage</h6>
              <p className="card-text small">Protégez votre voyage</p>
              <a href="#" className="btn btn-sm btn-success">En savoir plus</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
