const fetchJsonVariable = async ({ jsonInput, keyName }) => {
  try {
    jsonInput = JSON.parse(jsonInput);
  } finally {
    if (keyName.includes('.')) {
      keyName.split('.').forEach((value, key, array) => {
        if (key + 1 === array.length) {
          keyName = array[array.length - 1];
          return;
        }
        jsonInput = jsonInput[value];
      });
    }

    if (keyName in jsonInput) {
      return {
        output: jsonInput[keyName],
      };
    } else {
      return {
        output: null,
      };
    }
  }
};

export default fetchJsonVariable;
