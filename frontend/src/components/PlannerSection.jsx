import { useState } from 'react';
import { Search, Calendar, MapPin, Plane, Hotel, Navigation } from 'lucide-react';

const PlannerSection = () => {
  const [destination, setDestination] = useState('');
  const [dateDepart, setDateDepart] = useState('');
  const [dateRetour, setDateRetour] = useState('');
  const [voyageurs, setVoyageurs] = useState('');

  return (
    <section id="planner" className="py-5 px-3 bg-light">
      <div className="container">
        <div className="text-center mb-5">
          <span className="badge bg-primary bg-opacity-10 text-primary fw-semibold mb-3 px-3 py-2 rounded-pill">
            Planificateur de voyage
          </span>
          <h2 className="fw-bold">Planifiez votre prochain voyage</h2>
          <p className="text-muted fs-5">
            Utilisez notre outil intelligent pour planifier votre voyage en tenant compte de votre budget et des conditions météorologiques.
          </p>
        </div>

        <div className="bg-white rounded shadow p-4 mb-5">
          <div className="row g-2 mb-4 text-center">
            <div className="col-4">
              <button className="btn btn-primary w-100" disabled>
                <Plane size={16} className="me-2" />
                Vols
              </button>
            </div>
          </div>
          <div className="row g-3">
            <div className="col-md-6 col-lg-3">
              <label className="form-label">Destination</label>
              <div className="input-group">
                <span className="input-group-text">
                  <MapPin size={16} />
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Où allez-vous ?"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <label className="form-label">Date de départ</label>
              <div className="input-group">
                <span className="input-group-text">
                  <Calendar size={16} />
                </span>
                <input
                  type="date"
                  className="form-control"
                  value={dateDepart}
                  onChange={(e) => setDateDepart(e.target.value)}
                />
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <label className="form-label">Date de retour</label>
              <div className="input-group">
                <span className="input-group-text">
                  <Calendar size={16} />
                </span>
                <input
                  type="date"
                  className="form-control"
                  value={dateRetour}
                  onChange={(e) => setDateRetour(e.target.value)}
                />
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <label className="form-label">Voyageurs</label>
              <input
                type="number"
                min="1"
                className="form-control"
                placeholder="Nombre de voyageurs"
                value={voyageurs}
                onChange={(e) => setVoyageurs(e.target.value)}
              />
            </div>
          </div>

          <div className="text-center mt-4">
            <button className="btn btn-primary px-4 py-2">
              <Search size={16} className="me-2" />
              Rechercher
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlannerSection;
