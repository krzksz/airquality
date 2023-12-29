/**
 * @returns {Promise<string>}
 */
export const getStationResponse = () =>
  fetch("https://allegro.pl/kampania/one/znajdz-nas?pointId=1221448", {
    headers: {
      accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
      "accept-language": "pl-PL,pl;q=0.9,en-US;q=0.8,en;q=0.7",
      "cache-control": "no-cache",
      dpr: "1.5",
      pragma: "no-cache",
      "sec-ch-device-memory": "8",
      "sec-ch-prefers-color-scheme": "dark",
      "sec-ch-prefers-reduced-motion": "no-preference",
      "sec-ch-ua":
        '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
      "sec-ch-ua-arch": '"x86"',
      "sec-ch-ua-full-version-list":
        '"Not_A Brand";v="8.0.0.0", "Chromium";v="120.0.6099.130", "Google Chrome";v="120.0.6099.130"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-model": '""',
      "sec-ch-ua-platform": '"Windows"',
      "sec-ch-viewport-height": "1333",
      "sec-fetch-dest": "document",
      "sec-fetch-mode": "navigate",
      "sec-fetch-site": "same-origin",
      "sec-fetch-user": "?1",
      "upgrade-insecure-requests": "1",
      "viewport-width": "1173",
    },
    referrerPolicy: "strict-origin-when-cross-origin",
    body: null,
    method: "GET",
    mode: "cors",
    credentials: "include",
  }).then((response) => response.text());

/**
 *
 * @param {string} body
 * @returns {{pm25: Number, pm100: Number, timestamp: string}}
 */
export const parseStationResponse = (body) => {
  try {
    const [pm25, pm100] = [...body.matchAll(/([0-9\.]+) μg\/m³/g)].map(
      ([, pm]) => Number(pm)
    );

    const [, dateTime] = body.match(/dateTime=\\"([^\\"]+)\\"/i);

    return {
      pm25,
      pm100,
      timestamp: Math.floor(new Date(dateTime).getTime() / 1000),
    };
  } catch (error) {
    console.error(error);
    console.log(body);
  }

  return null;
};

/**
 *
 * @returns {Promise<{pm25: Number, pm100: Number, timestamp: string}>}
 */
export const getStationData = async () => {
  const body = await getStationResponse();

  return parseStationResponse(body);
};
