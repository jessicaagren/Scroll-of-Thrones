import { getRandomQuote, getUniqueRandomQuote, usedQuotes } from "../api/quoteAPI";
import { soundOn } from "../components/buttons/soundButton/soundButton";
import { article, aside } from "../constants/constants";
import { clearAside, playSound } from "../helpers/helpers";


const gameOverAudio = new Audio('./media/audio/wrong-answer.mp3');
const correctAudio = new Audio('./media/audio/correct.mp3');

const usedNames: Set<string> = new Set();

let score: number = 0;
let totalScores: number[] = [];

export const startQuoteGame = async (): Promise<void> => {
    score = 0;
    usedQuotes.clear();
    usedNames.clear();

    clearAside();
    article.innerHTML = "";
    article.innerHTML = `
    <section>
    <p>Guess who said the quote. Keep guessing until you get it wrong.</p>
            </section>
        `;
    const button = document.createElement("button");
    button.textContent = "Start game";
    button.addEventListener("click", () => renderQuoteGame());
    article.appendChild(button);
}

const getRandomNames = async (correctName: string): Promise<string[]> => {
    const randomNames: string[] = [];

    while (randomNames.length < 3) {
        const randomQuote = await getRandomQuote();

        if (
            !usedNames.has(randomQuote.character.name) && 
            randomQuote.character.name !== correctName
        ) {
            randomNames.push(randomQuote.character.name);
            usedNames.add(randomQuote.character.name);
        }
    }

    randomNames.push(correctName);
    return randomNames.sort(() => Math.random() - 0.5);
};

const renderQuoteGame = async (): Promise<void> => {

    try {
        const quote = await getUniqueRandomQuote();

        const randomNames = await getRandomNames(quote.character.name);

        article.innerHTML = `
            <section>
                <p>"${quote.sentence}"</p>
                <p>Points: ${score}</p>
            </section>
        `;

        aside.innerHTML = "";
        randomNames.forEach(name => {
            const button = document.createElement("button");
            button.textContent = name;
            button.addEventListener("click", () => handleGuess(name, quote.character.name, article));
            aside.appendChild(button);
        });
    } catch (error) {
        console.error("Ett fel inträffade:", error);
    }
};


const handleGuess = async (selectedName: string, correctName: string, article: Element) => {

    if (selectedName === correctName) {
        score++;
        if (correctAudio as HTMLAudioElement) {
            playSound(soundOn, correctAudio);
        }

        article.innerHTML = `
            <section>
                <p><strong>Correct!</strong> The quote was by ${correctName}.</p>
                <p>Current score: ${score}</p>
                <p>Loading next quote...</p>
                <div class="hourglass"></div>
            </section>
        `;

        setTimeout(() => renderQuoteGame(), 2000);
    } else {

        if (gameOverAudio as HTMLAudioElement) {
            playSound(soundOn, gameOverAudio);
        }

        article.innerHTML = `
            <section>
                <p><strong>Incorrect!</strong> The quote was by ${correctName}.</p>
                <p>Game over.</p>
                <p>Total score: ${score}</p>
                <p>Previous scores:</p>
                <ul id="score-list"></ul>
            </section>
        `;

        const button = document.createElement("button");
        button.textContent = "Play again";
        button.addEventListener("click", () => startQuoteGame());
        article.appendChild(button);
        totalScores.push(score);

        const scoreList = document.getElementById("score-list") as HTMLUListElement;

        if (!scoreList) {
            console.error("Element för scoreList går inte att hämta");
            return;
        }

        for (const scores of totalScores) {
            const listItem = document.createElement("li");
        listItem.textContent = `${scores}`;
        scoreList.appendChild(listItem);
        }
    }
};
