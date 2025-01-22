import './style.scss';

import Quote from './types/quoteAPI';

const main = document.querySelector("main") as HTMLElement;

const mapIcon = document.getElementById("map-icon") as HTMLImageElement;
const scrollIcon = document.getElementById("scroll-icon") as HTMLImageElement;

mapIcon.addEventListener("click", addMap);
scrollIcon.addEventListener("click", addScroll);

// TODO lägg till DOM för karta + scroll
