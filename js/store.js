function Storage() {

}

function _getCruise() {
    var str = window.localStorage.getItem('cruise');
    try {
        var cruise = JSON.parse(str);
    } catch (err) {
        console.error(err)
    }

    if (!cruise) {
        cruise = { Agents: [], Category: 0 };
    }
    return cruise;
}

function _setCruise(cruise) {
    window.localStorage.setItem('cruise', JSON.stringify(cruise));
}

function SetCategory(category) {
    var cruise = _getCruise();
    cruise.Category = category;
    _setCruise(cruise);
}

function GetCategory() {
    var cruise = _getCruise();
    return cruise.Category;
}