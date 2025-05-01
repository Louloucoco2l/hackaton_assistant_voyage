import React from 'react';
import { useLocation } from 'react-router-dom';

export default function FlightResultsPage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const destination = searchParams.get('destination');
  const dateDepart = searchParams.get('dateDepart');
  const dateRetour = searchParams.get('dateRetour');
  const voyageurs = searchParams.get('voyageurs');
  const enfants = searchParams.get('enfants');
  const allerRetour = searchParams.get('allerRetour') === 'true';

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Résultats des vols</h2>
      <p>Destination : {destination}</p>
      <p>Départ : {dateDepart}</p>
      {allerRetour && <p>Retour : {dateRetour}</p>}
      <p>Voyageurs : {voyageurs}</p>
      <p>Enfants : {enfants}</p>
    </div>
  );
}
