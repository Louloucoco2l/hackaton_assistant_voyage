import { useState } from 'react';
import { Search, Calendar, MapPin, Plane, Hotel, Users } from 'lucide-react';
import { useTravel } from '../context/TravelContext';
import WeatherWidget from './WeatherWidget';
import { useNavigate, createSearchParams } from 'react-router-dom';

const PlannerSection = () => {
  const {
    destination, setDestination,
    dateDepart, setDateDepart,
    dateRetour, setDateRetour,
    voyageurs, setVoyageurs
  } = useTravel();

  const [villeDepart, setVilleDepart] = useState('');
  const [activeTab, setActiveTab] = useState('vols');
  const [budgetMax, setBudgetMax] = useState(200);
  const [showChildren, setShowChildren] = useState(false);
  const [nombreEnfants, setNombreEnfants] = useState(0);
  const [allerRetour, setAllerRetour] = useState(true);

  const navigate = useNavigate();

  const handleSearch = () => {
    if (!destination || !villeDepart || !dateDepart) return;

    const infosRecherche = {
      villeDepart,
      destination,
      dateDepart,
      dateRetour: allerRetour ? dateRetour : null,
      voyageurs,
      enfants: showChildren ? nombreEnfants : 0,
      allerRetour,
      budget: budgetMax
    };

    console.log(
      activeTab === 'vols' ? 'Recherche de vols :' : 'Recherche d’hébergements :',
      infosRecherche
    );

    navigate({
      pathname: activeTab === 'vols' ? '/vols' : '/hotels',
      search: createSearchParams({
        origin: villeDepart,
        destination,
        dateDepart,
        dateRetour: allerRetour ? dateRetour : '',
        voyageurs,
        enfants: showChildren ? nombreEnfants : 0,
        allerRetour,
        budget: budgetMax
      }).toString()
    });

    document.querySelector('.weather-widget')?.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <section id="plan" className="py-5 px-3 planner-bg">
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
          <div className="row g-3">
            <div className="col-md-6 col-lg-3">
              <label className="form-label">Ville de départ</label>
              <div className="input-group">
                <span className="input-group-text"><MapPin size={16} /></span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="D'où partez-vous ?"
                  value={villeDepart}
                  onChange={(e) => setVilleDepart(e.target.value)}
                />
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <label className="form-label">Destination</label>
              <div className="input-group">
                <span className="input-group-text"><MapPin size={16} /></span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Où allez-vous ?"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>
              <small className="text-muted">Saisissez une ville pour voir sa météo</small>
            </div>

            <div className="col-md-6 col-lg-3">
              <label className="form-label">Date de départ</label>
              <div className="input-group">
                <span className="input-group-text"><Calendar size={16} /></span>
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
                <span className="input-group-text"><Calendar size={16} /></span>
                <input
                  type="date"
                  className="form-control"
                  value={dateRetour}
                  onChange={(e) => setDateRetour(e.target.value)}
                  disabled={!allerRetour}
                />
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <label className="form-label">Voyageurs</label>
              <div className="input-group">
                <span className="input-group-text"><Users size={16} /></span>
                <input
                  type="number"
                  min="1"
                  className="form-control"
                  placeholder="Nombre de voyageurs"
                  value={voyageurs}
                  onChange={(e) => setVoyageurs(e.target.value)}
                />
              </div>

              <div className="form-check mt-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="includeChildren"
                  checked={showChildren}
                  onChange={() => setShowChildren(!showChildren)}
                />
                <label className="form-check-label" htmlFor="includeChildren">
                  Inclure des enfants
                </label>
              </div>

              {showChildren && (
                <div className="mt-2">
                  <label className="form-label">Nombre d'enfants</label>
                  <input
                    type="number"
                    min="0"
                    className="form-control"
                    value={nombreEnfants}
                    onChange={(e) => setNombreEnfants(e.target.value)}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="row g-2 mb-4 text-center mt-4">
            <div className="col-6">
              <button
                className={`btn ${activeTab === 'vols' ? 'btn-primary' : 'btn-outline-primary'} w-100`}
                onClick={() => setActiveTab('vols')}
              >
                <Plane size={16} className="me-2" />
                Vols
              </button>
            </div>
            <div className="col-6">
              <button
                className={`btn ${activeTab === 'hebergement' ? 'btn-primary' : 'btn-outline-primary'} w-100`}
                onClick={() => setActiveTab('hebergement')}
              >
                <Hotel size={16} className="me-2" />
                Hébergement
              </button>
            </div>
          </div>

          {activeTab === 'vols' && (
            <div className="row g-3 mt-2">
              <div className="col-md-6">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="allerRetour"
                    checked={allerRetour}
                    onChange={() => setAllerRetour(!allerRetour)}
                  />
                  <label className="form-check-label" htmlFor="allerRetour">Aller-retour</label>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="directOnly" />
                  <label className="form-check-label" htmlFor="directOnly">Vols directs uniquement</label>
                </div>
              </div>
            </div>
          )}

          <WeatherWidget destination={destination} />

          {activeTab === 'hebergement' && (
            <div className="row g-3 mt-2">
              <div className="col-md-4">
                <label className="form-label">Type d'hébergement</label>
                <select className="form-select">
                  <option value="">Tous types</option>
                  <option value="hotel">Hôtel</option>
                  <option value="appartement">Appartement</option>
                  <option value="maison">Maison</option>
                  <option value="auberge">Auberge</option>
                </select>
              </div>
              <div className="col-md-4">
                <label className="form-label">Étoiles</label>
                <select className="form-select">
                  <option value="">Toutes catégories</option>
                  <option value="5">5 étoiles</option>
                  <option value="4">4 étoiles et plus</option>
                  <option value="3">3 étoiles et plus</option>
                  <option value="2">2 étoiles et plus</option>
                </select>
              </div>
              <div className="col-md-4">
                <label className="form-label">Budget max/nuit</label>
                <div className="mb-2 text-center fw-bold text-primary">{budgetMax || 200}€</div>
                <input
                  type="range"
                  className="form-range"
                  min="50"
                  max="1000"
                  step="50"
                  value={budgetMax || 200}
                  onChange={(e) => setBudgetMax(Number(e.target.value))}
                />
                <div className="d-flex justify-content-between">
                  <small>50€</small>
                  <small>500€</small>
                  <small>1000€</small>
                </div>
              </div>
            </div>
          )}

          <div className="text-center mt-4">
            <button
              className="btn btn-primary px-4 py-2"
              onClick={handleSearch}
              disabled={!destination}
            >
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