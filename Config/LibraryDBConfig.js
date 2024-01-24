//first we import mongoose
const mongoose = require ('mongoose');
//then we create a db host
const dbhost = 'localhost:27017';
//next is the db name
const dbName = 'WorkspaceDB'
//then we connect to our mongodb database
mongoose.connect (`mongodb://${dbhost}/${dbName}`)
//then we handle our eerrors
.then (() => {
    console.log ('DATABASE CONNECTED SUCCESSFULLLY')
}) .catch ((error) => {
    message: `SOMETHING WENT WRONG`, error.message
})
// //first we import mongoose
// const mongoose = require ('mongoose');
// //then we create a db host
// const dbhost = 'localhost:27017';
// //next is the db name
// const dbName = 'Authentication_PracticeDB'
// //then we connect to our mongodb database
// mongoose.connect (`mongodb://${dbhost}/${dbName}`)
// //then we handle our eerrors
// .then (() => { 
//     console.log ('DATABASE CONNECTED SUCCESSFULLLY')
// }) .catch ((error) => {
//     message: `SOMETHING WENT WRONG`, error.message
// })