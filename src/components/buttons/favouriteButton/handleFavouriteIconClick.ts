import AsoiafCharacterType from "../../../types/asoiafCharacterType";
import { renderFavouriteCharacters } from "./renderFavouriteCharacters";

export const handleFavouriteIconClick = (button: HTMLButtonElement, favouriteCharacters: AsoiafCharacterType[], character: AsoiafCharacterType, favouriteIcon: HTMLElement) => {
    button.addEventListener("click", () => {
        const favIndex = favouriteCharacters.findIndex(fav => fav.url === character.url);
    
        if (favIndex === -1) {
            favouriteCharacters.push(character);
            favouriteIcon.style.filter = "none";
        } else {
            favouriteCharacters.splice(favIndex, 1);
            favouriteIcon.style.filter = "grayscale(1)";
            
            const favouriteOutput = document.getElementById("favourite-output");
            if(favouriteOutput) {
                renderFavouriteCharacters();
            }
        }
    });
}