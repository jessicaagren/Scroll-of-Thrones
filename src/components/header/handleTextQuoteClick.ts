import { startQuoteGame } from "../quoteGame/startQuoteGame";
import { clearArticle, clearAsideAndAddBackground, clearPreviousOutput, playSound } from "../../helpers/helpers";
import { soundOn } from "../buttons/handleSoundClick/handleSoundClick";
import { writingAudio } from "../../constants/constants";

export const handleTextQuoteClick = () => {
    const quoteSpan = document.getElementById("quote-span") as HTMLElement;
    quoteSpan.addEventListener("click", async () => {
        
        clearPreviousOutput();
        clearAsideAndAddBackground();
        clearArticle();

        playSound(soundOn, writingAudio);

        startQuoteGame();
    })
}