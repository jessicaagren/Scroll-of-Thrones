import { drawingSwordAudio } from "../../constants/constants";
import { setupHouseContainer } from "./setupHouseContainer";
import handleButtonClick from "../buttons/handleButtonClick/handleButtonClick";

const handleHouseClick = () => {
    handleButtonClick("houses", "houses-button", "./media/backgrounds/paper-mask-standing.png", setupHouseContainer, drawingSwordAudio)
}

export default handleHouseClick;