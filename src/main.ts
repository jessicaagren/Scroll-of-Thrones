import { handleHouseClick } from './components/buttons/houseGameButton/houseGameButton';
import { handleMapClick } from './components/buttons/mapButton/mapButton';
import { handleQuoteClick } from './components/buttons/quoteGameButton/quoteGameButton';
import { handleSearchClick } from './components/buttons/searchButton/searchButton';
import { handleSoundClick } from './components/buttons/soundButton/soundButton';
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

handleSearchClick();

handleQuoteClick();

handleMapClick();

handleHouseClick();

handleSoundClick();