import { randomQuote } from './api/quoteAPI';
import './style.scss';

import Quote from './types/quoteAPI';

// TODO lägg till DOM för karta + scroll

// TODO testa lägga in karaktärer med DOM

// TODO Läsa igenom Niklas repo!!!!!

// TODO Lägg in sökfält någonstans i designen

// TODO Lägg till dropshadow på bok och papper

// TODO svh lvh och dvh

// TODO lägg in husen med bild och koppla till API

// TODO Sortera media

// TODO lägg till overflow

const flipPageAudio = new Audio('./media/audio/page-flip-47177.mp3');
const writingAudio = new Audio('./media/audio/pencil.mp3')

document.addEventListener("DOMContentLoaded", () => {
    const searchElement = document.getElementById("search");
    const article = document.querySelector("article");

    if (searchElement && article) {
        searchElement.addEventListener("click", async () => {
            try {
                article.style.backgroundImage = "url('./media/backgrounds/paper-mask-standing2.png')";
                const input = document.createElement("input");
                input.type = "text";
                article.appendChild(input);
            } catch (error) {
                console.error("Fel vid hämtning av sökfält:", error);
            }
        });
    } else {
        console.error("Element med ID 'search' eller 'article' hittades inte.");
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const quotesElement = document.getElementById("quotes");
    const article = document.querySelector("article");

    if (quotesElement && article) {
        quotesElement.addEventListener("click", async () => {
            try {
                writingAudio.currentTime = 0;
                writingAudio.play();

                article.style.backgroundImage = "url('./media/backgrounds/paper-mask-standing2.png')";
                article.innerHTML = "";
                const quoteHTML = await randomQuote();
                article.innerHTML = quoteHTML;
            } catch (error) {
                console.error("Fel vid hämtning av citat:", error);
            }
        });
    } else {
        console.error("Element med ID 'quotes' eller 'article' hittades inte.");
    }
});


document.addEventListener("DOMContentLoaded", () => {
    const mapElement = document.getElementById("map");
    const article = document.querySelector("article");
    
    if (mapElement && article) {
        mapElement.addEventListener("click", async () => {
            try {
                flipPageAudio.currentTime = 0;
                flipPageAudio.play();

                article.innerHTML = "";
                article.style.backgroundImage = "url('./media//backgrounds/distressed-map.png')";
            } catch (error) {
                console.error("Fel vid hämtning av karta:", error);
            }
        });
    } else {
        console.error("Element med ID 'map' eller 'article' hittades inte.");
    }
});
