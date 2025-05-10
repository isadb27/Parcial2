export type Plant = {
  id: string;
  nombreComun: string;
  nombreCientifico: string;
  imagenUrl: string;
  descripcion?: string;
};

type AppState = {
  gardenName: string;
  allPlants: Plant[];
  gardenPlants: string[];
  currentPage: 'home' | 'editGarden' | 'admin';
  loading: boolean;
};

const state: AppState = {
  gardenName: 'Mi Jardín Virtual',
  allPlants: [],
  gardenPlants: [],
  currentPage: 'home',
  loading: true,
};

const listeners: (() => void)[] = [];

export const store = {
  getState: (): AppState => state,

  subscribe: (listener: () => void): void => {
    listeners.push(listener);
  },

  notify: () => listeners.forEach((fn) => fn()),

  async fetchPlantsFromAPI() {
    try {
      const response = await fetch('http://192.168.131.101:8080/dca/api/plants');
      const data = await response.json();
      state.allPlants = data;
    } catch (error) {
      console.error('Error al cargar plantas:', error);
    } finally {
      state.loading = false;
      store.notify();
    }
  },

  setState: (newState: Partial<AppState>): void => {
    Object.assign(state, newState);
    store.notify();
  },

  navigate: (page: AppState['currentPage']) => {
    state.currentPage = page;
    store.notify();
  },

  addToGarden: (id: string): void => {
    if (!state.gardenPlants.includes(id)) {
      state.gardenPlants.push(id);
      store.notify();
    }
  },

  removeFromGarden: (id: string): void => {
    state.gardenPlants = state.gardenPlants.filter((pid) => pid !== id);
    store.notify();
  },

  updatePlant: (updatedPlant: Plant): void => {
    const index = state.allPlants.findIndex((p) => p.id === updatedPlant.id);
    if (index !== -1) {
      state.allPlants[index] = updatedPlant;
      store.notify();
    }
  }
};