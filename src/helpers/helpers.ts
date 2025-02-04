import { article, aside } from "../constants/constants";

export const playSound = (soundOn: boolean, audioElement: HTMLAudioElement) => {
    if (soundOn) {
        audioElement.currentTime = 0;
        audioElement.play();
    }
};

export const clearAndAddClickedClass = (buttonElement?: HTMLButtonElement) => {
    const buttonElements = document.querySelectorAll(".button-icons");
    buttonElements.forEach(button => {
        button.classList.remove("clicked");
    });
    if(buttonElement) {
        buttonElement.classList.add("clicked");
    }
}

export const clearAsideAndAddBackground = (backgroundURL?: string) => {
    aside.textContent = "";
    if(backgroundURL)
    {
        if (aside.style.backgroundImage !== `url("${backgroundURL}")`) {
            aside.style.backgroundImage = `url("${backgroundURL}")`;
        }    }
}

export const clearArticle = () => {
    article.textContent ="";
}

export const renderLoadingIndicator = (element: HTMLElement) => {
    const loadingIndicator = document.createElement("div");
    loadingIndicator.className = "hourglass";
    element.appendChild(loadingIndicator);
}

export const removeLoadingIndicator = (element: HTMLElement) => {
    const loadingIndicator = document.querySelector(".hourglass") as HTMLDivElement;
    element.removeChild(loadingIndicator);
}

export const clearPreviousOutput = () => {
    const searchContainer = document.getElementById("search-container") as HTMLElement;
    
    const previousSearchElement = document.getElementById('search-output');
    const previousCharacterList = document.getElementById('character-list');
    
    if (previousSearchElement) searchContainer.removeChild(previousSearchElement);
    if (previousCharacterList) searchContainer.removeChild(previousCharacterList);
    
    const previousFavouriteElement = document.getElementById("favourite-output");
    const previousFavouriteList = document.getElementById("favourite-list");
    
    if (previousFavouriteElement) searchContainer.removeChild(previousFavouriteElement);
    if (previousFavouriteList) searchContainer.removeChild(previousFavouriteList);
}

export const getIdFromURL = (url: string) => {
    return url.split("/").filter(Boolean).pop();
};