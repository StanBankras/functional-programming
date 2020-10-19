const axios = require('axios').default;

// Snel even dynamische parkingdata verkennen, ratelimits zitten wel in de weg
const getParkingFacilities = async () => {
  try {
    const result = await axios.get('https://npropendata.rdw.nl/parkingdata/v2/');
    const data = result.data.ParkingFacilities.slice(0, 20); // Slice vanwege ratelimits
    let totalTarriffed = 0;
    data.forEach(async (p) => {
      const query = await axios.get(p.staticDataUrl);
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