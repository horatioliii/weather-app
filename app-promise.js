const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address to fetch weather for',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

let encodedAddress = encodeURIComponent(argv.address);
let geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

axios.get(geocodeUrl).then((response) => {
    if (response.data.status === 'ZERO_RESULTS') {
        throw new Error('Unable to find the address');
    }

    const apiKey = 'e3cc295a47b43f0714c1fdbcaf01a5b4'; //dark sky api key
    let lat = response.data.results[0].geometry.location.lat;
    let lng = response.data.results[0].geometry.location.lng;
    let weatherUrl = `https://api.darksky.net/forecast/${apiKey}/${lat},${lng}`;
    console.log(response.data.results[0].formatted_address);
    return axios.get(weatherUrl);
}).then((response) => {
    let temperature = response.data.currently.temperature;
    let apparentTemperature = response.data.currently.apparentTemperature;
    let precipProbability = response.data.currently.precipProbability;
    console.log(`It's currently ${temperature}. It feels like ${apparentTemperature}.`);
    if (precipProbability !== 0) {
        console.log(`The chance of rain is ${precipProbability}. Don't forget to bring an umbrella!`);
    } else {
        console.log(`The chance of rain is ${precipProbability}.`);
    }
}).catch((e) => {
    if (e.code === 'ECONNREFUSED') {
        console.log('Unable to connect to google server');
    } else {
        console.log(e.message);
    }
});



