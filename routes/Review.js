const express = require("express");
const router = express.Router();
const authMiddleware = require("../Helper/authMiddleware");
const Review = require ("../models/Review");
const Booking = require ("../models/Booking");
const Listing = require ("../models/Listing");


//create Review
router.post("/", authMiddleware, async (req, res) => {
    let body = { ...req.body };
    let review = new Review(body);
    try {
      await review.save();
      res.status(201).send(review);
      console.log('resultat',res);
    } catch (err) {
      res.status(400).send(err);
      console.log(res);
    }
  });

  //Get reviews by listingsssssssssssssss
router.get("/:listingId/reviews",async (req, res) => {
  const {listingId} = req.params;
  try {
    const reviews = await Review.find({ listingId });
    res.send(reviews);
  } catch (err) {
    res.status(500).send();
  }
});

//Get reviews by user
router.get("/me",authMiddleware,async (req, res) => {
  try {
    const reviews = await Review.find({ listingId: req.listingId ,  userId: req.userId });
    res.send(reviews);
  } catch (err) {
    res.status(500).send();
  }
});

//Delete review by id
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const id = req.params.id;
    const reviews = req.body;
    console.log(id);
    const review = await Review.findByIdAndDelete(id);
    res.send(review);
  } catch (err) {
    res.status(500).send();
  }
});
// update review 
router.put('/updatee_review/:id',authMiddleware,(req,res)=> {
  Review.findByIdAndUpdate({_id:req.params.id},{...req.body},(err,data) =>{
      err ? console.log(err) : res.json({msg:"Review was updated"})
})});
module.exports = router;