function GetCruiseInfo(t){var e=new XMLHttpRequest;e.onreadystatechange=function(){if(4==e.readyState)try{t(JSON.parse(e.responseText))}catch(e){console.error(e),t()}},e.open("GET","./data/cruise.json"),e.send()}function GetUserInfo(t){var e=new XMLHttpRequest;e.onreadystatechange=function(){if(4==e.readyState)try{t(JSON.parse(e.responseText))}catch(e){console.error(e),t()}},e.open("GET","./data/user.json"),e.send()}