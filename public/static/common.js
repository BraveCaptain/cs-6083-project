function formContentToJson(form) {
    var res = {};
    var tmp = form.serializeArray();
    tmp.forEach(function (item) {
        res[item.name] = item.value;
    });
    return res;
}

function validateUserInput(input) {
    if(input.userid.trim().length == 0) {
        alert('please enter user id')
        return false;
    }
    if(input.password.trim().length == 0) {
        alert('please enter password')
        return false;
    }
    return true;
}
