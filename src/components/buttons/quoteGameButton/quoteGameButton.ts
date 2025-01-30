import { writingAudio } from "../../../constants/constants";
import { startQuoteGame } from "../../quoteGame/quoteGame";
import handleButtonClick from "../buttonFunction";

export const handleQuoteClick = () => {
    handleButtonClick("quotes", "quotes-button", "./media/backgrounds/paper-mask-standing2.png", startQuoteGame, writingAudio);
};
