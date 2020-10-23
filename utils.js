// Replace all occurences of the <replace> parameters in the <string> by the <replaceBy> parameter
export function replaceOccurences(string, replace, replaceBy) {
  return string.split(replace).join(replaceBy);
}


// Replace an array of characters in a string by new characters
export function replaceMultipleOccurences(string, replaceArray, replaceBy) {
  let replaceString = string;
  replaceArray.forEach((r) => replaceString = replaceOccurences(replaceString, r, replaceBy));
  return replaceString;
}

export default { replaceOccurences, replaceMultipleOccurences };