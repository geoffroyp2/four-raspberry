export const WSOUTFormat = (temperature: number): string => {
  return JSON.stringify({
    BlockID: "signal 1",
    Signal: [
      {
        DataType: "single",
        Value: [temperature.toFixed(2)],
      },
    ],
  });
};
