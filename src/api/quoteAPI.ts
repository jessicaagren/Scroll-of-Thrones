import Quote from "../types/quoteAPI";

const rooturl = "https://api.gameofthronesquotes.xyz/v1/random";

export const getRandomQuote = async (): Promise<Quote> => {
    const response = await fetch(rooturl);
    if (!response.ok) {
        throw new Error('Något gick fel vid hämtning av citat');
    }
    const data = await response.json() as Quote;
    return data;
}

export let randomQuoteName = "";

export const randomQuote = async (): Promise<string> => {
    const quote = await getRandomQuote();
    randomQuoteName = quote.character.name;
    return `<section><p>${quote.sentence} - ${quote.character.name}</p></section>`;
}

