import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

export default function Header() {
  return (
    <header className="header">
      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        <div className="container-fluid">
          <a className="navbar-brand fw-bold text-primary" href="#homeScreen">
            TravelSmart
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link" href="#features">Fonctionnalités</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#plan">Planifier</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#destinations">Destinations</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#about">À propos</a>
              </li>
              <li className="nav-item">
                <a className="btn btn-primary ms-lg-3 mt-2 mt-lg-0" href="#signup">
                  S'inscrire
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
