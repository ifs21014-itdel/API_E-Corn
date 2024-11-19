const express = require('express');
const router = express.Router();
const FeaturesController = require('../controllers/featuresController');
const AuthMiddleware = require('../middlewares/authMiddleware'); // Jika memerlukan autentikasi

router.get('/', FeaturesController.getAll); // Public
router.get('/:id', FeaturesController.getById); // Public
router.post('/', AuthMiddleware, FeaturesController.create); // Protected
router.put('/:id', AuthMiddleware, FeaturesController.update); // Protected
router.delete('/:id', AuthMiddleware, FeaturesController.delete); // Protected

module.exports = router;
