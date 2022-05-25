const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_URI, {
      useNewurlParser: true, //both already in-built supported in mongodb but i added only!
      useUnifiedTopology: true,
    })
    .then((data) => {
      console.log(`database is connnected to host: ${data.connection.host}`);
    })
};

module.exports = connectDatabase;
