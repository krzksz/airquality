import { appendFileSync } from "fs";

import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";

import { parseStationInfo } from "./utils/station.mjs";

puppeteer.use(StealthPlugin());

// Launch the browser and open a new blank page
const browser = await puppeteer.launch({ headless: "new" });
const page = await browser.newPage();

await page.setViewport({ width: 360, height: 800 });

// Navigate the page to a URL
await page.goto("https://allegro.pl/kampania/one/znajdz-nas?pointId=1221448");

// Wait and click on first result
const gdprAcceptButton = 'button[data-role="accept-consent"]';
await page.waitForSelector('button[data-role="accept-consent"]');
await page.click(gdprAcceptButton);

// Locate the full title with a unique string
const pickupPointBox = await page.waitForSelector(
  '[data-box-name="allegro.one.map.pointDetails"]'
);
const pickupPointText = await pickupPointBox?.evaluate((el) => el.innerHTML);

await browser.close();

const airQuality = parseStationInfo(pickupPointText);
if (!airQuality) {
  process.exit(1);
}

appendFileSync(
  "./docs/data.csv",
  `${airQuality.timestamp};${airQuality.pm25};${airQuality.pm100}\r\n`
);
