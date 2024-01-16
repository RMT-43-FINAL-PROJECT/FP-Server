function errorHandler(err, req, res, next) {
  let statusCode = 500;
  let message = `Internal Server Error`;

  switch (err.name) {
    default:
      break;
  }

  res.status(statusCode).json({ message: message });
}

module.exports = { errorHandler };
