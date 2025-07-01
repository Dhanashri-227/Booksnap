const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const uri = 'mongodb+srv://dhanshri1701:QMBtQJNM0o2NEkoX@cluster0.upc1pwu.mongodb.net/';
    if (!uri) {
      throw new Error("MONGO_URI is not defined in .env file");
    }

    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1); // Exit with failure
  }
};

module.exports = connectDb;
