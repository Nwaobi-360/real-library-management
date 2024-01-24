//we import hapijoi 
// const hapijoivalidator = require ('@hapi/joi')

// const validatesignUP = (data) => {
//     const validateFacebook = hapijoivalidator.object ({
//         UserName: hapijoivalidator.string().min(6).max(20).required().message ("Please check your information, Username cannot be left empty"),
//         DateOfBirth: hapijoivalidator.date().iso().required().message ("Please this field is required"),
//         Address: hapijoivalidator.string().min(10).max(20).required().message ("Please your address safety"),
//         Phone: hapijoivalidator.string().min(11).max(11).required().message ("Phone number is required"),
//         Mail: hapijoivalidator.string().email({tlds: {allow: false}}).trim().min(9).required()("Mail is required"),
//         Gender: hapijoivalidator.string().min(6).max(6).required().message ("Gender cannot be left empty"),
//     })
//     return validateFacebook.validate(data);
    
// }


// module.exports = {validatesignUP}