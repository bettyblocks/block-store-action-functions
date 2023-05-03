import Liquid from './liquid.min';
import groupBy from 'lodash/groupBy';

const liquid = async ({ template, context = [] }) => {
  const engine = new Liquid();

  engine.registerFilter('group', (collection, key) => groupBy(collection, key));

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
