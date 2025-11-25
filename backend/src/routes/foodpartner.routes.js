const express = require('express');
const foodPartnerController = require('../controllers/foodpartner.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

router.get('/:id',
    authMiddleware.authenticateFoodPartner,
    foodPartnerController.getFoodPartnerById
);

module.exports = router;
