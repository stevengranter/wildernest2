export default function toTitleCase(str: string) {
  const words = str.split(" ")

  const titlecasedWords = words.map((word) => {
    if (word.includes("-")) {
      return word
        .split("-")
        .map((subWord) => subWord.charAt(0).toUpperCase() + subWord.slice(1))
        .join("-")
    } else {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    }
  })

  return titlecasedWords.join(" ")
}
