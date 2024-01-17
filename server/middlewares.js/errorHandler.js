function errorHandler(error, req, res, next) {
    let statusCode = 500;
    let message = `Internal Server Error`;

    switch (error.name) {
        case 'Name is required':
            statusCode = 400
            message = error.name
            break
        case 'Email is required':
            statusCode = 400
            message = error.name
            break
        case 'Password is required':
            statusCode = 400
            message = error.name
            break
        case 'Mobile Phone is required':
            statusCode = 400
            message = error.name
            break
        case 'Address is required':
            statusCode = 400
            message = error.name
            break
        case 'Name must be at least 4 characters':
            statusCode = 400
            message = error.name
            break
        case 'Email is invalid':
            statusCode = 400
            message = error.name
            break
        case 'Mobile Phone is invalid':
            statusCode = 400
            message = error.name
            break
        case "This email has already been registered":
            statusCode = 400
            message = error.name
            break
        case 'No user found with this email':
            statusCode = 404
            message = error.name
            break
        default:
            break;
    }

    res.status(statusCode).json({ message: message });
}

module.exports = { errorHandler };
