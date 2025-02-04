import { clearAsideAndAddBackground, clearPreviousOutput } from "../../../../helpers/helpers";
import { renderFavouriteCharacters } from "./renderFavouriteCharacters";

export const handleFavouriteButton = () => {
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