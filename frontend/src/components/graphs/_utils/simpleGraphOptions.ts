import { graphFormatTime } from "@app/_utils/timeFormat";

/**
 * Typescript not yet supported
 */

export const simpleGraphDataSetOptions: any = {
  showLine: true,
  fill: false,
  backgroundColor: "rgb(0, 0, 0)", // couleur de remplissage de la courbe
  pointRadius: 2,
  pointBorderWidth: 0, // épaisseur de la bordure
  pointHitRadius: 10, // rayon de hover
  pointHoverBorderWidth: 0,
  lineTension: 0.3,
};

export const simpleGraphOptions: any = {
  responsiveAnimationDuration: 50, // resize delay
  animation: { duration: 200 },
  hover: { animationDuration: 100 },

  plugins: {
    legend: {
      display: true,
      position: "bottom",
      labels: {
        color: "rgba(240,240,240,1)",
        // pointStyle: {},
        // usePointStyle: true,
      },
    },
    tooltip: {
      displayColors: false,
      callbacks: {
        label: (item: any) => {
          switch (item.datasetIndex) {
            case 0:
              return `${graphFormatTime(item.raw.x, true)}  ${item.raw.y}°C`; // temperature
            case 1:
              return `${graphFormatTime(item.raw.x, true)}  ${item.raw.y}`; // oxygène
            default:
              return `${graphFormatTime(item.raw.x, true)}  ${item.raw.y}`; // oxygène
          }
        },
      },
    },
  },

  // axes
  scales: {
    temp: {
      type: "linear",
      position: "left",
      ticks: {
        fontColor: "rgb(190,190,190)",
        callback: (val: string) => {
          return +val > 0 ? `${val}°C` : "";
        },
        stepSize: 300,
        min: 0,
      },
      gridLines: {
        color: "rgba(160,160,160,0.7)",
      },
    },
    oxy: {
      type: "linear",
      position: "right",
      ticks: {
        fontColor: "rgb(190,190,190)",
        callback: (val: string) => {
          return +val > 0 ? val : "";
        },
        stepSize: 0.2,
        min: -0.1,
        max: 1.1,
      },
      gridLines: {
        color: "rgba(120,110,110,0.4)",
        zeroLineColor: "rgba(120,110,110,0.4)",
        lineWidth: 0.5,
        borderDash: [12, 12],
      },
    },
    x: {
      type: "linear",
      ticks: {
        fontColor: "rgb(190,190,190)",
        stepSize: 60 * 60, // 1 par heure
        callback: (val: string) => {
          return graphFormatTime(val, false); // formatage du texte
        },
      },
      gridLines: {
        color: "rgba(90,90,90,0.4)",
        lineWidth: 0.5,
      },
      position: "bottom",
    },
  },
};
