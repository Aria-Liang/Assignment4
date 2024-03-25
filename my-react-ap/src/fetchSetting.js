import React, { useState, useEffect } from "react";
import axios from "axios";

function FetchSettings() {
  const [operatingStatus, setOperatingStatus] = useState("");

  useEffect(() => {
    const requestBody = {
      fields: ["operatingStatus", "isDUGStore"],
    };

    axios
      .post("https://localhost:8080/api/settings/get-config", requestBody)
      .then((response) => {
        setOperatingStatus(response.data.operatingStatus);
      })
      .catch((error) => {
        console.error("Error fetching settings:", error);
      });
  }, []);

  return (
    <div>
      <p>Operating Status is {operatingStatus}</p>
    </div>
  );
}

export default FetchSettings;
