import { flipPageAudio } from "../../../constants/constants";
import handleButtonClick from "../handleButtonClick/handleButtonClick";


const handleMapClick = () => {
    handleButtonClick("map", "map-button", './media/backgrounds/distressed-map.png', undefined, flipPageAudio)
}

export default handleMapClick;