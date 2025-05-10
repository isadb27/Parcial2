// TODO: arregla typos de "error", maneja caso de error y exito
export async function getPlants(): Promise<any> {
    return [];
}

import { Plant } from '../models/Plant';

export const fetchPlants = async (): Promise<Plant[]> => {
  try {
    const response = await fetch('http://192.168.131.101:8080/dca/api/plants');
    if (!response.ok) {
      throw new Error('Error al obtener las plantas');
    }
    const data: Plant[] = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
