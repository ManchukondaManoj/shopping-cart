// require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const Routes = require("./routes/index.js");
const { notFound, errorHandler } = require("./middleware/index.js");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.disable("etag"); // to disable caching & avoid 304
app.use("/", Routes);

app.use(notFound);
app.use(errorHandler);

// const PORT = process.env.PORT || 5000;
// const MODE = process.env.MODE;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}`);
// });

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});

process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
});
module.exports = app;
