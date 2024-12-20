const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const rideController = require('../controllers/ride.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/create',
  authMiddleware.authUser,
  body('pickup').isString().isLength({min: 3}).withMessage('Invalid pickup addredd'),
  body('destination').isString().isLength({min: 3}).withMessage('Invalid destination address'),
  body('vehicleType').isString().isIn(['auto', 'car', 'bike']).withMessage('Invalid vehicle type'),
  rideController.createRide
)


module.exports = router