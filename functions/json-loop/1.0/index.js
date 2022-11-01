const jsonLoop = async ({ input, path }, steps) => {
  try {
    input = JSON.parse(input);
  } finally {
    if (path) {
      switch (true) {
        case path.includes('.'): {
          path.split('.').forEach((key) => {
            input = input[key];
          });
          break;
        }

        default:
          input = input[path];
      }
    }

    for (let index = 0; index < input.length; index += 1) {
      await steps({ iterator: JSON.stringify(input[index]), index });
    }
  }
};

export default jsonLoop;
