// src/pages/DetailsVol.jsx

import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Card,
  Row,
  Col,
  Accordion,
  Badge,
  ListGroup,
  InputGroup,
  FormControl,
  Button
} from 'react-bootstrap';

export default function DetailsVol() {
  // 1) On récupère l'état passé depuis FlightResults
  const { state } = useLocation();
  const { flight, returnLeg, totalPrice } = state || {};

  if (!flight) {
    return <p className="text-center mt-5">Aucun vol sélectionné.</p>;
  }

  // 2) Prix initial
  const prixInitial = parseFloat(totalPrice || 0);

  // 3) Construction des listes d'options payantes (aller + retour identiques)
  const optionsAller = Array.from(new Set(
    flight.itineraries.flatMap(itin =>
      itin.segments.flatMap(seg => {
        const fd = flight.travelerPricings[0]
          .fareDetailsBySegment
          .find(fd => fd.segmentId === seg.id);
        return fd
          ? fd.amenities
              .filter(a => a.isChargeable)
              .map(a => a.description)
          : [];
      })
    )
  ));
  // Si aucun bagage cabine n'est inclus, on ajoute automatiquement
  const aBagageCabine = flight.itineraries.some(itin =>
    itin.segments.some(seg => {
      const fd = flight.travelerPricings[0]
        .fareDetailsBySegment
        .find(fd => fd.segmentId === seg.id);
      return fd?.includedCabinBags?.quantity > 0;
    })
  );
  if (!aBagageCabine) {
    optionsAller.push('Bagage à main (jusqu’à 8 kg)');
  }
  const optionsRetour = [...optionsAller]; // mêmes options au retour

  // 4) États des compteurs pour Aller / Retour
  const [quantitesAller, setQuantitesAller]   = useState(
    () => optionsAller.reduce((o, opt) => ({ ...o, [opt]: 0 }), {})
  );
  const [quantitesRetour, setQuantitesRetour] = useState(
    () => optionsRetour.reduce((o, opt) => ({ ...o, [opt]: 0 }), {})
  );

  const augmenterAller = opt =>
    setQuantitesAller(q => ({ ...q, [opt]: q[opt] + 1 }));
  const diminuerAller  = opt =>
    setQuantitesAller(q => ({ ...q, [opt]: Math.max(q[opt] - 1, 0) }));

  const augmenterRetour = opt =>
    setQuantitesRetour(q => ({ ...q, [opt]: q[opt] + 1 }));
  const diminuerRetour  = opt =>
    setQuantitesRetour(q => ({ ...q, [opt]: Math.max(q[opt] - 1, 0) }));

  // 5) Calcul des coûts additionnels et du prix final
  const totalOptAller  = Object.values(quantitesAller).reduce((s, v) => s + v, 0);
  const totalOptRetour = Object.values(quantitesRetour).reduce((s, v) => s + v, 0);
  const coûtAller      = totalOptAller  * 60;
  const coûtRetour     = totalOptRetour * 60;
  const prixFinal      = (prixInitial + coûtAller + coûtRetour).toFixed(2);

  return (
    <div className="container my-5">
      {/* En-tête avec prix total */}
      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <Row>
            <Col><h2>Détails du vol</h2></Col>
            <Col className="text-end">
              <h3 className="text-primary">{prixFinal} €</h3>
              {(totalOptAller + totalOptRetour) > 0 && (
                <small className="text-muted">
                  (+ Aller : {totalOptAller}×60 € = {coûtAller} €, 
                   Retour : {totalOptRetour}×60 € = {coûtRetour} €)
                </small>
              )}
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* En-tête de l’offre */}
      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <Row>
            <Col md={8}>
              <div><strong>Offre n°{flight.id}</strong></div>
              <div>
                Compagnie : <strong>{flight.validatingAirlineCodes.join(', ')}</strong>
              </div>
              <div>Source : <Badge bg="secondary">{flight.source}</Badge></div>
            </Col>
            <Col md={4} className="text-end">
              <Badge bg="info" pill>
                {flight.numberOfBookableSeats} siège
                {flight.numberOfBookableSeats > 1 && 's'} dispo
              </Badge>
              <div className="mt-2 text-muted">
                Date limite : {flight.lastTicketingDate}
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Accordéon : itinéraires + retour */}
      <Accordion id="retour" defaultActiveKey="1" className="mb-4">
        {/* Itinéraire Aller */}
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            {flight.itineraries[0].segments[0].departure.iataCode} →{' '}
            {flight.itineraries[0].segments.slice(-1)[0].arrival.iataCode}{' '}
            <small className="text-muted">
              ({flight.itineraries[0].duration.replace('PT','')})
            </small>
          </Accordion.Header>
          <Accordion.Body>
            {/* Segments du vol Aller */}
            {flight.itineraries[0].segments.map(seg => (
              <Card key={seg.id} className="mb-3">
                <Card.Body>
                  <Row>
                    <Col md={3}>
                      <h5>{seg.carrierCode} {seg.number}</h5>
                      <div>Appareil : {seg.aircraft?.code || '—'}</div>
                    </Col>
                    <Col md={3}>
                      <strong>Départ</strong><br/>
                      {seg.departure.iataCode}<br/>
                      {new Date(seg.departure.at).toLocaleString()}
                    </Col>
                    <Col md={3}>
                      <strong>Arrivée</strong><br/>
                      {seg.arrival.iataCode}<br/>
                      {new Date(seg.arrival.at).toLocaleString()}
                    </Col>
                    <Col md={3}>
                      <strong>Durée</strong><br/>
                      {seg.duration.replace('PT','')}
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            ))}

            {/* Options payantes Aller */}
            <Card className="mb-3">
              <Card.Body>
                <h6>Options payantes (Aller) – 60 € / unité</h6>
                <ListGroup variant="flush" className="mt-2">
                  {optionsAller.map(opt => (
                    <ListGroup.Item
                      key={`aller-${opt}`}
                      className="d-flex align-items-center"
                    >
                      <div className="flex-grow-1">{opt}</div>
                      <InputGroup style={{ width: '120px' }}>
                        <Button
                          size="sm" variant="outline-secondary"
                          onClick={() => diminuerAller(opt)}
                        >–</Button>
                        <FormControl
                          value={quantitesAller[opt]}
                          readOnly
                          className="text-center"
                        />
                        <Button
                          size="sm" variant="outline-secondary"
                          onClick={() => augmenterAller(opt)}
                        >+</Button>
                      </InputGroup>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card.Body>
            </Card>
          </Accordion.Body>
        </Accordion.Item>

        {/* Retour simulé */}
        <Accordion.Item eventKey="1">
          <Accordion.Header>
            {flight.itineraries[0].segments.slice(-1)[0].arrival.iataCode} →{' '}
            {flight.itineraries[0].segments[0].departure.iataCode}{' '}
            <small className="text-muted">
              ({returnLeg.duration})
            </small>
          </Accordion.Header>
          <Accordion.Body>
            {/* Trajet retour simulé */}
            <Card className="mb-3">
              <Card.Body>
                <Row>
                  <Col md={4}>
                    <strong>Départ</strong><br/>
                    {returnLeg.departure.time} — {returnLeg.departure.iata}
                  </Col>
                  <Col md={4} className="text-center">
                    <strong>Durée</strong><br/>
                    {returnLeg.duration}
                  </Col>
                  <Col md={4} className="text-end">
                    <strong>Arrivée</strong><br/>
                    {returnLeg.arrival.time} — {returnLeg.arrival.iata}
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            {/* Options payantes Retour */}
            <Card>
              <Card.Body>
                <h6>Options payantes (Retour) – 60 € / unité</h6>
                <ListGroup variant="flush" className="mt-2">
                  {optionsRetour.map(opt => (
                    <ListGroup.Item
                      key={`retour-${opt}`}
                      className="d-flex align-items-center"
                    >
                      <div className="flex-grow-1">{opt}</div>
                      <InputGroup style={{ width: '120px' }}>
                        <Button
                          size="sm" variant="outline-secondary"
                          onClick={() => diminuerRetour(opt)}
                        >–</Button>
                        <FormControl
                          value={quantitesRetour[opt]}
                          readOnly
                          className="text-center"
                        />
                        <Button
                          size="sm" variant="outline-secondary"
                          onClick={() => augmenterRetour(opt)}
                        >+</Button>
                      </InputGroup>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card.Body>
            </Card>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      {/* Section Paiement */}
      <Card className="shadow-sm">
        <Card.Header>Paiement</Card.Header>
        <Card.Body>
          <Row className="align-items-center mb-3">
            <Col><strong>Montant à régler :</strong></Col>
            <Col className="text-end"><h4>{prixFinal} €</h4></Col>
          </Row>
          <div className="mb-3">
            <span className="border p-2 me-2">Visa</span>
            <span className="border p-2">MasterCard</span>
          </div>
          <Button variant="primary">Payer {prixFinal} €</Button>
        </Card.Body>
      </Card>
    </div>
  );
}
