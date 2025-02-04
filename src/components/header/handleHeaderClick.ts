import { article } from "../../constants/constants";
import { clearAndAddClickedClass, clearArticle, clearAsideAndAddBackground, clearPreviousOutput } from "../../helpers/helpers";
import { handleTextQuoteClick } from "./handleTextQuoteClick";

export const handleHeaderClick = () => {
    const header = document.querySelector("h1") as HTMLElement;
    header.addEventListener("click", async () => {
        
        clearPreviousOutput();
        clearAsideAndAddBackground('./media/backgrounds/paper-mask-standing.png');
        clearArticle();
        clearAndAddClickedClass();

        article.innerHTML = `<section class="containers" id="intro">
        <h2>Welcome to Scroll of Thrones!</h2>
                <p class="intro">
                Discover the world of <span>A Song of Ice and Fire</span> by
                searching for your favourite characters and reading about the houses
                of Westeros and beyond, or challenge yourself with a game of
                <span id="quote-span">Guess the quote</span>.
                </p>
                <p><span class="quote">Valar morghulis.</span></p>
                </section>`;

        handleTextQuoteClick();
    })

}
