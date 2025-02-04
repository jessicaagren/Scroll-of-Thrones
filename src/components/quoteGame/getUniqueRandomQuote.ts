import { getRandomQuote } from "../../api/quoteAPI/quoteAPI";
import { usedQuotes } from "../../state/state";
import Quote from "../../types/quoteType";

export const getUniqueRandomQuote = async (): Promise<Quote> => {
    let quote: Quote;
    do {
        quote = await getRandomQuote();
    } while (usedQuotes.has(quote.sentence));

    usedQuotes.add(quote.sentence); 
    return quote;
};