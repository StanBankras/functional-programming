import dotenv from 'dotenv';
import fetch from 'node-fetch';
import inside from 'point-in-polygon';
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

// Fetch data, for Opendata endpoints automatically attach app_token
export async function getData(uriString) {
  let uri = uriString;
  if(uri.includes('opendata')) {
    if(uri.endsWith('json')) {
      uri = uri + '?' + token + '&$limit=20000';
    } else {
      uri = uri + '&' + token + '&$limit=20000';
    }
  }

  const result = await fetch(uri);
  const data = await result.json();
  return data;
}

export function getCenterCoord(coordinates) {
  const type = coordinates.split(' ')[0];
  let longLat = replaceMultipleOccurences(coordinates, [type + ' (', '(', ')', ','], '').split(' ');
  if(type === 'POINT') {
    longLat = [ Number(longLat[0]), Number(longLat[1]) ];
  } else {
    let latTotal = 0;
    let longTotal = 0;

    longLat.forEach((x, index) => {
      if(index === 0 || index % 2 === 0) return longTotal += Number(x);
      return latTotal += Number(x);
    });

    longLat = [ longTotal / (longLat.length / 2), latTotal / (longLat.length / 2) ];
  }

  return longLat;
}

export function isCoordInPolygon(centerCoord, polygons) {
  let zone = undefined;
  for(let i = 0;i < polygons.length;i++) {
    if(inside(centerCoord, polygons[i].polygon)) {
      zone = polygons[i].municipality; 
      break;
    }
  }
  return zone;
}

