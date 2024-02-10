const express = require("express");
const app = express();
const ejsMate = require("ejs-mate");
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const port = 8080;
const MONGO_URL = "mongodb://127.0.0.1:27017/WanderLust";

// Connect to MongoDB
main()
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

// Set up middleware
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
// app.use(express.static(path.join(__dirname, "public"))); // Uncomment if you have static files

// Define routes
app.get("/", (req, res) => {
  res.send("Hi, I am root");
});

// Home route
app.get("/home", async (req, res) => {
  try {
    let listings = await Listing.find();
    res.render("home.ejs", { listings });
  } catch (err) {
    console.error("Error fetching listings:", err);
    res.status(500).send("Internal Server Error");
  }
});

// Show route for a place
app.get("/show/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let show = await Listing.findById(id);
    res.render("./listing/show.ejs", { show });
  } catch (err) {
    console.error("Error fetching listing details:", err);
    res.status(404).send("Listing not found");
  }
});

// Route to render add page for a new listing
app.get("/listing/new", (req, res) => {
  res.render("./listing/listingNew.ejs");
});

// Add new listing
app.post("/new/listing", async (req, res) => {
  try {
    let list = await Listing.create(req.body.listing);
    console.log("New listing created:", list);
    res.redirect("/home");
  } catch (err) {
    console.error("Error creating new listing:", err);
    res.status(500).send("Internal Server Error");
  }
});

// Edit route
app.get("/listing/:id/edit", async (req, res) => {
  try {
    let { id } = req.params;
    let edit = await Listing.findById(id);
    res.render("./listing/edit.ejs", { edit });
  } catch (err) {
    console.error("Error fetching listing for editing:", err);
    res.status(404).send("Listing not found");
  }
});

// Update listing
app.put("/listing/:id/place", async (req, res) => {
  try {
    let { id } = req.params;
    let edit = await Listing.findByIdAndUpdate(id, req.body.listing);
    console.log("Listing updated:", edit);
    res.redirect(`/show/${id}`);
  } catch (err) {
    console.error("Error updating listing:", err);
    res.status(500).send("Internal Server Error");
  }
});

// Delete listing
app.delete("/delete/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log("Listing deleted:", deletedListing);
    res.redirect("/home");
  } catch (err) {
    console.error("Error deleting listing:", err);
    res.status(500).send("Internal Server Error");
  }
});

// Start the server
app.listen(port, () =>{
  console.log(`server is start ${port}`)
})
