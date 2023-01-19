const sumCollectionProperty = async ({ collection, propname }) => {
  const propArr = await collection.data.map((x) => parseFloat(x[propname]));
  const sum = await propArr.reduce((acc, val) => acc + val, 0);

  return { result: sum };
};

export default sumCollectionProperty;
