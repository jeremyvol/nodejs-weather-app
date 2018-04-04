const request = require('request');

const darkSkyAPIKey = '52766c2f154be5e1db35664812ce0e7c';

const getWeather = (lat, lng, callback) => {
    request(
        {
            url: `https://api.darksky.net/forecast/${darkSkyAPIKey}/${lat},${lng}`,
            json: true
        },
        (error, response, body) => {
            if (!error && response.statusCode === 200) {
                callback(undefined, {
                    temperature: body.currently.temperature,
                    apparentTemperature: body.currently.apparentTemperature
                });
            } else {
                callback('Unable to fetch weather.');
            }
        }
    );
};

module.exports = {
    getWeather
};
