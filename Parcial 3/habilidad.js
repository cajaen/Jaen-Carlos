// Función para capitalizar la primera letra de una palabra
const capitalizarPalabra = (palabra) => {
    return palabra ? palabra.charAt(0).toUpperCase() + palabra.slice(1) : '';
};

// Crea un objeto de habilidad con su nombre y lista de pokémon que pueden aprenderla
export const crearHabilidad = (nombre, aprendices) => {
    return {
        nombre,
        aprendices
    };
};

// Genera el HTML para mostrar la información de la habilidad
export const obtenerHabilidadHTML = (habilidad) => {
    return `
        <div class="ability-info">
            <h3 class="ability-title">${capitalizarPalabra(habilidad.nombre)}</h3>
            <div class="ability-content">
                <p class="p-ability"><strong>¿Quién puede aprenderla?</strong></p>
                <ul class="ability-learners">
                    ${habilidad.aprendices.map(aprendiz => `
                        <li>
                            ${aprendiz.nombre}
                            ${aprendiz.esOculta ? '<span class="hidden-ability-indicator">👀</span>' : ''}
                        </li>
                    `).join('')}
                </ul>
            </div>
        </div>
    `;
};