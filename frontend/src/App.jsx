import { Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { ErrorBoundary } from 'react-error-boundary'; // Ajoutez cet import
import './styles/App.css';

// Composants
import Header from './components/Header';
import Accueil from './components/Accueil';
import PlannerSection from './components/PlannerSection';
import ChatAssistant from './components/ChatAssistant';
import TravelTipsCard from './components/TravelTipsCard';
import DestinationCardList from './components/DestinationCardList';
import AboutSection from './components/AboutSection';
import Footer from './components/Footer';
import FlightResults from './pages/FlightResults';

// Composant pour afficher les erreurs
const ErrorFallback = ({ error }) => (
  <div className="container text-center py-5">
    <h2>Oops! Une erreur est survenue</h2>
    <p className="text-muted">{error?.message || "Une erreur inattendue s'est produite"}</p>
    <button
      className="btn btn-primary mt-3"
      onClick={() => window.location.reload()}
    >
      Rafraîchir la page
    </button>
  </div>
);

// Composant Page d'accueil
const HomePage = () => (
  <>
    <Accueil />
    <PlannerSection />
    <section id="features" className="py-5">
      <div className="container-fluid">
        <div className="row g-4">
          <div className="col-md-6">
            <TravelTipsCard />
          </div>
          <div className="col-md-6">
            <ChatAssistant />
          </div>
        </div>
      </div>
    </section>
    <DestinationCardList />
    <AboutSection />
    <Footer />
  </>
);

export default function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div className="min-vh-100 d-flex flex-column">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/vols"
            element={
              <>
                <FlightResults />
                <Footer />
              </>
            }
          />
          {/* Route 404 */}
          <Route
            path="*"
            element={
              <div className="container text-center py-5">
                <h2>Page non trouvée</h2>
                <p className="text-muted">La page que vous recherchez n'existe pas.</p>
                <a href="/" className="btn btn-primary">Retour à l'accueil</a>
              </div>
            }
          />
        </Routes>
      </div>
    </ErrorBoundary>
  );
}