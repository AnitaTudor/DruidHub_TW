/*

 CREATING EXPANSIONS 

*/


function create_expansions() {
    var expansions = {

        values: []
    };

    expansions.values.push({
        id: 1,
        description: 'mists_of_pandaria',
        image: 'test',
        categorie: 'panda',
        price: 7,
        date: 17,
        dificultate: 'medium',
        social_network: 'instagram',
        multyplayer: 1
    });

    var json = JSON.stringify(expansions);

    var fs = require('fs');
    fs.writeFile('../json_data_files/wow_expansions.json', json, 'utf8', callback);
}