const express = require('express');
const router = express.Router();
const EducationController = require('../controllers/educationController');
const AuthMiddleware = require('../middlewares/authMiddleware'); 
const AdminOnlyMiddleware = require('../middlewares/AdminOnlyMiddleware'); 
const upload = require('../middlewares/uploadMiddleware'); 


router.post('/', AuthMiddleware, AdminOnlyMiddleware, upload.single('image'), EducationController.create); 
router.put('/:id', AuthMiddleware, AdminOnlyMiddleware, upload.single('image'), EducationController.update); 
router.delete('/:id', AuthMiddleware, AdminOnlyMiddleware, EducationController.delete); 


router.get('/', AuthMiddleware, EducationController.getAll);
router.get('/:id', AuthMiddleware, EducationController.getById); 

module.exports = router;
