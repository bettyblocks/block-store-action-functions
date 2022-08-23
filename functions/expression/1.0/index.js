import templayed from "./templayed";

const Expression = async ({ expression, variables, outputType, logging }) => {
  const asKey = { number: "asNumber", text: "asText", checkbox: "asCheckbox" };

  if (logging) {
    console.log("Input Variables:");
    console.log(variables);
  }
  const variableMap = variables.reduce((previousValue, currentValue) => {
    previousValue[currentValue.key] = currentValue.value;
    return previousValue;
  }, {});

  if (logging) {
    console.log("Mapped Variables:");
    console.log(variableMap);
  }

  const replacedContent = templayed(expression)(variableMap);
  if (logging) {
    console.log("Expression with resolved variables:");
    console.log(replacedContent);
  }

  const result = eval(replacedContent);
  if (logging) {
    console.log(`Result returned as ${outputType.toUpperCase()}:`);
    console.log(result);
  }

  return {
    [asKey[outputType]]: result,
  };
};

export default Expression;
