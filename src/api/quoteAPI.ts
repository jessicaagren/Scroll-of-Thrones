import Quote from "../types/quoteAPI";

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

export const usedQuotes: Set<string> = new Set();
// TODO Ska detta vara här? Eller i en const-mapp? Eller i state??

export const getUniqueRandomQuote = async (): Promise<Quote> => {
    let quote: Quote;
    do {
        quote = await getRandomQuote();
    } while (usedQuotes.has(quote.sentence));

    usedQuotes.add(quote.sentence); 
    return quote;
};