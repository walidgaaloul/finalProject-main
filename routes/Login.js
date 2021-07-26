const express = require("express");
const router = express.Router();
const authMiddleware = require("../Helper/authMiddleware");
const { body, validationResult } = require('express-validator');
const User = require ("../models/User");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config({path:'./config/.env'})

//Load connected user
router.get("/:id",authMiddleware,(req,res)=> {
User.findById(req.userId).select("-PassWord")
.then ((user) =>{
    if(!user){
        return res.status(404).json({msg:'user not found!'});
    }
    res.status(200).json(user);
})
.catch (err =>{
    console.error(err.message)
    res.status(500).send({msg:"server error"});
});
});

//Login user
router.post("/",[

    body('Email',"Please enter a valid email!").isEmail(),
    body('PassWord',"Please write your password").notEmpty()]
    ,(req,res)=> {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        User.findOne({Email: req.body.Email})
        .then ((user) =>{
            if(!user){
                return res.status(404).json({errors:[{msg:"Please register before"}]})
            }
            bcrypt.compare(req.body.PassWord,user.PassWord,(err,isMatch)=>{
                if (err){
                    throw err;
                  } else 
                  if (!isMatch){
                      res.status(400).json({errors:[{msg:"Wrong password"}]});
                  }
                  else{
                    let payload={
                        userId : user._id
                      
                      }
                      jwt.sign(  payload,
                        process.env.SECRET_KEY,
                        (err, token) => {
                          if (err){ throw err;}
                          res.send({token,userId:user._id})
                        });
                  }
            })
        })
    })

  //Get user bi id
  router.get("/",authMiddleware,(req,res)=> {
    User.findById(req.userId).select("-PassWord")
    .then ((user) =>{
        if(!user){
            return res.status(404).json({msg:'user not found!'});
        }
        res.status(200).json(user);
    })
    .catch (err =>{
        console.error(err.message)
        res.status(500).send({msg:"server error"});
    });
    });


    //update user bi id
    router.put('/updatee_user/:id',authMiddleware,(req,res)=> {
       User.findByIdAndUpdate({_id:req.params.id},{...req.body},(err,data) =>{
           console.log('gggg',req.body)
           err ? console.log(err) : res.json({msg:"user was updated"})
     })});
       

        //update user Name id
    router.put('/name/:id',authMiddleware,(req,res)=> {
        User.findByIdAndUpdate({_id:req.params.id},{FirstName:req.body.FirstName},(err,data) =>{
            err ? console.log(err) : res.json({msg:"userName was updated"})
      })});

       //update user LastName id
    router.put('/Lastname/:id',authMiddleware,(req,res)=> {
        User.findByIdAndUpdate({_id:req.params.id},{LastName:req.body.LasttName},(err,data) =>{
            err ? console.log(err) : res.json({msg:"LastName was updated"})
      })});

       //update Birthday id
    router.put('/birthday/:id',authMiddleware,(req,res)=> {
        User.findByIdAndUpdate({_id:req.params.id},{Birthday:req.body.Birthday},(err,data) =>{
            err ? console.log(err) : res.json({msg:"birthday was updated"})
      })});

       //update Gender id
    router.put('/gender/:id',authMiddleware,(req,res)=> {
        User.findByIdAndUpdate({_id:req.params.id},{Gender:req.body.Gender},(err,data) =>{
            err ? console.log(err) : res.json({msg:"gender was updated"})
      })});

       //update user Name id
    router.put('/password/:id',authMiddleware,(req,res)=> {
        User.findByIdAndUpdate({_id:req.params.id},{PassWord:req.body.PassWord},(err,data) =>{
            err ? console.log(err) : res.json({msg:"password was updated"})
      })});

module.exports=router