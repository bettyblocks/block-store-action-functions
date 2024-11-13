const name = 'Batman';

test('liquid 1.0', async () => {
  const { as } = await $app['liquid 1.0']({
    template: 'Hello, {{name}}!',
    context: [{ key: 'name', value: name }],
  });

  assert(as, 'Hello, Batman!');
});
