import { getRandomQuote, getUniqueRandomQuote } from "../../api/quoteAPI";
import { soundOn } from "../buttons/soundButton/soundButton";
import { article, aside, correctAudio, gameOverAudio } from "../../constants/constants";
import { clearArticleAndAddBackground, clearAside, playSound } from "../../helpers/helpers";
import { getRandomCharacterByID } from "../../api/asoiafAPI";

const usedCharacters: Set<string> = new Set();

let houseGameScore: number = 0;
let totalHouseGameScores: number[] = [];

export const startHouseGame = async (): Promise<void> => {
    houseGameScore = 0;
    usedCharacters.clear();

    clearAside();
    clearArticleAndAddBackground();
    article.innerHTML = `
    <section>
    <p>Guess which house the character belongs to. Keep guessing until you get it wrong.</p>
            </section>
        `;
    const button = document.createElement("button");
    button.textContent = "Start game";
    button.addEventListener("click", () => renderHouseGame());
    article.appendChild(button);
}

// TODO Lägg till random karaktär, hämta fler karaktärer som inte är den
// TODO Fortsätt på getRandomHouses
const getRandomHouses = async (correctName: string): Promise<string[]> => {
    const randomHouses: string[] = [];

    while (randomHouses.length < 3) {
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

const renderHouseGame = async (): Promise<void> => {
    try {
        const quote = await getUniqueRandomQuote();

        const randomNames = await getRandomNames(quote.character.name);

        article.innerHTML = `
            <section>
                <p>"${quote.sentence}"</p>
                <p>Points: ${houseGameScore}</p>
            </section>
        `;

        clearAside();
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
        houseGameScore++;
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

        setTimeout(() => renderHouseGame(), 2000);
    } else {

        if (gameOverAudio as HTMLAudioElement) {
            playSound(soundOn, gameOverAudio);
        }

        article.innerHTML = `
            <section>
                <p><strong>Incorrect!</strong> The quote was by ${correctName}.</p>
                <p>Game over.</p>
                <p>Total score: ${houseGameScore}</p>
                <p>Previous scores:</p>
                <ul id="score-list"></ul>
            </section>
        `;

        const button = document.createElement("button");
        button.textContent = "Play again";
        button.addEventListener("click", () => startHouseGame());
        article.appendChild(button);
        totalHouseGameScores.push(houseGameScore);

        const scoreList = document.getElementById("score-list") as HTMLUListElement;

        if (!scoreList) {
            console.error("Element för scoreList går inte att hämta");
            return;
        }

        for (const scores of totalHouseGameScores) {
            const listItem = document.createElement("li");
        listItem.textContent = `${scores}`;
        scoreList.appendChild(listItem);
        }
    }
};
