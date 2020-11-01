import 'regenerator-runtime/runtime';
import apiData from './js/utils/mergedata';
import esri from './js/esri';
import { getCenterCoord, getData, isCoordInPolygon } from './js/utils/helpers';
import d3 from './js/d3';

import * as tariffJson from './assets/data/tariffsFormatted.json';

const endpoints = [
  'https://opendata.rdw.nl/resource/nsk3-v9n7.json', // geoData parking areas // https://opendata.rdw.nl/Parkeren/Open-Data-Parkeren-GEOMETRIE-GEBIED/nsk3-v9n7
  'https://opendata.rdw.nl/resource/b3us-f26s.json' // Charging points // https://opendata.rdw.nl/Parkeren/Open-Data-Parkeren-SPECIFICATIES-PARKEERGEBIED/b3us-f26s
]
const sharedKey = 'areaid';
const keys = {
  areageometryastext: 'area',
  chargingpointcapacity: 'chargingPoints',
  areaid: 'areaId'
}
const strictKeys = false;

const tariffsObject = tariffJson.default;

let data = undefined;

// Starts the process to get and clean data
console.time('Time taken')
mergeAllData().then(result => {
  data = result;
  console.log(result);
  d3(data);
  console.timeEnd('Time taken')
});

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
        return obj[keys[key]] = (x[key] || undefined);
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
      obj.overallAverageTariff = Object.values(obj.tariffs || [])
        .map(x => x.averageTariff)
        .reduce((prev, cur) => prev + cur, 0) / Object.keys(obj.tariffs || []).length;

      return obj;
    });

    return await Promise.all(filteredData);
}

function getEnvironmentalZones() {
  return esri.getEnvironmentalZones().then(result => {
    const polygons = [];
    result.forEach(x => {
      x.polygons
        .forEach(polygon => polygons.push({ municipality: x.municipality, polygon: polygon }));
    });
    return polygons;
  });
}

async function getTariffs(areaId) {
  try {
    if(tariffsObject.hasOwnProperty(areaId)) return tariffsObject[areaId];
    console.log(areaId);
    const uuidReq = await getData('https://opendata.rdw.nl/resource/mz4f-59fw.json?areaid=' + areaId); // https://opendata.rdw.nl/Parkeren/Open-Data-Parkeren-PARKEERGEBIED/mz4f-59fw
    if(!uuidReq || !uuidReq[0] || !uuidReq[0].uuid) return null;
  
    const uuidData = await getData('https://npropendata.rdw.nl//parkingdata/v2/static/' + uuidReq[0].uuid);
    if(!uuidData) return null;

    return formatTariffData((uuidData.parkingFacilityInformation.tariffs || []));
  } catch(err) {
    console.log(err);
    return null;
  };
}

function formatTariffData(tariffs) {
  const tariffObj = {};

  tariffs.forEach(tariff => {
    if(notExpiredTariff(tariff)) {
      tariff.validityDays.forEach(day => {
        const dayKey = day.split(' ').join('').toLowerCase();
        if(tariffObj[dayKey]) return;
        tariffObj[dayKey] = {
          validFrom: tariff.validityFromTime,
          validUntil: tariff.validityUntilTime,
          rateInterval: tariff.rateIntervals,
          averageTariff: getAverageTariffPerMinute(tariff)
        };
      });
    }
  });

  return tariffObj;
}

// Returns boolean true if tariff is currently valid
function notExpiredTariff(tariff) {
  return tariff.startOfPeriod * 1000 < Date.now() && (tariff.endOfPeriod * 1000 > Date.now() || !tariff.endOfPeriod || tariff.endOfPeriod === -1);
}

// To-do: add other time formats (seconds, hours)
function getAverageTariffPerMinute(tariff) {
  if(!tariff.intervalRates) return null;

  const minutesInDay = 1440;
  let weightedTotalCharge = 0;
  let totalMinutes = 0;

  tariff.intervalRates.forEach(rate => {
    const minutes = rate.durationUntil === -1 ? minutesInDay - rate.durationFrom : rate.durationUntil - rate.durationFrom;
    const charge = rate.charge
    const chargePeriod = rate.chargePeriod;
    const weightedCharge = charge * minutes / chargePeriod;
    weightedTotalCharge += weightedCharge;
    totalMinutes += minutes;
  });

  return weightedTotalCharge / totalMinutes;
}
