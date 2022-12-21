const multer = require('multer');
const multerStorage = multer.memoryStorage();
const multerUpload = multer({ multerStorage });

module.exports = multerUpload;