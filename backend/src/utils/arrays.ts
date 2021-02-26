export const getEvenlySpacedEntries = <T>(array: T[], amount?: number): T[] => {
  const interval = amount ? Math.max((array.length - 2) / (amount - 2), 1) : 1;
  const lastIndex = array.length - 1;
  let count = 0;

  return array.filter((_, idx) => {
    // keep (1st && last entries) && entries spread evenly
    if (idx === 0 || idx === lastIndex || idx === Math.round(interval * count)) {
      count++;
      return true;
    }
    return false;
  });
};
