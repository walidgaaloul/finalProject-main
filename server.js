  
const express = require('express')
const mongoose=require('mongoose')
require('dotenv').config({path:'config/.env'})
const cors = require('cors');
const path = require('path');

const app= express();
const connectDB = require ("./Helper/connectDB");


app.use(express.json({extended: false}));
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

connectDB();

 app.use('/register', require('./routes/Register'));
 app.use('/login', require('./routes/Login'));
 app.use('/feedback', require('./routes/FeedBack'));
 app.use('/listings', require('./routes/Listing'));
 app.use('/reservations', require('./routes/Booking'));
 app.use('/review', require('./routes/Review'));


app.listen(5000,()=>{
    console.log('server connected')
});