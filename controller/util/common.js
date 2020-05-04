exports.correctUserInfo = correctUserInfo;

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