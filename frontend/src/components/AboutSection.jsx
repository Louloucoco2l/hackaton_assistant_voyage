import React from "react";

const AboutSection = () => {
    return (
      <section id="about" className="py-5 bg-light">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <span className="badge bg-primary bg-opacity-10 text-primary fw-semibold mb-2 px-3 py-2 rounded-pill">
                À PROPOS
              </span>
              <h2 className="fw-bold mb-3">Notre mission</h2>
              <p className="text-muted">
                Chez TravelSmart, nous croyons que chaque voyage devrait être une expérience exceptionnelle,
                adaptée à vos besoins et préférences uniques. Notre mission est de rendre la planification
                de voyage aussi agréable que le voyage lui-même.
              </p>
              <p className="text-muted">
                Grâce à notre technologie d'intelligence artificielle avancée, nous analysons des millions
                de données pour vous proposer des recommandations personnalisées qui correspondent à votre
                style de voyage, votre budget et même les conditions météorologiques.
              </p>
              <button className="btn btn-primary px-4 py-2 rounded-pill mt-3">En savoir plus</button>
            </div>
            <div className="col-lg-6">
              <img src="https://images.unsplash.com/photo-1522199755839-a2bacb67c546?w=600" alt="Notre équipe" className="img-fluid rounded shadow" />
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default AboutSection;
  