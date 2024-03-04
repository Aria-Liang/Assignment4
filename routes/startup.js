const express = require("express");
const startup = express.Router();

startup.get("/", (req, res) => {
  send("It's working");
});

startup.get("/alive", (req, res) => {
  res.send("HTTPS-Web-Service is Alive");
});

//commonJS format
module.exports = startup;
