import React from 'react';
import { useState } from 'react';
import { SORT_OPTION } from '../../const/const';
import { SortType } from '../../types/sorting';

type PlacesSortingProps = {
  currentSortType: SortType;
  onDataSortTypeSend: (param: SortType) => void;
};

function PlacesSorting({ currentSortType, onDataSortTypeSend }: PlacesSortingProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSorting = () => setIsOpen(!isOpen);

  const handleSortChange = (option: SortType) => {
    onDataSortTypeSend(option);
    setIsOpen(false);
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>
      <span className="places__sorting-type" onClick={toggleSorting}>
        {currentSortType}
        <svg className="places__sorting-arrow" width={7} height={4}>
          <use xlinkHref="#icon-arrow-select" />
        </svg>
      </span>

      <ul className={`places__options places__options--custom ${isOpen ? 'places__options--opened' : ''}`}>
        {SORT_OPTION.map((option) => (
          <li
            key={option}
            className={`places__option ${currentSortType === option ? 'places__option--active' : ''}`}
            tabIndex={0}
            onClick={(e) => {
              e.stopPropagation();
              handleSortChange(option);
            }}
          >
            {option}
          </li>
        ))}
      </ul>
    </form>
  );
}

const MemoizedPlacesSorting = React.memo(PlacesSorting);

export default MemoizedPlacesSorting;
