// user router

const express = require('express');
const {body} = require('express-validator');
const userController = require('../controllers/user.controller')
const authMiddleware = require('../middlewares/auth.middleware')
const router = express.Router();

router.route('/register').post(
  [
  body('fullname.firstname').isLength({ min: 3 }).withMessage('firstname must be atleast 3 characters long'),
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('password').isLength({ min: 8 }).withMessage('Password must be atleast 8 characters long')
],
 userController.registerUser
);

router.route('/login').post(
[
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('password').isLength({ min: 8 }).withMessage('Password must be atleast 8 characters long')
],
userController.loginUser
)

router.route('/profile').get(
  authMiddleware.authUser,
  userController.getUserProfile
)

router.route('/logout').get(
  authMiddleware.authUser,
  userController.logoutUser
)

module.exports = router;