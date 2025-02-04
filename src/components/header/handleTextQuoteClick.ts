import { startQuoteGame } from "../quoteGame/startQuoteGame";
import { clearArticle, clearAsideAndAddBackground, clearPreviousOutput } from "../../helpers/helpers";

export const handleTextQuoteClick = () => {
    const quoteSpan = document.getElementById("quote-span") as HTMLElement;
    quoteSpan.addEventListener("click", async () => {
        
        clearPreviousOutput();
        clearAsideAndAddBackground();
        clearArticle();

        startQuoteGame();
    })
}