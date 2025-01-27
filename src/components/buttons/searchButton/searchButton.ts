import { article, bellAudio } from "../../../constants/constants";
import { clearArticle, clearAside, clearClickedClass, playSound } from "../../../helpers/helpers";
import { soundOn } from "../soundButton/soundButton";

export const handleSearchClick = () => {
    const searchElement = document.getElementById("search") as HTMLElement;
    const searchButton = document.getElementById("search-button") as HTMLButtonElement;

    if (searchElement && article) {
        searchElement.addEventListener("click", async () => {
            try {
                if (bellAudio as HTMLAudioElement) {
                    playSound(soundOn, bellAudio);
                }

                clearClickedClass(searchButton);

                clearArticle("url('./media/backgrounds/paper-mask-standing2.png')");
                clearAside();

                const input = document.createElement("input");
                input.type = "text";
                input.placeholder = ". . .";
                article.appendChild(input);
            } catch (error) {
                console.error("Fel vid hämtning av sökfält:", error);
            }
        });
    } else {
        console.error("Element med ID 'search' eller 'article' hittades inte.");
    };
}
