console.log("client js loaded.");

/**
 * Extracts the value of a cookie based on the name. If non-existant, returns undefined
 * Snagged from the internet. 
 * @param {*} name 
 */
function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
}

function main(){
    var session = getCookie('session');
    var username = getCookie('username');

    if(session && username){
        console.log('User session exists, prepping page.');
        document.querySelector('#login').classList.add('hidden');
        document.querySelector('#display-profile').classList.remove('hidden');
        document.querySelector('#logout').classList.remove('hidden');
    }

}


main();