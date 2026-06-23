import groupBy from 'lodash.groupby';
import Liquid from '../../utils/liquid.min';
import { toCurrency } from './to-currency';

const liquid = async ({ template, context = [] }) => {
  const engine = new Liquid();

  engine.registerFilter('group', (collection, key) => groupBy(collection, key));
  engine.plugin(toCurrency);

  const as = engine.parseAndRenderSync(
    template,
    context.reduce((ctx, { key, value }) => {
      ctx[key] = value;
      return ctx;
    }, {}),
  );

  return {
    as,
  };
};

export default liquid;
