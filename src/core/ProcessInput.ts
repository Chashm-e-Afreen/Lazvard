import { Line } from "./Combination";

const removeNuisances = (input: string) => {
    const out = [...input].filter(el => allowed.has(el)).join('')
    return out
}

export const splitInput = (input: string) => {
    const removeWS = (s: string) => s.split(' ').filter(n => n).join(' ')
    const lines = input.split('\n').map(elem => removeWS(removeNuisances(elem.replaceAll('ۂ', 'ۂ')))).filter(elem => elem !== "")
    return lines.map(el => new Line(el.split(' ')))
}
export const partition = <T>(array: T[], isValid: (element: T) => boolean): [T[], T[]] => {
    const pass: T[] = []
    const fail: T[] = []
    array.forEach(element => {
      if (isValid(element)) {
        pass.push(element)
      } else {
        fail.push(element)
      }
    })
    return [pass, fail]
  }

const allowed = new Set([
    "",
    "آ",
    "ا",
    "ب",
    "پ",
    "ت",
    "ٹ",
    "ث",
    "ج",
    "چ",
    "ح",
    "خ",
    "د",
    "ڈ",
    "ذ",
    "ر",
    "ڑ",
    "ز",
    "ژ",
    "س",
    "ش",
    "ص",
    "ض",
    "ط",
    "ظ",
    "ع",
    "غ",
    "ف",
    "ق",
    "ک",
    "گ",
    "ل",
    "م",
    "ن",
    "ں",
    "و",
    "ہ",
    "ھ",
    "ی",
    "ئ",
    "ئے",
    "ے",
    "ِ",
    "ــِ",
    "ةٓ",
    "ۂ",
    "ۂ",
    "ۃ",
    "ۂ",
    "ؤ",
    "ۂ",
    " ",
]
)