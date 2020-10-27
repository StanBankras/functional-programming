// Esri installation for node: https://esri.github.io/arcgis-rest-js/guides/node/
import 'cross-fetch/polyfill';
import 'isomorphic-form-data';
import { request } from '@esri/arcgis-rest-request';

// Found out how to get geojson via: https://gis.stackexchange.com/questions/206313/accessing-geojson-from-arcgis-online-rest-api
const uri = 'https://services.arcgis.com/kE0BiyvJHb5SwQv7/arcgis/rest/services/Milieuzones_NL/FeatureServer/0/query?f=geojson&where=1%3D1&returnGeometry=true';

export async function getEnvironmentalZones() {
  const data = await request(uri);
  let formattedData = data.features.map(feature => {
    const coordinates = feature.geometry.coordinates;
    let polygons;

    if(feature.geometry.type === 'MultiPolygon') {
      polygons = coordinates.reduce((prev, curr) => [...curr.map(polygon => getPolygons(polygon)), ...prev], []);
    } else {
      polygons = coordinates.map(polygon => getPolygons(polygon));
    }

    return {
      municipality: feature.properties.Gemeente,
      polygons: polygons
    }
  });

  // Filter duplicate entries (code from: https://stackoverflow.com/a/56757215)
  formattedData = formattedData.filter((val, i, arr) => arr.findIndex(t => (t.municipality === val.municipality)) === i);

  return formattedData;
}

function getPolygons(geojsonCoordinates) {
  return geojsonCoordinates.map(x => { return { long: x[1], lat: x[0] } });
}

export default { getEnvironmentalZones };