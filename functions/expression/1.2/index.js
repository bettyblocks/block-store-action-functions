import templayed from '../../utils/templayed';

const isObjectOrArray = (value) => typeof value === 'object' && value !== null;

const expression = async ({ expression: expres, variables }) => {
  const variableMap = variables.reduce(
    (previousValue, currentValue) => ({
      ...previousValue,
      [currentValue.key]: isObjectOrArray(currentValue.value)
        ? JSON.stringify(currentValue.value)
        : currentValue.value,
    }),
    {},
  );

  return {
    // eslint-disable-next-line no-new-func
    result: new Function(`return ${templayed(expres)(variableMap)}`)(),
  };
};

export default expression;
