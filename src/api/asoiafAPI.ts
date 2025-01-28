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

export const getCharacterByID = async (id: number): Promise<AsoiafCharacter | null> => {
    try {
        const response = await fetch(`${rooturl}characters/${id}`);
        const data = await response.json();

        if (data.length === 0) {
            console.log("Ingen karaktär hittades.");
            return null;
        }

        return data as AsoiafCharacter;

    } catch (error) {
        console.error("Fel vid hämtning av karaktär via ID:", error);
        return null;
    }
    
}

export const getRandomCharacterByID = async (): Promise<AsoiafCharacter> => {
    const randomID = (Math.floor(Math.random() * 2134) + 1);

    try {
        const character = await getCharacterByID(randomID);
        return character as AsoiafCharacter;

    } catch (error) {
        console.error(`Fel vid hämtning av karaktär med id ${randomID}:`, error);
        throw new Error("Kunde inte hämta random karaktär");
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

export const searchCharactersParallel = async (query: string): Promise<AsoiafCharacter[]> => {
    const pageSize = 50;
    const totalPages = 50;
  
    try {
      const requests = Array.from({ length: totalPages }, async (_, i) => {
        const page = i + 1;
        const response = await fetch(`${rooturl}/characters/?page=${page}&pageSize=${pageSize}`);
        const data = await response.json();
        return data;
      });
  
      const results = await Promise.all(requests);
  
      const characters = results.flat();
  
      const filteredCharacters = characters.filter((character) => {
        const fullName = character.name || "";
        return (
          fullName.toLowerCase().includes(query.toLowerCase()) ||
          fullName.toLowerCase().endsWith(query.toLowerCase())
        );
      });
  
      return filteredCharacters;
    } catch (error) {
        console.error("Fel vid sökning:", error);
  
      return [];
    }
  };