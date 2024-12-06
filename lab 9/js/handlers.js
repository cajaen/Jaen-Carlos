import { elements } from './htmlElements.js';

export const handlers = {
    searchPokemon: async () => {
        const pokemonName = elements.searchInput.value.trim().toLowerCase();
        if (!pokemonName) return;

        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
            if (!response.ok) throw new Error('Pokémon no encontrado');
            const data = await response.json();

            elements.pokemonInfo.innerHTML = `
                <h2>${data.name} (#${data.id})</h2>
                <p>Sprites:</p>
                <div class="sprite-container">
                    <img src="${data.sprites.front_default}" alt="${data.name} Front" class="sprite">
                    <img src="${data.sprites.back_default}" alt="${data.name} Back" class="sprite">
                </div>
                <p>Peso: ${data.weight} | Altura: ${data.height}</p>
            `;
            elements.pokemonInfo.style.display = 'block';
            elements.clearBtn.style.display = 'inline-block';
        } catch (error) {
            elements.pokemonInfo.innerHTML = `<p>${error.message}</p>`;
            elements.pokemonInfo.style.display = 'block';
            elements.clearBtn.style.display = 'inline-block';
        }
    },
    clearSearch: () => {
        elements.searchInput.value = '';
        elements.pokemonInfo.style.display = 'none';
        elements.clearBtn.style.display = 'none';
    }
};
