import { bellAudio } from "../../../constants/constants";
import { setupSearchContainer } from "../../searchFunction/searchFunction";
import handleButtonClick from "../handleButtonClick/handleButtonClick";

const handleSearchClick = () => {
    handleButtonClick("search", "search-button", "./media/backgrounds/paper-mask-standing2.png", setupSearchContainer, bellAudio);
};

export default handleSearchClick;