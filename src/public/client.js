/**
 * Clears cookies set by this website by setting them to expire at the dawn of time
 */
function clearCookies(){
    document.cookie = 'username= ; expires = Thu, 01 Jan 1970 00:00:00 GMT';
    document.cookie = 'session= ; expires = Thu, 01 Jan 1970 00:00:00 GMT';
}

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
        var ad = document.querySelector('#join-ad');
        if(ad) ad.innerHTML = "";


        var logoutButton = document.querySelector('#logout');
        logoutButton.classList.remove('hidden'); //reveals this button
        logoutButton.addEventListener('click', function(){ //clears session details on click
            clearCookies();
            window.location = '/';
        });

        var accountButton = document.querySelector('#display-profile');
        accountButton.classList.remove('hidden'); //reveals this button
        accountButton.addEventListener('click', function(){ //clears session details on click
            window.location = '/user/' +getCookie('username').substring(1).slice(0,-1);
        });
    }

}


main();
