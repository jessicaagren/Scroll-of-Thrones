import { drawingSwordAudio } from "../../../constants/constants";
import { setupHouseContainer } from "../../housesFunction/housesFunction";
import handleButtonClick from "../handleButtonClick/handleButtonClick";

const handleHouseClick = () => {
    handleButtonClick("houses", "houses-button", "./media/backgrounds/paper-mask-standing.png", setupHouseContainer, drawingSwordAudio)
}

export default handleHouseClick;