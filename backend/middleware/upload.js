const multer = require('multer');

const storage = multer.memoryStorage();

const fileFilter = (_req, file, cb) => {
  if (!file.mimetype?.startsWith('image/')) {
    cb(new Error('Only image files are allowed'), false);
    return;
  }
  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB per file
    files: 10,
  },
});

module.exports = upload;
