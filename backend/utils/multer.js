const multer = require('multer');

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/img/');
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    const fileName = `user-${req.user.id}-${Date.now()}.${ext}`;
    cb(null, fileName);
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.split('/')[0] == 'image') {
    cb(null, true);
  } else {
    cb(new AppError('Invalid file Please upload image', 401), false);
  }
};

const uploadImg = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});
