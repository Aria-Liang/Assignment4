const express = require("express");
const https = require("https");
const fs = require("fs");
const startup = require("./routes/startup");
const studentInfo = require("./routes/studentInfo");
const location = require("./routes/location");

const app = express();
// const cert = fs.readFileSync("./ssl/cert.pem");
// const key = fs.readFileSync("./ssl/key.pem");

const httpsOptions = {
  key: fs.readFileSync("./ssl/key.pem"),
  cert: fs.readFileSync("./ssl/cert.pem"),
};

// const server = https.createServer({cert, key},app)
const server = https.createServer(httpsOptions, app);

app.use(express.json());

app.use((req, res, next) => {
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

  console.log(`userIp: ${userIp}, deviceType: ${deviceType}`);
});

app.use("/https-web-service/v1", startup);
//domain-name/web-server/v1/<route/>path/endpoint> ==> endpoint
//saveway.com/order-purchase/v1/purchaseHistory ==> endpoint
app.use("/https-web-service/v1", studentInfo);
app.use("/https-web-service/v1", location);

server.listen(8080, () => {
  console.log("Server is up");
});
