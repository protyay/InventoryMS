const validator = require('validator');

const checkValidName = (name)=> {

    if(!validator.isAlpha(name)){
        return false
      }
      return true
    }

const checkValiEmail = (email)=>{
    if(!validator.isEmail(email)){
        return false
    }
    return true
}

const checkPasswordLength = (password)=>{
    if(!validator.isLength(password,{min:12,max:15})){
        return false
    }
    return true
}

const allowNameWithSpace = (value)=>{
    if(!value.match(/^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/)){
        return false
    }
    return true
}

const checkNumericValue = (value)=>{
    if(!validator.isNumeric(value)){
        return false
    }
    return true
}

const checkEmptyString = (value)=>{
    if(!validator.isEmpty(value)){
        return false
    }
    return true
}
module.exports = {
    checkValidName,
    checkValiEmail,
    checkPasswordLength,
    allowNameWithSpace,
    checkNumericValue,
    checkEmptyString
}
