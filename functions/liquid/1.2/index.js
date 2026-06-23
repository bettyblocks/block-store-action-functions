import groupBy from 'lodash.groupby';
import Liquid from '../../utils/liquid.min';

const toCurrency = (
  value,
  symbol = '$',
  decimals = 2,
  thousandsSeparator = ',',
  decimalSeparator = '.',
) => {
  const number = Number(value);
  if (Number.isNaN(number)) return value;

  const sign = number < 0 ? '-' : '';
  const [whole, fraction] = Math.abs(number).toFixed(decimals).split('.');
  const wholeWithSeparator = whole.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    thousandsSeparator,
  );

  return (
    sign +
    symbol +
    wholeWithSeparator +
    (fraction ? decimalSeparator + fraction : '')
  );
};

const liquid = async ({ template, templateVariable, context = [] }) => {
  const engine = new Liquid();

  engine.registerFilter('group', (collection, key) => groupBy(collection, key));
  engine.registerFilter('to_currency', toCurrency);

  const as = engine.parseAndRenderSync(
    templateVariable ?? template ?? '',
    Object.fromEntries(context.map(({ key, value }) => [key, value])),
  );

  return {
    as,
  };
};

export default liquid;
