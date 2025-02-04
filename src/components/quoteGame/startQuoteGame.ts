import { article, correctAudio, gameOverAudio } from "../../constants/constants";
import { clearAsideAndAddBackground, clearArticle, playSound } from "../../helpers/helpers";
import { totalQuoteGameScores, usedNames, usedQuotes } from "../../state/state";
import { soundOn } from "../buttons/soundButton/soundButton";
import { renderQuoteGame } from "./renderQuoteGame";

export let quoteGameScore: number = 0;

export const startQuoteGame = async (): Promise<void> => {

    quoteGameScore = 0;
    usedQuotes.clear();
    usedNames.clear();

    clearAsideAndAddBackground();
    clearArticle();
    
    const gameContainer = document.createElement("section");
    gameContainer.className = "containers";
    gameContainer.id = "game-container";
    article.appendChild(gameContainer);

    gameContainer.innerHTML = `
        <section class="game-info">
            <h2>Guess who said the quote. Keep guessing until you get it wrong.</h2>
        </section>
    `;

    const button = document.createElement("button");
    button.textContent = "Start game";
    button.addEventListener("click", () => renderQuoteGame());
    gameContainer.appendChild(button);

    if (totalQuoteGameScores.length > 0) {
    const previousScores = document.createElement("div");
    gameContainer.appendChild(previousScores);
    previousScores.innerHTML = `
                <p>Previous scores:</p>
                <ul id="score-list"></ul>
            </section>
        `;

        const scoreList = document.getElementById("score-list") as HTMLUListElement;

        if (!scoreList) {
            console.error("Element för scoreList går inte att hämta");
            return;
        }

            for (const scores of totalQuoteGameScores) {
                const listItem = document.createElement("li");
                listItem.textContent = `${scores}`;
                scoreList.appendChild(listItem);
            }
        }
};

export const handleGuess = async (selectedName: string, correctName: string) => {
    const gameContainer = document.getElementById("game-container") as HTMLElement;

    if (article) {
        article.scrollIntoView({ behavior: "smooth" });
    }

    if (selectedName === correctName) {
        quoteGameScore++;

        if (correctAudio as HTMLAudioElement) {
            playSound(soundOn, correctAudio);
        }

        gameContainer.innerHTML = `
            <section>
                <p><strong>Correct!</strong> The quote was by ${correctName}.</p>
                <p>Current score: ${quoteGameScore}</p>
                <p>Loading next quote...</p>
                <div class="hourglass"></div>
            </section>
        `;

        setTimeout(() => renderQuoteGame(), 2000);
    } else {
        if (gameOverAudio as HTMLAudioElement) {
            playSound(soundOn, gameOverAudio);
        }

        clearAsideAndAddBackground();

        gameContainer.innerHTML = `
            <section class="game-info">
                <p><strong>Incorrect!</strong> The quote was by ${correctName}.</p>
                <p>Game over.</p>
                <p>Total score: ${quoteGameScore}</p>
                <p>Previous scores:</p>
                <ul id="score-list"></ul>
            </section>
        `;

        const button = document.createElement("button");
        button.textContent = "Play again";
        button.addEventListener("click", () => startQuoteGame());
        gameContainer.appendChild(button);

        totalQuoteGameScores.push(quoteGameScore);

        const scoreList = document.getElementById("score-list") as HTMLUListElement;

        if (!scoreList) {
            console.error("Element för scoreList går inte att hämta");
            return;
        }

        for (const scores of totalQuoteGameScores) {
            const listItem = document.createElement("li");
            listItem.textContent = `${scores}`;
            scoreList.appendChild(listItem);
        }
    }
};
