import { aside } from "../../constants/constants";
import { clearAsideAndAddBackground } from "../../helpers/helpers";
import { getRandomNames } from "./getRandomNames";
import { getUniqueRandomQuote } from "./getUniqueRandomQuote";
import { handleGuess, quoteGameScore } from "./startQuoteGame";

export const renderQuoteGame = async (): Promise<void> => {
    try {
        const gameContainer = document.getElementById("game-container") as HTMLElement;

        const quote = await getUniqueRandomQuote();
        const randomNames = await getRandomNames(quote.character.name);
        
        gameContainer.innerHTML = `
        <section class="game-info">
        <p><span class="quote">"${quote.sentence}"</span></p>
        <p>Points: ${quoteGameScore}</p>
        </section>
        `;
        
        clearAsideAndAddBackground();
        
        const gameAside = document.createElement("section");
        gameAside.className = "containers";
        gameAside.id = "game-aside";
        aside.appendChild(gameAside);

        randomNames.forEach(name => {
            const button = document.createElement("button");
            button.textContent = name;
            button.addEventListener("click", () => handleGuess(name, quote.character.name));
            gameAside.appendChild(button);
        });
        

    } catch (error) {
        console.error("Ett fel inträffade:", error);
    }
};
