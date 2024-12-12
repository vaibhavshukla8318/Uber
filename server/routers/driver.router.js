// driver routes

const express = require('express');
const {body} = require('express-validator');
const driverController = require('../controllers/driver.controller');
const router = express.Router();

router.route('/register').post(
  [
    body('fullname.firstname').isLength({ min: 3 }).withMessage('Firstname must be atleast 3 characters long'),
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').isLength({ min: 8 }).withMessage('Password must be atleast 8 characters long'),
    body('vehicle.color').isLength({min: 3 }).withMessage('color must be atleast 3 characters long'),
    body('vehicle.plate').isLength({min: 3 }).withMessage('plate must be atleast 3 characters long'),
    body('vehicle.capacity').isInt({min: 1}).withMessage('capacity must be atleast 1'),
    body('vehicle.vehicleType').isIn(['car', 'bike', 'auto']).withMessage('Invalid vehicle type')
  ],
  driverController.registerDriver
)

module.exports = router;