const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_KEY_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'wanderlust_DEV',
      allowedFormats: ["png","jpg","jpeg"] ,
//the above two lines are basically for telling the code that in the cloudinary platform we are going to create a folder names a wanderlust_DEV
//(which basicallyr efers to our wanderlust app in out development phase) and then we are going to store png,jpg,jpeg files in it
    },
  });

  module.exports={
    cloudinary,
    storage,
  };