import { store } from '../flux/Store';
import { Plant } from '../flux/Store';
import './PlantCard';
import './EditPlantForm';

export class AdminPlantList extends HTMLElement {
  selectedPlantId: number | null = null;

  connectedCallback() {
    store.subscribe(() => this.render());
    this.render();
  }

  render() {
    const { allPlants } = store.getState();
    this.innerHTML = `
      <style>
        .list {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
        }
        .form-section {
          margin-top: 2rem;
        }
      </style>
      <div class="list"></div>
      <div class="form-section" id="formContainer"></div>
    `;

    const list = this.querySelector('.list')!;
    const formContainer = this.querySelector('#formContainer')!;
    list.innerHTML = '';
    formContainer.innerHTML = '';

    allPlants.forEach((plant) => {
      const card = document.createElement('plant-card') as any;
      card.data = plant;
      card.addEventListener('click', () => {
        this.selectedPlantId = plant.id;
        this.render();
      });
      list.appendChild(card);
    });

    if (this.selectedPlantId !== null) {
      const selected = allPlants.find(p => p.id === this.selectedPlantId);
      if (selected) {
        const form = document.createElement('edit-plant-form') as any;
        form.data = selected;
        formContainer.appendChild(form);
      }
    }
  }
}

customElements.define('admin-plant-list', AdminPlantList);
