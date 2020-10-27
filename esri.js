// Esri installation for node: https://esri.github.io/arcgis-rest-js/guides/node/
import 'cross-fetch/polyfill';
import 'isomorphic-form-data';
import { request } from '@esri/arcgis-rest-request';

// Found out how to get geojson via: https://gis.stackexchange.com/questions/206313/accessing-geojson-from-arcgis-online-rest-api
const link = 'https://services.arcgis.com/kE0BiyvJHb5SwQv7/arcgis/rest/services/Milieuzones_NL/FeatureServer/0/query?f=geojson&where=1%3D1&returnGeometry=true&spatialRel=esriSpatialRelIntersects&outFields=*&maxRecordCountFactor=4&outSR=28992&resultOffset=0&resultRecordCount=4000&cacheHint=true&quantizationParameters=%7B%22mode%22%3A%22view%22%2C%22originPosition%22%3A%22upperLeft%22%2C%22tolerance%22%3A1.0583333333333333%2C%22extent%22%3A%7B%22xmin%22%3A79678.40170000121%2C%22ymin%22%3A317810.4965999983%2C%22xmax%22%3A235169.30420517345%2C%22ymax%22%3A616195.0246407238%2C%22spatialReference%22%3A%7B%22wkid%22%3A28992%2C%22latestWkid%22%3A28992%7D%7D%7D';

export async function getEnvironmentalZones() {
  const data = await request(link);
  let formattedData = data.features.map(feature => {
    const polygons = feature.geometry.coordinates.map(polygon => getPolygons(polygon));

    return {
      municipality: feature.properties.Gemeente,
      polygons: polygons
    }
  });

  // Filter duplicate entries (code from: https://stackoverflow.com/a/56757215)
  formattedData = formattedData.filter((val,i,arr) => arr.findIndex(t => (t.municipality === val.municipality)) === i);

  return formattedData;
}

function getPolygons(geojsonCoordinatesArray) {
  // TODO: Generate polygons in preferred format
  return [];
}

export default { getEnvironmentalZones };