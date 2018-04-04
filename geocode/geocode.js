const request = require('request');

// console.log(argv.address);
const geocodeAPIKey = 'AIzaSyA3o7-36UADTOdQvwR-gHJyfejNdpIWM5c';
// <> decodeURIComponent

const geocodeAddress = (address, callback) => {
    const parm = encodeURIComponent(address);
    request(
        {
            url: `https://maps.googleapis.com/maps/api/geocode/json?address=${parm}&key=${geocodeAPIKey}`,
            json: true
        },
        (error, response, body) => {
            //console.log(JSON.stringify(body, undefined, 2));
            if (error) {
                callback('Unable to connect to Google services.');
            } else if (body.status === 'ZERO_RESULTS') {
                callback('No matching results');
            } else if (body.status === 'OK') {
                callback(undefined, {
                    address: body.results[0].formatted_address,
                    latitude: body.results[0].geometry.location.lat,
                    longitude: body.results[0].geometry.location.lng
                });
            }
        }
    );
};

module.exports = {
    geocodeAddress
};
