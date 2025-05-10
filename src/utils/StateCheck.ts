import { State } from "../flux/Store"; 


export function isStateValid(state: State): boolean {

    return state.gardenName.trim() !== "" && state.allPlants.length > 0 && !state.loading;
}


export function isHomePage(state: State): boolean {
    return state.currentPage === 'home';
}


export function isEditGardenPage(state: State): boolean {
    return state.currentPage === 'editGarden';
}


export function isAdminPage(state: State): boolean {
    return state.currentPage === 'admin';
}
