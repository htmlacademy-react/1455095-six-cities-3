import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { sortOffers } from '../../store/action';
import { SortType } from '../../types/sorting';
import { SORT_OPTION } from '../../const/const';

function PlacesSorting() {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();
  const currentSortType = useAppSelector((state) => state.main.currentSortingType);

  const handleOptionClick = (sortType: SortType) => {
    dispatch(sortOffers(sortType));
    setIsOpen(false);
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>
      <span className="places__sorting-type" onClick={() => setIsOpen(!isOpen)} tabIndex={0}>
        {currentSortType}
        <svg className="places__sorting-arrow" width={7} height={4}>
          <use xlinkHref="#icon-arrow-select" />
        </svg>
      </span>

      <ul className={`places__options places__options--custom ${isOpen ? 'places__options--opened' : ''}`}>
        {SORT_OPTION.map((option) => (
          <li key={option} className={`places__option ${currentSortType === option ? 'places__option--active' : ''}`} tabIndex={0} onClick={() => handleOptionClick(option)}>
            {option}
          </li>
        ))}
      </ul>
    </form>
  );
}

export default PlacesSorting;
