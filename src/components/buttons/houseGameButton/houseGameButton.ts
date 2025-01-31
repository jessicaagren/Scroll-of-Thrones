import { drawingSwordAudio } from "../../../constants/constants";
import { startHouseGame } from "../../houseGame/houseGame";
import handleButtonClick from "../handleButtonClick/handleButtonClick";

const handleHouseClick = () => {
    handleButtonClick("houses", "houses-button", "./media/backgrounds/paper-mask-standing2.png", startHouseGame, drawingSwordAudio);
};

export default handleHouseClick;