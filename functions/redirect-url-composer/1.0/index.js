const redirectUrlComposer = async ({ url, placeholderMapping }) => {
  placeholderMapping.map((placeholder) => {
    url = url.replace(':' + placeholder.key, placeholder.value);
  });

  return {
    output: url,
  };
};

export default redirectUrlComposer;
