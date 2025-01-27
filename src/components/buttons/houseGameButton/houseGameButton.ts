import { article, drawingSwordAudio } from "../../../constants/constants";
import { clearArticleAndAddBackground, clearAside, clearAndAddClickedClass, playSound } from "../../../helpers/helpers";
import { soundOn } from "../soundButton/soundButton";

export const handleHouseClick = () => {
    const housesElement = document.getElementById("houses");
    const housesButton = document.getElementById("houses-button") as HTMLButtonElement;
    
    if (housesElement && article) {
        housesElement.addEventListener("click", async () => {
            try {
                if (drawingSwordAudio as HTMLAudioElement) {
                    playSound(soundOn, drawingSwordAudio);
                }
    
                clearAndAddClickedClass(housesButton);
    
                clearArticleAndAddBackground("url('./media/backgrounds/paper-mask-standing2.png')");
                clearAside();
    
            } catch (error) {
                console.error("Fel vid hämtning av hus:", error);
            }
        });
    } else {
        console.error("Element med ID 'houses' eller 'article' hittades inte.");
    }
}