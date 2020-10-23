export function replaceOccurences(string, replace, replaceBy) {
  return string.split(replace).join(replaceBy);
}

export function replaceMultipleOccurences(string, replaceArray, replaceBy) {
  let replaceString = string;
  replaceArray.forEach((r) => replaceOccurences(replaceString, r, replaceBy));
  return replaceString;
}

export default { replaceOccurences, replaceMultipleOccurences };