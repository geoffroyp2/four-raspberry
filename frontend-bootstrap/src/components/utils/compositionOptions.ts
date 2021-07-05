export const compositionOptions: Chart.ChartOptions = {
  responsiveAnimationDuration: 100, // resize delay
  animation: { duration: 200 },
  hover: { animationDuration: 100 },
  legend: { display: true, position: "bottom", labels: { fontColor: "rgba(230,230,230,1)", fontStyle: "thin" } },

  tooltips: {
    displayColors: false,
    callbacks: {
      label: (item: Chart.ChartTooltipItem, data: Chart.ChartData) => {
        if (data.datasets && data.labels && item.datasetIndex !== undefined) {
          const dataSet = data.datasets[item.datasetIndex];
          if (dataSet.data && item.index !== undefined) {
            const dataValue = dataSet.data[item.index] as number;
            const labelName = data.labels[item.index];
            return `${labelName} : ${dataValue.toFixed(2)}%`;
          }
        }
        return "";
      },
    },
  },
};
