import jsonpath from '../../utils/jsonpath.min';

export default async ({ data, path }) => {
  let parsed = data;
  if (typeof data === 'string') {
    parsed = JSON.parse(data);
  }

  const result = jsonpath.value(parsed, path);

  return { result };
};
