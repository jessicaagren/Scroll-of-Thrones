import './style.scss';

import Quote from './types/quoteAPI';

const main = document.querySelector("main") as HTMLElement;

const mapIcon = document.getElementById("map-icon") as HTMLImageElement;
const scrollIcon = document.getElementById("scroll-icon") as HTMLImageElement;

mapIcon.addEventListener("click", addMap);
scrollIcon.addEventListener("click", addScroll);

// TODO lägg till DOM för karta + scroll

// TODO testa lägga in karaktärer med DOM

// TODO Läsa igenom Niklas repo!!!!!

// TODO Lägg in sökfält någonstans i designen

// TODO Lägg till dropshadow på bok och papper

// TODO svh lvh och dvh

// TODO lägg in husen med bild och koppla till API

// TODO Sortera media

// TODO lägg till overflow