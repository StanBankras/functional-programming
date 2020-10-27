import { getData } from './utils';

function newDataset(endpoints) {
  const promises = endpoints.map(x => getData(x));

  return Promise.all(promises).then((values) => {
    return combineDatasets(values, 'areaid');
  });
}

function combineDatasets(datasets, sharedKey) {
  const map = {};

  datasets.forEach(dataset => {
    dataset
      .filter(x => !!x[sharedKey])
      .forEach(obj => {
        const existing = map[obj[sharedKey]];

        if(!!existing) {
          Object.keys(obj)
            .filter(key => typeof existing[key] === 'undefined')
            .forEach(key => map[obj[sharedKey]][key] = obj[key]);
        } else {
          map[obj[sharedKey]] = obj;
        }
      });
  });

  const values = Object.values(map);
  return values;
}

export default { newDataset };