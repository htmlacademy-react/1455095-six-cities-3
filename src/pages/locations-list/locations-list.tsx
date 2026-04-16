import { OffersType, City } from '../../types/offers';

type LocationsListProps = {
  currentCity: City;
  offers: OffersType;
  onDataCitySend: (param: City) => void;
};

function LocationsList({ currentCity, offers, onDataCitySend }: LocationsListProps) {
  function getUniqueCities(offersArray: OffersType): City[] {
    const uniqueCities: City[] = [];

    for (const item of offersArray) {
      const isCityExists = uniqueCities.some((city) => city.name === item.city.name);
      if (!isCityExists) {
        uniqueCities.push(item.city);
      }
    }

    return uniqueCities;
  }

  const uniqueCities = getUniqueCities(offers);

  const handleCityClick = (city: City) => {
    onDataCitySend(city);
  };

  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {uniqueCities.map((item) => (
          <li key={item.name} className="locations__item">
            <a
              className={`locations__item-link tabs__item ${currentCity.name === item.name ? 'tabs__item--active' : ''}`}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleCityClick(item);
              }}
            >
              <span>{item.name}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
export default LocationsList;
