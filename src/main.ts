
import handleHouseClick from './components/houses/handleHouseClick';
import handleQuoteClick from './components/quoteGame/handleQuoteClick';
import handleSearchClick from './components/buttons/searchButton/handleSearchClick';
import { handleSoundClick } from './components/buttons/soundButton/soundButton';
import { startQuoteGame } from './components/quoteGame/startQuoteGame';
import { article } from './constants/constants';
import { clearArticle, clearAsideAndAddBackground, clearPreviousOutput } from './helpers/helpers';
import './style.scss';
import handleCreditsClick from './components/credits/handleCreditsClick';

handleSearchClick();

handleQuoteClick();

handleCreditsClick();

handleHouseClick();

handleSoundClick();


const handleHeaderClick = () => {
    const header = document.querySelector("h1") as HTMLElement;
    header.addEventListener("click", async () => {
        
        clearPreviousOutput();
        clearAsideAndAddBackground();
        clearArticle();

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

handleHeaderClick();

const handleTextQuoteClick = () => {
    const quoteSpan = document.getElementById("quote-span") as HTMLElement;
    quoteSpan.addEventListener("click", async () => {
        
        clearPreviousOutput();
        clearAsideAndAddBackground();
        clearArticle();

        startQuoteGame();
    })
}

handleTextQuoteClick();