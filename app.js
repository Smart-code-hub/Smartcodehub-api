/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 **/

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const routers = require("./routes/user.routes");

const entityrouters = require("./routes/entities.route");
const DBNAME = "smartcodehub"; //change it to your db name
const port = process.env.port || 3666;
require("dotenv").config();
const connectionString = process.env.DB_URL || `mongodb://Smartcodehub-db/Smartcodehub`;
console.log(connectionString);
mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(a => { })
  .catch(err => {
    console.error("DB ERROR :::  ", err);
  });
console.log(port);

const app = express();
const devServerEnabled = true;

app.use(express.json());
app.use(cors());

app.get("/api", async (req, res) => {
  console.info("Api Status : Seems Good");

  res.send({ message: "Welcome to smartcodehub api now updated  -- from  docker goes on and go from" });
});
app.get("/images/*", (req, res) => {
  res.sendFile(path.join(__dirname, req.path));
});
app.get("/errors", (req, res, next) => {
  next({
    message: 'Something went wrong'
  })
});
app.use("/api/user", routers);
app.use("/api/entities", entityrouters);

app.listen(port, () => {
  `Listening at http://localhost:${port}/api`;
});
app.use(async (err, req, res, next) => {
  try {
    console.log(err);
    // await  ProcessMessageForSlack("CHANNEL_ERROR_API",err);
    res.status(500).send({ Message: "Please try again" })
  } catch (error) {
    //console.log(error);

    res.status(500).send(err)
  }
});
