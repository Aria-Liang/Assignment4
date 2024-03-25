import express from "express";
import axios from "axios";
import { getLoggerInstance } from "../logger.js";

const logger = getLoggerInstance();
const SettingInfo = express.Router();
const githubSettingsUrl =
  "https://raw.githubusercontent.com/Aria-Liang/Assignment4/main/database/github_settings.json";

SettingInfo.post("/get-config", async (req, res) => {
  logger.info("Handling /get-config request");
  try {
    const response = await axios.get(githubSettingsUrl);
    const data = response.data;

    const { fields } = req.body;

    const filteredData = fields.reduce((acc, field) => {
      if (data.ecomStore.hasOwnProperty(field)) {
        acc[field] = data.ecomStore[field];
      }
      return acc;
    }, {});
    logger.info("Successfully fetched and filtered the configuration");
    res.json(filteredData);
  } catch (error) {
    logger.error(`Failed to fetch settings from GitHub: ${error}`);
    res.status(500).send("Failed to fetch settings from GitHub.");
  }
});

export default SettingInfo;
