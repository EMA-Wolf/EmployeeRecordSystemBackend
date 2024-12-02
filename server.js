// Import the required modules and initialize the Express application.
const express = require('express');
const cors = require('cors');
const connectDB = require('./api/config/db');
const bodyParser = require('body-parser');
const app = express();

//Route location
const authRoutes = require('./api/routes/authRoutes');
const leaveRoutes = require('./api/routes/leaveRoutes');
const reportRoutes = require('./api/routes/reportRoutes');
const departmentEmployeeRoutes = require('./api/routes/departmentEmployeeRoutes');

// Load environment variables
require("dotenv").config() 

// Define the port to run the server on 3000 by default or the port specified in the environment variable.  If the environment variable is not set, it defaults to 3000.  This allows the server to be easily deployed to different environments.  For example, you can set the PORT environment variable to 8080 when deploying to a production environment.  This will make the server listen on port 8080 instead of 3
const PORT  = process.env.PORT || 3000;

// Connect to MongoDB
connectDB()

//Middleware
app.use(cors())
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/leave', leaveRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api', departmentEmployeeRoutes);



app.get('/',(req,res)=>{
    res.send('Welcome to the server')
})


app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
});