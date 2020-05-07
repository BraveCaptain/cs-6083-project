exports.correctUserInfo = correctUserInfo;
exports.getMonthDifference = getMonthDifference;
exports.correctHomeInfo = correctHomeInfo;
exports.correctAutoInfo = correctAutoInfo;

function correctUserInfo(userInfo) {
    switch (userInfo.gender) {
        case null:
            userInfo.gender = 'N/A';
            break;
        case 'M':
            userInfo.gender = 'Male';
            break;
        case 'F':
            userInfo.gender = 'Female';
            break;
        default:
            break;
    }
    switch (userInfo.maritalstatus) {
        case 'M':
            userInfo.maritalstatus = 'Married';
            break;
        case 'S':
            userInfo.maritalstatus = 'Single';
            break;
        case 'W':
            userInfo.maritalstatus = 'Widow';
            break;
        default:
            break;
    }
}

function correctHomeInfo(homeInfos) { 
    for(var i = 0; i < homeInfos.length; ++i) {
        switch(homeInfos[i].type) {
            case('S'): {
                homeInfos[i].type = 'Single Family';
                break;
            };
            case('M'): {
                homeInfos[i].type = 'Multi Family';
                break;
            }
            case('C'): {
                homeInfos[i].type = 'Condominium';
                break;
            }
            case('T'): {
                homeInfos[i].type = 'Town House';
                break;
            }
            default: {
                break;
            }
        }
        switch(homeInfos[i].autofirenotification) {
            case ('1'): {
                homeInfos[i].autofirenotification = "true";
                break;
            }
            case ('0'): {
                homeInfos[i].autofirenotification = "false";
                break;
            }
            default: {
                break;
            }
        }
        switch(homeInfos[i].securitysystem) {
            case ('1'): {
                homeInfos[i].securitysystem = "true";
                break;
            }
            case ('0'): {
                homeInfos[i].securitysystem = "false";
                break;
            }
            default: {
                break;
            }
        }
        switch(homeInfos[i].swimmingpool) {
            case ('U'): {
                homeInfos[i].swimmingpool = "Underground";
                break;
            }
            case ('O'): {
                homeInfos[i].swimmingpool = "Overground";
                break;
            }
            case ('I'): {
                homeInfos[i].swimmingpool = "Indoor";
                break;
            }
            case ('M'): {
                homeInfos[i].swimmingpool = "Multiple";
                break;
            }
            default: {
                break;
            }
        }
        switch(homeInfos[i].basement) {
            case ('1'): {
                homeInfos[i].basement = "true";
                break;
            }
            case ('0'): {
                homeInfos[i].basement = "false";
                break;
            }
            default: {
                break;
            }
        }
    }

}

function correctAutoInfo(autoInfos) {
    for (var i = 0; i < autoInfos.length; ++i) {
        switch(autoInfos[i].staus){
            case('L'): {
                autoInfos[i].staus = 'Leased';
                break;
            }
            case('F'): {
                autoInfos[i].staus = 'Financed';
                break;
            }
            case('O'): {
                autoInfos[i].staus = 'Owned';
                break;
            }
            default: {
                break;
            }
        }
    }
}

function getMonthDifference(date1, date2) {
    return (Date.parse(date2) - Date.parse(date1)) / (1000 * 60 * 60 * 24 * 30);
}