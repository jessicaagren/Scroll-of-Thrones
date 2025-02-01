import { getHouses, getHouseByID, getCharacterByID } from "../../api/asoiafAPI";
import { article, aside, knownHouses } from "../../constants/constants";
import { clearAside, getIdFromURL } from "../../helpers/helpers";
import HouseType from "../../types/houseType";

let currentPage = 1;
const housesPerPage = 20;
let allHouses: HouseType[] = [];

export const setupHouseContainer = async () => {
    const houseContainer = document.createElement("div");
    houseContainer.id = "house-container";
    article.appendChild(houseContainer);

    const explanation = document.createElement("h2");
    explanation.innerHTML = "Click on a house to see details";
    houseContainer.appendChild(explanation);

    const houseList = document.createElement("ul");
    houseList.id = "house-list";
    houseContainer.appendChild(houseList);

    const paginationContainer = document.createElement("div");
    paginationContainer.id = "pagination-container";
    paginationContainer.style.display = "none";
    houseContainer.appendChild(paginationContainer);

    const prevButton = document.createElement("button");
    prevButton.textContent = "Back";
    prevButton.id = "prev-button";
    prevButton.addEventListener("click", () => changePage(-1));
    paginationContainer.appendChild(prevButton);

    const nextButton = document.createElement("button");
    nextButton.textContent = "Next";
    nextButton.id = "next-button";
    nextButton.addEventListener("click", () => changePage(1));
    paginationContainer.appendChild(nextButton);

    houseList.innerHTML = "<div class='hourglass'></div>";

    allHouses = (await getHouses()) || [];

    renderHouses();
};


const renderHouses = () => {
    const houseList = document.getElementById("house-list") as HTMLElement;
    const paginationContainer = document.getElementById("pagination-container") as HTMLElement;
    const prevButton = document.getElementById("prev-button") as HTMLButtonElement;
    const nextButton = document.getElementById("next-button") as HTMLButtonElement;

    houseList.innerHTML = "";

    const start = (currentPage - 1) * housesPerPage;
    const end = start + housesPerPage;
    const housesToShow = allHouses.slice(start, end);

    housesToShow.forEach((house) => {
        if (!house.name.trim()) return;

        const houseItem = document.createElement("li");
        houseItem.textContent = house.name;
        houseItem.classList.add("house-item");

        houseItem.addEventListener("click", async () => {
            const houseId = getIdFromURL(house.url.toString());
            if (!houseId) return;

            const houseDetails = await getHouseByID(houseId);
            if (houseDetails) renderHouseInfo(houseDetails);
        });

        houseList.appendChild(houseItem);
    });

    paginationContainer.style.display = allHouses.length > housesPerPage ? "block" : "none";

    prevButton.style.display = currentPage > 1 ? "inline-block" : "none";
    nextButton.style.display = end < allHouses.length ? "inline-block" : "none";
};

const changePage = (direction: number) => {
    currentPage += direction;
    renderHouses();
};

const renderHouseInfo = async (house: HouseType) => {
    clearAside();
    const houseAside = document.createElement("div");
    houseAside.id = "house-aside";
    aside.appendChild(houseAside);

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


    houseAside.innerHTML = `
        <h2 id="house-title">${house.name}</h2>
        ${houseSVG}
        <p>Words: ${house.words || "Unknown"}</p>
        <p>Coat of arms: ${house.coatOfArms || "Unknown"}</p>
        <p>Current lord: ${currentLordCharacter ? currentLordCharacter.name : "Unknown"}</p>
        <p>Region: ${house.region || "Unknown"}</p>
        <p>Coat of Arms: ${house.coatOfArms || "Unknown"}</p>
        <p>Founded: ${house.founded || "Unknown"}</p>
        <p>Overlord: ${overlordCharacter ? overlordCharacter.name : "Unknown"}</p>
    `;
};
