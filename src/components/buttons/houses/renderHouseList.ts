import { getHouseByID } from "../../../api/asoiafAPI/houseFetches";
import { getIdFromURL } from "../../../helpers/helpers";
import { allHouses } from "./setupHouseContainer";
import { renderHouseInfo } from "./renderHouseInfo";

let currentPage = 1;
const housesPerPage = 20;

export const changePage = (direction: number) => {
    currentPage += direction;
    renderHouseList();
};

export const renderHouseList = () => {
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