export function LevenshteinAlign(a: string, b: string): [string,string] {
    var aa = a
    var bb = b

    var costs: number[][] = Array.from(Array(a.length + 1), () => new Array(b.length + 1))
    for (let j = 0; j <= b.length; ++j)  costs[0][j] = j
    for (let i = 1; i <= a.length; ++i) {
        costs[i][0] = i
        for (let j = 1; j <= b.length; ++j) {
            const temp = costs[i - 1][j - 1] + ((aa[i - 1] === bb[j - 1]) ? 0 : 1)
            costs[i][j] = Math.min(1 + Math.min(costs[i - 1][j], costs[i][j - 1]), temp)
        }
    }

    let aPathRev = ""
    let bPathRev = ""

    for (let i = a.length, j = b.length; i !== 0 && j !== 0; ) {
        if (costs[i][j] === (a.charAt(i - 1) === b.charAt(j - 1) ? costs[i - 1][j - 1] : costs[i - 1][j - 1] + 1)) {
            aPathRev+=(a.charAt(--i));
            bPathRev+=(b.charAt(--j));
        } else if (costs[i][j] === 1 + costs[i - 1][j]) {
            aPathRev+=(a.charAt(--i));
            bPathRev+=('-');
        } else if (costs[i][j] === 1 + costs[i][j - 1]) {
            aPathRev+=('-');
            bPathRev+=(b.charAt(--j));
        }
    }

    return [reverseString(aPathRev), reverseString(bPathRev)]
}


export const reverseString = (str: string) => {
    return str.split("").reverse().join("");
}