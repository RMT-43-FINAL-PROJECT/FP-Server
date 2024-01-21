function errorHandler(error, req, res, next) {
  //   console.log(error);
  let statusCode = 500;
  let message = `Internal Server Error`;

  switch (error.name) {
    case "Name is required":
      statusCode = 400;
      message = error.name;
      break;
    case "Email is required":
      statusCode = 400;
      message = error.name;
      break;
    case "Password is required":
      statusCode = 400;
      message = error.name;
      break;
    case "Mobile Phone is required":
      statusCode = 400;
      message = error.name;
      break;
    case "Address is required":
      statusCode = 400;
      message = error.name;
      break;
    case "Name must be at least 4 characters":
      statusCode = 400;
      message = error.name;
      break;
    case "Email is invalid":
      statusCode = 400;
      message = error.name;
      break;
    case "Mobile Phone is invalid":
      statusCode = 400;
      message = error.name;
      break;
    case "This email has already been registered":
      statusCode = 400;
      message = error.name;
      break;
    case "Missing required fields":
      statusCode = 400;
      message = error.name;
      break;
    case "Role is invalid":
      statusCode = 400;
      message = error.name;
      break;
    case "Invalid email/password":
      statusCode = 401;
      message = error.name;
      break;
    case "Invalid Token":
      statusCode = 401;
      message = error.name;
      break;
    case "Forbidden Access. Admin only":
      statusCode = 403;
      message = error.name;
      break;
    case "Forbidden Access. Admin && related Sales only":
      statusCode = 403;
      message = error.name;
      break;
    case "No user found with this email":
      statusCode = 404;
      message = error.name;
      break;
    case "No user found with this ID":
      statusCode = 404;
      message = error.name;
      break;
    case "Product Not Found":
      statusCode = 404;
      message = error.name;
      break;
    case "No store found with this ID":
      statusCode = 404;
      message = error.name;
      break;
    case "Photo is required":
      statusCode = 400;
      message = error.name;
      break;
    case "Store name is already registered":
      statusCode = 400;
      message = error.name;
      break;
    case "Store name is required":
      statusCode = 400;
      message = error.name;
      break;
    case "Store address is required":
      statusCode = 400;
      message = error.name;
      break;
    case "Store longitude & latitude is required":
      statusCode = 400;
      message = error.name;
      break;
    case "Store owner's name is required":
      statusCode = 400;
      message = error.name;
      break;
    case "Store mobile phone is required":
      statusCode = 400;
      message = error.name;
      break;
    case "No user found":
      statusCode = 404;
      message = error.name;
      break;
    case "No order found with this ID":
      statusCode = 404;
      message = error.name;
      break;
    case "BSONError":
      statusCode = 400;
      message = error.message;
      break;
  }

  res.status(statusCode).json({ message: message });
}

module.exports = { errorHandler };
