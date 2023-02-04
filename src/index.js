const express = require("express");
const playerRouter = require("./routes/playerRoute");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

app.use(express.json());

app.use(cors());


app.use("/player", playerRouter);

app.get("/", (req, res) => {
  res.send("Player API");
});

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server started on port " + PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
