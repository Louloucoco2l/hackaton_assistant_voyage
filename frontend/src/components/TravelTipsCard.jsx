import { Card } from 'react-bootstrap';
import { Globe, CheckCircle, AlertCircle } from 'lucide-react';

const TravelTipsCard = () => {
  return (
    <Card className="shadow h-100">
      <Card.Body>
        <Card.Title><Globe className="me-2" />Conseils de voyage</Card.Title>

        <ul className="list-unstyled mt-3">
          <li className="mb-3">
            <CheckCircle size={16} className="text-success me-2" />
            Vérifiez les exigences de visa :
            <br />
            <a
              href="https://www.visahq.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              visahq.com
            </a> ou 
            <a
              href="https://www.diplomatie.gouv.fr/fr/services-aux-francais/preparer-son-expatriation/entree-et-sejour-dans-un-pays-etranger/"
              target="_blank"
              rel="noopener noreferrer"
            >
              diplomatie.gouv.fr
            </a>
          </li>

          <li className="mb-3">
            <CheckCircle size={16} className="text-success me-2" />
            Souscrivez une assurance voyage (santé, annulation, bagages)
          </li>

          <li className="mb-3">
            <CheckCircle size={16} className="text-success me-2" />
            Apportez un adaptateur universel et une batterie externe
          </li>

          <li className="mb-3">
            <CheckCircle size={16} className="text-success me-2" />
            Conservez une copie papier de vos documents importants
          </li>
        </ul>

        <p className="text-muted small mt-4">
          <AlertCircle size={14} className="me-1" /> Pour plus d’infos sur la sécurité et la santé à l’étranger, consultez :
          <br />
          <a
            href="https://www.diplomatie.gouv.fr/fr/conseils-aux-voyageurs/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Conseils aux voyageurs – diplomatie.gouv.fr
          </a>
        </p>
      </Card.Body>
    </Card>
  );
};

export default TravelTipsCard;
