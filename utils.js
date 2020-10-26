import dotenv from 'dotenv';
import fetch from 'node-fetch';
dotenv.config();

const token = '$$app_token=' + process.env.OPENDATA_RDW_APPTOKEN;

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

export async function getData(uriString) {
  let uri = uriString;
  if(uri.endsWith('json')) {
    uri = uri + '?' + token;
  } else {
    uri = uri + '&' + token;
  }

  const result = await fetch(uri);
  const data = await result.json();
  return data;
}

export default { replaceOccurences, replaceMultipleOccurences, getData };