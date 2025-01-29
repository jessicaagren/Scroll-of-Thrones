import { getBookByURL, getHouseByURL, getRandomCharacter, searchCharacters } from "../../../api/asoiafAPI";
import { article, aside, bellAudio } from "../../../constants/constants";
import { clearArticleAndAddBackground, clearAside, clearAndAddClickedClass, playSound } from "../../../helpers/helpers";
import AsoiafCharacterType from "../../../types/asoiafCharacterType";
import { soundOn } from "../soundButton/soundButton";

export const handleSearchClick = async () => {
    const searchElement = document.getElementById("search") as HTMLElement;
    const searchButton = document.getElementById("search-button") as HTMLButtonElement;

    if (searchElement && article) {
        searchElement.addEventListener("click", async () => {
            try {
                if (bellAudio as HTMLAudioElement) {
                    playSound(soundOn, bellAudio);
                }

                clearAndAddClickedClass(searchButton);

                clearArticleAndAddBackground("url('./media/backgrounds/paper-mask-standing2.png')");
                clearAside();

                const input = document.createElement("input");
                input.type = "text";
                input.placeholder = ". . .";
                input.id = "search-input";
                article.appendChild(input);

                handleInput();

                const button = document.createElement("button");
                button.textContent = "Randomise";
                button.id = "randomise-button";
                article.appendChild(button);

                handleRandomButton();

            } catch (error) {
                console.error("Fel vid hämtning av sökfält:", error);
            }
        });
    } else {
        console.error("Element med ID 'search' eller 'article' hittades inte.");
    };
}

const handleInput = () => {
    const input = document.getElementById("search-input") as HTMLInputElement;

    input.addEventListener('keydown', async (event) => {
        if (event.key === 'Enter') {
            const previousSearchElement = document.getElementById('search-output');
            const previousCharacterList = document.getElementById('character-list');

            if (previousSearchElement) {
                article.removeChild(previousSearchElement);
            }

            if (previousCharacterList) {
                article.removeChild(previousCharacterList);
            }

            const searchInput = input.value;
            const searchedCharacters = await searchCharacters(searchInput);

            const searchElement = document.createElement("p");
            searchElement.id = 'search-output';
            searchElement.innerHTML = `Din sökning: "${searchInput}"`;
            article.appendChild(searchElement);

            const characterList = document.createElement("ul");
            characterList.id = 'character-list';

            searchedCharacters.forEach(character => {
                const listItem = document.createElement("li");
                listItem.textContent = character.name; 

                listItem.addEventListener("click", () => displayCharacterInfo(character));

                characterList.appendChild(listItem);
            });

            article.appendChild(characterList);
            input.value = '';
        }
    });
};

const handleRandomButton = () => {
    const button = document.getElementById("randomise-button") as HTMLButtonElement;
    if (button) {
        button.addEventListener("click", async () => {
            try {
                const character = await getRandomCharacter();
                if (character) {
                    displayCharacterInfo(character);
                } else {
                    console.error("Ingen karaktär hittades.");
                }
            } catch (error) {
                console.error("Fel vid hämtning av slumpmässig karaktär:", error);
            }
        });
    } else {
        console.error("Knapp hittades inte.");
    }
};


const displayCharacterInfo = async (character: AsoiafCharacterType) => {
    let houseNames: string[] = [];
    let bookNames: string[] = [];

    for (const houseURL of character.allegiances) {
        const house = await getHouseByURL(houseURL);
        if (house) {
            houseNames.push(house.name);
        }
    }

    for (const bookURL of character.povBooks) {
        const book = await getBookByURL(bookURL);
        if (book) {
            bookNames.push(book.name);
        }
    }

    aside.innerHTML = `
        <h2>${character.name}</h2>
        <p>Allegiances: ${houseNames.length > 0 ? houseNames.join(", ") : "Unknown"}</p>
        <p>Titles: ${character.titles.length > 0 ? character.titles.join(", ") : "Unknown"}</p>
        <p>Culture: ${character.culture || "Unknown"}</p>
        <p>Born: ${character.born || "Unknown"}</p>
        <p>Died: ${character.died || "N/A"}</p>
        <p>POV books: ${bookNames.length > 0 ? bookNames.join(", ") : "None"}</p>
    `;
};
