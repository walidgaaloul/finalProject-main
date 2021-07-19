
const mongoose = require("mongoose");
// const validator = require("validator");

const listingSchema = new mongoose.Schema({
  isCreated:{
    type: Boolean,
  },
  listing_title: {
    type: String,
  },
  room_type: {
    type: String,
    enum: ['entire_place', 'private_room',
      'shared_room',],
    default: 'private_room'
  },
  guests: {
    type: Number,
  },
  num_bedrooms: {
    type: Number,
  },
  num_beds: {
    type: Number,
  },
  num_bathrooms: {
    type: Number,
  },
  price: {
    type: Number,
  },
  min_nights: {
    type: Number,
  },
  max_nights: {
    type: Number,

  },
  summary: {
    type: String,
  },
  the_space: {
    type: String,
  },
  the_availability: {
    type: String,
  },
  neighborhood: {
    type: String,
  },
  the_getting_around: {
    type: String,
  },
  lat: {
    type: Number,
  },
  lng: {
    type: Number,
  },
  city: {
    type: String,
  },
  street: {
    type: String,
  },
  country: {
    type: String,
  },
  state: {
    type: String,
  },
  zip_code: {
    type: String,
  },
  spaces: {
    dryer: {
      type: Boolean,
    },
    elevator: {
      type: Boolean,
    },
    gym: {
      type: Boolean,
    },
    hot_tub: {
      type: Boolean,
    },
    kitchen: {
      type: Boolean,
    },
    parking: {
      type: Boolean,
    },
    pool: {
      type: Boolean,
    },
    washer: {
      type: Boolean,
    },
  },
  amenities: {
    air_conditioning: {
      type: Boolean,
    },
    breakfast: {
      type: Boolean,
    },
    carbon_monoxide_detector: {
      type: Boolean,
    },
    closet: {
      type: Boolean,
    },
    desk: {
      type: Boolean,
    },
    essentials: {
      type: Boolean,
    },
    fire_extinguisher: {
      type: Boolean,
    },
    fireplace: {
      type: Boolean,
    },
    first_aid_kit: {
      type: Boolean,
    },
    hair_dryer: {
      type: Boolean,
    },
    heat: {
      type: Boolean,
    },
    iron: {
      type: Boolean,
    },
    private_entrance: {
      type: Boolean,
    },
    shampoo: {
      type: Boolean,
    },
    smoke_detector: {
      type: Boolean,
    },
    tv: {
      type: Boolean,
    },
    wifi: {
      type: Boolean,
    },
  },
  house_rules: {
    children: {
      type: Boolean,
    },
    events: {
      type: Boolean,
    },
    infants: {
      type: Boolean,
    },
    pets: {
      type: Boolean,
    },
    smoking: {
      type: Boolean,
    },
  },
  is_publish: {
    type: Boolean,
    default: false,
    nullable: false,
  },
  sleeping_arrangements: [{
    couch: {
      type: Number,
      default: 0
    },
    floorMattress: {
      type: Number,
      default: 0
    },
    double: {
      type: Number,
      default: 0
    },
    queen: {
      type: Number,
      default: 0
    },
    single: {
      type: Number,
      default: 0
    },
    King: {
      type: Number,
      default: 0
    },
    smallDouble: {
      type: Number,
      default: 0
    },
    bunkBed: {
      type: Number,
      default: 0
    },
    airMattress: {
      type: Number,
      default: 0
    },
    crib: {
      type: Number,
      default: 0
    },
    toddlerBed: {
      type: Number,
      default: 0
    },
    hammock: {
      type: Number,
      default: 0
    },
    waterBed: {
      type: Number,
      default: 0
    },
   
    sofaBed: {
      type: Number,
      default: 0
    }
  }],
  center: {
    lat: {
      type: Number,
      default: 0
    },
    lng: {
      type: Number,
      default: 0
    }
  },
  completed: {
    step1: {

      type: Number,
      default: 0
    },
    step2: {
      type: Number,
      default: 0
    },
    step3: {
      type: Number,
      default: 0
    }
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
     review: {
       type: mongoose.Schema.Types.ObjectId,
       required: true,
       ref: "Review",
     },

    image: {
      type: mongoose.Schema.Types.ObjectId,
      
      ref: "ListingImage",
    },

});
module.exports = mongoose.model("Listing", listingSchema);