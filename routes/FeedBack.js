const express = require("express");
const router = express.Router();
const authMiddleware = require("../Helper/authMiddleware");
const Feedback = require ("../models/Feedback");
const User = require ("../models/User");

//Add new post
router.post("/",authMiddleware,(req,res)=> {
let newFeedback= new Feedback({...req.body,owner:req.userId})
newFeedback.save()
.then(feedback => res.status(201).send(feedback))
.catch (err =>{
    console.error(err.message)
    res.status(500).send({msg:"server error"});
});

});

//get all feedback 
router.get("/",authMiddleware,(req,res) =>{
    Feedback.find()
   .then(feedbacks=> res.send(feedbacks))

   .catch ((err =>{
    console.error(err.message)
    res.status(500).send({msg:"server error"});

    }))
})

// get user feedback
router.get("/myFeedback",authMiddleware,(req,res) =>{
    User.find({owner:req.userId})
    .then(feedbacks=> res.send(feedbacks))

   .catch ((err =>{
    console.error(err.message)
    res.status(500).send({msg:"server error"});

    }))
})
module.exports = router;