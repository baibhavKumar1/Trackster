require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

cloudinary.config({
  secure: true,
  cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret,
});

const uploadToCloudinary = async (filepath) => {
  try {
    const result = await cloudinary.uploader.upload(filepath);
    return result.secure_url;
  } catch (error) {
    console.error(1,error.message);
  } finally {
    fs.unlinkSync(filepath);
  }
};

module.exports = uploadToCloudinary;