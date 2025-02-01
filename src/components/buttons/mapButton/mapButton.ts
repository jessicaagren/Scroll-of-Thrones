import { flipPageAudio } from "../../../constants/constants";
import setupInfo from "../../mapFunction/mapFunction";
import handleButtonClick from "../handleButtonClick/handleButtonClick";


const handleMapClick = () => {
    handleButtonClick("map", "map-button", './media/backgrounds/distressed-map.png', setupInfo, flipPageAudio)
}

export default handleMapClick;