const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/authController");
const AuthMiddleware = require("../middlewares/authMiddleware");
const AdminOnlyMiddleware = require("../middlewares/AdminOnlyMiddleware");

router.post("/login", AuthController.login);
router.post("/register", AuthMiddleware, AdminOnlyMiddleware, AuthController.register);
router.get("/users", AuthMiddleware, AdminOnlyMiddleware, AuthController.getAllUsers); // Only admin
router.put("/users/:id", AuthMiddleware, AuthController.editUser); // Admin or self
router.delete("/users/:id", AuthMiddleware, AdminOnlyMiddleware, AuthController.deleteUser); // Only admin

module.exports = router;
