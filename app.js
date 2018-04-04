const yargs = require('yargs');

const geocode = require('./geocode/geocode.js');
const weather = require('./weather/weather.js');

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
    .alias('help', 'h').argv;

geocode.geocodeAddress(argv.address, (errorMessage, results) => {
    if (errorMessage) {
        console.log(errorMessage);
    } else {
        //console.log(JSON.stringify(results, undefined, 2));

        console.log(`Address: ${results.address}`);
        console.log(`Latitude: ${results.latitude}`);
        console.log(`Longitude: ${results.longitude}`);

        weather.getWeather(
            results.latitude,
            results.longitude,
            (errorMsg, weatherResults) => {
                if (errorMsg) {
                    console.log(errorMsg);
                } else {
                    console.log(
                        `it's currently ${
                            weatherResults.temperature
                        }, It feels like ${weatherResults.apparentTemperature}`
                    );
                }
            }
        );
    }
});
