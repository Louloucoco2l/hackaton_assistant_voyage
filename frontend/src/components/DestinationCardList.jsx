import DestinationCard from './DestinationCard';

const destinations = [
  {
    image: 'https://source.unsplash.com/600x400/?paris',
    name: 'Paris',
    location: 'France',
    price: 250,
    rating: 5,
    bestSeason: 'Printemps',
  },
  {
    image: 'https://source.unsplash.com/600x400/?barcelona',
    name: 'Barcelone',
    location: 'Espagne',
    price: 300,
    rating: 5,
    bestSeason: 'Été',
  },
  {
    image: 'https://source.unsplash.com/600x400/?venice',
    name: 'Venise',
    location: 'Italie',
    price: 350,
    rating: 5,
    bestSeason: 'Automne',
  },
  {
    image: 'https://source.unsplash.com/600x400/?greece,beauty',
    name: 'Santorin',
    location: 'Grèce',
    price: 400,
    rating: 4,
    bestSeason: 'Été',
  },
];

const DestinationCardList = () => {
  return (
    <section className="py-5 bg-white">
      <div className="container text-center">
        <span className="badge bg-primary bg-opacity-10 text-primary fw-semibold mb-2 px-3 py-2 rounded-pill">
          DESTINATIONS
        </span>
        <h2 className="fw-bold mb-2">Destinations populaires</h2>
        <p className="text-muted mb-4">
          Laissez-vous inspirer par nos destinations les plus appréciées et commencez à planifier votre prochain voyage.
        </p>

        <div className="row g-4">
          {destinations.map((destination, index) => (
            <div className="col-sm-6 col-lg-3" key={index}>
              <DestinationCard {...destination} />
            </div>
          ))}
        </div>

        <div className="mt-5">
          <button className="btn btn-outline-primary px-4 py-2 rounded-pill fw-medium">
            Voir toutes les destinations
          </button>
        </div>
      </div>
    </section>
  );
};

export default DestinationCardList;
