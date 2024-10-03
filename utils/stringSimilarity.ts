const stringSimilarity = require('string-similarity')

const compareWords = (word1: string, word2: string) => {
  return stringSimilarity.compareTwoStrings(word1, word2)
}

export default compareWords
