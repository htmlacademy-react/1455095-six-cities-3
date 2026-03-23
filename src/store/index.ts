import { configureStore } from '@reduxjs/toolkit';
import { updateMainCity } from './reducer';

export const store = configureStore({
  // reducer: updateMainCity // configureStore ожидает объект с полем reducer
  reducer: {
    main: updateMainCity,
    // другие редьюсеры
  },
});

// важно.
// Глобальное глоб хранилище хранится в памяти на клиенте, state нигде не сохраняется

// const store = configureStore({
//   reducer: updateMainCity,
//   preloadedState: 0,
// });
