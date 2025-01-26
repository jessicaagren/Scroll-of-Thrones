import AsoiafCharacter from "../types/asoiafAPI";

const rooturl = "https://www.anapioficeandfire.com/api/";

// https://www.anapioficeandfire.com/api/characters?name=NAMN

export const getCharacterByExactName = async (name: string): Promise<AsoiafCharacter | null> => {
  try {
    const response = await fetch(`${rooturl}characters?name=${name}`);
    const data = await response.json();

    if (data.length === 0) {
      console.log("Ingen karaktär hittades.");
      return null;
    }

    return data[0] as AsoiafCharacter;

    } catch (error) {
        console.error("Fel vid hämtning av karaktärsdetaljer:", error);
        return null;
    }
  }

// const createCharacterCard = (character: DisneyCharacter) => {
// 	const div = document.createElement("div");
// 	div.classList.add("CharacterCard");

// 	div.innerHTML = `
//         <p>${character.name}</p>
//         <img src="${character.imageUrl}">
//     `;
// 	return div;
// };

// export default createCharacterCard;

// Funktion för att söka efter karaktärsnamn i ASOIAF API
const searchCharacterByName = async (name: string): Promise<any[]> => {
    const response = await fetch(`${rooturl}characters`); // Hämta alla karaktärer från API

    if (!response.ok) {
        throw new Error("Något gick fel vid hämtning av karaktärer."); // Kontrollera om svaret är OK
    }

    const characters = await response.json(); // Konvertera svaret till JSON

    // Filtrera karaktärer baserat på namn
    const filteredCharacters = characters.filter((character: { name: string }) => 
        character.name.toLowerCase().includes(name.toLowerCase()) // Filtrera med case-insensitive
    );

    return filteredCharacters; // Returnera de filtrerade karaktärerna
};

// Exempelanvändning
searchCharacterByName("Eddard").then(filteredCharacters => {
    console.log(filteredCharacters); // Logga de filtrerade karaktärerna
}).catch(error => {
    console.error(error); // Hantera eventuella fel
});

