import { EVENT } from '../../models';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDNAME,
  api_key: process.env.APIKEY,
  api_secret: process.env.APISECRET,
});

export const createEvent = async (req, res) => {
  try {
    if (!req.files) {
      return res.status(400).json({
        message: 'No files provided',
      });
    }

    let imagesArray = [];
    let dropImages = "";

    if (req.files['backdropImage'] && req.files['backdropImage'][0]) {
      dropImages = (await cloudinary.uploader.upload(req.files['backdropImage'][0].path)).secure_url;
    }

    if (req.files.Gallery && req.files.Gallery.length > 0) {
      for (let index = 0; index < req.files.Gallery.length; index++) {
        imagesArray.push((await cloudinary.uploader.upload(req.files.Gallery[index].path)).secure_url);
      }
    }

    let add = await EVENT.create({ ...req.body, Gallery: imagesArray, backdropImage: dropImages });

    if (!add) {
      return res.status(404).json({
        message: 'Failed to add Event',
      });
    }

    res.status(201).json({
      message: 'Event created successfully',
      data: add,
    });
  } catch (error) {
    console.log('error', error);
    res.status(500).json({
      message: error.message,
    });
  }
};


