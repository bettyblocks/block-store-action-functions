const calculate = async ({ left, operator, right }) => {
  let result;

  switch (operator) {
    case "+":  
      result = left + right;
      break;
    case "-":  
      result = left - right;
      break;
    case "/":  
      result = left / right;
      break;
    case "*":  
      result = left * right;
      break;
  }

  return {
    result,
  };
};

export default calculate;
