const express = require('express');
const { register, login, getProfile, setProfile, setProfileImage, getUserList } = require('../controllers/userController');
const { authenticate } = require('../middleware/authenticate');
const { userType } = require('../middleware/userType');
const user = express.Router();

user.post('/register', register);
user.post('/login', login);

user.get('/profile', authenticate, getProfile);
user.post('/profile', authenticate, setProfile);
user.post('/profileImage', authenticate, setProfileImage);

user.get('/list', authenticate, userType, getUserList);

module.exports = user;