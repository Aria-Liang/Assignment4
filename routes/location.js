const express = require("express");
const location = express.Router();
location.get("/user-location", (req, res) => {
  const userIp = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  const userDevice = req.header("User-Agent");
  let deviceType = "Unknown OS";

  if (userDevice.includes("Win")) {
    deviceType = "Windows";
  } else if (userDevice.includes("Mac")) {
    deviceType = "macOS";
  } else if (userDevice.includes("X11") || userDevice.includes("Linux")) {
    deviceType = "Linux";
  } else if (
    userDevice.includes("iPhone") ||
    userDevice.includes("iPad") ||
    userDevice.includes("iPod")
  ) {
    deviceType = "iOS";
  } else if (userDevice.includes("Android")) {
    deviceType = "Android";
  }

  res.json({ userIp: userIp, deviceType: deviceType });
});

module.exports = location;
