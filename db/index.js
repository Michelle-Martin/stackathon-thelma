const { db, syncAndSeed } = require("./db");
const User = require("./db");
const Med = require("./db");

module.exports = {
  db,
  syncAndSeed,
  models: {
    User,
    Med,
  },
};
