import { bellAudio } from "../../../constants/constants";
import { setupSearchContainer } from "../../searchFunction/searchFunction";
import handleButtonClick from "../buttonFunction";

export const handleSearchClick = () => {
    handleButtonClick("search", "search-button", "./media/backgrounds/paper-mask-standing2.png", setupSearchContainer, bellAudio);
};
