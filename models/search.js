const { getCityByKeyword, getWeatherByGeo } = require("../api/apiSearchs");
const fs = require('fs');


class Search {

    jsonPath = './db/database.json';

    constructor() {
        this.history = [];
        this.readJson()
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

    async searchClimate(lat = '', long = '') {
        const response = await getWeatherByGeo(lat, long);

        const { weather, main } = response;

        return {
            desc: weather[0]?.description,
            min: main.temp_min,
            max: main.temp_max,
            temp: main.temp
        }
    }

    addHistory(place = '') {

        if (this.history.includes(place.toLocaleLowerCase())) {
            return;
        }

        this.history.unshift(place.toLocaleLowerCase());
        this.saveInJson()
    }

    saveInJson() {
        const payload = {
            history: this.history
        }


        fs.writeFileSync(this.jsonPath, JSON.stringify(payload));
    }

    readJson() {
        if (!fs.existsSync(this.jsonPath)) {
            return;
        }

        const info = fs.readFileSync(this.jsonPath, { encoding: 'utf-8' });
        const data = JSON.parse(info);

        this.history = data.history
    }
}


module.exports = Search;