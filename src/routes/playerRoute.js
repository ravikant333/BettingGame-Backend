const express = require("express");
const {
  getPlayer,
  createPlayer,
  updatePlayer,
} = require("../controllers/playerControllers");
const playerRouter = express.Router();

playerRouter.get("/", getPlayer);

playerRouter.post("/", createPlayer);

playerRouter.put("/:id", updatePlayer);

module.exports = playerRouter;
