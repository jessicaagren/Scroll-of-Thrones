import { article, aside } from "../constants/constants";

export const playSound = (soundOn: boolean, audioElement: HTMLAudioElement) => {
    if (soundOn) {
        audioElement.currentTime = 0;
        audioElement.play();
    }
};

export const clearClickedClass = (buttonElement: HTMLButtonElement) => {
    const buttonElements = document.querySelectorAll(".button-icons");
    buttonElements.forEach(button => {
        button.classList.remove("clicked");
    });
    buttonElement.classList.add("clicked");
}

export const clearArticle = (backgroundURL: string) => {
    article.textContent = "";
    article.style.backgroundImage = backgroundURL;
}

export const clearAside = () => {
    aside.textContent ="";
}