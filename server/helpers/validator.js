const validator = require('validator')

function validateRegister({ name, email, password, mobilePhone, address }) {
    let isNameNotEmpty = validator.isEmpty(name)
    if (isNameNotEmpty) {
        throw { name: 'Name is required' }
    }
    let isEmailNotEmpty = validator.isEmpty(email)
    if (isEmailNotEmpty) {
        throw { name: 'Email is required' }
    }
    let isPasswordNotEmpty = validator.isEmpty(password)
    if (isPasswordNotEmpty) {
        throw { name: 'Password is required' }
    }
    let isMobilePhoneNotEmpty = validator.isEmpty(mobilePhone)
    if (isMobilePhoneNotEmpty) {
        throw { name: 'Mobile Phone is required' }
    }
    let isAddressNotEmpty = validator.isEmpty(address)
    if (isAddressNotEmpty) {
        throw { name: 'Address is required' }
    }
    let checkLengthName = validator.isLength(name, { min: 4 })
    if (!checkLengthName) {
        throw { name: 'Name must be at least 4 characters' }
    }
    let isEmail = validator.isEmail(email)
    if (!isEmail) {
        throw { name: 'Email is invalid' }
    }
    let isValidMobilePhone = validator.isMobilePhone(mobilePhone, ['id-ID'])
    if (!isValidMobilePhone) {
        throw { name: 'Mobile Phone is invalid' }
    }
}

function validateEmail(email) {
    let isEmailNotEmpty = validator.isEmpty(email)
    if (isEmailNotEmpty) {
        throw { name: 'Email is required' }
    }
    let isEmail = validator.isEmail(email)
    if (!isEmail) {
        throw { name: 'Email is invalid' }
    }
}

function validateInputUpdate({ name, email, mobilePhone, address }) {
    let isNameNotEmpty = validator.isEmpty(name)
    if (isNameNotEmpty) {
        throw { name: 'Name is required' }
    }
    let isEmailNotEmpty = validator.isEmpty(email)
    if (isEmailNotEmpty) {
        throw { name: 'Email is required' }
    }
    let isMobilePhoneNotEmpty = validator.isEmpty(mobilePhone)
    if (isMobilePhoneNotEmpty) {
        throw { name: 'Mobile Phone is required' }
    }
    let isAddressNotEmpty = validator.isEmpty(address)
    if (isAddressNotEmpty) {
        throw { name: 'Address is required' }
    }
    let checkLengthName = validator.isLength(name, { min: 4 })
    if (!checkLengthName) {
        throw { name: 'Name must be at least 4 characters' }
    }
    let isEmail = validator.isEmail(email)
    if (!isEmail) {
        throw { name: 'Email is invalid' }
    }
    let isValidMobilePhone = validator.isMobilePhone(mobilePhone, ['id-ID'])
    if (!isValidMobilePhone) {
        throw { name: 'Mobile Phone is invalid' }
    }
}

module.exports = {
    validateRegister,
    validateEmail,
    validateInputUpdate,
}