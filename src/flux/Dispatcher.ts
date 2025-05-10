type Action = {
  type: string;
  payload?: any;
};

type Listener = () => void;

class Dispatcher {
  private listeners: Listener[] = [];
  private state: any = {
    allPlants: [],
    gardenPlants: [],
    currentPage: 'home',
    gardenName: 'Mi Jardín Virtual',
    loading: true,
  };

  dispatch(action: Action) {
    switch (action.type) {
      case 'SET_PLANTS':
        this.state.allPlants = action.payload;
        this.state.loading = false;
        break;
      case 'ADD_TO_GARDEN':
        if (!this.state.gardenPlants.includes(action.payload)) {
          this.state.gardenPlants
        }
    }
}
}