import multer from 'multer';
import { USER } from '../../models';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDNAME,
  api_key: process.env.APIKEY,
  api_secret: process.env.APISECRET,
});

// Define multer storage engine
export const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'event_assets/');
  },
  filename(req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

// Create multer upload middleware with the defined storage engine
const upload = multer({ storage: storage }).fields([
  { name: 'backdropImage', maxCount: 1 },
  { name: 'Gallery', maxCount: 8 },
]);

// Export the upload middleware for use in routes
export { upload };

//get all users in the database
export const All = async(req,res)=>{
  try {
    let page = parseInt(req.query.page);
    let limit = parseInt(req.query.limit);
    let skipIndex = (page - 1) * limit;
    let results = {};
    let count = await USER.countDocuments();
    if (page === 1) {
      results.previous = null;
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }
    if (skipIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }
    results.totalPages = Math.ceil(count / limit);
    results.totalEntries = count;
    results.currentPage = page;
    results.limit = limit;
    results.data = await USER.find().limit(limit).skip(skipIndex);
    res.status(200).json(results);
    } catch (error) {
    console.log("error",error);
    res.status(409).json({
      message:"internal server error"
    })
  }
}

//find one user in the database by email
export const getUserByEmail = async(req,res)=>{
  const email = req.params.email;
  try {
    let userData = await USER.findOne({email: email});
    res.status(200).json(userData); 

} catch (error) {
    console.log("error",error);
    res.status(409).json({
      message:"internal server error"
    })
  }
}

// Handler function to update user by email
export const updateByEmail = async (req, res) => {
  try {
    // Execute multer upload middleware to handle file uploads
    upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({
          message: 'Error uploading files',
          error: err.message,
        });
      }

      const email = req.params.email;

      // Check if no files were provided
      if (!req.files) {
        return res.status(400).json({
          message: 'No files provided',
        });
      }

      let imagesArray = [];
      let dropImages = '';

      // Upload backdrop image to Cloudinary if provided
      if (req.files['backdropImage'] && req.files['backdropImage'][0]) {
        dropImages = (await cloudinary.uploader.upload(
          req.files['backdropImage'][0].path
        )).secure_url;
      }

      // Upload gallery images to Cloudinary if provided
      if (req.files.Gallery && req.files.Gallery.length > 0) {
        for (let index = 0; index < req.files.Gallery.length; index++) {
          imagesArray.push(
            (await cloudinary.uploader.upload(
              req.files.Gallery[index].path
            )).secure_url
          );
        }
      }

      // Update user in the database with the uploaded images
      let updatedUser = await USER.findOneAndUpdate(
        { email: email },
        { ...req.body, Gallery: imagesArray, backdropImage: dropImages }
      );

      // If no user was found, return a 404 error
      if (!updatedUser) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Return the updated user
      return res.status(200).json(updatedUser);
    });
  } catch (error) {
    console.error('Error updating user:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteUser = async (req, res) => {
  const email = req.params.email;
  try {
    const deletedUser = await USER.deleteOne({ email: email });

    if (deletedUser.deletedCount === 0) {
      return res.status(404).json({ message: `User with email:${email} not found` });
    }

    res.status(200).json({ message: `User with email:${email} successfully deleted` });
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
