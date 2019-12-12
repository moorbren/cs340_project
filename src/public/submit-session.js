var sessionBox = document.querySelector('#session-submit');
var usernameBox = document.querySelector('#username-submit');

if(sessionBox && usernameBox){
    console.log('session exists')
    sessionBox.value = getCookie('session');
    usernameBox.value = getCookie('username');
}