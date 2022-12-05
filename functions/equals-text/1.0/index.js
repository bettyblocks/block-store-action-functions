const equalsText = ({ leftValue, rightValue, comparator, toLower }) => {
  console.log("🚀 ~ file: index.js:2 ~ equalsText ~ comparator", comparator)
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
  console.log("🚀 ~ file: index.js:34 ~ equalsText ~ result", result)

  return {
    result,
  };
};

export default equalsText;
