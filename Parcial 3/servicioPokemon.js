// Servicio para manejar las peticiones a la PokeAPI
export class ServicioPokemon {
    // Obtiene los datos de un pokemon específico
    static async obtenerDatosPokemon(nombre) {
        try {
            // Obtiene datos básicos del pokemon
            const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre.toLowerCase()}`);
            if (!respuesta.ok) throw new Error('Pokémon no encontrado');
            const datosPokemon = await respuesta.json();

            // Obtiene datos de la especie
            const respuestaEspecie = await fetch(datosPokemon.species.url);
            const datosEspecie = await respuestaEspecie.json();

            // Obtiene la cadena evolutiva
            const respuestaEvolucion = await fetch(datosEspecie.evolution_chain.url);
            const datosEvolucion = await respuestaEvolucion.json();

            // Procesa la cadena evolutiva
            const cadenaEvolutiva = [];
            function extraerEvoluciones(cadena) {
                if (cadena) {
                    cadenaEvolutiva.push({
                        nombre: cadena.species.name,
                        esBebe: cadena.is_baby
                    });
                    cadena.evolves_to.forEach(evo => extraerEvoluciones(evo));
                }
            }
            extraerEvoluciones(datosEvolucion.chain);

            // Aquí está el cambio principal: traducir las propiedades
            return {
                nombre: datosPokemon.name,
                id: datosPokemon.id,
                sprites: {
                    front_default: datosPokemon.sprites.front_default,
                    back_default: datosPokemon.sprites.back_default
                },
                peso: datosPokemon.weight,
                altura: datosPokemon.height,
                cadenaEvolutiva,
                habilidades: datosPokemon.abilities.map(habilidad => ({
                    nombre: habilidad.ability.name,
                    esOculta: habilidad.is_hidden
                }))
            };
        } catch (error) {
            console.error('Error al obtener datos del Pokémon:', error);
            throw error;
        }
    }

    // El resto del código permanece igual...

  // Obtiene los datos de una habilidad específica
  static async obtenerDatosHabilidad(nombreHabilidad) {
      try {
          const respuesta = await fetch(`https://pokeapi.co/api/v2/ability/${nombreHabilidad.toLowerCase()}`);
          if (!respuesta.ok) throw new Error('Habilidad no encontrada');
          const datosHabilidad = await respuesta.json();
          return {
              nombre: datosHabilidad.name,
              aprendices: datosHabilidad.pokemon.map(pokemon => ({
                  nombre: pokemon.pokemon.name,
                  esOculta: pokemon.is_hidden
              }))
          };
      } catch (error) {
          console.error('Error al obtener datos de la habilidad:', error);
          throw error;
      }
  }
}