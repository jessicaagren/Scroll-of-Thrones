import { handleHouseClick } from './components/buttons/houseGameButton/houseGameButton';
import { handleMapClick } from './components/buttons/mapButton/mapButton';
import { handleQuoteClick } from './components/buttons/quoteGameButton/quoteGameButton';
import { handleSearchClick } from './components/buttons/searchButton/searchButton';
import { handleSoundClick } from './components/buttons/soundButton/soundButton';
import './style.scss';

// TODO Fixa responsivitet

// TODO När man trycker på hus visas "Guess the house" och Begin. Visa upp en karaktär och fyra alternativ på hus. Fortsätt tills man svarar fel, spara poäng. Varje karaktär kan bara komma en gång. Alternativ på karaktär väljs från ASOIAF-API.

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

