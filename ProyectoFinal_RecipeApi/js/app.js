const AppFactory = (function () {
  const apiKey = "48cd25145c0547acbf9d7af82f1f3314";

  // **htmlElements**: Referencias a los elementos del DOM
  const htmlElements = {
    recipesContainer: document.getElementById("recetas-aleatorias"),
    errorMessage: document.getElementById("error-message"),
    nutritionContainer: document.getElementById("nutrition-info"),
    recipeImage: document.getElementById("recipe-image"),
    btnBack: document.getElementById("btn-back"),
    cookingTipsContainer: document.getElementById("cooking-tips"), // Añadido para consejos
    searchInput: document.getElementById("search-input"), // Campo de búsqueda
    searchBtn: document.getElementById("search-btn"), // Botón de búsqueda
    recipeDetailsContainer: document.getElementById("recipe-details"), // Contenedor para detalles de la receta
  };

  // Función privada para realizar peticiones a la API
  async function fetchFromApi(endpoint) {
    try {
      const response = await fetch(endpoint);
      if (!response.ok) throw new Error("Error al obtener datos de la API");
      return await response.json();
    } catch (error) {
      console.error("Error en fetchFromApi:", error);
      throw error;
    }
  }

  // **handlers**: Lógica principal para manejar eventos y datos
  const handlers = {
    async searchCookingTips(query) {
      if (!query.trim()) return [];

      const endpoint = `https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${apiKey}`;
      try {
        const data = await fetchFromApi(endpoint);
        const tips = data.results; // Suponiendo que la respuesta tiene un campo "results" con los consejos
        return tips;
      } catch (error) {
        console.error("Error al obtener los consejos:", error);
        return [];
      }
    },

// Función para manejar el evento de búsqueda de consejos
    async handleSearchEvent() {
      const query = htmlElements.searchInput.value;
      const container = htmlElements.cookingTipsContainer;
      container.innerHTML = '<p>Cargando consejos...</p>'; // Mensaje de carga

      if (query.trim() !== '') {
        const consejos = await handlers.searchCookingTips(query); // Llamada a la función que ya está en app.js

        container.innerHTML = ''; // Limpiar el contenedor antes de mostrar los nuevos consejos

        if (consejos.length > 0) {
          consejos.forEach((receta) => {
            const div = document.createElement("div");
            div.classList.add("tip");
            div.innerHTML = `
              <h3>Consejo: ${receta.title}</h3>
              <img src="${receta.image}" alt="${receta.title}" />
              <p>${receta.summary ? receta.summary : "Consejo práctico para cocinar."}</p>
              <p><a href="https://spoonacular.com/recipes/${receta.id}-${receta.title}" target="_blank">Ver receta completa</a></p>
            `;
            container.appendChild(div);
          });
         // Asociar eventos a los botones "Ver receta completa"
         document.querySelectorAll(".view-recipe-btn").forEach((button) => {
          button.addEventListener("click", (event) => {
            const recipeId = event.target.getAttribute("data-id");
            handlers.loadRecipeDetails(recipeId);
          });
        });
      } else {
        container.innerHTML = "<p>No se encontraron consejos disponibles.</p>";
      }
    } else {
      container.innerHTML = "<p>Por favor ingresa un término de búsqueda.</p>";
    }
  },
  
// Función para manejar Detalles de la receta
    async loadRecipeDetails(recipeId) {
      const container = htmlElements.recipeDetailsContainer;
      container.innerHTML = "<p>Cargando detalles...</p>";

      const endpoint = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`;
      try {
        const recipe = await fetchFromApi(endpoint);
        container.innerHTML = `
          <h2>${recipe.title}</h2>
          <img src="${recipe.image}" alt="${recipe.title}" />
          <p><strong>Resumen:</strong> ${recipe.summary || "No hay resumen disponible."}</p>
          <h3>Ingredientes:</h3>
          <ul>
            ${recipe.extendedIngredients
              .map((ing) => `<li>${ing.original}</li>`)
              .join("")}
          </ul>
          <h3>Instrucciones:</h3>
          <p>${recipe.instructions || "No hay instrucciones disponibles."}</p>
        `;
      } catch (error) {
        container.innerHTML = "<p>Error al cargar los detalles de la receta.</p>";
      }
    },
    // Función para obtener recetas aleatorias
  async fetchRandomRecipes(number = 3) {
      const endpoint = `https://api.spoonacular.com/recipes/random?number=${number}&apiKey=${apiKey}`;
      try {
        const data = await fetchFromApi(endpoint);
        const recipes = data.recipes;
        htmlElements.recipesContainer.innerHTML = ""; // Limpiar contenido previo
        if (recipes.length === 0) {
          htmlElements.recipesContainer.innerHTML = "<p>No se encontraron recetas.</p>";
        } else {
          recipes.forEach((recipe) => {
            const recipeElement = document.createElement("div");
            recipeElement.className = "recipe-card";
            recipeElement.innerHTML = `
              <h3>${recipe.title}</h3>
              <img src="${recipe.image}" alt="${recipe.title}">
              <div class="btn-container">
              <a href="recipe-details.html?id=${recipe.id}" class="btn">Ver Detalles</a>
              <a href="nutrition.html?id=${recipe.id}" class="btn btn-nutrition">Ver Nutrición</a>
              </div>
              `;
            htmlElements.recipesContainer.appendChild(recipeElement);
          });

          // Reaplicar los estilos después de insertar los nuevos elementos
          applyStylesToNewContent();
        }
      } catch (error) {
        htmlElements.errorMessage.textContent = "Hubo un error al cargar las recetas.";
      }
    },

    async loadNutritionInfo(recipeId) {
      try {
        const nutritionEndpoint = `https://api.spoonacular.com/recipes/${recipeId}/nutritionWidget.json?apiKey=${apiKey}`;
        const recipeEndpoint = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`;
        
        const nutritionData = await fetchFromApi(nutritionEndpoint);
        const recipeData = await fetchFromApi(recipeEndpoint);
        
        // Actualizar el contenido de la página con los datos nutricionales
        htmlElements.nutritionContainer.innerHTML = `
          <h2>Detalles Nutricionales</h2>
          <ul>
            <li><strong>Calorías:</strong> ${nutritionData.calories}</li>
            <li><strong>Grasas:</strong> ${nutritionData.fat}g</li>
            <li><strong>Proteínas:</strong> ${nutritionData.protein}g</li>
            <li><strong>Carbohidratos:</strong> ${nutritionData.carbs}g</li>
            </ul>
        `;

        // Actualizar la imagen de la receta
        htmlElements.recipeImage.src = recipeData.image;
        htmlElements.recipeImage.alt = `Imagen de ${recipeData.title}`;
         
        // Ajustar la altura del contenedor de nutrición después de cargar la imagen
        htmlElements.recipeImage.onload = () => {
        const imgHeight = htmlElements.recipeImage.clientHeight;
        htmlElements.nutritionContainer.style.height = `${imgHeight}px`;
        };    
      } catch (error) {
        htmlElements.nutritionContainer.innerHTML = "<p>Error al cargar la información nutricional.</p>";
        console.error("Error al cargar la nutrición:", error);
      }
    },
  };

  // **applyStylesToNewContent**: Función para reaplicar los estilos después de agregar nuevos resultados al DOM
  function applyStylesToNewContent() {
    const recipeCards = document.querySelectorAll('.recipe');
    recipeCards.forEach(card => {
      card.style.display = 'flex';
      card.style.flexDirection = 'column';
      // Asegura que las imágenes no se corten
      const img = card.querySelector('img');
      if (img) {
        img.style.maxWidth = '100%';
        img.style.height = 'auto';
      }
    });
  }

  // **bindEvents**: Asociar eventos a elementos
  const bindEvents = () => {
    if (htmlElements.btnBack) {
      htmlElements.btnBack.addEventListener("click", () => {
        window.history.back();
      });
    }
  };

  // **init**: Inicialización del módulo
  const init = () => {
    console.log("Inicializando aplicación...");
    bindEvents();
  };

  // Exposición pública de elementos
  return {
    htmlElements,
    handlers,
    bindEvents,
    init,
  };
})();

// Exportar la fábrica como módulo
export default AppFactory;
