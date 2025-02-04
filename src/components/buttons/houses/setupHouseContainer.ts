import { getHouses } from "../../../api/asoiafAPI/houseFetches";
import { article } from "../../../constants/constants";
import { removeLoadingIndicator, renderLoadingIndicator } from "../../../helpers/helpers";
import HouseType from "../../../types/houseType";
import { changePage, renderHouseList } from "./renderHouseList";

export let allHouses: HouseType[] = [];

export const setupHouseContainer = async () => {
    const houseContainer = document.createElement("div");
    houseContainer.className = "containers";
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

    renderLoadingIndicator(houseContainer);

    allHouses = (await getHouses()) || [];

    removeLoadingIndicator(houseContainer);

    renderHouseList();
};
