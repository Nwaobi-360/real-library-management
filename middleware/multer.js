// const multer = require ('multer');

// multer.diskstorage ({
//     destination: (cb, file, req) => {
//         cb(null, ('../media'))
//     },
//     filename: (cb, file, req) => {
//         cb(null, req.body.firstname+ "profile picture." +extension)
//     }
// })


// const filefilter = (req, file, cb) => {
//     if (file.mimetype.startwith ('image/'))
//     {cb(null, true)}
//     else{
//         cb('Unsupported image format ' + false)
//     }
// }

// const mediaupload = multer ({
//     storage:storage,
//     limits: {filesize: 1024*1024*4},
//     filefilter

// })


// module.exports = mediaupload
