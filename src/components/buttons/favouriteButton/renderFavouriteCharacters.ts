import { clearPreviousOutput } from "../../../helpers/helpers";
import { favouriteCharacters } from "../../../state/state";
import { renderCharacterInfo } from "../../search/renderCharacterInfo";

export const renderFavouriteCharacters = () => {
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