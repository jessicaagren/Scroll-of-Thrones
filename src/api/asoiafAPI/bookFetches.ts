import { asoiafRooturl } from "../../constants/constants";
import BookType from "../../types/bookType";

export const getBookByID = async (id: string): Promise<BookType | null> => {
    try {
        const response = await fetch(`${asoiafRooturl}books/${id}`);
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