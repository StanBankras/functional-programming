import clean from './cleanup.js';
import apiData from './apidata.js';

apiData.newDataset(['https://opendata.rdw.nl/resource/r3rs-ibz5.json', 'https://opendata.rdw.nl/resource/qtex-qwd8.json', 'https://opendata.rdw.nl/resource/nsk3-v9n7.json']).then(data => console.log(data));

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