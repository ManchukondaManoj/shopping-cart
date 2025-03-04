const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const Routes = require("./routes/index.js");
const { notFound, errorHandler } = require("./middleware");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/", Routes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
