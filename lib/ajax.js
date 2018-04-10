function GetCruiseInfo(callback) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if(xhr.readyState == 4) {
            try {
                callback(JSON.parse(xhr.responseText));
            } catch (err){
                console.error(err)
                callback();
            }
        }
    }
    xhr.open('GET', './data/cruise.json');
    xhr.send();
}

function GetUserInfo(callback) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if(xhr.readyState == 4) {
            try {
                callback(JSON.parse(xhr.responseText));
            } catch (err){
                console.error(err)
                callback();
            }
        }
    }
    xhr.open('GET', './data/user.json');
    xhr.send();
}