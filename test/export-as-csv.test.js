test('Test Export as CSV', async () => {
  const output = await $app['exportAsCSV 1.0']({
    collectionInput: [{}, {}],
    mapping: {},
  });

  // assert(output, { greet: 'Hello, Bruce' });
});
