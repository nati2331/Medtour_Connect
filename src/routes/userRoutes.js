const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); // Adjust path as needed

// Define routes
router.post('/users', userController.createUser);
router.get('/users', userController.getAllUsers);

module.exports = router;

