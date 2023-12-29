const rawData = await fetch("./data.csv").then((response) => response.text());
const lines = rawData.trim().split("\r\n");
const parsedLines = lines.map((line) => {
  const dateTime = new Intl.DateTimeFormat("pl-PL", {
    dateStyle: "short",
    timeStyle: "short",
  });

  const [timestamp, pm25, pm100] = line.split(";");

  return {
    date: dateTime.format(timestamp * 1000),
    pm25: Number(pm25),
    pm100: Number(pm100),
  };
});
const labels = parsedLines.map((line) => line.date);

const pm25Ctx = document.getElementById("chart-pm25");
const pm25Data = {
  labels: labels,
  datasets: [
    {
      label: "PM2.5",
      data: parsedLines.map((line) => line.pm25),
    },
  ],
};
const pm25Config = {
  type: "line",
  data: pm25Data,
  options: {
    locale: "pl-PL",
    scales: {
      x: {},
      y: {
        beginAtZero: true,
        suggestedMax: 100,
        title: {
          display: true,
          text: "Stężenie",
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: "Stężenie pyłów PM2.5",
      },
      subtitle: {
        display: true,
        text: "Allegro One Box, Emaus 1",
      },
    },
  },
};
new Chart(pm25Ctx, pm25Config);

const pm100Ctx = document.getElementById("chart-pm100");
const pm100Data = {
  labels: labels,
  datasets: [
    {
      label: "PM10",
      data: parsedLines.map((line) => line.pm100),
    },
  ],
};
const pm100Config = {
  type: "line",
  data: pm100Data,
  options: {
    locale: "pl-PL",
    scales: {
      x: {},
      y: {
        beginAtZero: true,
        suggestedMax: 100,
        title: {
          display: true,
          text: "Stężenie",
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: "Stężenie pyłów PM10",
      },
      subtitle: {
        display: true,
        text: "Allegro One Box, Emaus 1",
      },
      annotation: {
        annotations: {
          pm100: {
            type: "line",
            yMin: 50,
            yMax: 50,
            borderColor: "rgb(255, 0, 0)",
            borderDash: [5, 10],
            borderWidth: 2,
          },
        },
      },
    },
  },
};

new Chart(pm100Ctx, pm100Config);
