import templayed from './templayed';

const mergeTemplate = async ({ templateText, variables }) => {
  const template = templateText;

  /* eslint-disable no-param-reassign */
  const variableMap = variables.reduce((previousValue, currentValue) => {
    previousValue[currentValue.key] = currentValue.value;
    return previousValue;
  }, {});
  /* eslint-enable no-param-reassign */

  const result = templayed(template)(variableMap);

  return { result };
};

export default mergeTemplate;
