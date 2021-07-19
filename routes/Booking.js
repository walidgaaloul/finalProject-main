const express = require("express");
const router = express.Router();
const authMiddleware = require("../Helper/authMiddleware");
const Booking = require ("../models/Booking");

//create booking
router.post("/", async (req, res) => {
    
    //let body = { ...req.body, userId: req.userId , listingId:req.listingId };
    let body = { ...req.body };  
    let booking = new Booking(body.processedBooking);
    try {
      await booking.save();
      res.status(201).send(booking);    
      console.log('res:', booking)
    } catch (err) {
      res.status(400).send(err);
    }
  });

      //Get all bookings
router.get("/", async (req, res) => {
  const { listing } = req.params;
  try {
    const booking = await Booking.find({ listing }).select("-__v");
    res.send(booking);
  } catch (err) {
    res.status(500).send();
  }
});

    //Get all bookings by listing
router.get("/listings/:listingId", async (req, res) => {
  const { listing } = req.params;
  try {
    const booking = await Booking.find({ listingId }).select("-__v");
    res.send(booking);
  } catch (err) {
    res.status(500).send();
  }
});

 //Get all bookings user
 router.get("/users/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const booking = await Booking.find({ userId }).select("-__v");
    res.send(booking);
  } catch (err) {
    res.status(500).send();
  }
});

//Get all bookings user and all listing

router.get("/listings/:listingId/userId=:userId", async (req, res) => {
  console.log ('xxxxxxxxxxxxxxxxxxxxxxxxx')
  const { userId , listingId} = req.params;
  try {
    console.log ('xxxxxxxxxxxxxxxxxxxxxxxxx')
    const booking = await Booking.find({ listingId }).select("-__v");
    res.send(booking);
      console.log('resultatttttttttttttt:', booking)

    // console.log('res:', booking)

  } catch (err) {
    res.status(500).send();
    console.log ('yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy')
  }
});


 //Get all bookings generale
 router.get("/:listingId/general", async (req, res) => {
  const { listingId } = req.params;
  try {
    const booking = await Booking.find({ listingId }).select("-__v");
    res.send(booking);
  } catch (err) {
    res.status(500).send();
  }
});


//delete booking by Host
router.delete("/:id", async (req, res) => {
  try {
    const bookings = await Booking.findByIdAndDelete({ _id:req.params.id });
    res.send("delete");
  } catch (err) {
    res.status(500).send();
  }
});


// update booking information
router.put('/updatee_booking/:id',authMiddleware,(req,res)=> {
  Booking.findByIdAndUpdate({_id:req.params.id},{...req.body},(err,data) =>{
      err ? console.log(err) : res.json({msg:"booking was updated"})
})});


module.exports = router;