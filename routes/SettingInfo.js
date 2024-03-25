import express from "express";
import axios from "axios";

const SettingInfo = express.Router();

SettingInfo.get("/fetch-config", async (req, res) => {
  const githubSettingsUrl =
    "https://raw.githubusercontent.com/Aria-Liang/Assignment4/main/database/student-info.json";

  try {
    const response = await axios.get(githubSettingsUrl);
    const settings = response.data;
    res.json(settings);
  } catch (error) {
    console.error("Failed to fetch settings from GitHub:", error);
    res.status(500).send("Failed to fetch settings from GitHub.");
  }
});

export default SettingInfo;
