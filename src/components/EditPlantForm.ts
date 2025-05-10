import { Plant, store } from '../flux/Store';

export class EditPlantForm extends HTMLElement {
  plant!: Plant;

  set data(plant: Plant) {
    this.plant = plant;
    this.render();
  }

  connectedCallback() {
    if (this.plant) this.render();
  }

  render() {
    this.innerHTML = `
      <style>
        form {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          max-width: 300px;
        }

        label {
          font-weight: bold;
        }

        input {
          padding: 0.5rem;
        }

        button {
          padding: 0.5rem;
          margin-top: 1rem;
          background-color: green;
          color: white;
          border: none;
          cursor: pointer;
        }
      </style>
      <form id="editForm">
        <label>Nombre común: <input name="nombreComun" value="${this.plant.nombreComun}" /></label>
        <label>Nombre científico: <input name="nombreCientifico" value="${this.plant.nombreCientifico}" /></label>
        <label>Imagen URL: <input name="imagenUrl" value="${this.plant.imagenUrl}" /></label>
        <button type="submit">Guardar cambios</button>
      </form>
    `;

    const form = this.querySelector('#editForm')!;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(form as HTMLFormElement);
      const updatedPlant: Plant = {
        ...this.plant,
        nombreComun: formData.get('nombreComun') as string,
        nombreCientifico: formData.get('nombreCientifico') as string,
        imagenUrl: formData.get('imagenUrl') as string,
      };
      store.updatePlant(updatedPlant);
    });
  }
}

customElements.define('edit-plant-form', EditPlantForm);
