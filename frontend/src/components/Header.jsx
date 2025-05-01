import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { User } from 'lucide-react';
import AuthModal from './AuthModal';

export default function Header() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setShowDropdown(false);
  };

  return (
    <header className="header">
      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        <div className="container-fluid">
          {/* Utilisation de Link pour la navigation React Router */}
          <Link className="navbar-brand fw-bold text-primary" to="/">
            TravelSmart
          </Link>
          <button
            className="navbar-toggler me-3"
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
                {/* Liens ancres pour le défilement dans la même page */}
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

              {!isAuthenticated ? (
                <li className="nav-item">
                  <button
                    className="btn btn-primary ms-lg-3 mt-2 mt-lg-0"
                    onClick={() => setIsAuthModalOpen(true)}
                  >
                    S'inscrire
                  </button>
                </li>
              ) : (
                <li className="nav-item dropdown">
                  <button
                    className="btn btn-outline-secondary ms-3 mt-2 mt-lg-0 d-flex align-items-center"
                    onClick={() => setShowDropdown(!showDropdown)}
                  >
                    <User size={18} className="me-1" />
                    Mon compte
                  </button>
                  {showDropdown && (
                    <ul className="dropdown-menu show" style={{ right: 0, left: 'auto' }}>
                      {/* Utilisation de Link pour les routes authentifiées */}
                      <li><Link className="dropdown-item" to="/profile">Mon profil</Link></li>
                      <li><Link className="dropdown-item" to="/reservations">Mes réservations</Link></li>
                      <li><hr className="dropdown-divider" /></li>
                      <li><button className="dropdown-item" onClick={handleLogout}>Se déconnecter</button></li>
                    </ul>
                  )}
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={handleLogin}
      />
    </header>
  );
}