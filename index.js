import clean from './cleanup.js';
import apiData from './apidata.js';
import esri from './esri';
import { getCenterCoord, isCoordInPolygon } from './utils';

const endpoints = [
  'https://opendata.rdw.nl/resource/nsk3-v9n7.json', // geoData parking areas
  'https://opendata.rdw.nl/resource/b3us-f26s.json' // Charging points
]
const sharedKey = 'areaid';
const keys = {
  areageometryastext: 'area',
  chargingpointcapacity: 'chargingPoints'
}
const strictKeys = true;

// Starts the process to get and clean data
mergeAllData().then(result => console.log(result));

async function mergeAllData() {
  const dataset = apiData.newDataset(endpoints, sharedKey);

  const requestedData = await Promise.all([getEnvironmentalZones(), dataset]);
  const data = requestedData[1];
  const environmentalZones = requestedData[0];

  const filteredData = data
    .filter(x => Object.keys(keys).every(key => {
      if(strictKeys) return x.hasOwnProperty(key); // https://stackoverflow.com/a/41439924
      return true;
    })) 
    .map(x => {
      const obj = {};
      Object.keys(keys).forEach(key => {
        return obj[keys[key]] = (x[key] || '');
      });
      return obj;
    })
    .map(x => {
      const obj = x;
      obj.centerCoord = getCenterCoord(x.area);
      return obj;
    })
    .map(x => {
      const obj = x;
      obj.environmentalZone = isCoordInPolygon(obj.centerCoord, environmentalZones);
      return obj;
    });

    return filteredData;
}

function getEnvironmentalZones() {
  return esri.getEnvironmentalZones().then(result => {
    const polygons = [];
    result.forEach(x => {
      x.polygons.forEach(polygon => polygons.push({ municipality: x.municipality, polygon: polygon }));
    });
    return polygons;
  });
}
