import { wordPresent } from "./Dict"
import { Word } from "./Word"


export function applyVaslAndIsqat(line: Word[]): string[][] {
    const lastWord = line[line.length - 1]
    //concise if...else_if...else
    const lastWeights = (canDropIfLastWord(lastWord.word)) ? updateIsqat(lastWord.weights) :
        (canDrop(lastWord.word)) ? lastWord.weights.filter(it => it.endsWith('0')) :
            lastWord.weights

    const otherWeights: string[][] = each_cons(line, 2).map(el => {
        if (vaslApplicable(el[0].word, el[1].word))
            if (canDrop(el[0].word)) return updateIsqat(addVaslWeights(el[0].weights))
            else return addVaslWeights(el[0].weights)
        else
            if (canDrop(el[0].word)) return updateIsqat(el[0].weights)
            else return el[0].weights
    })

    return [...otherWeights, ...[lastWeights]]
}

function updateIsqat(weights: string[]) {
    if (weights.length === 0) return []
    const additionalWeights = weights.filter(it => it.endsWith('0')).map(it => it.substr(0, it.length - 1))
    return union(additionalWeights, weights)
}

function addVaslWeights(weights_prev: string[]): string[] {
    if (weights_prev === null || weights_prev.length === 0) return []

    const additionalWeights = weights_prev.map(it => it.substr(0, it.length - 1))
    return union(weights_prev, additionalWeights)
}

function vaslApplicable(word1: string, word2: string): boolean {
    const out = vaslPrefixes.has(word2.charAt(0)) && !canDrop(word1)
    return out
}

function canDrop(word: string): boolean {
    const droppable = (!exceptions.has(word)) && (droppableSuffixes.has(word.substr(-2))
        || droppableSuffixes.has(word.substr(-1)))

    const notPersianWord = !farsiSuffix.has(word.substr(-2)) ||
        !wordPresent(`${word.substr(-1)}ن`)

    return droppable && notPersianWord
}

function canDropIfLastWord(word: String): boolean {
    return lastWordApplicable.has(word.substr(-1))
        || lastWordApplicable.has(word.substr(-2))
}

export function union(a: string[], b: string[]): string[] {
    return Array.from(new Set([...a, ...b]))
}


export function penaltyOrNot(s: string): boolean {
    return dropHurts.has(s.substr(-1))
}

const each_cons = (array: Array<Word>, num: number) => {
    return Array.from({ length: array.length - num + 1 },
        (_, i) => array.slice(i, i + num))
}

const dropHurts: Set<string> = new Set(["ا", "و", "ی", "ں", "ے"])
const droppableSuffixes: Set<string> =
    new Set(["ا", "ہ", "ی", "ے", "ؤں", "ؤ", "یں", "وں", "و", "ِ", "ۂ"])
const lastWordApplicable: Set<string> = new Set(["ؤ", "ئی", "ئے", "ؤں"])
const farsiSuffix: Set<string> = new Set(["یں", "وں"])
const vaslPrefixes: Set<string> = new Set(["ا", "آ", "و"])
const exceptions: Set<string> = new Set(["اے"])