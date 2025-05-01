  import React, { useEffect, useState } from 'react';
  import { hotelService } from '../services/api';
  import { useTravel } from '../context/TravelContext';

  export default function HotelSearch() {
    const {
      destination,
      dateDepart,
      dateRetour,
      voyageurs,
      enfants,
      hebergementType,
      etoiles,
      budgetMax
    } = useTravel();

    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = async () => {
      if (!destination || !dateDepart || !dateRetour) {
        setError('Veuillez remplir tous les champs');
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const data = await hotelService.searchHotels({
          destination,
          dateIn: dateDepart,
          dateOut: dateRetour,
          adults: voyageurs,
          children: enfants,
          type: hebergementType,    // 👈 filtre type
          stars: etoiles,           // 👈 filtre étoiles
          maxPrice: budgetMax       // 👈 filtre budget
        });

        setHotels(data.hotels);
      } catch (err) {
        setError("Erreur lors de la recherche d'hôtels. Veuillez réessayer.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      if (destination && dateDepart && dateRetour) {
        handleSearch();
      }
    }, [destination, dateDepart, dateRetour, voyageurs, enfants, hebergementType, etoiles, budgetMax]);

    return (
      <div className="card shadow-sm mt-4">
        <div className="card-body">
          <h3 className="card-title mb-4">Résultats des hôtels</h3>

          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          {loading ? (
            <p>Recherche en cours...</p>
          ) : hotels.length > 0 ? (
            <div className="row row-cols-1 row-cols-md-2 g-4">
              {hotels.map((hotel) => (
                <div className="col" key={hotel.id}>
                  <div className="card h-100">
                    <div className="card-body">
                      <h5 className="card-title">{hotel.name}</h5>
                      <div className="mb-2">{'★'.repeat(hotel.stars)}</div>
                      <p className="card-text">
                        <strong>{hotel.price} € </strong>
                        <span className="text-muted">/ nuit</span>
                      </p>
                      <p className="card-text">
                        <span className="badge bg-success">{hotel.rating}/10</span>
                      </p>
                    </div>
                    <div className="card-footer">
                      <button className="btn btn-sm btn-outline-primary w-100">
                        Voir les détails
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted">Aucun hôtel trouvé pour les critères sélectionnés.</p>
          )}
        </div>
      </div>
    );
  }
