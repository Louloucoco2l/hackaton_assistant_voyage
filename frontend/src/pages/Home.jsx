import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min'; // Nécessaire pour le toggle


import "../styles/App.css";
import Header from '../components/Header';


export default function Home() {
  return (
    <div className="min-vh-100 bg-light d-flex flex-column">
      <Header />

      <main className="flex-grow-1 d-flex flex-column align-items-center justify-content-center text-center px-3">
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
    </div>
  );
}
