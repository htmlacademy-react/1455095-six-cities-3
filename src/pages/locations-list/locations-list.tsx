import { OffersType, City } from '../../types/offers';
import { useAppDispatch } from '../../hooks';
import { toggleCity } from '../../store/action';

type LocationsListProps = {
  currentCity: City;
  offers: OffersType;
};

function LocationsList({ currentCity, offers }: LocationsListProps) {
  const dispatch = useAppDispatch();

  const handleCityClick = (city: City) => (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    dispatch(toggleCity(city));
  };

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

  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {uniqueCities.map((item) => (
          <li key={item.name} className="locations__item">
            <a className={`locations__item-link tabs__item ${currentCity.name === item.name ? 'tabs__item--active' : ''}`} href="#" onClick={handleCityClick(item)}>
              <span>{item.name}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
export default LocationsList;
