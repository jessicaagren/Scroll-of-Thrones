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
