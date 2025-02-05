import { favouriteCharacters } from "../../../state/state";
import AsoiafCharacterType from "../../../types/asoiafCharacterType";
import { handleFavouriteIconClick } from "./handleFavouriteIconClick";

export const createFavouriteIcon = (character: AsoiafCharacterType) => {
    const favouriteButton = document.getElementById("favourite") as HTMLButtonElement;
    const favouriteIcon = document.getElementById("favourite-icon") as HTMLElement;

    const isFavourite = favouriteCharacters.some(fav => fav.url === character.url);
    favouriteIcon.style.filter = isFavourite ? "none" : "grayscale(1)";

    handleFavouriteIconClick(favouriteButton, favouriteCharacters, character, favouriteIcon)
}
