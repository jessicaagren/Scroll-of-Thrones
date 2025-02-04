import { getRandomCharacter } from "../../api/asoiafAPI/characterFetches";
import { aside } from "../../constants/constants";
import { clearAsideAndAddBackground, clearPreviousOutput, renderLoadingIndicator } from "../../helpers/helpers";
import { renderCharacterInfo } from "./renderCharacterInfo";

export const handleRandomButton = () => {
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