require ('./Config/LibraryDBConfig');
const express = require('express');
require('dotenv').config();
const port = process.env.PORT
const UserRouter = require('./Routes/LibraryRouter');
const authMiddleware = require('./middleware/LibraryAuthentication');

const app = express();
app.use(express.json()); 
app.use('/api/v1', UserRouter)
//we create a welcome message
app.get ('/api/v1', (req, res) => {
    res.send ('Welcome to Librix library system!!!!')
})
app.listen(port, () => {
    console.log(`Server is up and running on port: ${port}`)
})
