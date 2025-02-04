import AsoiafCharacterType from "../../types/asoiafCharacterType";
import { renderCharacterInfo } from "./renderCharacterInfo";


export const renderSearchResults = (searchInput: string, searchedCharacters: AsoiafCharacterType[]) => {
    const searchContainer = document.getElementById("search-container") as HTMLElement;

    const searchElement = document.createElement("p");
    searchElement.id = 'search-output';
    if(searchedCharacters.length > 0) {
        searchElement.innerHTML = `Your search: "${searchInput}", results: ${searchedCharacters.length}`;
    }
    else {
        searchElement.innerHTML =`Your search "${searchInput}" did not return any results`;
    }
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