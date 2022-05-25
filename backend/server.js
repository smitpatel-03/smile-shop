const app = require("./app");
const connectDatabase = require("./config/database");
const dotenv = require("dotenv");

// Handling uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log("uncaught Exception", err.message);
  console.log("shuting down server becasue unhandle Rejection");
  process.exit(1);
});

dotenv.config({
  path: "backend/config/config.env",
});


connectDatabase();
const server = app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`);
});

//unhandledRejection like entering mongodb url wrong -------------
process.on("unhandledRejection", (err) => {
  console.log(`unhandled rejection`);
  console.log("shuting down server becasue unhandle Rejection");

  server.close(() => {
    process.exit(1);
  });
});
