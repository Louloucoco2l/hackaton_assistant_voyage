import React, { useState } from 'react';
import Header from '../components/Header';
import FlightSearch from '../components/FlightSearch';
import HotelSearch from '../components/HotelSearch';
import WeatherWidget from '../components/WeatherWidget';

export default function Search() {
  const [activeTab, setActiveTab] = useState('flights');
  const [destination, setDestination] = useState('Paris');

  return (
    <div className="min-vh-100 bg-light d-flex flex-column">
      <Header />

      <div className="container py-5 flex-grow-1">
        <div className="row">
          <div className="col-lg-8">
            <div className="card shadow-sm mb-4">
              <div className="card-header bg-white">
                <ul className="nav nav-tabs card-header-tabs">
                  <li className="nav-item">
                    <button
                      className={`nav-link ${activeTab === 'flights' ? 'active' : ''}`}
                      onClick={() => setActiveTab('flights')}
                    >
                      Vols
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className={`nav-link ${activeTab === 'hotels' ? 'active' : ''}`}
                      onClick={() => setActiveTab('hotels')}
                    >
                      Hôtels
                    </button>
                  </li>
                </ul>
              </div>
              <div className="card-body">
                {activeTab === 'flights' ? (
                  <FlightSearch onDestinationChange={setDestination} />
                ) : (
                  <HotelSearch />
                )}
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <WeatherWidget city={destination} />

            <div className="card shadow-sm mt-4">
              <div className="card-body">
                <h5 className="card-title">Conseils de voyage</h5>
                <p className="card-text">
                  Découvrez les meilleures périodes pour visiter {destination} et les attractions incontournables.
                </p>
                <button className="btn btn-outline-primary btn-sm">
                  En savoir plus
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-white py-4 border-top">
        <div className="container text-center text-muted">
          <p className="mb-0">© 2025 TravelSmart - Assistant Personnel de Voyage</p>
        </div>
      </footer>
    </div>
  );
}