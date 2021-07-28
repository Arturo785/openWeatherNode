const { leerInput, inquirerMenu, pausa } = require("./helpers/inquirer");
const Search = require("./models/search");





const main = async() => {

    const searchs = new Search();
    let opc = "";

    do{
        opc = await inquirerMenu();

        switch (opc) {
            case '1':
                const city = await leerInput("Introduce la ciudad a buscar: \n")
                const places = await searchs.searchCity(city);
                break;
            case '2':
                console.log("Historial")
                break;
        
        }

        await pausa();
    } while(opc !== '0')

}

main();