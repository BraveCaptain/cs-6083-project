function formContentToJson(form) {
    var res = {};
    var tmp = form.serializeArray();
    tmp.forEach(function (item) {
        res[item.name] = item.value;
    });
    console.log(res)
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

function validateUserRegisterInput(input) {
    if(input.userid.trim().length == 0 || input.password1.trim().length == 0 || input.password2.trim().length == 0
    || input.fname.trim().length == 0 || input.lname.trim().length == 0 || input.state.trim().length == 0 
    || input.city.trim().length == 0 || input.street.trim().length == 0 || input.zipcode.trim().length == 0) {
        alert('Necessary information is missing')
        return false;
    }

    if(input.password1.trim() != input.password2.trim()) {
        alert('Two passwords are not the same, please check your password!')
        return false;
    }

    return true;
}

function validateAdminRegisterInput(input) {
    if(input.userid.trim().length == 0 || input.password1.trim().length == 0 
    || input.password2.trim().length == 0) {
        alert('Necessary information is missing')
        return false;
    }

    if(input.password1.trim() != input.password2.trim()) {
        alert('Two passwords are not the same, please check your password!')
        return false;
    }

    return true;
}

function validateUserUpdateInput(input) {
    console.log('update checker')
    if(input.password1.trim().length == 0 || input.password2.trim().length == 0
    || input.fname.trim().length == 0 || input.lname.trim().length == 0 || input.state.trim().length == 0 
    || input.city.trim().length == 0 || input.street.trim().length == 0 || input.zipcode.trim().length == 0) {
        alert('Necessary information is missing')
        return false;
    }

    if(input.password1.trim() != input.password2.trim()) {
        alert('Two passwords are not the same, please check your password!')
        return false;
    }

    return true;
}
