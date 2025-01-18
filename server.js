const express = require("express");
const app = express();
const mongodb = require("./data/database");
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 3000;

// Use body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", require("./routes"));

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(PORT, () => {
      console.log(`Database is listening and node Running on port ${PORT}`);
    });
  }
});
