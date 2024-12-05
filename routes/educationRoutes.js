const express = require('express');
const router = express.Router();
const EducationController = require('../controllers/educationController');
const upload = require('../middlewares/uploadMiddleware');

// Pastikan nama field di sini adalah 'image'
router.post('/', upload.single('image'), EducationController.create);
router.put('/:id', upload.single('image'), EducationController.update);
router.delete('/:id', EducationController.delete);
router.get('/', EducationController.getAll);
router.get('/:id', EducationController.getById);

module.exports = router;
