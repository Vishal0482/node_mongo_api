const express = require('express');
const { register, login, getProfile, setProfile, setProfileImage, getUserList } = require('../controllers/userController');
const { authenticate } = require('../middleware/authenticate');
const { userType } = require('../middleware/userType');
const user = express.Router();
const multerUpload = require('../utilities/multer');
const { uploadImageToFirebase } = require('../services/uploadImage');

user.post('/register', register);
user.post('/login', login);

user.get('/profile', authenticate, getProfile);
user.post('/profile', authenticate, setProfile);
user.post('/profileImage', authenticate, multerUpload.single('file'), uploadImageToFirebase, setProfileImage);

user.post('/list', authenticate, userType, getUserList);

module.exports = user;