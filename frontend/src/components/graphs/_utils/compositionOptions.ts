export const compositionOptions = {
  responsiveAnimationDuration: 50, // resize delay
  animation: { duration: 200 },
  hover: { animationDuration: 100 },

  plugins: {
    legend: {
      display: true,
      position: "bottom",
      labels: {
        color: "rgba(240,240,240,1)",
        fontStyle: "thin",
      },
    },

    tooltips: {
      displayColors: false,
      callbacks: {
        label: (item: any) => {
          return `${item.labelName} : ${item.dataValue.toFixed(2)}%`;
        },
      },
    },
  },
};
