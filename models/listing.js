const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
    required: true, // Title is required
  },
  description: {
    type: String,
    required: true, // Description is required
  },
  image: {
    filename: {
      type: String,
      default: "default_image_filename",
    },
    url: {
      type: String,
      default: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    }
  },
  price: {
    type: Number,
    required: true, // Price is required
  },
  location: {
    type: String,
    required: true, // Location is required
  },
  country: {
    type: String,
    required: true, // Country is required
  },
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
