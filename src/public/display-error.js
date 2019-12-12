var errorField = document.querySelector('#err-message');

if(errorField){
    const urlParams = new URLSearchParams(window.location.search);
    var query = urlParams.get('err');
    if(query && query != ""){
        errorField.classList.remove('hidden');
        errorField.textContent = query;
    }
}