require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const Routes = require("./routes/index.js");
const { notFound, errorHandler } = require("./middleware/index.js");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.disable("etag"); // to disable caching & avoid 304 code
app.use("/", Routes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const MODE = process.env.MODE;
if (MODE === "DEV") {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}

module.exports = app;
