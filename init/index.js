const initData = require("./data.js");
const Listing = require("../models/listing.js");
const mongoose = require("mongoose");

const MONGO_URL = "mongodb://127.0.0.1:27017/WanderLust";

async function main() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Connected to MongoDB");

    // Clear existing data and insert new data
    await initDB();

    console.log("Data initialized successfully");
  } catch (error) {
    console.error("Error initializing database:", error);
  } finally {
    mongoose.disconnect();
  }
}

async function initDB() {
  try {
    // Clear existing data
    await Listing.deleteMany({});

    // Insert new data
    await Listing.insertMany(initData.data, { validateBeforeSave: true });
  } catch (error) {
    console.error("Error initializing database:", error);
    throw error; // Rethrow the error for handling in main()
  }
}

main();
