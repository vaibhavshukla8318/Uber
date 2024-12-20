const express = require('express');
const authMiddleware = require('../middlewares/auth.middleware')
const mapController = require('../controllers/maps.controller')
const {query} = require('express-validator');
const router = express.Router();

router.route('/get-coordinate').get(
  query('address').isString().isLength({min: 3}),
  authMiddleware.authUser,
  mapController.getCoordinates
)

router.get('/get-distance-time', 
  query('origin').isString().isLength({min: 3}),
  query('destination').isString().isLength({min: 3}),
  authMiddleware.authUser,
  mapController.getDistanceTime
)

router.get("/get-suggstions",
  query('input').isString().isLength({min: 3}),
  authMiddleware.authUser,
  mapController.getAutoCompleteSuggestions
)


module.exports = router;