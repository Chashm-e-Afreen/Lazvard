export class Word {
    word: string;
    weights: string[];
    notFound: boolean;
    constructor(word: string, weights: string[]) {
        this.word = word
        this.weights = weights
        this.notFound = (weights.length === 0)
    }
}