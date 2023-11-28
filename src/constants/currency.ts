export const CURRENCY_SYMBOL_UNICODE = {
  INR: `&#8377;`,
  ETHEREUM: `Eth`,
  USD: `&#36;`,
  JPY: `&#165;`,
};

const CurrencySymbol: { [currency: string]: string } = {
  INR: `₹`,
  USD: `$`,
  JPY: `¥`,
};

export const getCurrencySymbol = (currency = `INR`) => {
  return CurrencySymbol[currency] || `₹`;
};
