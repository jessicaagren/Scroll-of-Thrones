import { getBookByID, getCharacterByID, getHouseByID, getRandomCharacter, searchCharacters } from "../../api/asoiafAPI";
import { article, aside, knownHouses } from "../../constants/constants";
import { clearAside, getIdFromURL, removeLoadingIndicator, renderLoadingIndicator } from "../../helpers/helpers";
import AsoiafCharacterType from "../../types/asoiafCharacterType";

export const setupSearchContainer = () => {
    const searchContainer = document.createElement("div");
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

    const randomButton = document.createElement("button");
    randomButton.textContent = "Randomise";
    randomButton.id = "randomise-button";
    searchContainer.appendChild(randomButton);

    handleRandomButton();
};


const handleSearch = async () => {
    const input = document.getElementById("search-input") as HTMLInputElement;
    const searchContainer = document.getElementById("search-container") as HTMLElement;

    if (!input.value.trim()) return;

    clearPreviousSearchResults();
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
            clearPreviousSearchResults();

            try {
                const character = await getRandomCharacter();
                if (character) {
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

const clearPreviousSearchResults = () => {
    const searchContainer = document.getElementById("search-container") as HTMLElement;
    const previousSearchElement = document.getElementById('search-output');
    const previousCharacterList = document.getElementById('character-list');

    if (previousSearchElement) searchContainer.removeChild(previousSearchElement);
    if (previousCharacterList) searchContainer.removeChild(previousCharacterList);
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
        listItem.addEventListener("click", () => renderCharacterInfo(character));
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
    const motherId = getIdFromURL(character.mother);
    const fatherId = getIdFromURL(character.father);

    const spouseCharacter = spouseId ? await getCharacterByID(spouseId) : null;
    const motherCharacter = motherId ? await getCharacterByID(motherId) : null;
    const fatherCharacter = fatherId ? await getCharacterByID(fatherId) : null;

    clearAside();
    const searchAside = document.createElement("div");
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
        <h2 id="character-name">${character.name}</h2>
        ${houseSVG}
        <section>
            <p>House: ${houseNames.length > 0 ? houseNames.join(", ") : "Unknown"}</p>
            <p>House words: ${houseWords.length > 0 ? houseWords.join(", ") : "Unknown"}</p>
            <p>Titles: ${character.titles.length > 0 ? character.titles.join(", ") : "Unknown"}</p>
            <p>Culture: ${character.culture || "Unknown"}</p>
            <p>Mother: ${motherCharacter ? motherCharacter.name : "Unknown"}</p>
            <p>Father: ${fatherCharacter ? fatherCharacter.name : "Unknown"}</p>
            <p>Spouse: ${spouseCharacter ? spouseCharacter.name : "Unknown"}</p>
            <p>Born: ${character.born || "Unknown"}</p>
            <p>Died: ${character.died || "Unknown"}</p>
            <p>POV books: ${bookNames.length > 0 ? bookNames.join(", ") : "None"}</p>
        </section>
    `;
};


// const createCharacterCard = (character: DisneyCharacter) => {
// 	const div = document.createElement("div");
// 	div.classList.add("CharacterCard");

// 	div.innerHTML = `
//         <p>${character.name}</p>
//         <img src="${character.imageUrl}">
//     `;
// 	return div;
// };

// export default createCharacterCard;