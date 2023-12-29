import { appendFileSync } from "fs";

import { getStationData } from "./utils/station.mjs";

const airQuality = await getStationData();

if (!airQuality) {
  process.exit(1);
}

appendFileSync(
  "./site/data.csv",
  `${airQuality.timestamp};${airQuality.pm25};${airQuality.pm100}\r\n`
);
