// Import necessary modules
const cloudinary = require('../middleware/cloudinary')
const jwt = require('jsonwebtoken');
const fs = require('fs');
const RegisterModel = require('../Models/LibraryModel');
// const validaate = require ('../validation/validate')
// const mediaUpload =require('../middleware/multer')


// Configure Cloudinary with your credentials
// import {v2 as cloudinary} from 'cloudinary';
// cloudinary.config({
//     cloud_name: 'Odp4azi4d0',
//     api_key: '111789228395534',
//     api_secret: 'PihZ8ZKFroKZ4GoUU_5jTtTq8R4',
// });
 
const signUP = async (req, res) => {
    try {
        const { UserName, DateOfBirth, Address, Phone, Mail, Gender } = req.body;

        // Check for missing or empty fields
        if (!UserName || !DateOfBirth || !Address || !Phone || !Mail || !Gender) {
            return res.status(400).json({
                message: 'Please provide all necessary information',
            });
        }

        // Check if the user already exists in the database
        const checkUser = await RegisterModel.findOne({ Mail: Mail.toLowerCase() });

        if (checkUser) {
            return res.status(409).json({
                message: 'User already registered',
            });
        }

        // Save the file to disk
        const profilePicture = req.files.profilePicture.tempFilePath
        const fileUploader = await cloudinary.uploader.upload(profilePicture, { folder: "Library-Media"}, (err, profilePicture) => {
            try {
                //delete the temporary file
                fs.unlinkSync(profilePicture);
                return profilePicture
            } catch (err) {
                message: err.message
            }
        })
        // fs.writeFileSync(filePath, req.file.buffer);

        // // Upload image to Cloudinary
        // const result = await cloudinary.uploader.upload(filePath, {
        //     resource_type: 'image',
        //     folder: 'Library_Media',
        // });

        // Delete the file from disk
        // fs.unlinkSync(filePath);

        // Create a new user with Cloudinary URL
        const user = new RegisterModel({
            UserName,
            DateOfBirth,
            Address,
            Phone,
            Mail: Mail.toLowerCase(),
            Gender,
            profilePicture: {
                url: fileUploader.url,
                public_id: fileUploader.public_id,
            },
        });

        // Save the user data to the database
        await user.save();

        // Generate a token (you may want to include more information in the token)
        const token = jwt.sign({ userId: user._id }, 'Nwaobi', { expiresIn: '1h' });

        // Save the token in the user's tokens array or wherever you prefer
        user.tokens.push(token);
        await user.save();

        // Return the token in the response along with user data
        return res.status(201).json({
            message: 'User created successfully',
            data: user,
            token: token,
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

// Create

//logic for login 
const login = async (req, res) => {
    try {
        const { Mail, Phone } = req.body;

        // Check if both email and phone are provided
        if (!Mail) {
            return res.status(400).json({
                message: 'Incorrect mail',
            });
        }
        if (!Phone) {
            return res.status(400).json({
                message: 'Incorrect Phone',
            });
        }

        // Check if the user exists with the provided email and phone
        const user = await RegisterModel.findOne({
            $or: [
                { Mail: Mail.toLowerCase(), Phone: Phone },
                { Phone: Phone, Mail: Mail.toLowerCase() }
            ],
        });

        // Check if a user was found
        if (user) {
            // Return success message or user data
            return res.status(200).json({
                message: 'Login successful',
                data: user,
                // You may include additional user data if needed
            });
        } else {
            return res.status(401).json({
                message: 'Invalid credentials',
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};



// Controller method to get user by ID
const getUserById = async (req, res) => {
    try {
        const userId = req.params.id;

        // Check if the user ID is provided
        if (!userId) {
            return res.status(400).json({
                message: 'Please provide a user ID for user retrieval',
            });
        }

        // Check if the user exists with the provided ID
        const user = await RegisterModel.findById(userId);
                      // Check if a user was found
         if (user) {
         const userName = user.UserName || 'Unknown'; // Use 'Unknown' if UserName is not defined
         return res.status(200).json({
       message: `User found: ${userName} is the owner of the provided ID`,
          data: user,
                        });
                    
        } else {
            return res.status(404).json({
                message: 'User not found',
            });
        }
    
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
}


//get all user
// Controller method to get all users
const getAllUsers = async (req, res) => {
    try {
        // Retrieve all users from the database
        const users = await RegisterModel.find();

        // Check if users were found
        if (users && users.length > 0) {
            const userNames = users.map(user => user.UserName || 'Unknown'); // Get names or use 'Unknown'
            return res.status(200).json({
                message: `There are ${users.length} users in your library currently`,
                data: users,
                userNames: userNames,
            });
        } else {
            return res.status(404).json({
                message: 'No users found in your library',
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};




// Controller method to update a user by ID
const updateUserById = async (req, res) => {
    try {
        const userId = req.params.id;

        // Check if the user ID is provided
        if (!userId) {
            return res.status(400).json({
                message: 'Please provide a user ID for update',
            });
        }

        // Check if the user exists with the provided ID
        const user = await RegisterModel.findById(userId);

        // Check if a user was found
        if (user) {
            // Update user information based on the request body
            if (req.body.DateOfBirth) {
                user.DateOfBirth = req.body.DateOfBirth;
            }
            if (req.body.Address) {
                user.Address = req.body.Address;
            }
            if (req.body.Phone) {
                user.Phone = req.body.Phone;
            }
            if (req.body.Mail) {
                user.Mail = req.body.Mail.toLowerCase(); // Ensure lowercase for consistency
            }
            if (req.body.Gender) {
                user.Gender = req.body.Gender;
            }

            // Save the updated user to the database
            await user.save();

            // Include the user's name in the success message
            const userName = user.UserName || 'Unknown'; // Use 'Unknown' if UserName is not defined

            return res.status(200).json({
                message: `User ${userName} updated successfully`,
                data: user,
            });
        } else {
            return res.status(404).json({
                message: 'User not found',
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};


// userController.js
const { blacklist } = require('../middleware/LibraryAuthentication');

const logout = async (req, res) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
  
      // Add the token to the blacklist
      blacklist.push(token);
  
      res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
      res.status(500).json({ message: 'Logout failed', error: error.message });
    }
  };



  // Controller method to delete a user by ID
const deleteUserById = async (req, res) => {
    try {
        const userId = req.params.id;

        // Check if the user ID is provided
        if (!userId) {
            return res.status(400).json({
                message: 'Please provide a user ID for deletion',
            });
        }

        // Check if the user exists with the provided ID
        const user = await RegisterModel.findById(userId);

        // Check if a user was found
        if (user) {
            const userName = user.UserName || 'Unknown'; // Use 'Unknown' if UserName is not defined

            // Delete the user
            await RegisterModel.findByIdAndDelete(userId);

            return res.status(200).json({
                message: `User ${userName} has been  deleted successfully`,
                data: user,
            });
        } else {
            return res.status(404).json({
                message: 'User not found',
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: error.message,  
        });
    }
};



//we exports
module.exports = {
    signUP,
    login,
    getUserById,
    getAllUsers,
    updateUserById,
    deleteUserById,
    logout
}