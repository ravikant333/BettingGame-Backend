const { reset } = require("nodemon");
const player = require("../models/player");
const playerModel = require("../models/player");

const createPlayer = async (req, res) => {
  const { walletID } = req.body;

  const newPlayer = new player({
    walletID: walletID,
    score: [],
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

// called from Xnft after successfull betting by user



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
//call from game after each time people play there on game end


const getPlayer=async(req,res) =>{
  const {walletID}=req.params.walletID;
  try{
  const existingPlayer = await playerModel.findOne({ walletID: walletID });
  if(!existingPlayer)
    {res.status(200).json("User Not Found")}
  
  else
  {
    res.status(200).json(existingPlayer)
  }}
  catch(err)
  {
    console.log(err)
    res.status(500).json("Something Went Wrong")
  }
 
}
//return a players status. called before loading game




const getAllPlayers = async (req, res) => {
  try {
    const player = await playerModel.find({});
    res.status(200).json(player);
  } catch (error) {
    console.log(error);
    res.status(500).json("something went wrong");
  }
};
//return all players used for leaderBoard and endgame by admin form xnft

module.exports = {
  createPlayer,
  updatePlayer,
  getAllPlayers,
  getPlayer
};


// Logic in frontend is like this:-
// When User bet in xnft than a player will be created here with max 3 scores stored in array
// Each time user visit game and ask for play to earn than total remaining chances will be checked
// from frontend and based on that user may be allowed to Play game Or Not
// updatePlayer will be called if player is playing via betting and play to earn route