import { getRandomQuote } from "../../api/quoteAPI/quoteAPI";
import { usedNames } from "../../state/state";

export const getRandomNames = async (correctName: string): Promise<string[]> => {
    const randomNames: string[] = [];

    while (randomNames.length < 3) {
        const randomQuote = await getRandomQuote();

        if (!usedNames.has(randomQuote.character.name) && randomQuote.character.name !== correctName) {
            randomNames.push(randomQuote.character.name);
            usedNames.add(randomQuote.character.name);
        }
    }

    randomNames.push(correctName);
    return randomNames.sort(() => Math.random() - 0.5);
};