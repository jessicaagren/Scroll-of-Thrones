import { searchCharacters } from "../../../api/asoiafAPI/characterFetches";
import { clearPreviousOutput, removeLoadingIndicator, renderLoadingIndicator } from "../../../helpers/helpers";
import { renderSearchResults } from "./renderSearchResults";

export const handleSearch = async () => {
    const input = document.getElementById("search-input") as HTMLInputElement;
    const searchContainer = document.getElementById("search-container") as HTMLElement;

    if (!input.value.trim()) return;

    clearPreviousOutput();
    renderLoadingIndicator(searchContainer);

    const searchInput = input.value;
    const searchedCharacters = await searchCharacters(searchInput);

    removeLoadingIndicator(searchContainer);
    renderSearchResults(searchInput, searchedCharacters);

    input.value = '';
};