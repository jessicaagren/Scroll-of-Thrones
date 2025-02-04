import { writingAudio } from "../../constants/constants";
import { startQuoteGame } from "./startQuoteGame";
import handleButtonClick from "../buttons/handleButtonClick/handleButtonClick";

const handleQuoteClick = () => {
    handleButtonClick("quotes", "quotes-button", "./media/backgrounds/paper-mask-standing.png", startQuoteGame, writingAudio);
};

export default handleQuoteClick;