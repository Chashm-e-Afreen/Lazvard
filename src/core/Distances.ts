// Sift4 - simplest version
// online algorithm to compute the distance between two strings in O(n)

import { Combination } from "./Combination";

// maxOffset is the number of characters to search for matching letters
export function sift4(s1: string, s2: string, maxOffset: number): number {
    if (!s1 || !s1.length) {
        if (!s2) {
            return 0;
        }
        return s2.length;
    }

    if (!s2 || !s2.length) {
        return s1.length;
    }

    var l1 = s1.length;
    var l2 = s2.length;

    var c1 = 0; //cursor for string 1
    var c2 = 0; //cursor for string 2
    var lcss = 0; //largest common subsequence
    var local_cs = 0; //local common substring
    while ((c1 < l1) && (c2 < l2)) {
        if (s1.charAt(c1) ===s2.charAt(c2)) {
            local_cs++;
        } else {
            lcss += local_cs;
            local_cs = 0;
            if (c1 !== c2) {
                c1 = c2 = Math.max(c1, c2); //using max to bypass the need for computer transpositions ('ab' vs 'ba')
            }
            for (var i = 0; i < maxOffset && (c1 + i < l1 || c2 + i < l2); i++) {
                if ((c1 + i < l1) && (s1.charAt(c1 + i) ===s2.charAt(c2))) {
                    c1 += i;
                    local_cs++;
                    break;
                }
                if ((c2 + i < l2) && (s1.charAt(c1) ===s2.charAt(c2 + i))) {
                    c2 += i;
                    local_cs++;
                    break;
                }
            }
        }
        c1++;
        c2++;
    }
    lcss += local_cs;
    return Math.round(Math.max(l1, l2) - lcss);
}

const peq = new Uint32Array(0x10000);
const myers_32 = (a: string, b: string) => {
  const n = a.length;
  const m = b.length;
  const lst = 1 << (n - 1);
  let pv = -1;
  let mv = 0;
  let sc = n;
  let i = n;
  while (i--) {
    peq[a.charCodeAt(i)] |= 1 << i;
  }
  for (i = 0; i < m; i++) {
    let eq = peq[b.charCodeAt(i)];
    const xv = eq | mv;
    eq |= ((eq & pv) + pv) ^ pv;
    mv |= ~(eq | pv);
    pv &= eq;
    if (mv & lst) {
      sc++;
    }
    if (pv & lst) {
      sc--;
    }
    mv = (mv << 1) | 1;
    pv = (pv << 1) | ~(xv | mv);
    mv &= xv;
  }
  i = n;
  while (i--) {
    peq[a.charCodeAt(i)] = 0;
  }
  return sc;
};

const myers_x = (b: string, a: string) => {
  const n = a.length;
  const m = b.length;
  const mhc = [];
  const phc = [];
  const hsize = Math.ceil(n / 32);
  const vsize = Math.ceil(m / 32);
  for (let i = 0; i < hsize; i++) {
    phc[i] = -1;
    mhc[i] = 0;
  }
  let j = 0;
  for (; j < vsize - 1; j++) {
    let mv = 0;
    let pv = -1;
    const start = j * 32;
    const vlen = Math.min(32, m) + start;
    for (let k = start; k < vlen; k++) {
      peq[b.charCodeAt(k)] |= 1 << k;
    }
    for (let i = 0; i < n; i++) {
      const eq = peq[a.charCodeAt(i)];
      const pb = (phc[(i / 32) | 0] >>> i % 32) & 1;
      const mb = (mhc[(i / 32) | 0] >>> i % 32) & 1;
      const xv = eq | mv;
      const xh = ((((eq | mb) & pv) + pv) ^ pv) | eq | mb;
      let ph = mv | ~(xh | pv);
      let mh = pv & xh;
      if ((ph >>> 31) ^ pb) {
        phc[(i / 32) | 0] ^= 1 << i % 32;
      }
      if ((mh >>> 31) ^ mb) {
        mhc[(i / 32) | 0] ^= 1 << i % 32;
      }
      ph = (ph << 1) | pb;
      mh = (mh << 1) | mb;
      pv = mh | ~(xv | ph);
      mv = ph & xv;
    }
    for (let k = start; k < vlen; k++) {
      peq[b.charCodeAt(k)] = 0;
    }
  }
  let mv = 0;
  let pv = -1;
  const start = j * 32;
  const vlen = Math.min(32, m - start) + start;
  for (let k = start; k < vlen; k++) {
    peq[b.charCodeAt(k)] |= 1 << k;
  }
  let score = m;
  for (let i = 0; i < n; i++) {
    const eq = peq[a.charCodeAt(i)];
    const pb = (phc[(i / 32) | 0] >>> i % 32) & 1;
    const mb = (mhc[(i / 32) | 0] >>> i % 32) & 1;
    const xv = eq | mv;
    const xh = ((((eq | mb) & pv) + pv) ^ pv) | eq | mb;
    let ph = mv | ~(xh | pv);
    let mh = pv & xh;
    score += (ph >>> ((m % 32) - 1)) & 1;
    score -= (mh >>> ((m % 32) - 1)) & 1;
    if ((ph >>> 31) ^ pb) {
      phc[(i / 32) | 0] ^= 1 << i % 32;
    }
    if ((mh >>> 31) ^ mb) {
      mhc[(i / 32) | 0] ^= 1 << i % 32;
    }
    ph = (ph << 1) | pb;
    mh = (mh << 1) | mb;
    pv = mh | ~(xv | ph);
    mv = ph & xv;
  }
  for (let k = start; k < vlen; k++) {
    peq[b.charCodeAt(k)] = 0;
  }
  return score;
};

const distance = (a: string, b: string): number => {
  if (a.length < b.length) {
    const tmp = b;
    b = a;
    a = tmp;
  }
  if (b.length === 0) {
    return a.length;
  }
  if (a.length <= 32) {
    return myers_32(a, b);
  }
  return myers_x(a, b);
};

const closest = (str: string, arr: readonly string[]): string => {
  let min_distance = Infinity;
  let min_index = 0;
  for (let i = 0; i < arr.length; i++) {
    const dist = distance(str, arr[i]);
    if (dist < min_distance) {
      min_distance = dist;
      min_index = i;
    }
  }
  return arr[min_index];
};

export const closestComb = (str: string, arr: readonly Combination[]): Combination => {
  let min_distance = Infinity;
  let min_index = 0;
  for (let i = 0; i < arr.length; i++) {
    const dist = distance(str, arr[i].combinationString);
    if (dist < min_distance) {
      min_distance = dist;
      min_index = i;
    }
  }
  return arr[min_index];
};

export interface PairDist {
  match: string
  dist: number
}

const closestWithDist = (str: string, arr: readonly string[]): PairDist => {
  let min_distance = Infinity;
  let min_index = 0;
  for (let i = 0; i < arr.length; i++) {
    const dist = distance(str, arr[i]);
    if (dist < min_distance) {
      min_distance = dist;
      min_index = i;
    }
  }
  return {match: arr[min_index], dist: min_distance}
};


export { closest, distance, closestWithDist };

