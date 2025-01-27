import { article, flipPageAudio } from "../../../constants/constants";
import { clearArticleAndAddBackground, clearAside, clearAndAddClickedClass, playSound } from "../../../helpers/helpers";
import { soundOn } from "../soundButton/soundButton";

export const handleMapClick = () => {
    const mapElement = document.getElementById("map");
    const mapButton = document.getElementById("map-button") as HTMLButtonElement;
    
    if (mapElement && article) {
        mapElement.addEventListener("click", async () => {
            try {
                if (flipPageAudio as HTMLAudioElement) {
                    playSound(soundOn, flipPageAudio);
                }
    
                clearAndAddClickedClass(mapButton);
    
                clearArticleAndAddBackground("url('./media/backgrounds/distressed-map.png')");
                clearAside();
    
            } catch (error) {
                console.error("Fel vid hämtning av karta:", error);
            }
        });
    } else {
        console.error("Element med ID 'map' eller 'article' hittades inte.");
    }
}