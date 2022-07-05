export async function getWords(selectWord = "all") {
  return await fetch(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${selectWord}`
  ).then((data) => data.json());
}
