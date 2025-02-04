import { favouriteCharacters } from "../../../state/state";
import AsoiafCharacterType from "../../../types/asoiafCharacterType";

export const createFavouriteIcon = (character: AsoiafCharacterType) => {
    const favouriteButton = document.getElementById("favourite") as HTMLButtonElement;
    const favouriteIcon = document.getElementById("favourite-icon") as HTMLElement;

    const isFavourite = favouriteCharacters.some(fav => fav.url === character.url);
    favouriteIcon.style.filter = isFavourite ? "none" : "grayscale(1)";
    
    favouriteButton.addEventListener("click", () => {
        const favIndex = favouriteCharacters.findIndex(fav => fav.url === character.url);
    
        if (favIndex === -1) {
            favouriteCharacters.push(character);
            favouriteIcon.style.filter = "none";
        } else {
            favouriteCharacters.splice(favIndex, 1);
            favouriteIcon.style.filter = "grayscale(1)";
        }
    })
}
