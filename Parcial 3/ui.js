// Referencias a elementos del DOM
export const elementosHTML = {
    formulario: document.querySelector('.search-form'),
    botonBuscar: document.getElementById('boton-buscar'),
    botonLimpiar: document.getElementById('boton-limpiar'),
    contenedorBotones: document.querySelector('.button-container'),
    infoPokemon: document.getElementById('info-pokemon'),
    infoHabilidad: document.querySelector('.ability-info'),
    selectTipoBusqueda: document.getElementById('tipo-busqueda'),
    inputBusqueda: document.getElementById('nombre-pokemon')
};

// Manejadores de la interfaz de usuario
export const manejadoresUI = {
    // Muestra la información del pokemon en la interfaz
    mostrarPokemon(pokemonHTML) {
        elementosHTML.infoPokemon.innerHTML = pokemonHTML;
        elementosHTML.infoPokemon.style.display = 'block';
        elementosHTML.infoHabilidad.style.display = 'none';
        elementosHTML.botonLimpiar.style.display = 'inline';
        elementosHTML.contenedorBotones.classList.add('space-between');
    },

    // Muestra la información de la habilidad en la interfaz
    mostrarHabilidad(habilidadHTML) {
        elementosHTML.infoHabilidad.innerHTML = habilidadHTML;
        elementosHTML.infoHabilidad.style.display = 'block';
        elementosHTML.infoPokemon.style.display = 'none';
        elementosHTML.botonLimpiar.style.display = 'inline';
        elementosHTML.contenedorBotones.classList.add('space-between');
    },

    // Muestra mensajes de error según el tipo
    mostrarError(tipoError) {
        if (tipoError === 'pokemon') {
            elementosHTML.infoPokemon.innerHTML = '<p>Pokémon no encontrado.</p>';
        } else if (tipoError === 'habilidad') {
            elementosHTML.infoPokemon.innerHTML = '<p>Habilidad no encontrada.</p>';
        } else {
            elementosHTML.infoPokemon.innerHTML = '<p>Error desconocido.</p>';
        }
        elementosHTML.infoPokemon.style.display = 'block';
        elementosHTML.infoHabilidad.style.display = 'none';
    },

    // Limpia el formulario y la información mostrada
    limpiarBusqueda() {
        elementosHTML.inputBusqueda.value = '';
        elementosHTML.infoPokemon.innerHTML = '';
        elementosHTML.infoHabilidad.innerHTML = '';
        elementosHTML.infoPokemon.style.display = 'none';
        elementosHTML.infoHabilidad.style.display = 'none';
        elementosHTML.botonLimpiar.style.display = 'none';
        elementosHTML.contenedorBotones.classList.remove('space-between');
    },

    // Maneja el cambio en el tipo de búsqueda
    manejarCambioTipoBusqueda() {
        const tipoBusqueda = elementosHTML.selectTipoBusqueda.value;
        elementosHTML.infoPokemon.style.display = 'none';
        elementosHTML.infoHabilidad.style.display = 'none';
    }
};