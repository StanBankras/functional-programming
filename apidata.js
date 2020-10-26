import { getData } from './utils';

function getDatasets() {
  const areaSpecifications = getData('https://opendata.rdw.nl/resource/b3us-f26s.json');
  const area = getData('https://opendata.rdw.nl/resource/qtex-qwd8.json');

  return Promise.all([areaSpecifications, area]).then((values) => {
    return combineDatasets(values, 'areaid');
  });
}

function combineDatasets(datasets, sharedKey) {
  const map = {};

  datasets.forEach(dataset => {
    dataset.filter(x => !!x[sharedKey]).forEach(obj => {
      const existing = map[obj[sharedKey]];

      if(!!existing) {
        Object.keys(obj).filter(key => typeof existing[key] === 'undefined').forEach(key => existing[key] = obj[key]);
      } else {
        map[obj[sharedKey]] = obj;
      }
    });
  });

  const values = Object.values(map);

  return values;
}

export default { getDatasets };