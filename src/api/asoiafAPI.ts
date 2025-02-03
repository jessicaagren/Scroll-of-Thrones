import AsoiafCharacterType from "../types/asoiafCharacterType";
import AsoiafCharacter from "../types/asoiafCharacterType";
import BookType from "../types/bookType";
import HouseType from "../types/houseType";

const rooturl = "https://www.anapioficeandfire.com/api/";

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

export const getCharacterByID = async (id: string | number): Promise<AsoiafCharacter | null> => {
    try {
        const response = await fetch(`${rooturl}characters/${id}`);
        if (!response.ok) {
            console.error(`Fel vid hämtning av karaktär.`);
            return null;
        }

        const data = await response.json();

        if (!data || Object.keys(data).length === 0) {
            console.log("Ingen karaktär hittades.");
            return null;
        }

        return data as AsoiafCharacter;

    } catch (error) {
        console.error("Fel vid hämtning av karaktär via ID:", error);
        return null;
    }
};

export const getRandomCharacter = async (): Promise<AsoiafCharacter> => {
    try {
        while (true) {
            const randomID = Math.floor(Math.random() * 2134) + 1;
            const character = await getCharacterByID(randomID);

            if (character && character.name?.trim() && character.allegiances.length > 0) {
                return character as AsoiafCharacter;
            }
        }
    } catch (error) {
        console.error("Fel vid hämtning av random karaktär:", error);
        throw new Error("Kunde inte hämta en giltig random karaktär");
    }
};

export const getHouses = async (): Promise<HouseType[]> => {
    let allHouses: HouseType[] = [];
    let page = 1;
    const pageSize = 50;

    try {
        while (true) {
            const response = await fetch(`${rooturl}houses?page=${page}&pageSize=${pageSize}`);
            if (!response.ok) {
                console.error(`Fel vid hämtning av hus.`);
                break;
            }

            const data = await response.json();
            if (!data.length) break;

            allHouses = [...allHouses, ...data];
            page++;
        }

        return allHouses;
    } catch (error) {
        console.error("Fel vid hämtning av hus:", error);
        return [];
    }
};

export const getHouseByID = async (id: string): Promise<HouseType | null> => {
    try {
        const response = await fetch(`${rooturl}houses/${id}`);
        if (!response.ok) {
            console.error(`Fel vid hämtning av hus.`);
            return null;
        }

        const data = await response.json();

        if (!data || Object.keys(data).length === 0) {
            console.log("Inget hus hittades.");
            return null;
        }

        return data as HouseType;

    } catch (error) {
        console.error("Fel vid hämtning av hus via ID:", error);
        return null;
    }
};

export const getBookByID = async (id: string): Promise<BookType | null> => {
    try {
        const response = await fetch(`${rooturl}books/${id}`);
        if (!response.ok) {
            console.error(`Fel vid hämtning av bok.`);
            return null;
        }

        const data = await response.json();

        if (!data || Object.keys(data).length === 0) {
            console.log("Ingen bok hittades.");
            return null;
        }

        return data as BookType;

    } catch (error) {
        console.error("Fel vid hämtning av bok via ID:", error);
        return null;
    }
};


export const searchCharacters = async (query: string): Promise<AsoiafCharacterType[]> => {
    const pageSize = 50;
    const totalPages = 50;

    try {
        const requests = Array.from({ length: totalPages }, async (_, i) => {
            const page = i + 1;
            const response = await fetch(`${rooturl}/characters/?page=${page}&pageSize=${pageSize}`);
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
