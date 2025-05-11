import { useState } from 'react';
import { Link } from 'react-router-dom';
import { User } from 'lucide-react';
import AuthModal from './AuthModal';
import { useAuth } from '../context/AuthContext';
import { logoutUser } from '../services/firebase';

export default function Header() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { user } = useAuth() || {}; // Ajout d'une valeur par défaut pour éviter l'erreur de destructuration

  const handleLogout = async () => {
    try {
      await logoutUser();
      setShowDropdown(false);
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  return (
    <header className="header">
      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        <div className="container-fluid">
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
                <Link className="nav-link" to="/#features">Fonctionnalités</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/#plan">Planifier</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/#destinations">Destinations</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/#about">À propos</Link>
              </li>

              {!user ? (
                <li className="nav-item">
                  <button
                    className="btn btn-primary ms-lg-3 mt-2 mt-lg-0"
                    onClick={() => setIsAuthModalOpen(true)}
                  >
                    Connexion
                  </button>
                </li>
              ) : (
                <li className="nav-item dropdown">
                  <button
                    className="btn btn-outline-secondary ms-3 mt-2 mt-lg-0 d-flex align-items-center"
                    onClick={() => setShowDropdown(!showDropdown)}
                  >
                    <User size={18} className="me-1" />
                    {user.displayName || 'Mon compte'}
                  </button>
                  {showDropdown && (
                    <ul className="dropdown-menu show" style={{ right: 0, left: 'auto' }}>
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
        onLogin={() => setIsAuthModalOpen(false)}
      />
    </header>
  );
}