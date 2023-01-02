const express = require('express');
const { register, login, getProfile, setProfile, setProfileImage, getUserList } = require('../controllers/userController');
const { authenticate } = require('../middleware/authenticate');
const { userType } = require('../middleware/userType');
const user = express.Router();
const multerUpload = require('../utilities/multer');
const { uploadImageToFirebase } = require('../services/uploadImage');

/**
  * @swagger
  * /users/register:
  *   post:
  *     produces:
  *       - application/json
  *     consumes:
  *       - application/json
  *     parameters:
  *       - in: body
  *         name: body
  *         description: Registration Details Required
  *         required: true
  *         schema:
  *          type: object
  *          properties:
  *             email:
  *               type: string
  *             password:
  *               type: string
  *             type:
  *               enum: [Admin, Regular]
  *     responses:
  *         200:
  *           description: Registration Successfull.
  */
user.post('/register', register);

/**
  * @swagger
  * /users/login:
  *   post:
  *     produces:
  *       - application/json
  *     consumes:
  *       - application/json
  *     parameters:
  *       - in: body
  *         name: body
  *         description: Login Details Required
  *         required: true
  *         schema:
  *          type: object
  *          properties:
  *             email:
  *               type: string
  *             password:
  *               type: string
  *     responses:
  *         200:
  *           description: Login Successfull.
  */
user.post('/login', login);

/**
  * @swagger
  * /users/profile:
  *   get:
  *     produces:
  *       - application/json
  *     consumes:
  *       - application/json
  *     responses:
  *         200:
  *           description: Profile Fetched Successfully.
  */
user.get('/profile', authenticate, getProfile);

/**
  * @swagger
  * /users/profile:
  *   post:
  *     produces:
  *       - application/json
  *     consumes:
  *       - application/json
  *     parameters:
  *       - in: body
  *         name: body
  *         description: Profile Details
  *         schema:
  *          type: object
  *          properties:
  *             name:
  *               type: string
  *             mobile:
  *               type: string
  *             address:
  *                 type: array
  *                 items:
  *                     type: object
  *                     properties:
  *                         addressLine1:
  *                               type: string   
  *                         city:
  *                               type: string
  *                         state:
  *                               type: string
  *                         country:
  *                               type: string
  *                         pincode:
  *                               type: string
  *     responses:
  *         200:
  *           description: Profile Created Successfully.
  */
user.post('/profile', authenticate, setProfile);

/**
  * @swagger
  * /users/profileImage:
  *   post:
  *     produces:
  *       - application/json
  *     consumes:
  *       - multipart/form-data
  *     parameters:
  *       - in: body
  *         name: body
  *         description: Profile Pic Required
  *         required: true
  *         schema:
  *          type: object
  *          properties:
  *             file: 
  *                 type: object
  *     responses:
  *         200:
  *           description: Image uploaded Successfull.
  */
user.post('/profileImage', authenticate, multerUpload.single('file'), uploadImageToFirebase, setProfileImage);

/**
  * @swagger
  * /users/list:
  *   post:
  *     produces:
  *       - application/json
  *     consumes:
  *       - application/json
  *     parameters:
  *       - in: body
  *         name: body
  *         description: Paggination Details
  *         schema:
  *          type: object
  *          properties:
  *             limit:
  *               type: number
  *             page:
  *               type: number
  *             search:
  *               type: object
  *               properties:
  *                 email: 
  *                     type: string
  *                 name:
  *                     type: string
  *                 mobile:
  *                     type: string
  *                 type:
  *                     enum: [Admin, Regular]
  *             sort:
  *                 enum: [asc, desc]
  *             select: 
  *                 type: array
  *                 items:
  *                     type: string
  *     responses:
  *         200:
  *           description: User List Fetched Successfully.
  */
user.post('/list', authenticate, userType, getUserList);

module.exports = user;