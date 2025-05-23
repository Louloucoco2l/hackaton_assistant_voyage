import React, { useState } from 'react';
import { registerUser, loginUser } from '../services/firebase';

export default function AuthModal({ isOpen, onClose, onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

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
        await loginUser(email, password);
        onLogin();
        onClose();
      } else {
        await registerUser(email, password, name);
        setIsLogin(true);
        setError('Inscription réussie ! Vous pouvez maintenant vous connecter.');
        setPassword('');
      }
    } catch (err) {
      console.error('Erreur auth:', err);
      setError(
        err.code === 'auth/email-already-in-use'
          ? 'Cet email est déjà utilisé'
          : err.code === 'auth/invalid-email'
          ? 'Email invalide'
          : err.code === 'auth/weak-password'
          ? 'Le mot de passe doit contenir au moins 6 caractères'
          : 'Une erreur est survenue'
      );
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }} tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{isLogin ? 'Connexion' : 'Inscription'}</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
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
                  placeholder="votre adresse email"
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
                    : (isLogin ? 'Se connecter' : "S'inscrire")}
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
                    ? "Pas encore de compte ? S'inscrire"
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