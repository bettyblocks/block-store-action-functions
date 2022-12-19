const equalsText = ({ leftValue, rightValue, comparator, toLower }) => {
  let result = false;

  if (toLower) {
    leftValue = leftValue.toLowerCase();
    rightValue = rightValue.toLowerCase();
  }

  switch (comparator) {
    case "eq":
      result = leftValue === rightValue;
      break;
    case "neq":
      result = leftValue !== rightValue;
      break;
    case "cont":
      result = leftValue.includes(rightValue);
      break;
    case "ncont":
      result = !leftValue.includes(rightValue);
      break;
    case "startsWith":
      result = leftValue.startsWith(rightValue);
      break;
    case "endsWith":
      result = leftValue.endsWith(rightValue);
      break;
    case "regMatch":
      const regex = new RegExp(rightValue);
      result = regex.test(leftValue);
      break;
    }

  return {
    result,
  };
};

export default equalsText;
