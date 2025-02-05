# Scroll-of-Thrones

This is a project that fetches different API URL:s on _A Song of Ice and Fire_ and _Game of Thrones_ and gives the user the opportunity to search for characters and play a mini game where you guess quotes.

## Features

- Search for characters and read information about them.
- Look up houses and read information about them.
- Play _Guess the Quote_ where you guess who said a specific quote.

## Download and run project

To download the project, run `git clone` + `url` in the terminal.

Go to the project root folder and run `npm i` to install necessary packages.

Then run `npm run dev` to compile and run the project.

## API's

The project uses [An API of Ice and Fire](https://anapioficeandfire.com/) and [Game of Thrones Quote API](https://gameofthronesquotes.xyz/).

### URL fetches

#### Characters by id

https://www.anapioficeandfire.com/api/characters/${id}

#### All characters with pagination

https://www.anapioficeandfire.com/api/characters/?page=${page}&pageSize=${pageSize}

#### Houses by id

https://www.anapioficeandfire.com/api/houses/${id}

#### All houses with pagination

https://www.anapioficeandfire.com/api/houses?page=${page}&pageSize=${pageSize}

#### Books by id

https://www.anapioficeandfire.com/api/books/${id}

#### Random quote

https://api.gameofthronesquotes.xyz/v1/random

## Folder and file structure

```
Scroll-of-Thrones                                                  //
├─ .gitignore                                                      //
├─ index.html                                                      //
├─ LICENSE                                                         //
├─ package-lock.json                                               //
├─ package.json                                                    //
├─ public                                                          //
│  ├─ fonts                                                        //
│  └─ media                                                        //
│     ├─ assets                                                    //
│     ├─ audio                                                     //
│     ├─ backgrounds                                               //
│     ├─ houses                                                    //
│     └─ icons                                                     //
├─ README.md                                                       //
├─ src                                                             //
│  ├─ api                                                          //
│  │  ├─ asoiafAPI                                                 //
│  │  │  ├─ bookFetches.ts                                         //
│  │  │  ├─ characterFetches.ts                                    //
│  │  │  └─ houseFetches.ts                                        //
│  │  └─ quoteAPI                                                  //
│  │     └─ quoteAPI.ts                                            //
│  ├─ components                                                   //
│  │  ├─ buttons                                                   //
│  │  │  ├─ favouriteButton                                        //
│  │  │  │  ├─ createFavouriteIcon.ts                              //
│  │  │  │  ├─ handleFavouriteButton.ts                            //
│  │  │  │  ├─ handleFavouriteIconClick.ts                         //
│  │  │  │  └─ renderFavouriteCharacters.ts                        //
│  │  │  ├─ handleButtonClick                                      //
│  │  │  │  └─ handleButtonClick.ts                                //
│  │  │  └─ handleSoundClick                                       //
│  │  │     └─ handleSoundClick.ts                                 //
│  │  ├─ credits                                                   //
│  │  │  ├─ handleCreditsClick.ts                                  //
│  │  │  └─ setupCredits.ts                                        //
│  │  ├─ discarded                                                 //
│  │  │  └─ houseGame                                              //
│  │  │     └─ houseGame.ts                                        //
│  │  ├─ header                                                    //
│  │  │  ├─ handleHeaderClick.ts                                   //
│  │  │  └─ handleTextQuoteClick.ts                                //
│  │  ├─ houses                                                    //
│  │  │  ├─ handleHouseClick.ts                                    //
│  │  │  ├─ renderHouseInfo.ts                                     //
│  │  │  ├─ renderHouseList.ts                                     //
│  │  │  └─ setupHouseContainer.ts                                 //
│  │  ├─ quoteGame                                                 //
│  │  │  ├─ getRandomNames.ts                                      //
│  │  │  ├─ getUniqueRandomQuote.ts                                //
│  │  │  ├─ handleQuoteClick.ts                                    //
│  │  │  ├─ renderQuoteGame.ts                                     //
│  │  │  └─ startQuoteGame.ts                                      //
│  │  └─ search                                                    //
│  │     ├─ handleRandomButton.ts                                  //
│  │     ├─ handleSearch.ts                                        //
│  │     ├─ handleSearchClick.ts                                   //
│  │     ├─ renderCharacterInfo.ts                                 //
│  │     ├─ renderSearchResults.ts                                 //
│  │     └─ setupSearchContainer.ts                                //
│  ├─ constants                                                    //
│  │  └─ constants.ts                                              //
│  ├─ helpers                                                      //
│  │  └─ helpers.ts                                                //
│  ├─ main.ts                                                      //
│  ├─ state                                                        //
│  │  └─ state.ts                                                  //
│  ├─ style.scss                                                   //
│  ├─ styles                                                       //
│  │  ├─ components                                                //
│  │  │  ├─ buttons                                                //
│  │  │  │  ├─ favouriteButton.scss                                //
│  │  │  │  ├─ navButtons.scss                                     //
│  │  │  │  └─ soundButton.scss                                    //
│  │  │  ├─ quoteGame                                              //
│  │  │  │  └─ quoteGame.scss                                      //
│  │  │  └─ searchAndHousesContainers                              //
│  │  │     ├─ houseSigil.scss                                     //
│  │  │     ├─ loadingIndicator.scss                               //
│  │  │     └─ searchAndHousesContainers.scss                      //
│  │  ├─ layout                                                    //
│  │  │  ├─ layout.scss                                            //
│  │  │  └─ nav.scss                                               //
│  │  ├─ mixins                                                    //
│  │  │  └─ mixins.scss                                            //
│  │  ├─ reset                                                     //
│  │  │  └─ reset.scss                                             //
│  │  ├─ typography                                                //
│  │  │  ├─ font-styling.scss                                      //
│  │  │  └─ fonts.scss                                             //
│  │  └─ variables                                                 //
│  │     └─ var.scss                                               //
│  ├─ types                                                        //
│  │  ├─ asoiafCharacterType.ts                                    //
│  │  ├─ bookType.ts                                               //
│  │  ├─ houseType.ts                                              //
│  │  └─ quoteType.ts                                              //
│  └─ vite-env.d.ts                                                //
└─ tsconfig.json                                                   //

```

## Technologies

The project is built using Typescript, Sass, and HTML with the help of Vite.

## Linkedin

[My Linkedin profile](https://www.linkedin.com/in/jessicaagren/)
