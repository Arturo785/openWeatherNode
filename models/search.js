const { getCityByKeyword, getWeatherByGeo } = require("../api/apiSearchs");


class Search {

    constructor() {
        this.history = [];
    }

    async readDB() {
        return [];
    }

    async searchCity(city = '') {
        // http request
        const cities = await getCityByKeyword(city);

        return cities.features.map(place => ({
            id: place.id,
            name: place.place_name,
            lng: place.center[0],
            lat: place.center[1], 
        }));

    }

    async searchClimate(lat = '', long = ''){
        const response = await getWeatherByGeo(lat, long);

        const {weather, main} = response;

        return {
            desc : weather[0]?.description,
            min : main.temp_min,
            max : main.temp_max,
            temp : main.temp
        }
    }
}


module.exports = Search;