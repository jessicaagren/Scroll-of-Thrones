import { asoiafRooturl } from "../../constants/constants";
import AsoiafCharacterType from "../../types/asoiafCharacterType";

// export const getCharacterByExactName = async (name: string): Promise<AsoiafCharacter | null> => {
//     try {
//         const response = await fetch(`${rooturl}characters?name=${name}`);
//         const data = await response.json();

//     if (data.length === 0) {
//         console.log("Ingen karaktär hittades.");
//         return null;
//     }

//     return data[0] as AsoiafCharacter;

//     } catch (error) {
//         console.error("Fel vid hämtning av karaktärsdetaljer:", error);
//         return null;
//     }
// }

export const getCharacterByID = async (id: string | number): Promise<AsoiafCharacterType | null> => {
    try {
        const response = await fetch(`${asoiafRooturl}characters/${id}`);
        if (!response.ok) {
            console.error(`Fel vid hämtning av karaktär.`);
            return null;
        }

        const data = await response.json();

        if (!data || Object.keys(data).length === 0) {
            console.log("Ingen karaktär hittades.");
            return null;
        }

        return data as AsoiafCharacterType;

    } catch (error) {
        console.error("Fel vid hämtning av karaktär via ID:", error);
        return null;
    }
};

export const getRandomCharacter = async (): Promise<AsoiafCharacterType> => {
    try {
        while (true) {
            const randomID = Math.floor(Math.random() * 2134) + 1;
            const character = await getCharacterByID(randomID);

            if (character && character.name?.trim() && character.allegiances.length > 0) {
                return character as AsoiafCharacterType;
            }
        }
    } catch (error) {
        console.error("Fel vid hämtning av random karaktär:", error);
        throw new Error("Kunde inte hämta en giltig random karaktär");
    }
};

export const searchCharacters = async (query: string): Promise<AsoiafCharacterType[]> => {
    const pageSize = 50;
    const totalPages = 50;

    try {
        const requests = Array.from({ length: totalPages }, async (_, i) => {
            const page = i + 1;
            const response = await fetch(`${asoiafRooturl}/characters/?page=${page}&pageSize=${pageSize}`);
            const data = (await response.json()) as AsoiafCharacterType[];
            return data;
        });

        const results = await Promise.all(requests);
        const characters = results.flat();

        const filteredCharacters = characters.filter((character) => {
            const fullName = character.name.trim();
            
            return (
                fullName &&
                (fullName.toLowerCase().includes(query.toLowerCase())
                )
            );
        });

        return filteredCharacters;
    } catch (error) {
        console.error("Fel vid sökning:", error);
        return [];
    }
};
