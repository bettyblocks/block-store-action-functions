const redirectUrlComposer = async ({ url, placeholderMapping }) => {
  let output = url;

  placeholderMapping.forEach(({ key, value }) => {
    output = output.replace(`:${key}`, value);
  });

  return {
    output,
  };
};

export default redirectUrlComposer;
