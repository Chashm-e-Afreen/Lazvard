import Afaeel from "../files/Afaeel.json"
import Metres from "../files/Metres.json"
import MetreList from "../files/MetreList.json"
import { Combination } from "./Combination"
import { closestWithDist, PairDist } from "./Distances"

type names = {
    [key: string]: string
}

const metreList: string[] = MetreList
const metreNames: names = Metres
const afaeel: names = Afaeel

const ramalMakhboonMusamman = new Set([
    "10110101110101110101110", "10110101110101110101010",
    "1110101110101110101110", "1110101110101110101010"]
)
const ramalMakhboonMusaddas = new Set([
    "10110101110101110101110", "10110101110101110101010",
    "1110101110101110101110", "1110101110101110101010"]
)
const khafifMusaddas = new Set([
    "10110101101101110", "10110101101101010", "1110101101101110",
    "1110101101101010"]
)
const hazajMusaddasAxrab = new Set(["1010111011011010", "1010101011011010"])

const PolymorphicMetres = [ramalMakhboonMusamman,
    ramalMakhboonMusaddas, hazajMusaddasAxrab, khafifMusaddas]

export interface MetreComb {
    encoding: string
    name: string
    afaeel: string
}

export const RemoveSuffixOne = (str: string) => {
    return str.endsWith("1") ? str.slice(0, -1) : str
}

export const GetMetreComb = (s: string) => {
    return { encoding: s, name: metreNames[s], afaeel: afaeel[s] }
}

export const MuqattaTrue = (metreComb: MetreComb, combination: Combination): boolean => {

    if (metreComb.afaeel === undefined) return false

    const encoding = metreComb.encoding
    const afaeel = metreComb.afaeel
    const half1 = encoding.substring(0, encoding.length / 2);
    const afaeelList = afaeel.split(' ')
    const notPlain = (afaeelList[0] !== afaeelList[1]) 

    const finalCheck = RemoveSuffixOne(combination.combinationString) === `${half1}1${half1}`

    const check = combination.validTasbeegh()
    return notPlain && finalCheck && check
}

export const UniversalSet = (matched: string) => {
    const list = PolymorphicMetres.filter(el => el.has(matched))
    return (list.length !== 0) ? list[0] : new Set([matched])
}

export const ClosestMatchForLine = (combinations: Combination[]) => {
    const closest = combinations.map(el => closestWithDist(RemoveSuffixOne(el.combinationString), metreList))
    return closest.reduce((acc,it) => (it.dist < acc.dist)? it: acc).match
}

export const ClosestMatchForLineNew = (combinations: Combination[]) => {
    const closest = combinations.map(el => closestWithDist(RemoveSuffixOne(el.combinationString), metreList))
    return closest.reduce((acc,it) => (it.dist < acc.dist)? it: acc)
}

export const mode = (myArray: string[]) =>
    myArray.reduce(
        (a, b, _, arr) =>
            (arr.filter(v => v === a).length >= arr.filter(v => v === b).length ? a : b),
        myArray[0])

export const modeNew = (myArray: PairDist[]): PairDist => 
    myArray.reduce(
        (a, b, _, arr) =>
            (arr.filter(v => v === a).length >= arr.filter(v => v === b).length || (a.dist === 0) ? a : b),
        myArray[0])
