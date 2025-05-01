import { Facebook, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="planner-bg border-top pt-5 pb-4 mt-auto">
     <div className="container footer-style">
        <div className="row align-items-center mb-4">
          <div className="col-md-6">
            <h5 className="fw-bold text-primary mb-1">TravelSmart</h5>
            <p className="text-muted mb-0">
              Assistant personnel de voyage intelligent qui simplifie<br />
              l'organisation de vos voyages grâce à l'IA.
            </p>
          </div>

          <div className="col-md-6 text-md-end mt-4 mt-md-0">
            <a href="#" className="text-dark me-3">
              <Facebook size={18} />
            </a>
            <a href="#" className="text-dark me-3">
              <Twitter size={18} />
            </a>
            <a href="#" className="text-dark">
              <Instagram size={18} />
            </a>
          </div>
        </div>

        <hr className="border-dark" />

        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center text-muted small">
          <div className="mb-2 mb-md-0">
            © 2023 TravelSmart. Tous droits réservés.
          </div>
          <div>
            <a href="#" className="text-dark me-3">Conditions d'utilisation</a>
            <a href="#" className="text-dark me-3">Politique de confidentialité</a>
            <a href="#" className="text-dark">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
