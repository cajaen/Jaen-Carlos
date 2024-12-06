import { elements } from './htmlElements.js';
import { handlers } from './handlers.js';

const init = () => {
    elements.searchBtn.addEventListener('click', handlers.searchPokemon);
    elements.clearBtn.addEventListener('click', handlers.clearSearch);
};

init();

