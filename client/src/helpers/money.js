import currencyFormatter from "currency-formatter";

const money = (value) => {
  return currencyFormatter.format(value, {
    code: "EUR",
    precision: 0,
  });
};

export default money;
