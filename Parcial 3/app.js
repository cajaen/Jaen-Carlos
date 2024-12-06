import { crearPokemon, obtenerPokemonHTML } from './pokemon.js';
import { crearHabilidad, obtenerHabilidadHTML } from './habilidad.js';
import { ServicioPokemon } from './servicioPokemon.js';
import { elementosHTML, manejadoresUI } from './ui.js';

// Manejadores de eventos principales
const manejadores = {
    // Maneja la búsqueda de pokemon o habilidad
    buscarPokemon: async (evento) => {
        evento.preventDefault();
        const tipoBusqueda = elementosHTML.selectTipoBusqueda.value;
        const terminoBusqueda = elementosHTML.inputBusqueda.value.trim();
        if (!terminoBusqueda) return;

        try {
            if (tipoBusqueda === 'pokemon') {
                // Busca y muestra información del pokemon
                const datosPokemon = await ServicioPokemon.obtenerDatosPokemon(terminoBusqueda);
                const pokemon = crearPokemon(
                    datosPokemon.nombre,
                    datosPokemon.id,
                    datosPokemon.sprites.front_default,
                    datosPokemon.sprites.back_default,
                    datosPokemon.peso,
                    datosPokemon.altura,
                    datosPokemon.cadenaEvolutiva,
                    datosPokemon.habilidades
                );
                const pokemonHTML = obtenerPokemonHTML(pokemon);
                manejadoresUI.mostrarPokemon(pokemonHTML);
            } else if (tipoBusqueda === 'habilidad') {
                // Busca y muestra información de la habilidad
                const datosHabilidad = await ServicioPokemon.obtenerDatosHabilidad(terminoBusqueda);
                const habilidad = crearHabilidad(datosHabilidad.nombre, datosHabilidad.aprendices);
                const habilidadHTML = obtenerHabilidadHTML(habilidad);
                manejadoresUI.mostrarHabilidad(habilidadHTML);
            }
        } catch (error) {
            if (error.message === 'Pokémon no encontrado') {
                manejadoresUI.mostrarError('pokemon');
            } else if (error.message === 'Habilidad no encontrada') {
                manejadoresUI.mostrarError('habilidad');
            } else {
                manejadoresUI.mostrarError();
            }
        }
    }
};

// Vincula los eventos con sus manejadores
const vincularEventos = () => {
    elementosHTML.formulario.addEventListener('submit', manejadores.buscarPokemon);
    elementosHTML.botonLimpiar.addEventListener('click', manejadoresUI.limpiarBusqueda);
    elementosHTML.selectTipoBusqueda.addEventListener('change', manejadoresUI.manejarCambioTipoBusqueda);
};

// Inicializa la aplicación
const init = () => {
    vincularEventos();
};

init();