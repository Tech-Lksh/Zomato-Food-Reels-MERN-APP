const express = require('express');
const foodController = require('../controllers/food.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const multer = require('multer');
const router = express.Router();

const upload = multer({ 
    storage: multer.MemoryStorage 
});

/* Method : POST,  Prefix : /api/food/  [Protected] */
router.post('/', authMiddleware.authenticateFoodPartner, upload.single('video'), foodController.createFood)

/* GET  /api/food/ [protected] */
router.get('/', authMiddleware.authenticateUser, foodController.getAllFoodItems);

router.post('/like', authMiddleware.authenticateUser, foodController.likeFood);

router.post('/save', authMiddleware.authenticateUser, foodController.saveFood);

router.get('/save', authMiddleware.authenticateUser, foodController.getSaveFood);

router.post('/comment', authMiddleware.authenticateUser, foodController.commentFood);
module.exports = router;
