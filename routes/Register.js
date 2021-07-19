const express = require("express");
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require ("../models/User");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config({path:'config/.env'})


//Register user
router.post("/",[
    body('FirstName').isAlpha(),
    body('LastName').isAlpha(),
    body('Email').isEmail(),
    body('Birthday'),
    // body('PhoneNumber').isNumeric(),
    // body('Gender').isAlpha(),
    body('PassWord',"Le password doit etre supérieur à 6 caractéres").isLength({ min: 8 })]
    ,
    (req,res)=> {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
      
    User.find({Email:req.body.Email})
    .then (users => {
      if (users.length){
        return res.status(400).send([{msg:"User already exists!"}])
      }

      let newUser= new User(req.body);
      bcrypt.genSalt(10,(err,salt) => {
        if (err){
          throw err;
        }
        bcrypt.hash(req.body.PassWord,salt,(err,hashedPwd) =>{
          if (err){ throw err;}
          newUser.PassWord= hashedPwd;
          console.log(newUser);
          newUser.save();
          let payload={
            userId : newUser._id
          
          }
          jwt.sign(  payload,
            process.env.SECRET_KEY,
            (err, token) => {
              if (err){ throw err;}
              res.send({token})
            })
        })
      })

    })
})
module.exports = router;