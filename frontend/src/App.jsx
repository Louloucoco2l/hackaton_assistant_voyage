import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import './styles/App.css';
import Header from './components/Header';
import Accueil from './components/Accueil';
import PlannerSection from './components/PlannerSection';
import BudgetCalculator from './components/BudgetCalculator';
import WeatherWidget from './components/WeatherWidget';
import DestinationCardList from './components/DestinationCardList';
import AboutSection from './components/AboutSection';
import Footer from './components/Footer';

import { DestinationProvider } from './context/DestinationContext';

import ErrorBoundary from './components/ErrorBoundary';

export default function App() {
  return (
    <ErrorBoundary>
      <DestinationProvider>
        <div className="min-vh-100 bg-light d-flex flex-column">
          <Header />
          <Accueil />
          <PlannerSection />
          <section className="py-5">
            <div className="container">
              <div className="row g-4">
                <div className="col-md-6">
                  <WeatherWidget />
                </div>
                <div className="col-md-6">
                  <BudgetCalculator />
                </div>
              </div>
            </div>
          </section>
          <DestinationCardList />
          <AboutSection />
          <Footer />
        </div>
      </DestinationProvider>
    </ErrorBoundary>
  );
}