const { v2: cloudinary } = require('cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const isConfigured = () =>
  Boolean(
    process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET
  );

/**
 * Upload a buffer to Cloudinary (listings folder).
 * @param {Buffer} buffer
 * @param {string} [folder]
 * @returns {Promise<{ url: string, publicId: string }>}
 */
const uploadBuffer = (buffer, folder = 'udyammittar/listings') =>
  new Promise((resolve, reject) => {
    if (!isConfigured()) {
      reject(new Error('Cloudinary is not configured. Add credentials to .env'));
      return;
    }
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: 'image',
        transformation: [{ quality: 'auto', fetch_format: 'auto' }],
      },
      (error, result) => {
        if (error) {
          reject(error);
          return;
        }
        resolve({
          url: result.secure_url,
          publicId: result.public_id,
        });
      }
    );

    stream.end(buffer);
  });

module.exports = { cloudinary, uploadBuffer, isConfigured };
