const request = require('request');

const apiKey = 'e3cc295a47b43f0714c1fdbcaf01a5b4'; //Dark sky api key

let getWeather = (lat, lng, callback) => {
    request({
        url: `https://api.darksky.net/forecast/${apiKey}/${lat},${lng}`,
        json: true
    }, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            callback(undefined, {
                temperature: body.currently.temperature,
                apparentTemperature: body.currently.apparentTemperature,
                precipProbability: body.currently.precipProbability
            }); 
        } else {
            callback('Unable to connect to the Forecast.io server');
        }
    });
};

module.exports = {
    getWeather
};
