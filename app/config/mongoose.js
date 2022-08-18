const mongoose = require("mongoose");

//const { MONGO_URI } = process.env;

const {
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  DB_NAME,
} = process.env;

exports.connect = () => {
  // Connecting to the database
  mongoose
    .connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_PORT}`, {
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