/**
 *
 * @param {string} text
 * @returns {{pm25: Number, pm100: Number, timestamp: string}}
 */
export const parseStationInfo = (text) => {
  try {
    const [pm25, pm100] = [...text.matchAll(/([0-9\.]+) μg\/m³/g)].map(
      ([, pm]) => Number(pm)
    );

    const [, dateTime] = text.match(/datetime=\"([^\\"]+)\"/i);

    return {
      pm25,
      pm100,
      timestamp: Math.floor(new Date(dateTime).getTime() / 1000),
    };
  } catch (error) {
    console.error(error);
    console.log(text);
  }

  return null;
};
