const express = require('express');
const router = express.Router();
const FeaturesController = require('../controllers/featuresController');
const AuthMiddleware = require('../middlewares/authMiddleware');

// Routes for Features
router.post('/', AuthMiddleware, FeaturesController.create); 
router.get('/', FeaturesController.getAll); 
router.get('/:id', FeaturesController.getById); 
router.put('/:id', AuthMiddleware, FeaturesController.update); 
router.delete('/:id', AuthMiddleware, FeaturesController.delete); 

module.exports = router;
