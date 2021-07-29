const axios = require('axios');
const { API_TOKEN, API_TOKEN_WEATHER } = require('../utils/token');


const BASE_URL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
const BASE_URL_WEATHER = 'https://api.openweathermap.org/data/2.5/weather';
const LIMIT = '5';
const LANGUAGE = 'es'


const instance = axios.create({
    baseURL: BASE_URL,
    params: {
        'access_token': API_TOKEN,
        'limit': LIMIT,
        'language': LANGUAGE
    }
});


async function getCityByKeyword(city) {

    const url = `${BASE_URL}${city}.json?access_token=${API_TOKEN}&limit=${LIMIT}&language=${LANGUAGE}`;

    try {
        return axios({
            url: url,
            method: 'GET'
        })
            .then((result) => { // the fun to be excecuted on the promise
                //console.log(result.data)
                return result.data
            })
            .catch(error => console.log("Salio mal", error))
    }
    catch (error) {
        console.error(error);
        console.error("SALIO MAL");
    }
}

async function getWeatherByGeo(lat, long) {

    const url = `${BASE_URL_WEATHER}?lat=${lat}&lon=${long}&appid=${API_TOKEN_WEATHER}&units=metric&lang=es`;

    try {
        return axios({
            url: url,
            method: 'GET'
        })
            .then((result) => { // the fun to be excecuted on the promise
                //console.log(result.data)
                return result.data
            })
            .catch(error => console.log("Salio mal", error))
    }
    catch (error) {
        console.error(error);
        console.error("SALIO MAL");
    }
}

//api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}

module.exports = {
    getCityByKeyword,
    getWeatherByGeo,
}