import { randomQuote } from './api/quoteAPI';
import './style.scss';

import Quote from './types/quoteAPI';

// TODO testa lägga in karaktärer med DOM

// TODO (Läsa igenom Niklas repo)

// TODO Gör så att sökfält uppdaterar med karaktärer

// TODO Bara namn i mitten och klicka på namnet för att se info om karaktären

// TODO Fixa CSS

// TODO Fixa responsivitet

// TODO svh lvh och dvh?

// TODO lägg in husen med bild och koppla till API

// TODO lägg till overflow?

// TODO Lägg upp quotes när kartan visas, med knapp för nytt random quote

// TODO Gör knapp för att kunna stänga av ljud (sound = true, när knapp trycks = false?)

// TODO Gör om Eddard "Ned" Stark till bara Eddard Stark

// TODO När man trycker på quote visas "Guess the quote!" och Begin. Visa upp ett quote och fyra alternativ på vem som sa det. Fortsätt tills man svarar fel, spara poäng. Varje quote kan bara komma en gång. Alternativ på karaktär väljs från quote-API.

// TODO När man trycker på hus visas "Guess the house" och Begin. Visa upp en karaktär och fyra alternativ på hus. Fortsätt tills man svarar fel, spara poäng. Varje karaktär kan bara komma en gång. Alternativ på karaktär väljs från ASOIAF-API.

// TODO Conditional rendering från renderCharList div.innerHTML = `<h2>Search result${
// 				charList.search ? ` for "${charList.search}"` : ""
// 			}:</h2>`;

// TODO handleSearchClick från CharacterSearchForm.ts
// const handleSearchClick = async () => {
//     if (inputField.value) {
//         characterList.showLoader();

//         const searchWord = inputField.value;
//         inputField.value = "";
//         inputField.focus();

//         const data = await searchDisneyCharacterByName(searchWord);
//         console.log(data);

//         characterList.search = searchWord;
//         characterList.characters = data;
//         characterList.render();
//     }
// };

const bellAudio = new Audio('./media/audio/church-bell.mp3')
const flipPageAudio = new Audio('./media/audio/page-flip.mp3');
const writingAudio = new Audio('./media/audio/pencil2.mp3')
const drawingSwordAudio = new Audio('./media/audio/draw-sword.mp3')


document.addEventListener("DOMContentLoaded", () => {
    const searchElement = document.getElementById("search");
    const article = document.querySelector("article");

    if (searchElement && article) {
        searchElement.addEventListener("click", async () => {
            try {
                bellAudio.currentTime = 0;
                bellAudio.play();

                article.style.backgroundImage = "url('./media/backgrounds/paper-mask-standing2.png')";
                article.innerHTML = "";
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


document.addEventListener("DOMContentLoaded", () => {
    const houseElement = document.getElementById("houses");
    const article = document.querySelector("article");
    
    if (houseElement && article) {
        houseElement.addEventListener("click", async () => {
            try {
                drawingSwordAudio.currentTime = 0;
                drawingSwordAudio.play();

                article.innerHTML = "";
                article.style.backgroundImage = "url('./media/backgrounds/paper-mask-standing2.png')";
            } catch (error) {
                console.error("Fel vid hämtning av karta:", error);
            }
        });
    } else {
        console.error("Element med ID 'map' eller 'article' hittades inte.");
    }
});
