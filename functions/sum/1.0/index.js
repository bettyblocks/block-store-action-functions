const sum = async ({ left, operator, right }) => {
  if (operator === "+") {
    return {
      result: left + right,
    };
  } else if (operator === "-") {
    return {
      result: left - right,
    };
  } else if (operator === "/") {
    return {
      result: left / right,
    };
  } else {
    return {
      result: left * right,
    };
  }
};

export default sum;
