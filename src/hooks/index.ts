import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { State, AppDispatch } from '../types/state';

// Для взаимодействия с хранилищем используем хуки

// Сделаем обёртки, базирующиеся на хуках из редакс, благодаря чему хуки понимают, что хранится в хранилище
// Для отправки действий. Что бы мы не могли диспачнуть действие, которое мы не создавали
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Поможет с использованием доп интерфейса TypedUseSelectorHook, при написании функции селектора позволит понимать, что у нас в state
export const useAppSelector: TypedUseSelectorHook<State> = useSelector;
