test('compareValues 1.0', async () => {
  const equal = await $app['equalsText 1.0']({ leftValue: 'Lorum Ipsum', rightValue: 'Lorum', comparator: 'eq', toLower: false });
  const notEqual = await $app['equalsText 1.0']({ leftValue: 'Lorum Ipsum', rightValue: 'Lorum', comparator: 'neq', toLower: false });
  const contains = await $app['equalsText 1.0']({ leftValue: 'Lorum Ipsum', rightValue: 'Lorum', comparator: 'cont', toLower: false });
  const notContains = await $app['equalsText 1.0']({ leftValue: 'Lorum Ipsum', rightValue: 'Lorum', comparator: 'ncont', toLower: false });
  const toLower = await $app['equalsText 1.0']({ leftValue: 'LOruM iPsUm', rightValue: 'LORUM IPSUM', comparator: 'eq', toLower: true });
  const startsWith = await $app['equalsText 1.0']({ leftValue: 'Lorum Ipsum', rightValue: 'Lorum', comparator: 'startsWith', toLower: false });
  const endsWith = await $app['equalsText 1.0']({ leftValue: 'Lorum Ipsum', rightValue: 'Ipsum', comparator: 'endsWith', toLower: false });
  const regMatch = await $app['equalsText 1.0']({ leftValue: 'Lorum Ipsum', rightValue: /([a-z])/g, comparator: 'regMatch', toLower: false });


  assert(equal, { result: false });
  assert(notEqual, { result: true });
  assert(contains, { result: true });
  assert(notContains, { result: false });
  assert(toLower, { result: true });
  assert(startsWith, { result: true });
  assert(endsWith, { result: true });
  assert(regMatch, { result: true });
});