import { store } from './flux/Store';
import './components/PlantList';
import './components/EditablePlantList';

const app = document.getElementById('app')!;

store.subscribe(() => {
  const state = store.getState();
  app.innerHTML = '';

  if (state.loading) {
    app.innerHTML = '<p>Cargando plantas...</p>';
    return;
  }

  const nav = document.createElement('nav');
  nav.innerHTML = `
    <button id="home">Inicio</button>
    <button id="edit">Modificar Jardín</button>
    <button id="admin">Modo Admin</button>
  `;
  app.appendChild(nav);

  nav.querySelector('#home')?.addEventListener('click', () => store.navigate('home'));
  nav.querySelector('#edit')?.addEventListener('click', () => store.navigate('editGarden'));
  nav.querySelector('#admin')?.addEventListener('click', () => store.navigate('admin'));

  if (state.currentPage === 'home') {
    const title = document.createElement('h1');
    title.textContent = state.gardenName;
    const list = document.createElement('plant-list');
    app.appendChild(title);
    app.appendChild(list);
  }

  if (state.currentPage === 'editGarden') {
    const h2 = document.createElement('h2');
    h2.textContent = 'Editar Jardín';
    const editableList = document.createElement('editable-plant-list');
    app.appendChild(h2);
    app.appendChild(editableList);
  }
  import './components/AdminPlantList';

if (state.currentPage === 'admin') {
  const h2 = document.createElement('h2');
  h2.textContent = 'Modo Admin: Editar Plantas';
  const adminList = document.createElement('admin-plant-list');
  app.appendChild(h2);
  app.appendChild(adminList);
}

});
