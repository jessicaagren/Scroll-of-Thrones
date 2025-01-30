import { article, writingAudio } from "../../../constants/constants";
import { clearArticleAndAddBackground, clearAside, clearAndAddClickedClass, playSound } from "../../../helpers/helpers";
import { startQuoteGame } from "../../quoteGame/quoteGame";
import { soundOn } from "../soundButton/soundButton";

export const handleQuoteClick = () => {
    const quotesElement = document.getElementById("quotes");
    const quotesButton = document.getElementById("quotes-button") as HTMLButtonElement;
    
    if (quotesElement && article) {
        quotesElement.addEventListener("click", async () => {
            try {
                if (writingAudio as HTMLAudioElement) {
                    playSound(soundOn, writingAudio);
                }
    
                clearAndAddClickedClass(quotesButton);
    
                clearArticleAndAddBackground('./media/backgrounds/paper-mask-standing2.png');
                clearAside();
    
                startQuoteGame();
    
            } catch (error) {
                console.error("Fel vid hämtning av citat:", error);
            }
        });
    } else {
        console.error("Element med ID 'quotes' eller 'article' hittades inte.");
    }
}