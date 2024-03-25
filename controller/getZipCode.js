import { IP2LOCATION_API_KEY } from "../settings.js";
// import https from "https";
import axios from "axios";

export const getZipCode = (userIp) => {
  //call ip2location endpoint
  const ip2locationurl = `https://api.ip2location.io/?key=${IP2LOCATION_API_KEY}&ip=${userIp}`;
  //promise
  //with Promise and HTTPS
  //   return new Promise((resolve, reject) => {
  //     https.get(ip2locationurl, (response) => {
  //       let data = "";
  //       response.on("data", (chunk) => {
  //         data += chunk;
  //       });
  //       response
  //         .on("end", () => {
  //           try {
  //             const parseData = JSON.parse(data);
  //             resolve(parseData);
  //           } catch (error) {
  //             reject(error);
  //           }
  //         })
  //         .on("error", (error) => {
  //           reject(error);
  //         });
  //     });
  //   });

  //with axios
  const zipCodeData = axios
    .get(ip2locationurl)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
    });

  return zipCodeData;
};

//getZipCOde(userIp)
