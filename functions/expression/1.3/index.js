import templayed from '../../utils/templayed';
import { variableMap } from '../../utils/utilityFuncs';

const customExpression = async ({ expression, variables, debugLogging }) => {
  const parsedVars = variableMap(variables);
  const template = templayed(expression)(parsedVars);
  let functionOutput;

  try {
    functionOutput = new Function(`return ${template}`)();
  } catch (error) {
    const errorMessage = `Error evaluating expression: "${error.message}" (template: ${template} variables: ${JSON.stringify(parsedVars)})`;

    if (debugLogging) {
      console.error(errorMessage);
    }

    throw new Error(errorMessage);
  }
  return {
    result: functionOutput,
  };
};

export default customExpression;
