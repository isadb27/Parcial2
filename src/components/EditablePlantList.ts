import { store } from '../flux/Store';
import { Plant } from '../flux/Store';
import './PlantCard';

export class EditablePlantList extends HTMLElement {
  connectedCallback() {
    store.subscribe(() => this.render());
    this.render();
  }

  render() {
    const { allPlants, gardenPlants } = store.getState();
    this.innerHTML = `
      <style>
        .list {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
        }

        plant-card {
          cursor: pointer;
          transition: opacity 0.3s ease;
        }

        plant-card.not-in-garden {
          opacity: 0.4;
        }
      </style>
      <div class="list"></div>
    `;

    const list = this.querySelector('.list')!;
    list.innerHTML = '';

    allPlants
      .sort((a, b) => a.nombreComun.localeCompare(b.nombreComun))
      .forEach((plant: Plant) => {
        const card = document.createElement('plant-card') as any;
        card.data = plant;

        const isInGarden = gardenPlants.includes(plant.id);
        if (!isInGarden) {
          card.classList.add('not-in-garden');
        }

        card.addEventListener('click', () => {
          if (isInGarden) {
            store.removeFromGarden(plant.id);
          } else {
            store.addToGarden(plant.id);
          }
        });

        list.appendChild(card);
      });
  }
}

customElements.define('editable-plant-list', EditablePlantList);
