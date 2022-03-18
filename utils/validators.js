function emailValidator(value) {
    return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(value)
}

function minMaxStringLengthValidator(value,min,max){
    return value.length <= max && min <= value.length;
}



module.exports = {emailValidator, minMaxStringLengthValidator}