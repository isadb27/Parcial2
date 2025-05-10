import { store } from '../flux/Store';
import './PlantCard';

export class PlantList extends HTMLElement {
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
      </style>
      <div class="list"></div>
    `;

    const list = this.querySelector('.list')!;
    allPlants
      .sort((a, b) => a.nombreComun.localeCompare(b.nombreComun))
      .forEach((plant) => {
        const card = document.createElement('plant-card') as any;
        card.data = plant;
        list.appendChild(card);
      });
  }
}

customElements.define('plant-list', PlantList);
