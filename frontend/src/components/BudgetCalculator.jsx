import { useState } from 'react';
import { DollarSign, TrendingUp, ArrowRight } from 'lucide-react';

const BudgetCalculator = () => {
  const [budget, setBudget] = useState('0');
  const [duration, setDuration] = useState('0');

  const budgetPerDay = budget && duration ? Math.round(parseInt(budget) / parseInt(duration)) : 0;
  const accomodationCost = budgetPerDay ? Math.round(budgetPerDay * 0.4) : 0;
  const foodCost = budgetPerDay ? Math.round(budgetPerDay * 0.3) : 0;
  const activitiesCost = budgetPerDay ? Math.round(budgetPerDay * 0.2) : 0;
  const transportCost = budgetPerDay ? Math.round(budgetPerDay * 0.1) : 0;

  return (
    <div className="card shadow">
      <div className="card-body">
        <h5 className="card-title">Calculateur de budget</h5>
        <p className="text-muted mb-4">Estimez vos dépenses quotidiennes</p>

        <div className="row g-3 mb-4">
          <div className="col-md-6">
            <label htmlFor="budget" className="form-label">Budget total (€)</label>
            <div className="input-group">
              <span className="input-group-text"><DollarSign size={16} /></span>
              <input
                type="number"
                className="form-control"
                id="budget"
                min="0"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-6">
            <label htmlFor="duration" className="form-label">Durée (jours)</label>
            <input
              type="number"
              className="form-control"
              id="duration"
              min="1"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />
          </div>
        </div>

        <div className="mb-4">
          <div className="d-flex justify-content-between mb-2">
            <span className="text-muted">Budget quotidien :</span>
            <strong className="text-primary">{budgetPerDay} €</strong>
          </div>
          <div className="progress" style={{ height: '8px' }}>
            <div
              className="progress-bar bg-primary"
              style={{ width: '100%' }}
            />
          </div>
        </div>

        <ul className="list-group list-group-flush mb-4">
          <li className="list-group-item d-flex justify-content-between">
            <small className="text-muted">Hébergement (40%)</small>
            <span>{accomodationCost} €</span>
          </li>
          <li className="list-group-item d-flex justify-content-between">
            <small className="text-muted">Nourriture (30%)</small>
            <span>{foodCost} €</span>
          </li>
          <li className="list-group-item d-flex justify-content-between">
            <small className="text-muted">Activités (20%)</small>
            <span>{activitiesCost} €</span>
          </li>
          <li className="list-group-item d-flex justify-content-between">
            <small className="text-muted">Transport local (10%)</small>
            <span>{transportCost} €</span>
          </li>
        </ul>


        <p className="text-muted text-center mt-4 mb-0" style={{ fontSize: '0.8rem' }}>
          TravelSmart vous aide à optimiser votre budget en fonction des coûts moyens à votre destination.
        </p>
      </div>
    </div>
  );
};

export default BudgetCalculator;
