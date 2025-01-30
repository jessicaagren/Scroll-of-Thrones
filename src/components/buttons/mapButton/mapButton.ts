import { flipPageAudio } from "../../../constants/constants";
import handleButtonClick from "../buttonFunction";


export const handleMapClick = () => {
    handleButtonClick("map", "map-button", './media/backgrounds/distressed-map.png', undefined, flipPageAudio)
}