import { soundOn } from "../buttons/soundButton/soundButton";
import { article, aside, correctAudio, gameOverAudio } from "../../constants/constants";
import { clearArticleAndAddBackground, clearAside, playSound } from "../../helpers/helpers";
import { getRandomCharacter } from "../../api/asoiafAPI";

const usedHouses: Set<string> = new Set();
const usedCharacters: Set<string> = new Set();

let houseGameScore: number = 0;
let totalHouseGameScores: number[] = [];

export const startHouseGame = async (): Promise<void> => {
    houseGameScore = 0;
    usedCharacters.clear();

    clearAside();
    clearArticleAndAddBackground('./media/backgrounds/paper-mask-standing2.png');
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

const getRandomCharacterWithHouse = async (): Promise<{ name: string; houseURL: string; houseName: string } | null> => {
    while (true) {
        const character = await getRandomCharacter();
        if (character && character.allegiances.length > 0) {
            const matchedHouse = await getHouseByURL(character.allegiances[0]);

            if (matchedHouse) {
                return {
                    name: character.name.split(" ")[0],
                    houseURL: character.allegiances[0],
                    houseName: matchedHouse.name,
                };
            }
        }
    }
};

const getRandomHouses = async (correctHouseURL: string): Promise<string[]> => {
    const randomHouses: Set<string> = new Set();

    const correctHouse = await getHouseByURL(correctHouseURL);
    if (!correctHouse) {
        throw new Error("Kunde inte hämta det korrekta huset.");
    }
    randomHouses.add(correctHouse.name);

    while (randomHouses.size < 4) {
        const randomCharacter = await getRandomCharacterWithHouse();
        if (randomCharacter) {
            const randomHouse = await getHouseByURL(randomCharacter.houseURL);
            if (randomHouse && randomHouse.name !== correctHouse.name) {
                randomHouses.add(randomHouse.name);
            }
        }
    }

    return Array.from(randomHouses).sort(() => Math.random() - 0.5);
};

const renderHouseGame = async (): Promise<void> => {
    try {
        const character = await getRandomCharacterWithHouse();
        if (!character) {
            throw new Error("Kunde inte hämta en karaktär med hus.");
        }

        const randomHouses = await getRandomHouses(character.houseURL);

        article.innerHTML = `
            <section>
                <p><strong>${character.name}</strong></p>
                <p>To which house does this character belong?</p>
                <p>Points: ${houseGameScore}</p>
            </section>
        `;

        randomHouses.forEach((houseName) => {
            const button = document.createElement("button");
            button.textContent = houseName;
            button.addEventListener("click", () => handleGuess(houseName, character.houseURL));
            aside.appendChild(button);
        });
    } catch (error) {
        console.error("Ett fel inträffade:", error);
    }
};
  

const handleGuess = async (selectedHouse: string, correctHouseURL: string) => {
    const correctHouse = await getHouseByURL(correctHouseURL);
    if (!correctHouse) {
        throw new Error("Kunde inte hämta det korrekta huset.");
    }

    if (selectedHouse === correctHouse.name) {
        houseGameScore++;
        playSound(soundOn, correctAudio);

        article.innerHTML = `
            <section>
                <p><strong>Correct!</strong> The house is ${correctHouse.name}.</p>
                <p>Current score: ${houseGameScore}</p>
                <p>Loading next character...</p>
                <div class="hourglass"></div>
            </section>
        `;

        setTimeout(() => renderHouseGame(), 2000);
    } else {
        playSound(soundOn, gameOverAudio);

        article.innerHTML = `
            <section>
                <p><strong>Incorrect!</strong> The house was ${correctHouse.name}.</p>
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
        if (scoreList) {
            scoreList.innerHTML = "";
            totalHouseGameScores.forEach((score) => {
                const listItem = document.createElement("li");
                listItem.textContent = `${score}`;
                scoreList.appendChild(listItem);
            });
        }
    }
};

//TODO Läs igenom och dubbelkolla (ska spelet ändras?)
// TODO ANvänd nedan lista vid sökning istället

export const housesList = [
    { name: "Arryn", icon: "/media/houses/arryn.svg" },
    { name: "Baelish", icon: "/media/houses/baelish.svg" },
    { name: "Baratheon", icon: "/media/houses/baratheon.svg" },
    { name: "Bolton", icon: "/media/houses/bolton.svg" },
    { name: "Clegane", icon: "/media/houses/clegane.svg" },
    { name: "Dondarrion", icon: "/media/houses/dondarrion.svg" },
    { name: "Frey", icon: "/media/houses/frey.svg" },
    { name: "Greyjoy", icon: "/media/houses/greyjoy.svg" },
    { name: "Lannister", icon: "/media/houses/lannister.svg" },
    { name: "Martell", icon: "/media/houses/martell.svg" },
    { name: "Mormont", icon: "/media/houses/mormont.svg" },
    { name: "Stark", icon: "/media/houses/stark.svg" },
    { name: "Targaryen", icon: "/media/houses/targaryen.svg" },
    { name: "Tully", icon: "/media/houses/tully.svg" },
    { name: "Tyrell", icon: "/media/houses/tyrell.svg" },
  ];
  
export const getHouseWithIcon = (houseName: string) => {
  return housesList.find((house) => house.name === houseName);
};

const renderHouseIcons = (houseNames: string[]) => {
    clearAside(); // Rensar tidigare ikoner (om det behövs)
  
    houseNames.forEach((houseName) => {
      const house = getHouseWithIcon(houseName);
      if (house) {
        const img = document.createElement("img");
        img.src = house.icon;
        img.alt = house.name;
        img.title = house.name;
        img.style.width = "100px";
        img.style.margin = "10px";
  
        aside.appendChild(img);
      } else {
        console.warn(`Ingen ikon hittades för huset: ${houseName}`);
      }
    });
  };
  