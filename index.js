import clean from './cleanup.js';
import apiData from './apidata.js';
import esri from './esri';

const geoDataEndpoint = 'https://opendata.rdw.nl/resource/nsk3-v9n7.json';
const chargingPointEndpoint = 'https://opendata.rdw.nl/resource/b3us-f26s.json';

// apiData.newDataset([geoDataEndpoint, chargingPointEndpoint], 'areaid')
//   .then(data => console.log(data.filter(x => x.areageometryastext)));

/*

Main question:
Do cities provide extra infrastructure and facilities on parking spots in environment zones to promote (more) green transportation?
- Are parkingspots closer to public transport to continue your travel this way?
- Do parkingspots have more charging points for electrical cars?
- Is there a maximum parking time that prevents electric car owners from leaving their car on the charging point for too long?
- Are parkingspot in environment zones with more charging points more expensive to park?

Code idea:
1. Gather all parkingspots that have:
    - Geo data
    - Amount of charging points
    - (max) park time
    - Tariffs
2. Gather the environment zone coordinates in polygon
3. Create two different arrays:
    - Parking spots in environment zones (https://github.com/substack/point-in-polygon)
    - Parking spots outside environment zones
4. For both arrays, transform the data so there are arrays of objects with the needed data


*/