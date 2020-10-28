import clean from './cleanup.js';
import apiData from './apidata.js';
import esri from './esri';
import { getCenterCoord, isCoordInPolygon } from './utils';

const geoDataEndpoint = 'https://opendata.rdw.nl/resource/nsk3-v9n7.json';
const chargingPointEndpoint = 'https://opendata.rdw.nl/resource/b3us-f26s.json';
const keys = {
  areageometryastext: 'area',
  chargingpointcapacity: 'chargingPoints'
}

// Start code, retrieves data using Esri about Dutch environmental zones. Same data is used as on milieuzones.nl
esri.getEnvironmentalZones().then(result => {
  const polygons = [];
  result.forEach(x => {
    x.polygons.forEach(polygon => polygons.push({ municipality: x.municipality, polygon: polygon }));
  });
  mergeAllData(polygons).then(result => console.log(result.filter(x => x.chargingPoints)));
});

async function mergeAllData(environmentalZones) {
  const data = await apiData.newDataset([geoDataEndpoint, chargingPointEndpoint], 'areaid');

  const filteredData = data
    .filter(x => Object.keys(keys).every(key => x.hasOwnProperty(key))) // https://stackoverflow.com/a/41439924
    .map(x => {
      const obj = {};
      Object.keys(keys).forEach(key => {
        return obj[keys[key]] = x[key];
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

/*

Main question:
Do cities provide extra infrastructure and facilities on parking spots in environment zones to promote (more) green transportation?
- Are parkingspots closer to public transport to continue your travel this way?
- Do parkingspots have more charging points for electrical cars?
- Are parkingspot in environment zones with more charging points more expensive to park?

Code idea:
1. Gather all parkingspots that have:
    - Geo data
    - Amount of charging points
    - Tariffs
2. Gather the environment zone coordinates in polygon
3. Create two different arrays:
    - Parking spots in environment zones (https://github.com/substack/point-in-polygon)
    - Parking spots outside environment zones
4. For both arrays, transform the data so there are arrays of objects with the needed data


*/