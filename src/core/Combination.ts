import { obtainWeights } from "./Dict"
import { applyVaslAndIsqat } from "./Isqat"
import { Word } from "./Word"

export class Line {
    wordsInLine: Word[]
    weightsInLine: string[][]
    unknownWords: Word[]
    combinations: Combination[]
    constructor(wordList: string[]) {
        this.wordsInLine = wordList.map(it => new Word(it, obtainWeights(it)))
        this.weightsInLine = applyVaslAndIsqat(this.wordsInLine)
        this.unknownWords = this.wordsInLine.filter(it => it.notFound)
        this.combinations = CartesianProduct(this.weightsInLine).map(it => new Combination(it, this.wordsInLine.map(it => it.word)))
                        .filter(el => !el.combinationString.includes('11111'))
    }
}

export class Combination {
    combinationString: string
    weightList: string[]
    wordList: string[]
    endLocations: Set<number>
    validTasbeegh: Function
    constructor(weightList: string[], wordList: string[]) {
        this.combinationString = weightList.join('')
        this.weightList = weightList
        this.wordList = wordList
        this.endLocations = getEndLocations(weightList)
        this.validTasbeegh = () => {
            const temp = this.combinationString.endsWith("1") ? this.combinationString.slice(0, -1) : this.combinationString
            const val = this.endLocations.has(Math.floor(temp.length/2) + 1)
            return val
        }
    }
}

const getEndLocations = (weightList: string[]) => {
    let num = 0
    let endLocations: Set<number> = new Set()
    for (const el of weightList) {
        endLocations.add(num += el.length)
    }
    return endLocations
}

function CartesianProduct(arr: string[][]): string[][] {
    return arr.reduce((a, b) => {
        return a.map(x => {
            return b.map(y => {
                return x.concat(y)
            })
        }).reduce((c, d) => c.concat(d), [])
    }, [[]] as string[][])
}

