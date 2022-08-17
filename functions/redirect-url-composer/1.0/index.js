const redirectUrlComposer = async ({ url, placeholderMapping }) => {
  placeholderMapping.map((placeholder) => {
    console.log(placeholder.key);
    console.log(placeholder.value);
    url = url.replace(':' + placeholder.key, placeholder.value);
  });

  return {
    output: url,
  };
};

export default redirectUrlComposer;
