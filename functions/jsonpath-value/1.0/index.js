import jsonpath from './jsonpath.min';

const jsonpathImplementation = async ({ data, path, outputType }) => {
  let parsed = data;
  if (typeof data == 'string') {
    parsed = JSON.parse(data);
  }

  const result = jsonpath.value(parsed, path);

  return { [outputType]: result };
};

export default jsonpathImplementation;
