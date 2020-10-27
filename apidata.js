import { getData } from './utils';

// Gets datasets from endpoints and waits till all are retrieved, then calls the function to combine this data
function newDataset(endpoints) {
  const promises = endpoints.map(x => getData(x));

  return Promise.all(promises).then((values) => {
    return combineDatasets(values, 'areaid');
  });
}

// What this function does step by step: https://github.com/StanBankras/functional-programming/wiki/Transforming-data-from-API
function combineDatasets(datasets, sharedKey) {
  const map = {};

  // Loop through all datasets
  datasets.forEach(dataset => {
    dataset
      .filter(x => !!x[sharedKey])
      .forEach(obj => {
        const existing = map[obj[sharedKey]];

        // Per object, check if it exists on the map and act accordingly
        if(!!existing) {
          Object.keys(obj)
            .filter(key => typeof existing[key] === 'undefined')
            .forEach(key => map[obj[sharedKey]][key] = obj[key]); // keys that didn't exist on the map are inserted in the right object
        } else {
          map[obj[sharedKey]] = obj; // New object added to the map
        }
      });
  });

  const values = Object.values(map);
  return values;
}

export default { newDataset };