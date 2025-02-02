
// import handleHouseClick from './components/buttons/houseGameButton/houseGameButton';
import handleHouseClick from './components/buttons/houseButton/houseButton';
import handleMapClick from './components/buttons/mapButton/mapButton';
import handleQuoteClick from './components/buttons/quoteGameButton/quoteGameButton';
import handleSearchClick from './components/buttons/searchButton/searchButton';
import { handleSoundClick } from './components/buttons/soundButton/soundButton';
import './style.scss';

// TODO Fixa responsivitet (ändra root med mixin?)

// TODO Rensa mer bland style, se över funktioner för DRY

// TODO Kolla error-meddelanden

// TODO Läs uppgift och kolla state??

// TODO (Om tid finns) gör favoritfunktion

// TODO GÖr "Map" till info med kontaktuppgifter och API-sources - kolla stylen!

// TODO Lägg in introtext när man öppnar!

// TODO Styla search

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
