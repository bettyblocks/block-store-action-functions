import { default as $app } from 'app';

test('Test Export as CSV', async () => {
  const output = await $app['exportAsCSV 1.0']({
    collectionInput: [{}, {}],
    mapping: {},
  });
  // assert(output, { greet: 'Hello, Bruce' });
});


test('sayHello 1.0', async () => {
  const output = await $app['sayHello 1.0']({ name: 'Bruce' });
  assert(output, { greet: 'Hello, Bruce' });
});

