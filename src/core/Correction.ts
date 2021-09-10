import { LevenshteinAlign } from "./Align"
import { Combination } from "./Combination"
import { GetMetreComb, MetreComb, MuqattaTrue, RemoveSuffixOne } from "./Metres"
import { CombStringPair } from "./Output"

export interface CombMetreCombPair {
    comb: Combination
    metreComb: MetreComb
}

export const UpdateCombinations = (pair: CombStringPair): CombMetreCombPair => {
    const metreComb = GetMetreComb(pair.metre)
    const muqatta = MuqattaTrue(metreComb, pair.comb)
    const tasbeegh = tasbeeghStatus(pair.comb.combinationString)

    const encodingUpdated = updateEncoding(muqatta, tasbeegh, metreComb.encoding)
    const nameUpdated = updateName(muqatta, metreComb.name, metreComb.encoding, pair.comb.combinationString)
    const afaeelUpdated = updateAfaeel(muqatta, tasbeegh, metreComb.afaeel)

    const meterCombUpdated = { encoding: encodingUpdated, name: nameUpdated, afaeel: afaeelUpdated }

    return { comb: pair.comb, metreComb: meterCombUpdated }
}


export const GenerateCorrection = (weightList: string[], metreString: string): string[] => {
    if (RemoveSuffixOne(weightList.join('')) === metreString) return weightList

    const weightString = weightList.join(' ')
    const alignment = LevenshteinAlign(weightString, metreString)

    if (alignment[0] === alignment[1]) {
        alignment[1] = metreString
        alignment[0] = "-".repeat(metreString.indexOf(alignment[0])) + alignment[0]
    }

    const extrasRemoved = [...alignment[1]].filter((_, index) => !(alignment[0][index] !== ' ' && alignment[1][index] === '-'))

    const out = (extrasRemoved.length !== 0) ? [...extrasRemoved].reduce((acc, it, index) =>
        (alignment[0][index] === ' ' && alignment[1][index] !== '-') ? `${acc}${it}-` : `${acc}${it}`) : ""

    return out.split('-')
}

const updateEncoding = (muqatta: boolean, tasbeegh: string, metre: string): string => {
    const metreHalf = metre.substr(0, metre.length / 2)
    if (muqatta)
        return (tasbeegh !== "none") ? `${metreHalf}1${metreHalf}1` : `${metreHalf}1${metreHalf}`
    else
        return (tasbeegh !== "none") ? `${metre}1` : metre
}

const updateName = (muqatta: boolean, name: string, metre: string, combinationString: string): string => {
    const updated = (muqatta) ? `${name} ${addToName(tasbeeghStatus(`${metre}1`))}` :
        `${name} ${addToName(tasbeeghStatus(combinationString))}`

    return updated
}

const updateAfaeel = (muqatta: boolean, tasbeegh: string, afaeel: string): string => {
    const afaeelHalf = afaeel.substr(0, afaeel.length / 2)
    if (tasbeegh !== "none")
        return (muqatta) ? `${addAlif(afaeelHalf)} ${addAlif(afaeelHalf)}` : addAlif(afaeel)
    else
        return (muqatta) ? `${addAlif(afaeelHalf)} ${afaeelHalf}` : afaeel
}

const tasbeeghStatus = (str: string): string => {
    //take last 4 characters
    if (str.endsWith("0")) return "none"
    const res = (str.endsWith("01101")) ? "azala" : "tasbeegh"
    return res
}

const addToName = (str: string): string => {
    switch (str) {
        case "tasbeegh": return "مسبغ"
        case "azala": return "مذال"
        default: return ""
    }
}

const addAlif = (metreHalf: string) => {
    return `${metreHalf.slice(0, -1)}ان`
}