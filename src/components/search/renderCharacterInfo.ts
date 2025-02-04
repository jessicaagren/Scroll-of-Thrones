import { getBookByID } from "../../api/asoiafAPI/bookFetches";
import { getCharacterByID } from "../../api/asoiafAPI/characterFetches";
import { getHouseByID } from "../../api/asoiafAPI/houseFetches";
import { aside, knownHouses } from "../../constants/constants";
import { clearAsideAndAddBackground, getIdFromURL } from "../../helpers/helpers";
import AsoiafCharacterType from "../../types/asoiafCharacterType";
import { createFavouriteIcon } from "../buttons/favouriteButton/createFavouriteIcon";


export const renderCharacterInfo = async (character: AsoiafCharacterType) => {
    let houseNames: string[] = [];
    let bookNames: string[] = [];
    let houseWords: string[] = [];

    for (const houseURL of character.allegiances) {
        const houseId = getIdFromURL(houseURL);
        if (houseId) {
            const house = await getHouseByID(houseId);
            if (house) {
                houseNames.push(house.name);
                if (house.words) {
                    houseWords.push(house.words);
                }
            }
        }
    }

    for (const bookURL of character.povBooks) {
        const bookId = getIdFromURL(bookURL);
        if (bookId) {
            const book = await getBookByID(bookId);
            if (book) bookNames.push(book.name);
        }
    }

    const spouseId = getIdFromURL(character.spouse);

    const spouseCharacter = spouseId ? await getCharacterByID(spouseId) : null;

    clearAsideAndAddBackground();
    const searchAside = document.createElement("div");
    searchAside.className ="containers";
    searchAside.id = "search-aside";
    aside.appendChild(searchAside);

    let houseSVG = "";
    if (houseNames.length > 0) {
        const matchingHouse = knownHouses.find(house => houseNames[0].includes(house));
        if (matchingHouse) {
            const houseSlug = matchingHouse.toLowerCase();
            houseSVG = `<img src="./media/houses/${houseSlug}.svg" alt="${matchingHouse}" class="house-sigil">`;
        }
    }

    searchAside.innerHTML = `
        <h2 id="title">${character.name}</h2>
        <button id="favourite" alt="Favourite button">
            <img src="/media/icons/heart.png" alt="Favourite button" id="favourite-icon" />
        </button>
        ${houseSVG}
        <section id="character-info">
            <p><span>House:</span> ${houseNames.length > 0 ? houseNames.join(", ") : "Unknown"}</p>
            <p><span>House words:</span> ${houseWords.length > 0 ? houseWords.join(", ") : "Unknown"}</p>
            <p><span>Titles:</span> ${character.titles.length > 0 ? character.titles.join(", ") : "Unknown"}</p>
            <p><span>Culture:</span> ${character.culture || "Unknown"}</p>
            <p><span>Spouse:</span> ${spouseCharacter ? spouseCharacter.name : "Unknown"}</p>
            <p><span>Born:</span> ${character.born || "Unknown"}</p>
            <p><span>Died:</span> ${character.died || "Unknown"}</p>
            <p><span>POV books:</span> ${bookNames.length > 0 ? bookNames.join(", ") : "None"}</p>
        </section>
    `;

    createFavouriteIcon(character);
}