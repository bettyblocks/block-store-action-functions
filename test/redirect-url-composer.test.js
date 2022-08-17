test('redirectUrlComposer 1.0', async () => {
  const output = await $app['redirectUrlComposer 1.0']({
    url: 'https://any.app/:foo/:bar/:baz',
    placeholderMapping: [
      { key: 'foo', value: 'king' },
      { key: 'bar', value: 'willem' },
      {
        key: 'baz',
        value: 'orange',
      },
    ],
  });
  assert(output, { output: 'https://any.app/king/willem/orange' });
});
