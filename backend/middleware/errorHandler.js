const errorHandler = (err, req, res, next) => {
  console.error(err);

  if (err.name === 'MulterError') {
    const message =
      err.code === 'LIMIT_FILE_SIZE'
        ? 'Each image must be under 5 MB'
        : err.code === 'LIMIT_FILE_COUNT'
          ? 'You can upload up to 10 images'
          : err.message;
    return res.status(400).json({ success: false, message });
  }

  if (err.message === 'Only image files are allowed') {
    return res.status(400).json({ success: false, message: err.message });
  }

  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';

  res.status(status).json({
    success: false,
    message,
    error: process.env.NODE_ENV === 'development' ? err : {},
  });
};

module.exports = errorHandler;
