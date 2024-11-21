// Funzione per ottenere i giochi e popolare le card
async function getGames() {
    try {
      const response = await fetch(
        "https://api.rawg.io/api/games?key=7bd2d1c6193547ca9f11e3a826a938c1&dates=2019-09-01,2019-09-30&platforms=18,1,7"
      );
      const data = await response.json();
      const games = data.results;
  
      // Popola le card dinamicamente nel contenitore grid
      const gamesContainer = document.getElementById("games-container");
      games.forEach((game) => {
        const gameCard = createGameCard(game);
        gamesContainer.appendChild(gameCard);
      });
    } catch (error) {
      console.error("Errore nel recuperare i giochi:", error);
    }
  }
  
  // Funzione per creare una card del gioco
  function createGameCard(game) {
    const card = document.createElement("div");
    card.classList.add("bg-white", "rounded-lg", "shadow-lg", "overflow-hidden", "hover:shadow-2xl", "transition-shadow", "duration-300", "h-[400px]", "cursor-pointer");
  
    // Truncate the description if it is too long
    const truncatedDescription = truncateDescription(game.short_description, 100);
  
    card.innerHTML = `
      <img class="w-full h-48 object-cover" src="${game.background_image}" alt="${game.name}">
      <div class="p-6 flex flex-col justify-between h-full">
        <h2 class="text-xl font-bold text-gray-800">${game.name}</h2>
        <p class="mt-2 text-gray-600 truncate">${truncatedDescription}</p>
        <div class="mt-4 flex items-center justify-between">
          <button class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Scopri di più
          </button>
          <span class="text-sm text-gray-500">${game.released}</span>
        </div>
      </div>
    `;
  
    // Aggiungere l'evento click per aprire il pop-up
    card.addEventListener('click', () => {
      showPopup(game);
    });
  
    return card;
  }
  
  // Funzione per troncare la descrizione se è troppo lunga
  function truncateDescription(description, maxLength) {
    if (description && description.length > maxLength) {
      return description.substring(0, maxLength) + "...";
    }
    return description || "Descrizione non disponibile.";
  }
  
  // Funzione per mostrare il pop-up con tutte le informazioni del gioco
  function showPopup(game) {
    const popup = document.createElement("div");
    popup.classList.add("fixed", "inset-0", "bg-black", "bg-opacity-50", "flex", "justify-center", "items-center", "z-50");
  
    const popupContent = document.createElement("div");
    popupContent.classList.add("bg-white", "p-6", "rounded-lg", "w-[90%]", "max-w-lg", "text-center");
  
    popupContent.innerHTML = `
      <h2 class="text-2xl font-bold text-gray-800">${game.name}</h2>
      <img class="w-full h-48 object-cover my-4" src="${game.background_image}" alt="${game.name}">
      <p class="text-lg text-gray-800">${game.description_raw || 'Descrizione completa non disponibile.'}</p>
      <p class="mt-4 text-sm text-gray-500">Rilasciato: ${game.released}</p>
      <button class="mt-4 px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors" id="close-popup">
        Chiudi
      </button>
    `;
  
    // Aggiungi l'evento per chiudere il pop-up
    const closeButton = popupContent.querySelector("#close-popup");
    closeButton.addEventListener("click", () => {
      popup.remove();
    });
  
    popup.appendChild(popupContent);
    document.body.appendChild(popup);
  }
  
  // Esegui la funzione per ottenere e visualizzare i giochi
  getGames();
  