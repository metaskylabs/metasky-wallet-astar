export const convertToRupees = (amount: number, factor: number): number => {
  return parseFloat((amount * factor).toFixed(2));
};
export const convertToNonCustodial = (
  amount: number,
  factor: number,
): number => {
  return parseFloat((amount / factor).toFixed(4));
};

export const getNativeCurrencyDisplayValue = (
  value: number,
  appx?: boolean,
) => {
  return value < 0.00001
    ? `< 0.00001`
    : `${appx ? `~` : ``}${value.toFixed(5)}`;
};
