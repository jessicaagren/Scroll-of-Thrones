import { startQuoteGame } from './quoteGame/quoteGame';
import './style.scss';

// TODO testa lägga in karaktärer med DOM

// TODO (Läsa igenom Niklas repo)

// TODO Gör så att sökfält uppdaterar med karaktärer

// TODO Bara namn i mitten och klicka på namnet för att se info om karaktären till vänster

// TODO Fixa responsivitet

// TODO Göra alla knappar till en funktion?

// TODO svh lvh och dvh?

// TODO lägg in husen med bild och koppla till API

// TODO lägg till overflow?

// TODO Lägg upp quotes när kartan visas, med knapp för nytt random quote

// TODO Animera placeholder i input?

// TODO Gör article + aside till funktion för DRY?

// TODO Fixa input så det ser ut som att den "står på pappret", t.ex. med blend mode för bakgrund och samma typsnitt som texten (kanske bara en underline utan border?)

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

const article = document.querySelector("article") as HTMLElement;
const aside = document.querySelector("aside") as HTMLElement;
const bellAudio = new Audio('./media/audio/church-bell.mp3')
const flipPageAudio = new Audio('./media/audio/page-flip.mp3');
const writingAudio = new Audio('./media/audio/pencil2.mp3')
const drawingSwordAudio = new Audio('./media/audio/draw-sword.mp3')
export let soundOn: boolean = true;

export const playSound = (soundOn: boolean, audioElement: HTMLAudioElement) => {
    if (soundOn) {
        audioElement.currentTime = 0;
        audioElement.play();
    }
};

const clearClickedClass = (iconElement: HTMLElement) => {
    const iconsElements = document.querySelectorAll(".icons");
    iconsElements.forEach(icon => {
        icon.classList.remove("clicked");
    });
    iconElement.classList.add("clicked");
}

const clearArticle = (backgroundURL: string) => {
    article.textContent = "";
    article.style.backgroundImage = backgroundURL;
}

const clearAside = () => {
    aside.textContent ="";
}

const handleSearchClick = () => {
    const searchElement = document.getElementById("search") as HTMLElement;
    const searchIcon = document.getElementById("search-icon") as HTMLElement;

    if (searchElement && article) {
        searchElement.addEventListener("click", async () => {
            try {
                if (bellAudio as HTMLAudioElement) {
                    playSound(soundOn, drawingSwordAudio);
                }

                clearClickedClass(searchIcon);

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

handleSearchClick();

const handleQuoteClick = () => {
    const quotesElement = document.getElementById("quotes");
    const quotesIcon = document.getElementById("quotes-icon") as HTMLElement;
    
    if (quotesElement && article) {
        quotesElement.addEventListener("click", async () => {
            try {
                if (writingAudio as HTMLAudioElement) {
                    playSound(soundOn, writingAudio);
                }
    
                clearClickedClass(quotesIcon);
    
                clearArticle("url('./media/backgrounds/paper-mask-standing2.png')");
                clearAside();
    
                startQuoteGame();
    
            } catch (error) {
                console.error("Fel vid hämtning av citat:", error);
            }
        });
    } else {
        console.error("Element med ID 'quotes' eller 'article' hittades inte.");
    }
}

handleQuoteClick();

const handleMapClick = () => {
    const mapElement = document.getElementById("map");
    const mapIcon = document.getElementById("map-icon") as HTMLElement;
    
    if (mapElement && article) {
        mapElement.addEventListener("click", async () => {
            try {
                if (flipPageAudio as HTMLAudioElement) {
                    playSound(soundOn, flipPageAudio);
                }
    
                clearClickedClass(mapIcon);
    
                clearArticle("url('./media/backgrounds/distressed-map.png')");
                clearAside();
    
            } catch (error) {
                console.error("Fel vid hämtning av karta:", error);
            }
        });
    } else {
        console.error("Element med ID 'map' eller 'article' hittades inte.");
    }
}

handleMapClick();

const handleHouseClick = () => {
    const housesElement = document.getElementById("houses");
    const housesIcon = document.getElementById("houses-icon") as HTMLElement;
    
    if (housesElement && article) {
        housesElement.addEventListener("click", async () => {
            try {
                if (drawingSwordAudio as HTMLAudioElement) {
                    playSound(soundOn, drawingSwordAudio);
                }
    
                clearClickedClass(housesIcon);
    
                clearArticle("url('./media/backgrounds/paper-mask-standing2.png')");
                clearAside();
    
            } catch (error) {
                console.error("Fel vid hämtning av hus:", error);
            }
        });
    } else {
        console.error("Element med ID 'houses' eller 'article' hittades inte.");
    }
}

handleHouseClick();


const handleSoundClick = () => {
    const soundElement = document.getElementById("sound-button");
    
    if (soundElement) {
        soundElement.addEventListener("click", () => {
            try {
                if (soundElement.style.filter === 'grayscale(1)') {
                    soundElement.style.filter = 'none';
                    soundOn = true;
                    console.log(soundOn);
                } else {
                    soundElement.style.filter = 'grayscale(1)';
                    soundOn = false;
                    console.log(soundOn);
                }
            } catch (error) {
                console.error("Fel vid klickhantering:", error);
            }
        });
    } else {
        console.error("Element med ID 'sound' hittades inte.");
    }
}

handleSoundClick();