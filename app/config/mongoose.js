const mongoose = require("mongoose");

//const { MONGO_URI } = process.env;

exports.connect = () => {
  // Connecting to the database
  mongoose
    .connect('mongodb://127.0.0.1:27017/jwt', {
     /* useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false, */
    })
    .then(() => {
      console.log("Successfully connected to Mongos database");
    })
    .catch((error) => {
      console.log("database connection failed. exiting now...");
      console.error(error);
      process.exit(1);
    });
};