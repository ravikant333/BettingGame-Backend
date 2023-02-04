const express = require("express");
const {
  createPlayer,
  updatePlayer,
  getAllPlayers,
  getPlayer
} = require("../controllers/playerControllers");
const playerRouter = express.Router();

playerRouter.get("/", getAllPlayers);

playerRouter.post("/", createPlayer);

playerRouter.put("/:id", updatePlayer);

playerRouter.get("/:walletId", getPlayer);

module.exports = playerRouter;
