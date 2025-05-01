const AboutSection = () => {
    return (
      <section id="about" className="py-5">
        <div className="container">
          <div className="row align-items-center g-5">
            {/* Texte à gauche */}
            <div className="col-lg-6">
              <span className="badge bg-primary bg-opacity-10 text-primary fw-semibold mb-3 px-3 py-2 rounded-pill">
                À PROPOS
              </span>
              <h2 className="fw-bold mb-3">Votre voyage, optimisé</h2>
              <p className="text-muted mb-3">
                TravelSmart a pour ambition de révolutionner la planification de voyage en intégrant l'IA et l'automatisation pour offrir une expérience simplifiée et personnalisée.
              </p>
              <p className="text-muted mb-4">
                Avec une gestion intelligente des réservations, des recommandations adaptées et une synchronisation des données en temps réel, notre application apporte une réelle valeur ajoutée aux voyageurs modernes.
              </p>
              <button className="btn btn-primary btn-lg px-4 rounded-pill shadow-sm">
                En savoir plus
              </button>
            </div>
  
            {/* Image à droite */}
            <div className="col-lg-6">
              <img
                src="https://images.unsplash.com/photo-1506744038136-46273834b3fb"
                alt="Voyage"
                className="img-fluid rounded-4 shadow"
              />
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default AboutSection;
  