const { leerInput, inquirerMenu, pausa, listPlaces } = require("./helpers/inquirer");
const Search = require("./models/search");




const main = async () => {

    const searchs = new Search();
    let opc = "";

    do {
        opc = await inquirerMenu();

        switch (opc) {
            case '1':
                const city = await leerInput("Introduce la ciudad a buscar: \n")
                const places = await searchs.searchCity(city);
                const placeSelectedId = await listPlaces(places)

                if (placeSelectedId === '0') {
                    continue;
                }

                const selectedPlace = places.find(item => item.id === placeSelectedId)
                const { _, name, lng, lat } = selectedPlace;

                searchs.addHistory(name);

                console.log(`\n Informacion de la ciudad `.green);
                console.log(`Ciudad: ${name}`);
                console.log(`Latitud: ${lat}`);
                console.log(`Longitud: ${lng}`);


                const weatherResponse = await searchs.searchClimate(lat, lng);
                console.log(`Temperatura: ${weatherResponse.temp}`);
                console.log(`Minima: ${weatherResponse.min}`);
                console.log(`Maxima: ${weatherResponse.max}`);
                console.log(`Descripcion: ${weatherResponse.desc}`);
                break;
            case '2':
                console.log("Historial".green)
                searchs.history.forEach((place, i) => {
                    console.log(`${i + 1}: ${place}`)
                })
                break;

        }

        await pausa();
    } while (opc !== '0')

}

main();