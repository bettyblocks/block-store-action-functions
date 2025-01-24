import jsonpath from '../../utils/jsonpath.min';

export default async ({ data, path, method }) => {
  let parsed = data;
  let result = '';

  if (typeof data === 'string') {
    parsed = JSON.parse(data);
  }

  switch (method) {
    case 'value':
      result = jsonpath.value(parsed, path);
      break;
    case 'query':
      result = jsonpath.query(parsed, path);
      break;
  }

  return { result };
};
