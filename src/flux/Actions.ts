import { dispatcher } from './dispatcher';
import { Plant } from './types';

export const setPlants = (plants: Plant[]) => {
  dispatcher.dispatch({ type: 'SET_PLANTS', payload: plants });
};

export const addToGarden = (id: number) => {
  dispatcher.dispatch({ type: 'ADD_TO_GARDEN', payload: id });
};

export const removeFromGarden = (id: number) => {
  dispatcher.dispatch({ type: 'REMOVE_FROM_GARDEN', payload: id });
};

export const navigateTo = (page: string) => {
  dispatcher.dispatch({ type: 'NAVIGATE', payload: page });
};

export const updateGardenName = (name: string) => {
  dispatcher.dispatch({ type: 'UPDATE_GARDEN_NAME', payload: name });
};

export const updatePlant = (plant: Plant) => {
  dispatcher.dispatch({ type: 'UPDATE_PLANT', payload: plant });
};
