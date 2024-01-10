function searchCollection(_collection, _query, _property, _chunk) {
  return {
    result: [
      { idx: 1, name: 'John', score: 0.5 },
      { idx: 3, name: 'John Doe', score: 0.3 },
      { idx: 2, name: 'Jane', score: 0.1 },
    ],
  };
}

module.exports = searchCollection;
