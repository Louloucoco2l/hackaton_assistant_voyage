import React, { useRef } from 'react';

export default function Accueil() {
  const fonctionnalitesRef = useRef(null);

  const scrollToNextSection = () => {
    fonctionnalitesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Section Hero - pleine hauteur */}
      <section id="homeScreen" className="hero-section vh-100 d-flex flex-column justify-content-center position-relative">
        <div
          className="position-absolute top-0 start-0 w-100 h-100 z-0"
          style={{
            zIndex: -1
          }}
        ></div>

        <div className="container text-center z-1 my-auto">
          <div className="bg-white px-4 py-2 rounded-pill shadow-sm fw-medium mb-3 small d-inline-block mx-auto">
            VOTRE ASSISTANT PERSONNEL DE VOYAGE
          </div>

          <h1 className="fw-bold display-4 mt-4">
            Voyagez intelligent,<br />
            voyagez <span className="text-primary">TravelSmart</span>
          </h1>

          <p className="text-muted lead mt-3 mb-4 mx-auto" style={{ maxWidth: "600px" }}>
            Planifiez, réservez et profitez de vos voyages en toute simplicité grâce à notre assistant IA qui s'adapte à votre budget et aux conditions météorologiques.
          </p>

          <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
            <button className="btn btn-primary px-4 py-2 rounded-pill">Commencer à planifier</button>
            <button className="btn btn-outline-secondary px-4 py-2 rounded-pill">En savoir plus</button>
          </div>
        </div>

        {/* Bouton de défilement vers le bas */}
        <div className="position-absolute bottom-0 start-50 translate-middle-x mb-4 d-flex justify-content-center">
          <button
            onClick={scrollToNextSection}
            className="btn btn-light rounded-circle p-2 shadow-sm"
            style={{
              animation: 'bounce 2s infinite',
              width: '48px',
              height: '48px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(10px)'
            }}
            aria-label="Défiler vers le bas"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-chevron-down text-secondary" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
            </svg>
          </button>
        </div>
      </section>

      {/* Section Fonctionnalités */}
      <section id="features" ref={fonctionnalitesRef} className="py-5 bg-white">
        <div className="container text-center">
          <span className="badge bg-primary bg-opacity-10 text-primary fw-semibold mb-2 px-3 py-2 rounded-pill">
            FONCTIONNALITÉS
          </span>
          <h2 className="fw-bold mb-2">Voyagez intelligent avec TravelSmart</h2>
          <p className="text-muted mb-5">
            Notre assistant personnel de voyage vous offre une expérience de planification sans précédent grâce à des fonctionnalités intelligentes.
          </p>

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
        </div>
      </section>


    </>
  );
}