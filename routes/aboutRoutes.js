const express = require('express');
const router = express.Router();
const AboutController = require('../controllers/aboutController');
const AuthMiddleware = require('../middlewares/authMiddleware');

// Routes for "About"
router.post('/', AuthMiddleware, AboutController.create); 
router.get('/', AboutController.getAll); 
router.get('/:id', AboutController.getById); 
router.put('/:id', AuthMiddleware, AboutController.update); 
router.delete('/:id', AuthMiddleware, AboutController.delete); 

module.exports = router;
