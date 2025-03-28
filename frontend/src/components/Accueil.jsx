import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

export default function Accueil() {
  return (
    <>
      {/* SECTION HERO */}
      <main className="flex-grow-1 d-flex flex-column align-items-center justify-content-center text-center px-3 pt-5 mt-5">
        <div className="bg-white px-4 py-2 rounded-pill shadow-sm fw-medium mb-3 small">
          VOTRE ASSISTANT PERSONNEL DE VOYAGE
        </div>

        <h2 className="fw-bold display-5">
          Voyagez intelligent,<br />
          voyagez <span className="text-primary">TravelSmart</span>
        </h2>

        <p className="text-muted lead mt-3 mb-4 w-100" style={{ maxWidth: "600px" }}>
          Planifiez, réservez et profitez de vos voyages en toute simplicité grâce à notre assistant IA qui s'adapte à votre budget et aux conditions météorologiques.
        </p>

        <div className="d-flex flex-column flex-sm-row gap-3">
          <button className="btn btn-primary px-4 py-2">Commencer à planifier</button>
          <button className="btn btn-outline-secondary px-4 py-2">En savoir plus</button>
        </div>

        <div className="mt-5 fs-3 text-secondary" style={{ animation: 'bounce 2s infinite' }}>
          ⌄
        </div>
      </main>

      {/* SECTION FONCTIONNALITÉS */}
      <section className="py-5 bg-white" id="features">
        <div className="text-center mb-4">
          <span className="badge bg-primary bg-opacity-10 text-primary fw-semibold mb-2 px-3 py-2 rounded-pill">
            FONCTIONNALITÉS
          </span>
          <h2 className="fw-bold fs-2">Voyagez intelligent avec TravelSmart</h2>
          <p className="text-muted mb-5">
            Notre assistant personnel de voyage vous offre une expérience de planification sans précédent grâce à des fonctionnalités intelligentes.
          </p>
        </div>

        <div className="container">
          <div className="row g-4">
            <div className="col-md-6 col-lg-3">
              <div className="p-4 border rounded shadow-sm h-100 text-center">
                <div className="mb-3 fs-3 text-primary">🛡️</div>
                <h5 className="fw-bold">Sécurité avancée</h5>
                <p className="text-muted small">
                  Authentification multi-facteurs et encryption de vos données pour des voyages en toute sérénité.
                </p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="p-4 border rounded shadow-sm h-100 text-center">
                <div className="mb-3 fs-3 text-primary">🕒</div>
                <h5 className="fw-bold">Planification simplifiée</h5>
                <p className="text-muted small">
                  Créez et modifiez vos itinéraires en quelques clics avec notre interface intuitive.
                </p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="p-4 border rounded shadow-sm h-100 text-center">
                <div className="mb-3 fs-3 text-primary">🤖</div>
                <h5 className="fw-bold">IA de recommandation</h5>
                <p className="text-muted small">
                  Découvrez des activités et hébergements personnalisés selon vos préférences et votre budget.
                </p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="p-4 border rounded shadow-sm h-100 text-center">
                <div className="mb-3 fs-3 text-primary">🌤️</div>
                <h5 className="fw-bold">Prévisions météo</h5>
                <p className="text-muted small">
                  Adaptez votre itinéraire en fonction des conditions météorologiques pour optimiser votre expérience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
