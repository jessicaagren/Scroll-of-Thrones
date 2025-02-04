import { article } from "../../constants/constants";
import { clearAsideAndAddBackground } from "../../helpers/helpers";
import { handleFavouriteButton } from "../buttons/favouriteButton/handleFavouriteButton";
import { handleRandomButton } from "./handleRandomButton";
import { handleSearch } from "./handleSearch";


export const setupSearchContainer = () => {

    clearAsideAndAddBackground();

    const searchContainer = document.createElement("div");
    searchContainer.className = "containers";
    searchContainer.id = "search-container";
    article.appendChild(searchContainer);

    const explanation = document.createElement("h2");
    explanation.innerHTML = "Search for any character below";
    searchContainer.appendChild(explanation);

    const inputContainer = document.createElement("div");
    inputContainer.id = "input-container";
    searchContainer.appendChild(inputContainer);

    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Enter character name...";
    input.id = "search-input";
    inputContainer.appendChild(input);

    const searchButton = document.createElement("button");
    searchButton.textContent = "Search";
    searchButton.id = "search-button";
    inputContainer.appendChild(searchButton);

    searchButton.addEventListener("click", handleSearch);
    input.addEventListener("keydown", (event) => {
        if (event.key === "Enter") handleSearch();
    });

    const searchButtonContainer = document.createElement("div");
    searchButtonContainer.id = "search-button-container";
    searchContainer.appendChild(searchButtonContainer);

    const favButton = document.createElement("button");
    favButton.textContent = "Favourites";
    favButton.id = "favourite-button";
    searchButtonContainer.appendChild(favButton);

    handleFavouriteButton();

    const randomButton = document.createElement("button");
    randomButton.textContent = "Randomise";
    randomButton.id = "randomise-button";
    searchButtonContainer.appendChild(randomButton);

    handleRandomButton();
};
