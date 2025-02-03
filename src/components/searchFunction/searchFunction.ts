import { getBookByID, getCharacterByID, getHouseByID, getRandomCharacter, searchCharacters } from "../../api/asoiafAPI";
import { article, aside, knownHouses } from "../../constants/constants";
import { clearAsideAndAddBackground, clearPreviousOutput, getIdFromURL, removeLoadingIndicator, renderLoadingIndicator } from "../../helpers/helpers";
import { favouriteCharacters } from "../../state/state";
import AsoiafCharacterType from "../../types/asoiafCharacterType";

export const setupSearchContainer = () => {

    clearAsideAndAddBackground();

    const searchContainer = document.createElement("div");
    searchContainer.className = "containers";
    searchContainer.id = "search-container";
    article.appendChild(searchContainer);

    const explanation = document.createElement("h2");
    explanation.innerHTML = "Search for any character below";
    searchContainer.appendChild(explanation);

    const inputContainer = document.createElement("div");
    inputContainer.id = "input-container";
    searchContainer.appendChild(inputContainer);

    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Enter character name...";
    input.id = "search-input";
    inputContainer.appendChild(input);

    const searchButton = document.createElement("button");
    searchButton.textContent = "Search";
    searchButton.id = "search-button";
    inputContainer.appendChild(searchButton);

    searchButton.addEventListener("click", handleSearch);
    input.addEventListener("keydown", (event) => {
        if (event.key === "Enter") handleSearch();
    });

    const searchButtonContainer = document.createElement("div");
    searchButtonContainer.id = "search-button-container";
    searchContainer.appendChild(searchButtonContainer);

    const favButton = document.createElement("button");
    favButton.textContent = "Favourites";
    favButton.id = "favourite-button";
    searchButtonContainer.appendChild(favButton);

    handleFavouriteButton();

    const randomButton = document.createElement("button");
    randomButton.textContent = "Randomise";
    randomButton.id = "randomise-button";
    searchButtonContainer.appendChild(randomButton);

    handleRandomButton();
};

const handleSearch = async () => {
    const input = document.getElementById("search-input") as HTMLInputElement;
    const searchContainer = document.getElementById("search-container") as HTMLElement;

    if (!input.value.trim()) return;

    clearPreviousOutput();
    renderLoadingIndicator(searchContainer);

    const searchInput = input.value;
    const searchedCharacters = await searchCharacters(searchInput);

    removeLoadingIndicator(searchContainer);
    renderSearchResults(searchInput, searchedCharacters);

    input.value = '';
};

const handleRandomButton = () => {
    const button = document.getElementById("randomise-button") as HTMLButtonElement;
    if (button) {
        button.addEventListener("click", async () => {
            clearPreviousOutput();
            clearAsideAndAddBackground();
            renderLoadingIndicator(aside);
            try {
                const character = await getRandomCharacter();
                if (character) {
                    
                    if (aside) {
                        aside.scrollIntoView({ behavior: "smooth" });
                    }
                        renderCharacterInfo(character);
                } else {
                    console.error("Ingen karaktär hittades.");
                }
            } catch (error) {
                console.error("Fel vid hämtning av slumpmässig karaktär:", error);
            }
        });
    } else {
        console.error("Knapp hittades inte.");
    }
};

const renderSearchResults = (searchInput: string, searchedCharacters: AsoiafCharacterType[]) => {
    const searchContainer = document.getElementById("search-container") as HTMLElement;

    const searchElement = document.createElement("p");
    searchElement.id = 'search-output';
    searchElement.innerHTML = `Your search: "${searchInput}", results: ${searchedCharacters.length}`;
    searchContainer.appendChild(searchElement);

    const characterList = document.createElement("ul");
    characterList.id = 'character-list';

    searchedCharacters.forEach(character => {
        const listItem = document.createElement("li");
        listItem.textContent = character.name;
        listItem.addEventListener("click", () => {
            renderCharacterInfo(character);
            
            const aside = document.querySelector("aside");
            if (aside) {
                aside.scrollIntoView({ behavior: "smooth" });
            }
        });
        characterList.appendChild(listItem);
    });

    searchContainer.appendChild(characterList);
};

const renderCharacterInfo = async (character: AsoiafCharacterType) => {
    let houseNames: string[] = [];
    let bookNames: string[] = [];
    let houseWords: string[] = [];

    for (const houseURL of character.allegiances) {
        const houseId = getIdFromURL(houseURL);
        if (houseId) {
            const house = await getHouseByID(houseId);
            if (house) {
                houseNames.push(house.name);
                if (house.words) {
                    houseWords.push(house.words);
                }
            }
        }
    }

    for (const bookURL of character.povBooks) {
        const bookId = getIdFromURL(bookURL);
        if (bookId) {
            const book = await getBookByID(bookId);
            if (book) bookNames.push(book.name);
        }
    }

    const spouseId = getIdFromURL(character.spouse);

    const spouseCharacter = spouseId ? await getCharacterByID(spouseId) : null;

    clearAsideAndAddBackground();
    const searchAside = document.createElement("div");
    searchAside.className ="containers";
    searchAside.id = "search-aside";
    aside.appendChild(searchAside);

    let houseSVG = "";
    if (houseNames.length > 0) {
        const matchingHouse = knownHouses.find(house => houseNames[0].includes(house));
        if (matchingHouse) {
            const houseSlug = matchingHouse.toLowerCase();
            houseSVG = `<img src="./media/houses/${houseSlug}.svg" alt="${matchingHouse}" class="house-sigil">`;
        }
    }

    searchAside.innerHTML = `
        <h2 id="title">${character.name}</h2>
        <button id="favourite" alt="Favourite button">
            <img src="/media/icons/heart.png" alt="Favourite button" id="favourite-icon" />
        </button>
        ${houseSVG}
        <section id="character-info">
            <p><span>House:</span> ${houseNames.length > 0 ? houseNames.join(", ") : "Unknown"}</p>
            <p><span>House words:</span> ${houseWords.length > 0 ? houseWords.join(", ") : "Unknown"}</p>
            <p><span>Titles:</span> ${character.titles.length > 0 ? character.titles.join(", ") : "Unknown"}</p>
            <p><span>Culture:</span> ${character.culture || "Unknown"}</p>
            <p><span>Spouse:</span> ${spouseCharacter ? spouseCharacter.name : "Unknown"}</p>
            <p><span>Born:</span> ${character.born || "Unknown"}</p>
            <p><span>Died:</span> ${character.died || "Unknown"}</p>
            <p><span>POV books:</span> ${bookNames.length > 0 ? bookNames.join(", ") : "None"}</p>
        </section>
    `;

    createFavouriteIcon(character);
}

const handleFavouriteButton = () => {
    const button = document.getElementById("favourite-button") as HTMLButtonElement;
    if (button) {
        button.addEventListener("click", async () => {
            clearPreviousOutput();
            clearAsideAndAddBackground();
            
            try {
                renderFavouriteCharacters();
            } catch (error) {
                console.error("Fel vid rendering av favoritkaraktärer:", error);
            }
        });
    } else {
        console.error("Favoritknappen hittades inte.");
    }
};

const renderFavouriteCharacters = () => {
    const searchContainer = document.getElementById("search-container") as HTMLElement;

    clearPreviousOutput();

    const favouriteElement = document.createElement("p");
    favouriteElement.id = 'favourite-output';
    favouriteElement.innerHTML = `Your favourites: ${favouriteCharacters.length}`;
    searchContainer.appendChild(favouriteElement);
    
    const favouriteList = document.createElement("ul");
    favouriteList.id = 'favourite-list';
    
    favouriteCharacters.forEach(character => {
        const listItem = document.createElement("li");
        listItem.textContent = character.name;
        listItem.addEventListener("click", () => {
            renderCharacterInfo(character);
            
            const aside = document.querySelector("aside");
            if (aside) {
                aside.scrollIntoView({ behavior: "smooth" });
            }
        });
        favouriteList.appendChild(listItem);
    });

    searchContainer.appendChild(favouriteList);
};

const createFavouriteIcon = (character: AsoiafCharacterType) => {
    const favouriteButton = document.getElementById("favourite") as HTMLButtonElement;
    const favouriteIcon = document.getElementById("favourite-icon") as HTMLElement;

    const isFavourite = favouriteCharacters.some(fav => fav.name === character.name);
    favouriteIcon.style.filter = isFavourite ? "none" : "grayscale(1)";
    
    favouriteButton.addEventListener("click", () => {
        const favIndex = favouriteCharacters.findIndex(fav => fav.name === character.name);
    
        if (favIndex === -1) {
            favouriteCharacters.push(character);
            favouriteIcon.style.filter = "none";
        } else {
            favouriteCharacters.splice(favIndex, 1);
            favouriteIcon.style.filter = "grayscale(1)";
        }
    })
}