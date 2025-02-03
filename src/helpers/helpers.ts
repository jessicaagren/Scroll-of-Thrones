import { article, aside } from "../constants/constants";

export const playSound = (soundOn: boolean, audioElement: HTMLAudioElement) => {
    if (soundOn) {
        audioElement.currentTime = 0;
        audioElement.play();
    }
};

export const clearAndAddClickedClass = (buttonElement: HTMLButtonElement) => {
    const buttonElements = document.querySelectorAll(".button-icons");
    buttonElements.forEach(button => {
        button.classList.remove("clicked");
    });
    buttonElement.classList.add("clicked");
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

export const getIdFromURL = (url: string) => {
    return url.split("/").filter(Boolean).pop();
};