import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/auth';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password || (!isLogin && !name)) {
      setError('Veuillez remplir tous les champs');
      return;
    }

    try {
      setLoading(true);

      if (isLogin) {
        await authService.login(email, password);
        navigate('/'); // Redirection vers la page d'accueil après connexion
      } else {
        await authService.register(email, password, name);
        setIsLogin(true); // Basculer vers le formulaire de connexion après inscription
        setError('');
        setPassword('');
      }
    } catch (err) {
      setError(isLogin
        ? 'Échec de la connexion. Vérifiez vos identifiants.'
        : 'Échec de l inscription. Cet email est peut-être déjà utilisé.'
      );
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 bg-light d-flex flex-column">
      <div className="container py-5 flex-grow-1 d-flex align-items-center justify-content-center">
        <div className="card shadow-sm" style={{ maxWidth: '450px', width: '100%' }}>
          <div className="card-body p-4">
            <h2 className="text-center mb-4">
              {isLogin ? 'Connexion' : 'Inscription'}
            </h2>

            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {!isLogin && (
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Nom</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Votre nom"
                  />
                </div>
              )}

              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre@email.com"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="password" className="form-label">Mot de passe</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                />
              </div>

              <div className="d-grid mb-3">
                <button
                  type="submit"
                  className="btn btn-primary py-2"
                  disabled={loading}
                >
                  {loading
                    ? (isLogin ? 'Connexion...' : 'Inscription...')
                    : (isLogin ? 'Se connecter' : 'S\'inscrire')}
                </button>
              </div>

              <div className="text-center">
                <button
                  type="button"
                  className="btn btn-link"
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setError('');
                  }}
                >
                  {isLogin
                    ? 'Pas encore de compte ? S\'inscrire'
                    : 'Déjà un compte ? Se connecter'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}