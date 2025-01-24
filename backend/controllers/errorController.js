// Function to handle duplicated document errors
function DuplicatedError(err, res) {
  res.status(err.statusCode || 500).json({
    error: 'Document already exists',
  });
}


function regularError(err, res) {
  res.status(err.statusCode || 500).json({
    error: `${err.message}`,
  });
}

// Function to handle invalid document ID (e.g., not found or invalid format)
function invalidIdError(err, res) {
  res.status(404).json({
    error: 'Document not found or invalid ID format',
  });
}

// Centralized error handling middleware
module.exports = (err, req, res, next) => {
  // Check if the error message contains the MongoDB duplicate error code
  if (err.message?.includes('E11000')) {
    err.statusCode = 409;
    return DuplicatedError(err, res);
  }

  // Check if the error is related to an invalid ObjectId or document not found
  if (err.name === 'CastError' || err.message?.includes('not found')) {
    return invalidIdError(err, res);
  }

  // Handle other types of errors
  regularError(err, res);
};
