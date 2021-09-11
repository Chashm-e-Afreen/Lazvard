import Lughat from '../files/Lughat.json'

export type DictType = {
    [key: string]: string[];
}

const dict: DictType = {...Lughat}

export async function fetchResource<T>(str: string): Promise<T> {
    const temp = localStorage.getItem(str)
    if (temp === null) {
        const jstring = await (await fetch(`${str}.json`)).json()
        localStorage.setItem(str ,jstring)
        return JSON.parse(jstring)
    }
    return JSON.parse(temp)
}

interface rootType {
    suffixToRemove: string,
    suffixToAdd: string,
    removeLastN: number,
    weightToAdd: string
}

function retrieveWeights(word: string): Array<string> {
    const updatedWord = (!word.endsWith('ِ')) ? word.replaceAll('ِ', '') : word.replaceAll('ِ', '') + 'ِ'
    const weights = dict[updatedWord]
    return (weights != null) ? weights : []
}

export function obtainWeights(word: string) {
    const weights = retrieveWeights(word)
    const updatedWeights = rootMap.filter(it => word.endsWith(it.suffixToRemove))
        .map(it => rootSearch(word, weights, it, dict)).filter(it => it.length !== 0)

    return (updatedWeights.length !== 0) ? updatedWeights[0] : weights
}

function rootSearch(word: string, weights: Array<string>, el: rootType, dict: DictType): Array<string> {
    return (weights.length === 0) ? retrieveWeights(`${word.substr(0, word.length - el.suffixToRemove.length)}${el.suffixToAdd}`)
        .map(it => `${it.substr(0, it.length - el.removeLastN)}${el.weightToAdd}`) : []
}

export function wordPresent(word: string) {
    const updatedWord = (!word.endsWith('ِ')) ? word.replaceAll('ِ', '') : word.replaceAll('ِ', '') + 'ِ'
    return dict[updatedWord] !== null
}

const rootMap: rootType[] = [
    { suffixToRemove: "ِ", suffixToAdd: "", removeLastN: 1, weightToAdd: "10" },
    { suffixToRemove: "ۂ", suffixToAdd: "ہ", removeLastN: 1, weightToAdd: "10" },
    { suffixToRemove: "ئیں", suffixToAdd: "", removeLastN: 0, weightToAdd: "10" },
    { suffixToRemove: "ئے", suffixToAdd: "", removeLastN: 0, weightToAdd: "10" },
    { suffixToRemove: "ئی", suffixToAdd: "", removeLastN: 0, weightToAdd: "10" },
    { suffixToRemove: "ؤں", suffixToAdd: "", removeLastN: 0, weightToAdd: "10" },
    { suffixToRemove: "ؤ", suffixToAdd: "", removeLastN: 0, weightToAdd: "10" },
    { suffixToRemove: "یں", suffixToAdd: "", removeLastN: 1, weightToAdd: "10" },
    { suffixToRemove: "وں", suffixToAdd: "", removeLastN: 1, weightToAdd: "10" },
    { suffixToRemove: "گاں", suffixToAdd: "ہ", removeLastN: 1, weightToAdd: "10" },
    { suffixToRemove: "اں", suffixToAdd: "", removeLastN: 1, weightToAdd: "10" },
    { suffixToRemove: "گی", suffixToAdd: "ہ", removeLastN: 1, weightToAdd: "10" },
    { suffixToRemove: "ن", suffixToAdd: "ں", removeLastN: 0, weightToAdd: "1" },
    { suffixToRemove: "ں", suffixToAdd: "ن", removeLastN: 1, weightToAdd: "" },
    { suffixToRemove: "ی", suffixToAdd: "", removeLastN: 1, weightToAdd: "10" },
    { suffixToRemove: "ا", suffixToAdd: "", removeLastN: 1, weightToAdd: "10" },
    { suffixToRemove: "و", suffixToAdd: "", removeLastN: 1, weightToAdd: "10" },
]
