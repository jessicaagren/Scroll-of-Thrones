import { asoiafRooturl } from "../../constants/constants";
import HouseType from "../../types/houseType";

export const getHouseByID = async (id: string): Promise<HouseType | null> => {
    try {
        const response = await fetch(`${asoiafRooturl}houses/${id}`);
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

export const getHouses = async (): Promise<HouseType[]> => {
    let allHouses: HouseType[] = [];
    let page = 1;
    const pageSize = 50;

    try {
        while (true) {
            const response = await fetch(`${asoiafRooturl}houses?page=${page}&pageSize=${pageSize}`);
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