import clean from './cleanup';
import apiData from './utils/apidata';
import esri from './esri';
import { getCenterCoord, getData, isCoordInPolygon } from './utils/general';

const endpoints = [
  'https://opendata.rdw.nl/resource/nsk3-v9n7.json', // geoData parking areas
  'https://opendata.rdw.nl/resource/b3us-f26s.json' // Charging points
]
const sharedKey = 'areaid';
const keys = {
  areageometryastext: 'area',
  // chargingpointcapacity: 'chargingPoints',
  areaid: 'areaId'
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
    })
    .map(async (x) => {
      const obj = x;
      obj.tariffs = await getTariffs(obj.areaId);
      return obj;
    });

    return await Promise.all(filteredData); // received help awaiting the mapping process with async functions from Alex (brother, studies HBO-ICT SE)
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

async function getTariffs(areaId) {
  try {
    const uuidReq = await getData('https://opendata.rdw.nl/resource/mz4f-59fw.json?areaid=' + areaId); // https://opendata.rdw.nl/Parkeren/Open-Data-Parkeren-PARKEERGEBIED/mz4f-59fw
    if(!uuidReq || !uuidReq[0] || !uuidReq[0].uuid) return null;
  
    const uuidData = await getData('https://npropendata.rdw.nl//parkingdata/v2/static/' + uuidReq[0].uuid);
    if(!uuidData) return null;

    return (uuidData.parkingFacilityInformation.tariffs || []);
  } catch(err) {
    console.log(err);
    return null;
  };
}
