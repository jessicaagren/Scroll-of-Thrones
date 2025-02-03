import Quote from "../types/quoteType";

const rooturl = "https://api.gameofthronesquotes.xyz/v1/random";

export const getRandomQuote = async (): Promise<Quote> => {
    const response = await fetch(rooturl);
    if (!response.ok) {
        throw new Error('Något gick fel vid hämtning av citat');
    }
    const quote = (await response.json()) as Quote;

    if (quote.character.name === 'Eddard "Ned" Stark') {
        quote.character.name = 'Eddard Stark';
    }

    return quote;
};
