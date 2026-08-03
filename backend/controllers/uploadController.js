const { uploadBuffer, isConfigured } = require('../config/cloudinary');

// Upload one or more listing images to Cloudinary
exports.uploadImages = async (req, res) => {
  try {
    if (!isConfigured()) {
      return res.status(503).json({
        message:
          'Image upload is not configured. Add CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET to the server .env',
      });
    }

    const files = req.files || [];
    if (files.length === 0) {
      return res.status(400).json({ message: 'Please select at least one image' });
    }

    const uploads = await Promise.all(files.map((file) => uploadBuffer(file.buffer)));

    res.status(200).json({
      success: true,
      count: uploads.length,
      images: uploads.map((u) => u.url),
      urls: uploads.map((u) => u.url),
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || 'Failed to upload images',
    });
  }
};
