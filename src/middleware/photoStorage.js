/* eslint-disable import/no-extraneous-dependencies */
import multer from 'multer';

export const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'event_assets/');
  },
  filename(req, file, cb) {
    cb(null, Date.now()+'-'+ file.originalname);
  },
});

const upload = multer({ dest: 'event_assets/', storage: storage });
export const uploaded = upload.fields([{name: 'backdropImage', maxCount: 1}, {name: 'Gallery', maxCount: 8}]);