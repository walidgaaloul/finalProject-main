const express = require("express");
const router = express.Router();
const authMiddleware = require("../Helper/authMiddleware");
const Listing = require("../models/Listing");
const ListingSleepArgm = require("../models/ListingSleepArgm");
const ListingImage = require("../models/ListingImage");
const Review = require("../models/Review");
const ListingDate = require("../models/ListingDate");


//Multer ---------------------------------------------------------------
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({ storage: storage, fileFilter: fileFilter });


//create photo 
router.post("/images", authMiddleware, upload.single('files'), async (req, res) => {
  try {
    console.log('req.body.listingId', req.body.listingId)
    let path = req.protocol + "://" + req.hostname + ":" + 5000 + "/uploads/" + req.file.filename
    const listingImage = new ListingImage({
      listingId: req.body.listingId,
      img_url: path

    });
    await listingImage.save();
    console.log(listingImage)
    res.status(201).send(path);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//create rooms
router.post("/", authMiddleware, upload.single('files'), async (req, res) => {

  let body = { ...req.body, imageData: req.file, owner: req.userId };
  let listing = new Listing(body);
  try {
    await listing.save();
    res.status(201).send(listing);
    console.log('res:', res)

  } catch (err) {
    res.status(400).send(err);
    console.log('err', err)

  }






  //create rooms

  /* let body = { ...req.body, imageData: req.file, owner: req.userId };
   let sleeping_arrangements = body.sleeping_arrangements
 
   let listing = new Listing(body);
   try {
     await listing.save();
     res.status(201).send(listing);
   } catch (err) {
     res.status(400).send(err);
   }
    console.log('listing',listing)
 
 
   if (listing) {
     let many = []
     for (const [key, value] of Object.entries(...sleeping_arrangements)) {
       many = [...many, { argm_type: key, number: value, listingId: listing._id }]
     }
 
     //let listing = new Listing(body);
     let listingSleepArgm = new ListingSleepArgm(many)
     try {
       await listingSleepArgm.save();
 
       res.status(201).send(listingSleepArgm);
       console.log('listingSleepArgm',listingSleepArgm)
 
 
     } catch (err) {
       res.status(400).send(err);
       console.log('err', err)
 
     }
   }*/
});

//creeat  date
router.post("/dates", authMiddleware, async (req, res) => {
  let dates = req.body.date
  try {

    const listingDates = await ListingDate.deleteMany({ listingId: req.body.listingId, date_type: 'blocked' });
    let body = { date: dates, listingId: req.body.listingId, date_type: 'blocked' }
    const listingDate = new ListingDate(body)
    listingDate.save();
    res.status(201).send(listingDate);
    console.log('res:', listingDate)

  } catch (err) {
    res.status(400).send(err);
    console.log('err', err)
  }

});


//creeat  ListingSleepArgm
router.post("/sleepArgs", authMiddleware, async (req, res) => {

  let body = { ...req.body };

  let listingSleepArgm = new ListingSleepArgm(body)
  try {
    await listingSleepArgm.save();
    res.status(201).send(listingSleepArgm);
    console.log('res:', listingSleepArgm)

  } catch (err) {
    res.status(400).send(err);
    console.log('err', err)

  }

});





//Get all Rooms
router.get("/search", async (req, res) => {
  try {
    const listings = await Listing.find({});
    res.send(listings);
    console.log('success',listings)

  } catch (err) {
    res.status(500).send();
  }
});

//Get Rooms by Host
router.get("/users/:id/listings", authMiddleware, async (req, res) => {
  try {
    const listings = await Listing.find({ owner: req.params.id });
    res.send(listings);
  } catch (err) {
    res.status(500).send();
  }
});

//Get Rooms by Host
router.get("/:id/dates", async (req, res) => {
  try {
    const listingDate = await ListingDate.find({ listingId: req.params.id });
    res.send(listingDate);
  } catch (err) {
    res.status(500).send();
  }
});

router.get("/:id", async (req, res) => {
  try {
    const listings = await Listing.findById({ _id: req.params.id }).populate('owner');
    res.send(listings);
  } catch (err) {
    res.status(500).send();
  }
});


//Get listings by location
router.get("/location/:location", async (req, res) => {
  const location = req.params.location;
  try {
    const listings = await Listing.find({
      location: { $regex: location, $options: "i" },
    });
    if (!listings) {
      res.status(404).send();
    }
    res.send(listings);
  } catch (err) {
    res.status(500).send();
  }
});

//Get listings by the number of guests
router.get("/guests/:guests", async (req, res) => {
  const { guests } = req.params;
  try {
    const listings = await Listing.find({ guests });
    res.send(listings);
  } catch (err) {
    res.status(500).send();
  }
});

//Get listings by room_type
router.get("/type/:room_type", async (req, res) => {
  const { room_type } = req.params;
  try {
    const listings = await Listing.find({ room_type });
    res.send(listings);
  } catch (err) {
    res.status(500).send();
  }
});

//Delete listing by id
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const id = req.params.id;
    const listings = req.body;
    console.log(id);
    const listing = await Listing.findByIdAndDelete(id);
    //const rooms = await Room.deleteOne({ _id: req.user._id });
    res.send(listing);
  } catch (err) {
    res.status(500).send();
  }
});
// update listing information
router.put('/listing/:id', authMiddleware, (req, res) => {
  // try{
  //   const _id = req.params.id;

  Listing.findByIdAndUpdate({ _id: req.params.id }, { ...req.body }, (err, data) => {
    err ? console.log(err) : res.status(201).send(data);
  })
});


// update is publish
router.put('/:id/publish', authMiddleware, (req, res) => {


  Listing.findByIdAndUpdate({ _id: req.params.id }, { ...req.body }, (err, data) => {
    err ? console.log(err) : res.status(201).send(data);
  })
});





//delete Rooms by Host
router.delete("/users/:id/listings", async (req, res) => {
  try {
    const listings = await Listing.deleteMany({ owner: req.params.id });
    res.send("delete");
  } catch (err) {
    res.status(500).send();
  }
});


//Get photo by listingId
router.get("/:id/images/", async (req, res) => {
  try {

    const listingImage = await ListingImage.find({ listingId: req.params.id });
    console.log('listingImage', listingImage)
    res.send(listingImage);
  } catch (err) {
    res.status(500).send();
  }
});

//Get Rooms by review
router.get("/:id/reviews/", async (req, res) => {
  try {
      
     const listingReview = await Review.find({ listingId: req.params.id });
     console.log('listingReview', listingReview)

    res.send(listingReview);
  } catch (err) {
    res.status(500).send();
  }
});

//////////////////
// router.get("/search", async (req, res) => {
  
//     try {
//       const listings = await Listing.find({})
//       res.send(listings);
//       console.log('listings', listings)

//     } catch (err) {
//       res.status(500).send();
//       console.log('err', err)

//     }
//   });


//Get Rooms by image
router.get("/image/:id", async (req, res) => {
  try {
    const listings = await ListingImage.find({ listingId: req.params.id });
    res.send(listings);
  } catch (err) {
    res.status(500).send();
  }
});



module.exports = router;