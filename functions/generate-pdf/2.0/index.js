import Liquid from '../../utils/liquid.min';

const generatePdf = async ({
  html,
  fileName,
  model: { name: modelName },
  property: [{ name: propertyName }],
  variables = [],
}) => {
  const engine = new Liquid();

  engine.registerFilter('group', (collection, key) => groupBy(collection, key));

  const htmlTemplate = engine.parseAndRenderSync(
    html,
    variables.reduce((ctx, { key, value }) => {
      ctx[key] = value;
      return ctx;
    }, {}),
  );

  const reference = await generatePDF({
    html: htmlTemplate,
    fileName,
    modelName,
    propertyName,
  });

  return {
    reference,
  };
};

export default generatePdf;
