const request = require('request');

const geocodeAPIKey = 'AIzaSyA3o7-36UADTOdQvwR-gHJyfejNdpIWM5c';

const geocodeAddress = address => {
    return new Promise((resolve, reject) => {
        const parm = encodeURIComponent(address);
        request(
            {
                url: `https://maps.googleapis.com/maps/api/geocode/json?address=${parm}&key=${geocodeAPIKey}`,
                json: true
            },
            (error, response, body) => {
                if (error) {
                    reject('Unable to connect to Google services.');
                } else if (body.status === 'ZERO_RESULTS') {
                    reject('No matching results');
                } else if (body.status === 'OK') {
                    resolve({
                        address: body.results[0].formatted_address,
                        latitude: body.results[0].geometry.location.lat,
                        longitude: body.results[0].geometry.location.lng
                    });
                }
            }
        );
    });
};

geocodeAddress('19146').then(
    location => {
        console.log(JSON.stringify(location, undefined, 2));
    },
    errorMessage => {
        console.log(errorMessage);
    }
);
