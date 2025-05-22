const returnAuditLogs = async ({ record, property, skip, take }) => {
  const collectionItems = JSON.parse(record.data[property]);
  const totalCount = collectionItems.length;

  const startIndex = skip;
  const endIndex = Math.min(startIndex + take, totalCount);
  const results = collectionItems
    .slice(startIndex, endIndex)
    .map((item, index) => ({ ...item, id: index }));

  return {
    result: {
      results,
      totalCount,
    },
  };
};

export default returnAuditLogs;
