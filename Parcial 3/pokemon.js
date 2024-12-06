// Función para capitalizar la primera letra de una palabra
const capitalizarPalabra = (palabra) => {
    return palabra ? palabra.charAt(0).toUpperCase() + palabra.slice(1) : '';
};

// Crea un objeto pokemon con todas sus características
export const crearPokemon = (nombre, id, spriteFrente, spriteAtras, peso, altura, cadenaEvolutiva, habilidades) => {
    return {
        nombre,
        id,
        spriteFrente,
        spriteAtras,
        peso,
        altura,
        cadenaEvolutiva,
        habilidades
    };
};

// Genera el HTML para mostrar la información del pokemon
export const obtenerPokemonHTML = (pokemon) => {
    return `
        <h3 class="pokemon-title">${capitalizarPalabra(pokemon.nombre)} (${pokemon.id})</h3>
        <div class="main-info">
            <div class="sprite-group">
                <p><strong>Sprites:</strong></p>
                <div class="sprites">
                    <img src="${pokemon.spriteFrente}" alt="${pokemon.nombre} frente">
                    <img src="${pokemon.spriteAtras}" alt="${pokemon.nombre} atrás">
                </div>
            </div>
            <div class="weight-height-group">
                <p><strong>Peso/Altura</strong></p>
                <div class="weight-height-values">
                    <p>${pokemon.peso} / ${pokemon.altura}</p>
                </div>
            </div>
            <div class="evolution-group">
                <p><strong>Cadena evolutiva:</strong></p>
                <ul class="evolution-list">
                    ${pokemon.cadenaEvolutiva.map(evo => `
                        <li>
                            ${capitalizarPalabra(evo.nombre)}
                            ${evo.esBebe ? '👶🏻' : ''}
                        </li>
                    `).join('')}
                </ul>
            </div>
            <div class="abilities-group">
                <p><strong>Habilidades:</strong></p>
                <ul class="abilities-list">
                    ${pokemon.habilidades.map(habilidad => `
                        <li>
                            ${capitalizarPalabra(habilidad.nombre)}
                            ${habilidad.esOculta ? '👀' : ''}
                        </li>
                    `).join('')}
                </ul>
            </div>
        </div>
    `;
};