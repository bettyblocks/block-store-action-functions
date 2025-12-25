function toCurrency(Liquid) {
  this.registerFilter(
    'to_currency',
    function (
      value,
      currency,
      fractionDigits,
      decimalSeparator,
      thousandSeparator,
    ) {
      fractionDigits = fractionDigits || 2;
      decimalSeparator = decimalSeparator || '.';
      thousandSeparator = thousandSeparator || null;

      const parts = Number(value).toFixed(fractionDigits).toString().split('.');

      parts[0] = thousandSeparator
        ? parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousandSeparator)
        : parts[0];

      return currency + parts.join(decimalSeparator);
    },
  );
}

module.exports.toCurrency = toCurrency;
