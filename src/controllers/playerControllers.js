const { reset } = require("nodemon");
const player = require("../models/player");
const playerModel = require("../models/player");

const createPlayer = async (req, res) => {
  const { walletID, score } = req.body;

  const newPlayer = new player({
    walletID: walletID,
    score: score,
  });

  try {
    const existingPlayer = await playerModel.findOne({ walletID: walletID });

    if (existingPlayer) {
      var message = {
        message: "Player already exist",
        id: existingPlayer.id,
      };
      res.status(400).json(message);
    } else {
      await newPlayer.save();
      res.status(201).json(newPlayer);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json("something went wrong");
  }
};

const updatePlayer = async (req, res) => {
  const id = req.params.id;
  const { walletID, score } = req.body;

  const newPlayer = {
    walletID: walletID,
    $push: { score: score },
  };

  try {
    const existingPlayer = await playerModel.findOne({ walletID: walletID });
    console.log(existingPlayer);
    const player = existingPlayer.score;
    console.log(player.length);
    if (player.length > 2) {
      res.status(400).json("Limit exceed");
    } else {
      await playerModel.findByIdAndUpdate(id, newPlayer, { new: true });
      res.status(200).json(newPlayer);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json("something went wrong");
  }
};

const getPlayer = async (req, res) => {
  try {
    const player = await playerModel.find({});
    res.status(200).json(player);
  } catch (error) {
    console.log(error);
    res.status(500).json("something went wrong");
  }
};

module.exports = {
  createPlayer,
  updatePlayer,
  getPlayer,
};
