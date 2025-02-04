import { getCharacterByID } from "../../api/asoiafAPI/characterFetches";
import { aside, knownHouses } from "../../constants/constants";
import { clearAsideAndAddBackground, getIdFromURL, removeLoadingIndicator, renderLoadingIndicator } from "../../helpers/helpers";
import HouseType from "../../types/houseType";

export const renderHouseInfo = async (house: HouseType) => {
    clearAsideAndAddBackground();
    const houseAside = document.createElement("div");
    houseAside.className = "containers";
    houseAside.id = "house-aside";
    aside.appendChild(houseAside);
    if (aside) {
        aside.scrollIntoView({ behavior: "smooth" });
    }
    renderLoadingIndicator(houseAside);

    let houseSVG = "";
    const houseNames = house.name.split(" ");

    if (houseNames.length > 1) {
        const matchingHouse = knownHouses.find(h => houseNames.includes(h));
        if (matchingHouse) {
            const houseSlug = matchingHouse.toLowerCase();
            houseSVG = `<img src="./media/houses/${houseSlug}.svg" alt="${matchingHouse}" class="house-sigil">`;
        }
    }

    const currentLord = getIdFromURL(house.currentLord);
    const overlord = getIdFromURL(house.overlord);
    
    const currentLordCharacter = currentLord ? await getCharacterByID(currentLord) : null;
    const overlordCharacter = overlord ? await getCharacterByID(overlord) : null;

    removeLoadingIndicator(houseAside);

    houseAside.innerHTML = `
    <section id="house-info">
        <h2 id="house-title">${house.name}</h2>
        ${houseSVG}
        <p><span>Words:</span> ${house.words || "Unknown"}</p>
        <p><span>Coat of arms:</span> ${house.coatOfArms || "Unknown"}</p>
        <p><span>Current lord:</span> ${currentLordCharacter ? currentLordCharacter.name : "Unknown"}</p>
        <p><span>Region:</span> ${house.region || "Unknown"}</p>
        <p><span>Founded:</span> ${house.founded || "Unknown"}</p>
        <p><span>Overlord:</span> ${overlordCharacter ? overlordCharacter.name : "Unknown"}</p>
    </section>`;
};
