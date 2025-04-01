import React, { useState } from 'react';

export default function AuthModal({ isOpen, onClose }) {
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
        // Simulation de connexion, à remplacer par  service d'authentification
        console.log('Connexion avec:', { email, password });
        // await authService.login(email, password);
        onClose(); // Ferme le modal après connexion
      } else {
        // Simulation d'inscription, à remplacer par  service d'authentification
        console.log('Inscription avec:', { email, password, name });
        // await authService.register(email, password, name);
        setIsLogin(true); // Basculer vers le formulaire de connexion après inscription
        setError('');
        setPassword('');
      }
    } catch (err) {
      setError(isLogin
        ? 'Échec de la connexion. Vérifiez vos identifiants.'
        : 'Échec de l\'inscription. Cet email est peut-être déjà utilisé.'
      );
      console.error(err);
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