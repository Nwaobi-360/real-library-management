const express = require('express');
const {signUP, login, getUserById, getAllUsers, updateUserById, deleteUserById, logout,  }= require('../Controllers/LibraryControl');
const { verifyToken, blacklist } = require('../middleware/LibraryAuthentication');
// const { mediaUpload } = require('../middleware/multer'); // Adjust this import based on your project structure

// const upload = require('../uploader/fileUploadImage')
const router = express.Router();
router.post('/signUp', signUP)
router.post('/access', login);
// Endpoint to get user by ID
router.get('/user/:id',getUserById);
router.get('/users', getAllUsers)
// Endpoint to update a user by ID
router.put('/user/:id', updateUserById);
router.delete('/user/:id', deleteUserById);
router.post('/logout', logout);
// Protected route example
router.get('/protected', verifyToken,  (req, res) => {
    // If the token is valid and not in the blacklist, this route will be accessible
    res.status(200).json({ message: 'Protected route accessed successfully' });
  });
  // Endpoint for user registration with picture upload
// router.post('/signUp', mediaUpload)
module.exports = router;  