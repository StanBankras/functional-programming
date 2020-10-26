import clean from './cleanup.js';
import apiData from './apiData.js';

apiData.useData('https://opendata.rdw.nl/resource/qtex-qwd8.json?$limit=15000').then(data => console.log(data));

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
2. Create two different arrays:
    - Parking spots in environment zones
    - Parking spots outside environment zones
3. For both arrays, transform the data so there are arrays of objects with the needed data


*/