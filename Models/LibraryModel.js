//first we import mongoose
const mongoose = require ('mongoose');
//then we create a schema
const AdminSchema = new mongoose.Schema (
    {
        UserName: {
            type: String,
            require: true,
        },
        DateOfBirth: {
            type: String,
            require: true,
        },
        Address: {
            type: String,
            require: true,
        },
        Phone: {
            type: String,
            require: true,
            unique: true,
        },
        Mail: {
            type: String,
            required: true,
            unique: true,
        },
        Gender: {
            type: String,
            require: true,
        },
        profilePicture: {
            public_id: {
            type: String, // You can store the URL or file path of the image
          },
        },
        url: {
            type: String, 
        },
        // token: String, 
          blacklist: {
        type: Array, 
        default: []
      },
      tokens: [{ type: String }]
        
    },{ timestamps: true }
)
// now we create a schema object
const RegisterModel = mongoose.model ('REGISTRATION', AdminSchema)
// finally we export our model to the controller file
module.exports = RegisterModel;


// const UserSchema = new mongoose.Schema()