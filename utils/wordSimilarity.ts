const similarChars: { [key: string]: string[] } = {
  'B': ['8'],
  '8': ['B'],
  'I': ['1', 'l', 'L', 'i'],
  'i': ['1', 'l'],
  '1': ['i', 'I', 'l'],
  'L': ['I', '1'],
  '0': ['O', 'o'],
  'O': ['0', 'o'],
  'o': ['O', '0']
  // Add more mappings as necessary
}

const calcScore = (a: string, b: string): number => {
  if (a === b) return 0
  if (similarChars.hasOwnProperty(a) && similarChars[a].includes(b)) return 0.2
  return 1
}

const getDistance = (s1: string, s2: string) => {
  const costs = new Array()
  for (let i = 0; i <= s1.length; i++) {
    costs[i] = new Array()
    costs[i][0] = i
  }
  for (let j = 0; j <= s2.length; j++) {
    costs[0][j] = j
  }
  for (let i = 1; i <= s1.length; i++) {
    for (let j = 1; j <= s2.length; j++) {
    costs[i][j] = Math.min(
        costs[i - 1][j] + 1,
        costs[i][j - 1] + 1,
        costs[i - 1][j - 1] + calcScore(s1[i - 1], s2[j - 1])
      )
    }
  }
  return costs[s1.length][s2.length]
}

const wordSimilarity = (word1: string, word2: string) => {
  const longer = word1.length >= word2.length ? word1 : word2
  const shorter = word1.length < word2.length ? word1 : word2

  const longerLength = longer.length

  if (longerLength === 0) return 1.0
  return (longerLength - getDistance(longer, shorter)) / longerLength
}

export default wordSimilarity
