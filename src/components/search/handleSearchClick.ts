import { bellAudio } from "../../constants/constants";
import handleButtonClick from "../buttons/handleButtonClick/handleButtonClick";
import { setupSearchContainer } from "./setupSearchContainer";

const handleSearchClick = () => {
    handleButtonClick("search", "search-button", "./media/backgrounds/paper-mask-standing.png", setupSearchContainer, bellAudio);
};

export default handleSearchClick;