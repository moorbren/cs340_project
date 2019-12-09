const fs = require('fs');

/**
 * Discovers handlebar views to prevent non-existant page rendering. 
 * @param {*} path 
 */
function discoverViews(path){
    var hashTable = new Object();

    //looping through all files in the directory from the path.
    //if they contain a .hbs extension, we add it to the view hashtable
    fs.readdirSync(path).filter(function (value, index, arr){
        if(arr[index].search('.hbs') == arr[index].length - 4){
        hashTable[arr[index]] = true; //seeding the hashtable

        return true;
        }

        return false;
    });

    return hashTable;
}

exports.discoverViews = discoverViews;