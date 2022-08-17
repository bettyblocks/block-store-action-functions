test('Test Export as CSV', async () => {
  const output = await $app['exportAsCsv 1.0']({
    collectionInput: {
      data: [
        { foo: 'corge', bar: 'qux', baz: 'quuz' },
        { foo: 'garply', bar: 'waldo', baz: 'fred' },
      ],
    },
    headerMap: [
      {
        key: 'foo',
        value: 'thud',
      },
      {
        key: 'bar',
        value: 'bar',
      },
    ],
    delimiter: ';',
    model: { name: 'myModel' },
    property: [{ name: 'myProperty' }],
  });

  assert(output, { reference: "Thomas' Awesome File Reference" });
});
