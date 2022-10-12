const jsonLoop = async ({ input, path }, steps) => {
  try {
    input = JSON.parse(input);
  } finally {
    if (path && path.includes('.')) {
      path.split('.').forEach((key) => {
        input = input[key];
      });
    } else if (typeof path !== 'undefined' && path !== '' && path !== null) {
      input = input[path];
    }

    for (let index = 0; index < input.length; index += 1) {
      await steps({ iterator: JSON.stringify(input[index]), index });
    }
  }
};

export default jsonLoop;
