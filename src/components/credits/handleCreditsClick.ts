import { flipPageAudio } from "../../constants/constants";
import handleButtonClick from "../buttons/handleButtonClick/handleButtonClick";
import setupCredits from "./setupCredits";


const handleCreditsClick = () => {
    handleButtonClick("map", "map-button", './media/backgrounds/distressed-map.png', setupCredits, flipPageAudio)
}

export default handleCreditsClick;