const axios = require('axios').default;
const rateLimit = require('axios-rate-limit');
require('dotenv').config();

const http = rateLimit(axios.create(), { maxRequests: 5, perMilliseconds: 20, maxRPS: 5 });

// Snel even dynamische parkingdata verkennen, ratelimits zitten wel in de weg
const getParkingFacilities = async () => {
  try {
    const result = await http.get(`https://npropendata.rdw.nl/parkingdata/v2?$$app_token=${process.env.OPENDATA_APP_TOKEN}`);
    const data = result.data.ParkingFacilities;
    let totalTarriffed = 0;
    data.forEach(async (p) => {
      const query = await http.get(p.staticDataUrl + '?$$app_token=' + process.env.OPENDATA_APP_TOKEN);
      const data = query.data.parkingFacilityInformation;
      if(!data.tariffs) return console.log('-');
      if(data.tariffs.length === 0) return console.log('-');
      totalTarriffed += 1;
      console.log(totalTarriffed);
    });
  } catch(err) {
    console.error(err);
  }
}

getParkingFacilities();