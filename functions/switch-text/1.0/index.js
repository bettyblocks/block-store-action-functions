const switchText = async ({ input, cases, defaultCase = '' }) => {
  // The input is a string value
  // E.g case === [{key:  "firstName", value: "Betty"}]
  // If the input equals any of the given keys then return the corresponding value
  // If the input does not equal any of the keys then return the defaultCase

  let result = defaultCase;
  cases.forEach((caseItem) => {
    if (input === caseItem.key) {
      result = caseItem.value;
    }
  });

  return { result };
};

export default switchText;
