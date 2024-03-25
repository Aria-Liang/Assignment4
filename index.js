import express from "express";
import https from "https";
import fs from "fs";
import "dotenv/config";
import { IP2LOCATION_API_KEY } from "./settings.js";
import { getLoggerInstance } from "./logger.js";
import SettingInfo from "./routes/SettingInfo.js";
import location from "./routes/location.js";
import cors from "cors";

const logger = getLoggerInstance();
const app = express();
app.use(express.json());
app.use(cors());

const httpsOptions = {
  key: fs.readFileSync("./ssl/key.pem"),
  cert: fs.readFileSync("./ssl/cert.pem"),
};

const server = https.createServer(httpsOptions, app);

app.use("/api/settings", SettingInfo);
app.use("/api/location", location);

console.log(IP2LOCATION_API_KEY);

server.listen(8080, () => {
  logger.info("Server is up");
});
