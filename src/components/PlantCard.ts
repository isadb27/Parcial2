import { Plant } from '../flux/Store';

export class PlantCard extends HTMLElement {
  plant!: Plant;

  connectedCallback() {
    this.render();
  }

  set data(plant: Plant) {
    this.plant = plant;
    this.render();
  }

  render() {
    if (!this.plant) return;

    this.innerHTML = `
      <style>
        .card {
          border: 1px solid #ccc;
          border-radius: 10px;
          padding: 1rem;
          max-width: 200px;
          text-align: center;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        img {
          width: 100%;
          height: auto;
          border-radius: 5px;
        }
        h3 {
          margin: 0.5rem 0 0.2rem 0;
        }
        p {
          margin: 0;
          font-size: 0.9rem;
          color: #555;
        }
      </style>
      <div class="card">
        <img src="${this.plant.imagenUrl}" alt="${this.plant.nombreComun}">
        <h3>${this.plant.nombreComun}</h3>
        <p><em>${this.plant.nombreCientifico}</em></p>
      </div>
    `;
  }
}

customElements.define('plant-card', PlantCard);
