// ride.router

const express = require('express');
const router = express.Router();
const {body, query} = require('express-validator');
const rideController = require('../controllers/ride.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/create',
  authMiddleware.authUser,
  body('pickup').isString().isLength({min: 3}).withMessage('Invalid pickup addredd'),
  body('destination').isString().isLength({min: 3}).withMessage('Invalid destination address'),
  body('vehicleType').isString().isIn(['auto', 'car', 'bike']).withMessage('Invalid vehicle type'),
  rideController.createRide
)

router.get('/get-fare',
  authMiddleware.authUser,
  query('pickup').isString().isLength({min: 3}).withMessage('Invalid pickup addredd'),
  query('destination').isString().isLength({min: 3}).withMessage('Invalid destination address'),
  rideController.getFare
)

router.post('/confirm', 
  authMiddleware.authDriver,
  body('rideId').isMongoId().withMessage('Invalid ride id'),
  rideController.confirmRide
)


router.get("/start-ride",
  authMiddleware.authDriver,
  query('rideId').isMongoId().withMessage('Invalid ride id'),
  query('otp').isString().isLength({min:6, max:6}).withMessage("Invalid otp"),
  rideController.startRide
)



module.exports = router