import { LineOutput } from "../components/Input";
import { reverseString } from "./Align";
import { Combination, Line } from "./Combination";
import { GenerateCorrection, UpdateCombinations } from "./Correction";
import { closestWithDist, PairDist } from "./Distances";
import { penaltyOrNot } from "./Isqat";
import { MetreComb, ClosestMatchForLineNew, UniversalSet, modeNew } from "./Metres";

export interface Closest {
    metre: PairDist
    comb: Combination
}

export interface CombStringPair {
    metre: string
    comb: Combination
}

export const MainCourse = (validLines: Line[], invalidLines: Line[]): LineOutput[] => {
    const closestMatches = validLines.map(it => ClosestMatchForLineNew(it.combinations))
    const mostMatchedSet = UniversalSet(modeNew(closestMatches).match)

    const output = validLines.map(it => {
        const closestCombination = UpdateCombinations(ObtainClosestCombinationPair(mostMatchedSet, it.combinations))
        const correction = GenerateCorrection(closestCombination.comb.weightList, closestCombination.metreComb.encoding)
        const fluencyScore = ObtainFluencyScore(closestCombination.comb.weightList,
            closestCombination.comb.wordList, closestCombination.metreComb.encoding)
        return {
            metreComb: closestCombination.metreComb,
            words: closestCombination.comb.wordList,
            weights: ToUrduNumerals(closestCombination.comb.weightList),
            correction: ToUrduNumerals(correction),
            fluencyScore : fluencyScore 
        }
    })

    const invalidOut = invalidLines.map(it => InvalidLineOutput(it))
    return [...output, ...invalidOut]
}

const ObtainClosestCombinationPair = (universalSet: Set<string>, combs: Combination[]): CombStringPair => {
    const closestMatch: Closest = combs.map(el => {
        return { metre: closestWithDist(el.combinationString, [...universalSet]), comb: el }
    }).reduce((acc, it) => (acc.metre.dist < it.metre.dist) ? acc : it)

    return { metre: closestMatch.metre.match, comb: closestMatch.comb }
}

const ObtainFluencyScore = (weightList: string[], wordList: string[], metreString: string): number => {
    const metre = weightList.join('')
    if (metre !== metreString) return 0

    const sub: number[] = weightList.map((it, ind) => (penaltyOrNot(wordList[ind]) && it.endsWith('1') ? 1 : 0))

    const res = 10 - sub.reduce((acc, it) => acc + it) + (metre.match(/111/g) || []).length/2
    return (res < 10) ? res : 10
}

const InvalidLineOutput = (line: Line): LineOutput => {
    const words = line.wordsInLine.map(it => it.word)
    const weights = ToUrduNumerals(line.weightsInLine.map(it => (it.length === 0) ? "نامعلوم" : it[0]))
    const metComb: MetreComb = { encoding: "", name: "دستیاب نہیں", afaeel: "دستیاب نہیں" }

    return { metreComb: metComb, words: words, weights: weights, correction: Array(words.length).fill(""), fluencyScore: 0 }
}


const ToUrduNumerals = (list: string[]) => {
    return list.map(it => {
        if (it === "نامعلوم")
            return it
        else {
            const temp = reverseString(it)
            return (temp.length !== 0) ? ([...temp].map(it => (it === '1') ? `۱` : `۰`)).join('') : ""
        }
    })
}
